import test from 'ava';

import m from 'credential-plus';

m.install(require('.'));

test('should verify a correct password with argon2', async t => {
  const hash = await m.hash('hello world', {func: 'argon2'});
  t.true(typeof hash === 'string');
  t.true(await m.verify(hash, 'hello world'));
});

test('should not verify a wrong password with argon2', async t => {
  const hash = await m.hash('Hello world', {func: 'argon2'});
  t.true(typeof hash === 'string');
  t.false(await m.verify(hash, 'hello world'));
});

test.serial('should throw an error trying to hash a non valid string', async t => {
  let err = await t.throws(m.hash(undefined, {func: 'argon2'}));
  t.true(err instanceof Error);
  err = await t.throws(m.hash('', {func: 'argon2'}));
  t.true(err instanceof Error);
  err = await t.throws(m.hash(['unicorn'], {func: 'argon2'}));
  t.true(err instanceof Error);
  err = await t.throws(m.hash(() => console.log('lalala'), {func: 'argon2'}));
  t.true(err instanceof Error);
  err = await t.throws(m.hash(null, {func: 'argon2'}));
  t.true(err instanceof Error);
});

test('should throw an error trying to verify a non valid string', async t => {
  const hash = await m.hash('Hello world', {func: 'argon2'});
  let err = await t.throws(m.verify(hash, undefined));
  t.true(err instanceof Error);
  err = await t.throws(m.verify(hash, ''));
  t.true(err instanceof Error);
  err = await t.throws(m.verify(hash, ['unicorn']));
  t.true(err instanceof Error);
  err = await t.throws(m.verify(hash, () => console.log('lalala')));
  t.true(err instanceof Error);
  err = await t.throws(m.verify(hash, null));
  t.true(err instanceof Error);
});
