import Queue from 'bull';
import { EmailService } from '../services/EmailService';
import { LoggingService } from '../../core/services/LoggingService';

interface QueueOptions {
  redis: {
    host: string;
    port: number;
    password?: string;
  };
}

export class QueueService {
  private emailQueue: Queue.Queue;
  private notificationQueue: Queue.Queue;
  private readonly emailService: EmailService;
  private readonly loggingService: LoggingService;

  constructor(options: QueueOptions) {
    this.emailQueue = new Queue('email-queue', {
      redis: options.redis,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        }
      }
    });

    this.notificationQueue = new Queue('notification-queue', {
      redis: options.redis
    });

    this.setupQueues();
  }

  private setupQueues(): void {
    // Processador de emails
    this.emailQueue.process(async (job) => {
      try {
        await this.emailService.send(job.data);
      } catch (error) {
        this.loggingService.log('error', 'Erro ao processar email', { error, jobId: job.id });
        throw error;
      }
    });

    // Processador de notificações
    this.notificationQueue.process(async (job) => {
      // Implementar lógica de notificações
    });

    // Tratamento de erros
    this.emailQueue.on('failed', (job, error) => {
      this.loggingService.log('error', 'Job falhou', { jobId: job.id, error });
    });
  }

  async addEmailJob(data: any): Promise<void> {
    await this.emailQueue.add(data, {
      priority: 2,
      attempts: 3
    });
  }

  async addNotificationJob(data: any): Promise<void> {
    await this.notificationQueue.add(data);
  }
} 