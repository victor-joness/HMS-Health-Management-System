import { RefreshToken } from '../entities/RefreshToken';
import { BaseRepository } from './BaseRepository';

export interface RefreshTokenRepository extends BaseRepository<RefreshToken>{
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeByUserId(userId: number): Promise<void>;
  deleteExpired(): Promise<void>;
} 