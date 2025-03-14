import { LogRepository } from "../repositories/LogRepository";
import { db } from "../../infrastructure/database/db";
import { systemLogs } from "../../infrastructure/database/schemas/systemLogsTable";

export class LogRepositoryImplementation implements LogRepository {
  async saveLog(level: string, message: string, metadata: object = {}): Promise<void> {
    await db.insert(systemLogs).values({
      level,
      message,
      metadata,
    });
  }
}
