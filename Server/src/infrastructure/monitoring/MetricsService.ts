import { Counter, Histogram } from 'prom-client';
import { register } from 'prom-client';

export class MetricsService {
  private static instance: MetricsService;
  
  // Contadores
  private httpRequestsTotal: Counter;
  private errorsTotal: Counter;
  
  // Histogramas
  private httpRequestDuration: Histogram;
  private databaseQueryDuration: Histogram;

  private constructor() {
    // Métricas HTTP
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total de requisições HTTP',
      labelNames: ['method', 'path', 'status']
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duração das requisições HTTP',
      labelNames: ['method', 'path'],
      buckets: [0.1, 0.5, 1, 2, 5]
    });

    // Métricas de Erro
    this.errorsTotal = new Counter({
      name: 'errors_total',
      help: 'Total de erros',
      labelNames: ['type', 'service']
    });

    // Métricas de Database
    this.databaseQueryDuration = new Histogram({
      name: 'database_query_duration_seconds',
      help: 'Duração das queries do banco de dados',
      labelNames: ['operation', 'table'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1]
    });
  }

  static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  // Métodos para registrar métricas
  recordHttpRequest(method: string, path: string, status: number): void {
    this.httpRequestsTotal.labels(method, path, status.toString()).inc();
  }

  recordHttpDuration(method: string, path: string, durationMs: number): void {
    this.httpRequestDuration.labels(method, path).observe(durationMs / 1000);
  }

  recordError(type: string, service: string): void {
    this.errorsTotal.labels(type, service).inc();
  }

  recordQueryDuration(operation: string, table: string, durationMs: number): void {
    this.databaseQueryDuration.labels(operation, table).observe(durationMs / 1000);
  }

  // Endpoint para Prometheus
  getMetrics(): Promise<string> {
    return register.metrics();
  }
} 