
export interface LogRepository {
    saveLog(level: string, message: string, metadata: object): Promise<void>
}