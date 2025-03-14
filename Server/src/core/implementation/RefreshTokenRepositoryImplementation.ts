import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { db } from "../../infrastructure/database/db";
import { refreshTokensTable } from "../../infrastructure/database/schemas/refreshTokensTable";
import { eq, and, lt } from "drizzle-orm";
import { RefreshToken } from "../entities/RefreshToken";
import { RefreshTokensMapper } from "../../shared/utils/mapper/RefreshTokensMapper";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class RefreshTokenRepositoryImplementation extends BaseRepositoryImplementation<RefreshToken> implements RefreshTokenRepository {
  constructor() {
      super(refreshTokensTable, {
        fromEntityToDB: RefreshTokensMapper.fromRefreshTokenToDB,
        fromDBToEntity: RefreshTokensMapper.fromDBtoRefreshToken,
      });
  
      this.table = refreshTokensTable;
      this.mapper = {
        fromEntityToDB: RefreshTokensMapper.fromRefreshTokenToDB,
        fromDBToEntity: RefreshTokensMapper.fromDBtoRefreshToken,
      };
    }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const result = await db
      .select()
      .from(refreshTokensTable)
      .where(and(eq(refreshTokensTable.Token, token), eq(refreshTokensTable.Revoked, 0)))
      .limit(1);

    return result.length > 0 ? this.mapper.fromDBToEntity(result[0]) : null;
  }

  async save(refreshToken: RefreshToken): Promise<RefreshToken> {
    const completeRefreshToken = {
      ...refreshToken,
      CreatedAt: new Date().toISOString(),
      ExpiresAt: new Date(refreshToken.expiresAt).toISOString(),
    };

    console.log(completeRefreshToken);

    const newRefreshToken = await db
      .insert(refreshTokensTable)
      .values(this.mapper.fromEntityToDB(completeRefreshToken))
      .returning();

    return this.mapper.fromDBToEntity(newRefreshToken);
  }

  async revokeByUserId(userId: number): Promise<void> {
    await db
      .update(refreshTokensTable)
      .set({ Revoked: 1 })
      .where(eq(refreshTokensTable.UserId, userId));
  }

  async deleteExpired(): Promise<void> {
    await db
      .delete(refreshTokensTable)
      .where(lt(refreshTokensTable.ExpiresAt, new Date().toISOString()));
  }
}
