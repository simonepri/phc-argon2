import test from 'ava';

import m from '..';

test('should hash and verify a short password', async t => {
  const password = 'p';

  const hash = await m.hash(password);
  t.true(typeof hash === 'string' && hash.length > 0);

  const match = await m.verify(hash, password);
  t.true(match);
});

test('should hash and verify a long password', async t => {
  const password =
    '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234';

  const hash = await m.hash(password);
  t.true(typeof hash === 'string' && hash.length > 0);

  const match = await m.verify(hash, password);
  t.true(match);
});

test('should not be case insensitive', async t => {
  const password = 'sec';

  const hash = await m.hash(password);
  t.true(typeof hash === 'string' && hash.length > 0);

  t.true(await m.verify(hash, 'sec'));

  t.false(await m.verify(hash, 'Sec'));
  t.false(await m.verify(hash, 'sEc'));
  t.false(await m.verify(hash, 'seC'));
  t.false(await m.verify(hash, 'SEc'));
  t.false(await m.verify(hash, 'sEC'));
  t.false(await m.verify(hash, 'SEC'));
});
