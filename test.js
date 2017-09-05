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
