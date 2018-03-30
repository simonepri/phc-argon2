<h1 align="center">
  <b>phc-argon2</b>
</h1>
<p align="center">
  <!-- CI - TravisCI -->
  <a href="https://travis-ci.org/simonepri/phc-argon2">
    <img src="https://img.shields.io/travis/simonepri/phc-argon2/master.svg?label=MacOS%20%26%20Linux" alt="Mac/Linux Build Status" />
  </a>
  <!-- CI - AppVeyor -->
  <a href="https://ci.appveyor.com/project/simonepri/phc-argon2">
    <img src="https://img.shields.io/appveyor/ci/simonepri/phc-argon2/master.svg?label=Windows" alt="Windows Build status" />
  </a>
  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/phc-argon2">
    <img src="https://img.shields.io/codecov/c/github/simonepri/phc-argon2/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/phc-argon2?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/phc-argon2/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/phc-argon2">
    <img src="https://david-dm.org/simonepri/phc-argon2/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Init - ni -->
  <a href="https://github.com/simonepri/ni">
    <img src="https://img.shields.io/badge/initialized_with-ni-e74c3c.svg" alt="NI Scaffolding System used" />
  </a>
  <!-- Release - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/released_with-np-6c8784.svg" alt="NP Release System used" />
  </a>

  <br/>

  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/@phc/argon2">
    <img src="https://img.shields.io/npm/v/@phc/argon2.svg" alt="Latest version on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/phc-argon2/tree/master/license">
    <img src="https://img.shields.io/github/license/simonepri/phc-argon2.svg" alt="Project license" />
  </a>
</p>
<p align="center">
  🔒 Node.JS Argon2 password hashing algorithm following the PHC string format.
  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## PHC String Format

The [PHC String Format][specs:phc] is an attempt to specify a common hash string format that’s a restricted & well defined subset of the Modular Crypt Format. New hashes are strongly encouraged to adhere to the PHC specification, rather than the much looser [Modular Crypt Format][specs:mcf].

The hash strings generated by this package are in the following format:

```c
$argon2<variant>$v=<version>$m=<memory>,t=<iterations>,p=<parallelism>$<salt>$<hash>
```

Where:

| Field | Type | Description
| --- | --- | --- |
| `<variant>` | <code>string</code> | The [variant][specs:a2var] of the algorithm used to derive a key of the input password. |
| `<version>` | <code>number</code> | The version of the argon2 algorithm to use. |
| `<memory>` | <code>number</code> | The amount of memory to consume in kibibytes. |
| `<iterations>` | <code>number</code> | The number of iterations desired. The higher the number of iterations, the more secure the derived key will be, but will take a longer amount of time to complete. |
| `<parallelism>` | <code>number</code> | The degree of parallelism to use while computing the hash. |
| `<salt>` | <code>string</code> | A sequence of bits, known as a [cryptographic salt][specs:salt] encoded in [B64][specs:B64]. |
| `<hash>` | <code>string</code> | The computed derived key by the [argon2][specs:Argon2] algorithm encoded in [B64][specs:B64]. |

## Install

```bash
npm install --save @phc/argon2
```

## Usage

```js
const argon2 = require('@phc/argon2');

// Hash and verify with argon2 and default configs
const hash = await argon2.hash('password');
// => $argon2id$v=19$m=4096,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI

const match = await argon2.verify(hash, 'password');
// => true

const match = await argon2.verify(hash, 'wrong');
// => false

const ids = argon2.identifiers();
// => ['argon2d', 'argon2i', 'argon2id']
```

## Benchmarks

Below you can find usage statistics of this hashing algorithm with different
options.  
This should help you understand how the different options affects the running
time and memory usage of the algorithm.

Usage reports are generated thanks to [sympact][gh:sympact].

<details>
<summary><strong>System Report</strong> ↴</summary>

```
Distro    Release  Platform  Arch
--------  -------  --------  ----
Mac OS X  10.12.6  darwin    x64

CPU     Brand           Clock     Cores
------  --------------  --------  -----
Intel®  Core™ i5-6360U  2.00 GHz  4    

Memory                  Type    Size         Clock   
----------------------  ------  -----------  --------
Micron Technology Inc.  LPDDR3  4294.967 MB  1867 MHz
Micron Technology Inc.  LPDDR3  4294.967 MB  1867 MHz
```

</details>

<details>
<summary><strong>Default options</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
0.50 % ± 0.00 %          0.50 % … 0.50 %            

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
23.927 MB ± 2.775 MB     21.152 MB … 26.702 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.020 s         0.069 s        2 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.028 s  0.50 %     21.152 MB  4934
0.069 s  0.50 %     26.702 MB  4934
```

</details>

<details>
<summary><strong>5 iterations</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
0.60 % ± 0.00 %          0.60 % … 0.60 %            

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
24.906 MB ± 2.591 MB     21.242 MB … 26.739 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.025 s         0.077 s        3 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.025 s  0.60 %     21.242 MB  4945
0.076 s  0.60 %     26.739 MB  4945
0.077 s  0.60 %     26.739 MB  4945
```

</details>

