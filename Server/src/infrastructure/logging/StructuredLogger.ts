import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ElasticsearchTransport } from 'winston-elasticsearch';

export class StructuredLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: {
        service: 'hms-api',
        environment: process.env.NODE_ENV
      },
      transports: [
        // Rotação diária de arquivos
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }),

        // Logs de erro separados
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
        }),

        // Console em desenvolvimento
        ...(process.env.NODE_ENV !== 'production' ? [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })
        ] : [])
      ]
    });
  }

  log(level: string, message: string, meta: Record<string, any> = {}) {
    this.logger.log(level, message, {
      timestamp: new Date().toISOString(),
      ...meta,
      // Informações adicionais automáticas
      pid: process.pid,
      hostname: require('os').hostname()
    });
  }

  error(message: string, error: Error, meta: Record<string, any> = {}) {
    this.logger.error(message, {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      ...meta,
      timestamp: new Date().toISOString(),
    });
  }

  // Métodos específicos para diferentes tipos de logs
  logRequest(req: any, res: any, responseTime: number) {
    this.log('info', 'HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      responseTime,
      userAgent: req.get('user-agent'),
      ip: req.ip
    });
  }

  logDatabaseQuery(query: string, params: any[], duration: number) {
    this.log('debug', 'Database Query', {
      query,
      params,
      duration,
      timestamp: new Date().toISOString()
    });
  }
} 