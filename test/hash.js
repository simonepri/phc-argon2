import test from 'ava';

import m from '..';

test("should throw an error if the 'iterations' option is not a number", async t => {
  const err = await t.throwsAsync(async () => {
    await m.hash('password', {iterations: 'iterations'});
  });
  t.is(err.message, "The 'iterations' option must be an integer");
});

test("should throw an error if the 'iterations' option is out of range", async t => {
  let err = await t.throwsAsync(async () => {
    await m.hash('password', {iterations: -1});
  });
  t.regex(err.message, /The 'iterations' option must be in the range/);

  err = await t.throwsAsync(async () => {
    await m.hash('password', {iterations: 2 ** 32});
  });
  t.regex(err.message, /The 'iterations' option must be in the range/);
});

test("should throw an error if the 'memory' option is not a number", async t => {
  const err = await t.throwsAsync(async () => {
    await m.hash('password', {memory: 'memory'});
  });
  t.is(err.message, "The 'memory' option must be an integer");
});

test("should throw an error if the 'memory' option is out of range", async t => {
  let err = await t.throwsAsync(async () => {
    await m.hash('password', {memory: -1});
  });
  t.regex(err.message, /The 'memory' option must be in the range/);

  err = await t.throwsAsync(async () => {
    await m.hash('password', {memory: 2 ** 32});
  });
  t.regex(err.message, /The 'memory' option must be in the range/);
});

test("should throw an error if the 'parallelism' option is not a number", async t => {
  const err = await t.throwsAsync(async () => {
    await m.hash('password', {parallelism: 'parallelism'});
  });
  t.is(err.message, "The 'parallelism' option must be an integer");
});

test("should throw an error if the 'parallelism' option is out of range", async t => {
  let err = await t.throwsAsync(async () => {
    await m.hash('password', {parallelism: -1});
  });
  t.regex(err.message, /The 'parallelism' option must be in the range/);

  err = await t.throwsAsync(async () => {
    await m.hash('password', {parallelism: 2 ** 24});
  });
  t.regex(err.message, /The 'parallelism' option must be in the range/);
});

test("should throw an error if the 'variant' option is not a string", async t => {
  const err = await t.throwsAsync(async () => {
    await m.hash('password', {variant: 1});
  });
  t.is(err.message, "The 'variant' option must be a string");
});

test("should throw an error if the 'variant' option is unsupported", async t => {
  const err = await t.throwsAsync(async () => {
    await m.hash('password', {variant: 's'});
  });
  t.regex(err.message, /The 'variant' option must be one of:/);
});

test("should throw an error if the 'saltSize' option is out of range", async t => {
  let err = await t.throwsAsync(async () => {
    await m.hash('password', {saltSize: -1});
  });
  t.regex(err.message, /The 'saltSize' option must be in the range/);

  err = await t.throwsAsync(async () => {
    await m.hash('password', {saltSize: 1025});
  });
  t.regex(err.message, /The 'saltSize' option must be in the range/);
});
