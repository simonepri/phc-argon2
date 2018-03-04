'use strict';

const argon2 = require('argon2');

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {Object}
 */
const defaultConfigs = {
  // The type option is flexible and accepts
  // 0, 1 or 2 for Argon2d, Argon2i and Argon2id respectively.
  type: 1,

  // You can also modify time, memory and parallelism constraints passing the
  // object as the third parameter, with keys timeCost, memoryCost and
  // parallelism, respectively defaulted to 3, 12 (meaning 2^12 KB) and 1 (threads)
  timeCost: 3,
  memoryCost: 12,
  parallelism: 1,

  // The length of the generated hash default 32
  hashLength: 32,
};

/**
 * Applies the hashing algorithm to the provided password.
 * @public
 * @param  {string} password The password to hash.
 * @param  {Object} [options] Configurations passed to the hashing function.
 * @param  {number} [options.type] 0, 1 or 2 for Argon2d, Argon2i and Argon2id respectively.
 * @param  {number} [options.timeCost] The number of iterations.
 * @param  {number} [options.memoryCost] The memory usage as 2^memoryCost.
 * @param  {number} [options.parallelism] The number of parallel threads.
 * @param  {number} [options.hashLength] The length of the generated hash.
 * @return {Promise.<string>} The generated hash string.
 */
function hash(password, options) {
  if (typeof password !== 'string' || password.length === 0) {
    return Promise.reject(
      new TypeError('Password must be a non-empty string.')
    );
  }
  if (options !== undefined && typeof options !== 'object') {
    return Promise.reject(new TypeError('Options must be an object.'));
  }

  const cfgs = Object.assign(defaultConfigs, options);

  cfgs.salt = undefined;
  cfgs.raw = false;

  return argon2.hash(password, cfgs);
}

/**
 * Determines whether the user's input matches the stored password or not.
 * @public
 * @param  {string} hash The hash string generated by this package.
 * @param  {string} password The user's password input.
 * @return {Promise.<boolean>} A boolean that is true if the hash computed for
 * the password matches the provided hash.
 */
function verify(hash, password) {
  if (typeof hash !== 'string' || hash.length === 0) {
    return Promise.reject(new TypeError('Hash must be a non-empty string.'));
  }
  if (typeof password !== 'string' || password.length === 0) {
    return Promise.reject(
      new TypeError('Password must be a non-empty string.')
    );
  }

  return argon2.verify(hash, password);
}

module.exports = {
  hash,
  verify,
};
