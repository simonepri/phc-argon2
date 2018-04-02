/* eslint-disable max-params,capitalized-comments,complexity */
'use strict';

const crypto = require('crypto');
const argon2 = require('argon2');
const phc = require('@phc/format');

const MAX_UINT32 = 4294967295; // 2**32 - 1
const MAX_UINT24 = 16777215; // 2**24 - 1

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {Object}
 */
const defaults = Object.freeze({
  // Argon2 variant to use. Can be one of argon2(d), argon2(i) or argon2(id).
  variant: 'id',

  // time cost, in linear iterations.
  iterations: 3,
  // memory cost, in kibibytes.
  memory: 4096,
  // parallelism, in number of threads.
  parallelism: 1,
  // The minimum recommended size for the salt is 128 bits.
  saltSize: 16,
});

/**
 * Supported Argon2 variants.
 * Argon2 currently has three modes:
 * - d: Argon2d data-dependent.
 * - i: Argon2i data-independent.
 * - id: Argon2id a mix of the two.
 * See https://crypto.stackexchange.com/a/49969
 * @private
 * @type {Object}
 */
const variants = Object.freeze({
  i: argon2.argon2i,
  d: argon2.argon2d,
  id: argon2.argon2id,
});

/**
 * Promisify a function.
 * @private
 * @param  {Function} fn The function to promisify.
 * @return {Function} The promisified function.
 */
function pify(fn) {
  return function() {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-rest-params
      const args = Array.prototype.slice.call(arguments);
      args.push((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
      fn.apply(this, args);
    });
  };
}

/**
 * Generates a cryptographically secure random string for use as a password salt
 * using Node's built-in crypto.randomBytes().
 * @private
 * @param  {number} length The length of the salt to be generated.
 * @return {Promise.<string>} The salt string.
 */
function genSalt(length) {
  return pify(crypto.randomBytes)(length);
}
/**
 * Computes the hash string of the given password in the PHC format using argon2
 * package.
 * @public
 * @param  {string} password The password to hash.
 * @param  {Object} [options] Optional configurations related to the hashing
 * function.
 * @param  {number} [options.variant=id] Optinal variant of argon2 to use.
 * Can be one of [`'d'`, `'i'`, `'id'`] for argon2d, argon2i and argon2id
 * respectively.
 * @param  {number} [options.iterations=3] Optional number of iterations to use.
 * Must be an integer within the range (`1` <= `iterations` <= `2^32-1`).
 * @param  {number} [options.memory=4096] Optional amount of memory to use in
 * kibibytes.
 * Must be an integer within the range (`8` <= `memory` <= `2^32-1`).
 * @param  {number} [options.parallelism=1] Optional degree of parallelism to
 * use.
 * Must be an integer within the range (`1` <= `parallelism` <= `2^24-1`).
 * @param  {number} [options.saltSize=16] Optional number of bytes to use when
 * autogenerating new salts.
 * Must be an integer within the range (`1` <= `saltSize` <= `2^10-1`).
 * @return {Promise.<string>} The generated secure hash string in the PHC
 * format.
 */
function hash(password, options) {
  options = options || {};
  let variant = options.variant || defaults.variant;
  const iterations = options.iterations || defaults.iterations;
  const memory = options.memory || defaults.memory;
  const parallelism = options.parallelism || defaults.parallelism;
  const saltSize = options.saltSize || defaults.saltSize;

  // Iterations Validation
  if (typeof iterations !== 'number' || !Number.isInteger(iterations)) {
    return Promise.reject(
      new TypeError("The 'iterations' option must be an integer")
    );
  }
  if (iterations < 1 || iterations > MAX_UINT32) {
    return Promise.reject(
      new TypeError(
        `The 'iterations' option must be in the range (1 <= iterations <= ${MAX_UINT32})`
      )
    );
  }

  // Parallelism Validation
  if (typeof parallelism !== 'number' || !Number.isInteger(parallelism)) {
    return Promise.reject(
      new TypeError("The 'parallelism' option must be an integer")
    );
  }
  if (parallelism < 1 || parallelism > MAX_UINT24) {
    return Promise.reject(
      new TypeError(
        `The 'parallelism' option must be in the range (1 <= parallelism <= ${MAX_UINT24})`
      )
    );
  }

  // Memory Validation
  if (typeof memory !== 'number' || !Number.isInteger(memory)) {
    return Promise.reject(
      new TypeError("The 'memory' option must be an integer")
    );
  }
  const minmem = 8 * parallelism;
  if (memory < minmem || memory > MAX_UINT32) {
    return Promise.reject(
      new TypeError(
        `The 'memory' option must be in the range (${minmem} <= memory <= ${MAX_UINT32})`
      )
    );
  }

  // Variant Validation
  if (typeof variant !== 'string') {
    return Promise.reject(
      new TypeError("The 'variant' option must be a string")
    );
  }
  variant = variant.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(variants, variant)) {
    return Promise.reject(
      new TypeError(
        `The 'variant' option must be one of: ${Object.keys(variants)}`
      )
    );
  }

  // Salt Size Validation
  if (saltSize < 8 || saltSize > 1024) {
    return Promise.reject(
      new TypeError(
        "The 'saltSize' option must be in the range (8 <= parallelism <= 1023)"
      )
    );
  }

  options.raw = false;

  return genSalt(saltSize).then(salt => {
    return argon2.hash(password, {
      type: variants[variant],
      timeCost: iterations,
      memoryCost: Math.floor(Math.log2(memory)),
      parallelism,
      salt,
    });
  });
}

