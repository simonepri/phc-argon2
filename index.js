'use strict';

const argon2 = require('argon2');

const _ = require('lodash');

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {Object}
 */
const defaultConfigs = {
  // The type option is flexible and accepts
  // 0, 1 or 2 for Argon2d, Argon2i and Argon2id respectively.
  type: 0,

  // You can also modify time, memory and parallelism constraints passing the
  // object as the third parameter, with keys timeCost, memoryCost and
  // parallelism, respectively defaulted to 3, 12 (meaning 2^12 KB) and 1 (threads)
  timeCost: 3,
  memoryCost: 12,
  parallelism: 1,

  // The length of the generated hash default 32
  hashLength: 32
};

/**
 * Generates an unique hash and the data needed to verify it.
 * @public
 * @param  {string} password The password to hash.
 * @param  {object} configs Configurations related to the hashing function.
 * @returns {Promise<string>} A promise that contains the generated hash string.
 */
function hashFunc(password, configs) {
  const cfgs = _.extend(defaultConfigs, configs);

  cfgs.raw = false;

  return argon2.hash(password, cfgs);
}

/**
 * Determines whether or not the user's input matches the stored password.
 * @public
 * @param  {string} hash Stringified hash object generated from this package.
 * @param  {string} input User's password input.
 * @returns {Promise<boolean>} A promise that contains a boolean that is true if
 *   if the hash computed for the input matches.
 */
function verifyFunc(hash, password) {
  return argon2.verify(hash, password);
}

module.exports = {
  hash: hashFunc,
  verify: verifyFunc,
  name: 'argon2'
};
