import { logger } from "../../shared/utils/logger/logger";
import { LogRepository } from "../repositories/LogRepository";

export class LoggingService {
  constructor(private logRepository: LogRepository) {}

  async log(level: string, message: string, metadata: object = {}) {
    logger.log({ level, message, metadata });

    try {
      await this.logRepository.saveLog(level, message, metadata);
    } catch (error) {
      logger.error("Erro ao salvar log no banco de dados", { error });
    }
  }
}
