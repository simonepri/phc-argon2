import test from 'ava';

import m from '../index.js';

test('should return the full list of identifiers', (t) => {
  t.deepEqual(m.identifiers(), ['argon2i', 'argon2d', 'argon2id']);
});
