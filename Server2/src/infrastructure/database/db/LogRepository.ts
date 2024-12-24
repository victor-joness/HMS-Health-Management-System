import { Pool } from "pg";

export class LogRepository {
  constructor(private db: Pool) {}

  async saveLog(level: string, message: string, metadata: object = {}): Promise<void> {
    await this.db.query(
      "INSERT INTO system_logs (level, message, metadata) VALUES ($1, $2, $3)",
      [level, message, JSON.stringify(metadata)]
    );
  }
}
