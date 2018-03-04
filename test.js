import test from 'ava';

import m from '.';

test('should verify a correct password', async t => {
  const hash = await m.hash('hello world');

  t.is(typeof hash, 'string');
  t.true(await m.verify(hash, 'hello world'));
});

test('should not verify a wrong password', async t => {
  const hash = await m.hash('Hello world');

  t.is(typeof hash, 'string');
  t.false(await m.verify(hash, 'hello world'));
});

test('should throw an error trying to hash a non valid password string', async t => {
  let err = await t.throws(m.hash(undefined));
  t.is(err.message, 'Password must be a non-empty string.');
  err = await t.throws(m.hash(null));
  t.is(err.message, 'Password must be a non-empty string.');
  err = await t.throws(m.hash(''));
  t.is(err.message, 'Password must be a non-empty string.');
});

test('should throw an error trying to verify a non valid password string', async t => {
  const hash = await m.hash('Hello world');

  let err = await t.throws(m.verify(hash, undefined));
  t.is(err.message, 'Password must be a non-empty string.');
  err = await t.throws(m.verify(hash, null));
  t.is(err.message, 'Password must be a non-empty string.');
  err = await t.throws(m.verify(hash, ''));
  t.is(err.message, 'Password must be a non-empty string.');
});

test('should throw an error trying to verify with a non valid hash', async t => {
  let err = await t.throws(m.verify(undefined, 'Hello World'));
  t.is(err.message, 'Hash must be a non-empty string.');
  err = await t.throws(m.verify(null, 'Hello World'));
  t.is(err.message, 'Hash must be a non-empty string.');
  err = await t.throws(m.verify('', 'Hello World'));
  t.is(err.message, 'Hash must be a non-empty string.');
});

test('should throw an error trying to hash passing invalid options', async t => {
  await t.notThrows(m.hash('Hello world'), undefined);
  await t.notThrows(m.hash('Hello world'), null);

  const err = await t.throws(m.hash('Hello world', ''));
  t.is(err.message, 'Options must be an object.');
});
