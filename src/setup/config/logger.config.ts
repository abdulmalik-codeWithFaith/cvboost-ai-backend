import { RequestMethod } from '@nestjs/common';

export const loggerConfig = {
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname,req,res,responseTime',
        singleLine: true,
      },
    },
    redact: {
      paths: ['req.headers.authorization', 'password', 'email'],
      remove: true,
    },
    customLogLevel(req, res, err) {
      if (res.statusCode >= 500 || err) return 'error';
      if (res.statusCode >= 400) return 'warn';
      if (res.statusCode >= 300) return 'debug';
      return 'info';
    },
    customSuccessMessage(req, res) {
      return `LOGGED ${req.method} ${req.url} ${res.statusCode}ms`;
    },
    customErrorMessage(req, res) {
      return `${req.method} ${req.url} ${res.statusCode}`;
    },
  },
  forRoutes: [{ path: '{*path}', method: RequestMethod.ALL }],
};
