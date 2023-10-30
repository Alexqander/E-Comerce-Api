import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

// Convert the module URL to a directory path, accounting for the extra slash on Windows
const dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);

export const accessLogStream = fs.createWriteStream(
  path.join(dirname, 'access.log'),
  { flags: 'a' }
);

export const assignId = (req, res, next) => {
  req.id = randomUUID();
  next();
};
