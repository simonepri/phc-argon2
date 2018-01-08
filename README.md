<h1 align="center">
  <a href="https://github.com/simonepri/credential-plus"><img src="https://github.com/simonepri/credential-plus/blob/master/media/credential-plus.png?raw=true" alt="credential-plus-argon2" /></a>
</h1>
<div align="center">
  <a href="https://travis-ci.org/simonepri/credential-plus-argon2"> <img src="https://travis-ci.org/simonepri/credential-plus-argon2.svg?branch=master" alt="build status"></a>
  <a href="https://codecov.io/gh/simonepri/credential-plus-argon2"><img src="https://img.shields.io/codecov/c/github/simonepri/credential-plus-argon2/master.svg" alt="code coverage" /></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="code style" /></a>
  <a href="https://www.npmjs.com/package/credential-plus-argon2"><img src="https://img.shields.io/npm/v/credential-plus-argon2.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/credential-plus-argon2"><img src="https://img.shields.io/npm/dm/credential-plus-argon2.svg" alt="npm downloads" /></a>
  <a href="https://david-dm.org/simonepri/credential-plus-argon2"><img src="https://david-dm.org/simonepri/credential-plus-argon2.svg" alt="dependencies" /></a>
  <a href="https://david-dm.org/simonepri/credential-plus-argon2#info=devDependencies"><img src="https://david-dm.org/simonepri/credential-plus-argon2/dev-status.svg" alt="dev dependencies" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/simonepri/credential-plus-argon2.svg" alt="license" /></a>
</div>
<br />
<div align="center">
  🛡 Argon2 password hashing function for <a href="https://github.com/simonepri/credential-plus">credential-plus</a>.
</div>
<div align="center">
  <sub>
    If you find a security flaw in this code, PLEASE <a href="https://github.com/simonepri/credential-plus-argon2/issues/new">report it</a>.
  </sub>
</div>

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/simonepri/credential-plus-argon2.svg)](https://greenkeeper.io/)

```
$ npm install --save credential-plus-argon2
```

## Usage
```js
const credential = require('credential-plus');
credential.install(require('credential-plus-argon2'));

// Hash and verify with argon2 and default configs
credential.hash('We are all unicorns', {func: 'argon2'})
  .then(hash) => {

    console.log(hash);
    //=> {"hash":"$argon2d$v=19$m=4096,t=3,p=1$i5VhaDYfYqSWWoG1uKVBbw$QHpzhFRYJZwIcogtSciXh0hbc8f91PyGBdtWSNocuiE","func":"argon2"}

    credential.verify(hash, 'We are all unicorns')
      .then(match) => {
        console.log(match);
        //=> true
      });

  });
```

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/credential-plus-argon2/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
