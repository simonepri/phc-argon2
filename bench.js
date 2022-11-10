'use strict';

const execa = require('execa');
const pbkdf2 = require('.');

async function bench(hpass, vpass, options) {
  const hash = await pbkdf2.hash(hpass, options);
  return execa(
    'sympact',
    ['--interval=25', `await require(".").verify("${hash}","${vpass}")`],
    {
      env: {FORCE_COLOR: true},
      windowsVerbatimArguments: true
    }
  );
}

Promise.resolve()
  // Default configs
  .then(() => bench('r9(yaV@L', 'r9(yaV@L'))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })

  // Custom Iterations
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {iterations: 5}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {iterations: 10}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {iterations: 25}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {iterations: 50}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {iterations: 100}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })

  // Custom Memory
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {memory: 2 ** 14}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {memory: 2 ** 16}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .then(() => bench('r9(yaV@L', 'r9(yaV@L', {memory: 2 ** 18}))
  .then((results) => {
    console.log('► CMD:', results.cmd);
    console.log(results.stdout);
  })
  .catch((error) => {
    console.error(error);
  });