<details>
<summary><strong>10 iterations</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
0.40 % ± 0.00 %          0.40 % … 0.40 %            

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
24.999 MB ± 2.576 MB     21.357 MB … 26.821 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.054 s         0.112 s        3 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.033 s  0.40 %     21.357 MB  4958
0.094 s  0.40 %     26.821 MB  4958
0.112 s  0.40 %     26.821 MB  4958
```

</details>

<details>
<summary><strong>25 iterations</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
6.78 % ± 10.70 %         0.60 % … 25.30 %           

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
25.440 MB ± 2.365 MB     21.344 MB … 26.817 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.082 s         0.129 s        4 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.026 s  0.60 %     21.344 MB  4971
0.077 s  0.60 %     26.800 MB  4971
0.109 s  0.60 %     26.800 MB  4971
0.129 s  25.30 %    26.817 MB  4971
```

</details>

<details>
<summary><strong>50 iterations</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
12.24 % ± 7.36 %         0.60 % … 16.90 %           

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
26.076 MB ± 1.907 MB     21.406 MB … 26.866 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.158 s         0.207 s        7 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.026 s  0.60 %     21.406 MB  4986
0.077 s  0.60 %     26.849 MB  4986
0.107 s  16.90 %    26.849 MB  4986
0.145 s  16.90 %    26.849 MB  4986
0.167 s  16.90 %    26.849 MB  4986
0.196 s  16.90 %    26.866 MB  4986
0.207 s  16.90 %    26.866 MB  4986
```

</details>

<details>
<summary><strong>100 iterations</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
37.25 % ± 22.39 %        1.10 % … 59.20 %           

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
26.418 MB ± 1.453 MB     21.385 MB … 26.849 MB      

Execution time  Sampling time  Samples   
--------------  -------------  ----------
0.408 s         0.479 s        13 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.026 s  1.10 %     21.385 MB  5007
0.076 s  1.10 %     26.833 MB  5007
0.106 s  1.10 %     26.833 MB  5007
0.153 s  30.70 %    26.833 MB  5007
0.170 s  30.70 %    26.833 MB  5007
0.201 s  30.70 %    26.833 MB  5007
0.301 s  50.70 %    26.833 MB  5007
0.330 s  50.70 %    26.833 MB  5007
0.366 s  50.70 %    26.833 MB  5007
0.403 s  59.20 %    26.833 MB  5007
0.453 s  59.20 %    26.849 MB  5007
0.478 s  59.20 %    26.849 MB  5007
0.479 s  59.20 %    26.849 MB  5007
```

</details>

<details>
<summary><strong>16˙384 KiB of memory</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
5.58 % ± 2.81 %          0.70 % … 7.20 %            

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
34.916 MB ± 7.812 MB     21.385 MB … 39.432 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.071 s         0.13 s         4 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.033 s  0.70 %     21.385 MB  5040
0.083 s  7.20 %     39.416 MB  5040
0.116 s  7.20 %     39.432 MB  5040
0.130 s  7.20 %     39.432 MB  5040
```

</details>

<details>
<summary><strong>65˙536 KiB of memory</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
21.92 % ± 17.48 %        0.60 % … 49.30 %           

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
75.683 MB ± 23.350 MB    20.980 MB … 89.358 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.205 s         0.258 s        8 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  ----
0.025 s  0.60 %     20.980 MB  5055
0.075 s  0.60 %     55.775 MB  5055
0.106 s  18.90 %    81.981 MB  5055
0.143 s  18.90 %    89.342 MB  5055
0.164 s  18.90 %    89.342 MB  5055
0.194 s  18.90 %    89.342 MB  5055
0.225 s  49.30 %    89.342 MB  5055
0.258 s  49.30 %    89.358 MB  5055
```

</details>

<details>
<summary><strong>262˙144 KiB of memory</strong> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
64.37 % ± 28.91 %        0.60 % … 93.90 %           

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
216.095 MB ± 96.874 MB   21.332 MB … 291.025 MB     

Execution time  Sampling time  Samples   
--------------  -------------  ----------
0.885 s         0.933 s        31 samples

