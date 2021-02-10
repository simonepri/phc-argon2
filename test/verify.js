import test from 'ava';

import m from '../index.js';

test('should verify a precomputed hash', async (t) => {
  // Precomputed hash for "password"
  const hash =
    '$argon2id$v=19$m=4096,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  t.true(await m.verify(hash, 'password'));
});

test('should throw an error if the identifier does not contain the variant used', async (t) => {
  const wrong =
    '$argon2$i=6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, 'Incompatible argon2 identifier found in the hash');
});

test('should throw an error if the identifier contains an unsupported variant', async (t) => {
  const wrong =
    '$argon2s$v=19$m=4096,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, 'Unsupported s variant function');
});

test('should throw an error if the version is not supported', async (t) => {
  const wrong =
    '$argon2id$v=10$m=4096,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, 'Unsupported 10 version');
});

test('should throw an error if the param section is empty', async (t) => {
  const wrong =
    '$argon2id$v=19$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, 'The param section cannot be empty');
});

test("should throw an error if the 't' parameter is missing", async (t) => {
  const wrong =
    '$argon2id$v=19$m=4096,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, "The 't' param must be an integer");
});

test("should throw an error if the 't' parameter is out of range", async (t) => {
  let wrong =
    '$argon2id$v=19$m=4096,t=-1,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  let error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.regex(error.message, /The 't' param must be in the range/);

  wrong =
    '$argon2id$v=19$m=4096,t=4294967296,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.regex(error.message, /The 't' param must be in the range/);
});

test("should throw an error if the 'm' parameter is missing", async (t) => {
  const wrong =
    '$argon2id$v=19$t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, "The 'm' param must be an integer");
});

test("should throw an error if the 'm' parameter is out of range", async (t) => {
  let wrong =
    '$argon2id$v=19$m=0,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  let error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.regex(error.message, /The 'm' param must be in the range/);

  wrong =
    '$argon2id$v=19$m=4294967296,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.regex(error.message, /The 'm' param must be in the range/);
});

test("should throw an error if the 'p' parameter is missing", async (t) => {
  const wrong =
    '$argon2id$v=19$m=4096,t=3$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, "The 'p' param must be an integer");
});

test("should throw an error if the 'p' parameter is out of range", async (t) => {
  let wrong =
    '$argon2id$v=19$m=4096,t=3,p=0$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  let error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.regex(error.message, /The 'p' param must be in the range/);

  wrong =
    '$argon2id$v=19$m=4096,t=3,p=16777216$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.regex(error.message, /The 'p' param must be in the range/);
});

test('should throw an error if salt is not given', async (t) => {
  const wrong = '$argon2id$v=19$m=4096,t=3,p=1';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, 'No salt found in the given string');
});

test('should throw an error if hash is not given', async (t) => {
  const wrong = '$argon2id$v=19$m=4096,t=3,p=1$PcEZHj1maR/+ZQynyJHWZg';

  const error = await t.throwsAsync(async () => {
    await m.verify(wrong, 'password');
  });
  t.is(error.message, 'No hash found in the given string');
});

test('should throw an error if the hash is not in PHC format', async (t) => {
  const hash =
    '$argon2id$v=19$4096,3,16777216$PcEZHj1maR/+ZQynyJHWZg$2jEN4xcww7CYp1jakZB1rxbYsZ55XH2HgjYRtdZtubI';

  await t.throwsAsync(async () => {
    await m.verify(hash, 'password');
  });
});
