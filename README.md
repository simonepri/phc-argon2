# credential-plus-argon2
[![Travis CI](https://travis-ci.org/simonepri/credential-plus-argon2.svg?branch=master)](https://travis-ci.org/simonepri/credential-plus-argon2) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/credential-plus-argon2/master.svg)](https://codecov.io/gh/simonepri/credential-plus-argon2) [![npm](https://img.shields.io/npm/dm/credential-plus-argon2.svg)](https://www.npmjs.com/package/credential-plus-argon2) [![npm version](https://img.shields.io/npm/v/credential-plus-argon2.svg)](https://www.npmjs.com/package/credential-plus-argon2) [![npm dependencies](https://david-dm.org/simonepri/credential-plus-argon2.svg)](https://david-dm.org/simonepri/credential-plus-argon2) [![npm dev dependencies](https://david-dm.org/simonepri/credential-plus-argon2/dev-status.svg)](https://david-dm.org/simonepri/credential-plus-argon2#info=devDependencies)
> 🛡 argon2 plugin for credential-plus

This package is thought to be used in conjunction with [credential-plus](https://github.com/simonepri/credential-plus)

If you find a security flaw in this code, please [report it](issues/new).

## Install

```
$ npm install --save credential-plus-argon2
```

## Usage
```js
const credential = require('credential-plus');
credential.install(require('credential-plus-argon2'));

// Hash and verify with argon2 and default configs
credential.hash('We are all unicorns', {func: 'argon2'}, (err, hash) => {
  console.log(hash);
  //=> {"hash":"$argon2d$v=19$m=4096,t=3,p=1$i5VhaDYfYqSWWoG1uKVBbw$QHpzhFRYJZwIcogtSciXh0hbc8f91PyGBdtWSNocuiE","func":"argon2"}
  credential.verify(hash, 'We are all unicorns', (match) =>{
    console.log(match);
    //=> true
  })
});
```

## API

### hash(password, options, callback)

Creates a new 'unique' hash from a password.

#### password

Type: `string`

The password to hash.

#### options

Type: `object`

Configurations for the hash function.

#### type

Type: `number`<br>
Default: 0

The type option is flexible and accepts.
`0`, `1` or `2` for `Argon2d`, `Argon2i` and `Argon2id` respectively.

#### timeCost

Type: `number`<br>
Default: 3

The amount of computation realized and therefore the execution time,
given in number of iterations.

#### memoryCost

Type: `number`<br>
Default: 12

The memory usage, given in kibibytes.

#### parallelism

Type: `number`<br>
Default: 1

The number of parallel threads.

#### hashLength

Type: `number`<br>
Default: 32

The length of the generated hash.

#### callback(err, hash)

Type: `function`

Called after the hash has been computed.

#### err

Type: `object`

Possible error thrown.

#### hash

Type: `object`

The generated hash.

### verify(hash, input, callback)

Determines whether or not the user's input matches the stored password.

#### hash

Type: `string`

An hash generated from this package.

#### input

Type: `string`

User's input input.

#### callback(err, valid)

Type: `string`

Called after the verification process has been computed.

#### err

Type: `object`

Possible error thrown.

##### valid

Type: `boolean`

True if the hash computed for the input matches.

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/credential-plus-argon2/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
