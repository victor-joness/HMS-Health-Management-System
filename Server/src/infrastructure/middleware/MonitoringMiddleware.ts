/* import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../monitoring/MetricsService';
import { TracingService } from '../monitoring/TracingService';

export const monitoringMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const startTime = Date.now();
  const metrics = MetricsService.getInstance();
  const tracing = TracingService.getInstance();

  const span = tracing.startSpan('http_request');
  span.setAttribute('http.method', req.method);
  span.setAttribute('http.url', req.url);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    metrics.recordHttpRequest(req.method, req.path, res.statusCode);
    metrics.recordHttpDuration(req.method, req.path, duration);

    span.setAttribute('http.status_code', res.statusCode);
    span.end();
  });

  next();
};  */