Instant  CPU Usage  RAM Usage   PIDS
-------  ---------  ----------  ----
0.026 s  0.60 %     21.332 MB   5078
0.074 s  0.60 %     51.356 MB   5078
0.106 s  19.40 %    77.545 MB   5078
0.136 s  19.40 %    99.344 MB   5078
0.167 s  19.40 %    121.168 MB  5078
0.192 s  19.40 %    140.993 MB  5078
0.225 s  47.90 %    165.065 MB  5078
0.260 s  47.90 %    188.371 MB  5078
0.286 s  47.90 %    205.804 MB  5078
0.315 s  47.90 %    229.233 MB  5078
0.343 s  66.20 %    252.084 MB  5078
0.404 s  66.20 %    288.231 MB  5078
0.422 s  66.20 %    291.025 MB  5078
0.439 s  66.20 %    291.025 MB  5078
0.468 s  77.00 %    291.025 MB  5078
0.498 s  77.00 %    291.025 MB  5078
0.528 s  77.00 %    291.025 MB  5078
0.554 s  77.00 %    291.025 MB  5078
0.586 s  77.00 %    291.025 MB  5078
0.619 s  85.10 %    291.025 MB  5078
0.649 s  85.10 %    291.025 MB  5078
0.672 s  85.10 %    291.025 MB  5078
0.703 s  85.10 %    291.025 MB  5078
0.735 s  89.80 %    291.025 MB  5078
0.765 s  89.80 %    291.025 MB  5078
0.792 s  89.80 %    291.025 MB  5078
0.823 s  89.80 %    291.025 MB  5078
0.854 s  93.90 %    291.025 MB  5078
0.896 s  93.90 %    156.807 MB  5078
0.918 s  93.90 %    22.606 MB   5078
0.933 s  93.90 %    22.606 MB   5078
```

</details>

## API

#### TOC

<dl>
<dt><a href="#hash">hash(password, [options])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Computes the hash string of the given password in the PHC format using argon2
package.</p>
</dd>
<dt><a href="#verify">verify(password, phcstr)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Determines whether or not the hash stored inside the PHC formatted string
matches the hash generated for the password provided.</p>
</dd>
<dt><a href="#identifiers">identifiers()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets the list of all identifiers supported by this hashing function.</p>
</dd>
</dl>

<a name="hash"></a>

### hash(password, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Computes the hash string of the given password in the PHC format using argon2
package.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - The generated secure hash string in the PHC
format.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>string</code> |  | The password to hash. |
| [options] | <code>Object</code> |  | Optional configurations related to the hashing function. |
| [options.variant] | <code>number</code> | <code>id</code> | Optinal variant of argon2 to use. Can be one of [`'d'`, `'i'`, `'id'`] for argon2d, argon2i and argon2id respectively. |
| [options.iterations] | <code>number</code> | <code>3</code> | Optional number of iterations to use. Must be an integer within the range (`1` <= `iterations` <= `2^32-1`). |
| [options.memory] | <code>number</code> | <code>4096</code> | Optional amount of memory to use in kibibytes. Must be an integer within the range (`8` <= `memory` <= `2^32-1`). |
| [options.parallelism] | <code>number</code> | <code>1</code> | Optional degree of parallelism to use. Must be an integer within the range (`1` <= `parallelism` <= `2^24-1`). |
| [options.saltSize] | <code>number</code> | <code>16</code> | Optional number of bytes to use when autogenerating new salts. Must be an integer within the range (`1` <= `saltSize` <= `2^10-1`). |

<a name="verify"></a>

### verify(password, phcstr) ⇒ <code>Promise.&lt;boolean&gt;</code>
Determines whether or not the hash stored inside the PHC formatted string
matches the hash generated for the password provided.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - A boolean that is true if the hash computed
for the password matches.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | User's password input. |
| phcstr | <code>string</code> | Secure hash string generated from this package. |

<a name="identifiers"></a>

### identifiers() ⇒ <code>Array.&lt;string&gt;</code>
Gets the list of all identifiers supported by this hashing function.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - A list of identifiers supported by this hashing function.  
**Access**: public  

## Related
- [@phc/scrypt][scrypt] -
🔒 Node.JS scrypt password hashing algorithm following the PHC string format.
- [@phc/bcrypt][bcrypt] -
🔒 Node.JS bcrypt password hashing algorithm following the PHC string format.
- [@phc/pbkdf2][pbkdf2] -
🔒 Node.JS PBKDF2 password hashing algorithm following the PHC string format.

## Contributing

Contributions are REALLY welcome and if you find a security flaw in this code, PLEASE [report it][new issue].  
Please check the [contributing guidelines][contributing] for more details. Thanks!

## Authors

- **Simone Primarosa** - *Github* ([@simonepri][github:simonepri]) • *Twitter* ([@simoneprimarosa][twitter:simoneprimarosa])

See also the list of [contributors][contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [license][license] file for details.

<!-- Links -->
[start]: https://github.com/simonepri/phc-argon2#start-of-content
[new issue]: https://github.com/simonepri/phc-argon2/issues/new
[contributors]: https://github.com/simonepri/phc-argon2/contributors

[license]: https://github.com/simonepri/phc-argon2/tree/master/license
[contributing]: https://github.com/simonepri/phc-argon2/tree/master/.github/contributing.md

[scrypt]: https://github.com/simonepri/phc-scrypt
[bcrypt]: https://github.com/simonepri/phc-bcrypt
[pbkdf2]: https://github.com/simonepri/phc-pbkdf2

[github:simonepri]: https://github.com/simonepri
[twitter:simoneprimarosa]: http://twitter.com/intent/user?screen_name=simoneprimarosa

[gh:sympact]: https://github.com/simonepri/sympact

[specs:mcf]: https://github.com/ademarre/binary-mcf
[specs:phc]: https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md
[specs:B64]: https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md#b64
[specs:salt]: https://en.wikipedia.org/wiki/Salt_(cryptography)
[specs:a2var]: https://crypto.stackexchange.com/a/49969
[specs:Argon2]: https://en.wikipedia.org/wiki/Argon2
