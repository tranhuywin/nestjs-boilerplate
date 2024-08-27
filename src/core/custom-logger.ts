import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

export class CustomLoggerService {
  dailyRotateFileTransport: DailyRotateFile | null = null
  myFormat: winston.Logform.Format | null = null
  createLoggerConfig: winston.LoggerOptions = {}
  constructor() {
    this.dailyRotateFileTransport = new DailyRotateFile({
      filename: `logs/app_log-%DATE%.log`,
      zippedArchive: false,
      maxFiles: '14d',
    })

    this.myFormat = winston.format.printf(
      ({ level = 'info', message, timestamp, req, err, ...metadata }) => {
        if (!req) {
          req = { headers: {} }
        }

        let msg = `${timestamp} [${level}] : ${message} `
        const json: any = {
          timestamp,
          level,
          ...metadata,
          message,
          error: {},
        }

        if (err) {
          json.error = err.stack || err
        }

        msg = JSON.stringify(json)
        return msg
      },
    )

    this.createLoggerConfig = {
      /** Warn level Also includes error * */
      level: 'warn',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss ZZ',
        }),
        this.myFormat,
      ),

      transports: [
        new winston.transports.Console({ level: 'info' }),
        this.dailyRotateFileTransport,
      ],
    }
  }
}
