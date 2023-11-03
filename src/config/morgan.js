import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import chalk from 'chalk';
const dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
const logsDir = path.join(dirname, '..', 'logs'); // Define una carpeta 'logs'

// Asegúrate de que la carpeta 'logs' exista
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Crea nombres de archivo basados en la fecha, por ejemplo: '2023-05-01.log'
const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
const logFilePath = path.join(logsDir, logFileName);

export const accessLogStream = fs.createWriteStream(logFilePath, {
  flags: 'a'
});

export const morganFormat = (tokens, req, res) => {
  return [
    chalk.blue(`Request ID: ${tokens.id(req, res)}`),
    chalk.yellow(`Date and Time: ${tokens.date(req, res, 'web')}`),
    chalk.green(
      `Method and URL: ${tokens.method(req, res)} ${tokens.url(req, res)}`
    ),
    chalk.red(
      `Status and Content Length: ${tokens.status(req, res)} ${tokens.res(
        req,
        res,
        'content-length'
      )} - ${tokens['response-time'](req, res)} ms`
    ),
    chalk.cyan(`User Agent: ${tokens['user-agent'](req, res)}`)
  ].join('\n');
};
export const assignId = (req, res, next) => {
  req.id = randomUUID();
  next();
};