/**
 * Determines whether or not the hash stored inside the PHC formatted string
 * matches the hash generated for the password provided.
 * @public
 * @param  {string} password User's password input.
 * @param  {string} phcstr Secure hash string generated from this package.
 * @returns {Promise.<boolean>} A boolean that is true if the hash computed
 * for the password matches.
 */
function verify(phcstr, password) {
  let phcobj;
  try {
    phcobj = phc.deserialize(phcstr, false);
  } catch (err) {
    return Promise.reject(err);
  }

  // Identifier Validation
  const idparts = phcobj.id.split('2');
  if (
    idparts.length !== 2 ||
    idparts[0] === '' ||
    idparts[1] === '' ||
    idparts[0] !== 'argon'
  ) {
    return Promise.reject(
      new TypeError(`Incompatible ${phcobj.id} identifier found in the hash`)
    );
  }
  if (!Object.prototype.hasOwnProperty.call(variants, idparts[1])) {
    return Promise.reject(
      new TypeError(`Unsupported ${idparts[1]} variant function`)
    );
  }

  // Iterations Validation
  if (
    typeof phcobj.params.t !== 'number' ||
    !Number.isInteger(phcobj.params.t)
  ) {
    return Promise.reject(new TypeError("The 't' param must be an integer"));
  }
  if (phcobj.params.t < 1 || phcobj.params.t > MAX_UINT32) {
    return Promise.reject(
      new TypeError(
        `The 't' param must be in the range (1 <= t <= ${MAX_UINT32})`
      )
    );
  }

  // Parallelism Validation
  if (
    typeof phcobj.params.p !== 'number' ||
    !Number.isInteger(phcobj.params.p)
  ) {
    return Promise.reject(new TypeError("The 'p' param must be an integer"));
  }
  if (phcobj.params.p < 1 || phcobj.params.p > MAX_UINT24) {
    return Promise.reject(
      new TypeError(
        `The 'p' param must be in the range (1 <= p <= ${MAX_UINT24})`
      )
    );
  }

  // Memory Validation
  if (
    typeof phcobj.params.m !== 'number' ||
    !Number.isInteger(phcobj.params.m)
  ) {
    return Promise.reject(new TypeError("The 'm' param must be an integer"));
  }
  const minmem = 8 * phcobj.params.p;
  if (phcobj.params.m < minmem || phcobj.params.m > MAX_UINT32) {
    return Promise.reject(
      new TypeError(
        `The 'm' param must be in the range (${minmem} <= m <= ${MAX_UINT32})`
      )
    );
  }

  // Salt Validation
  if (typeof phcobj.salt === 'undefined') {
    return Promise.reject(new TypeError('No salt found in the given string'));
  }

  // Hash Validation
  if (typeof phcobj.hash === 'undefined') {
    return Promise.reject(new TypeError('No hash found in the given string'));
  }

  return argon2.verify(phcstr, password);
}

/**
 * Gets the list of all identifiers supported by this hashing function.
 * @public
 * @returns {string[]} A list of identifiers supported by this hashing function.
 */
function identifiers() {
  return Object.keys(variants).map(variant => `argon2${variant}`);
}

module.exports = {
  hash,
  verify,
  identifiers,
};
