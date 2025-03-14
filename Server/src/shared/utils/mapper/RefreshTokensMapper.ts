import { RefreshToken } from "../../../core/entities/RefreshToken";

export class RefreshTokensMapper {
    public static fromRefreshTokenToDB(refreshToken: RefreshToken): RefreshToken {
        return refreshToken;
    }
    
    public static fromDBtoRefreshToken(refreshToken: any): RefreshToken {
        return new RefreshToken(
        refreshToken.id,
        refreshToken.userId,
        refreshToken.token,
        refreshToken.expiresAt,
        refreshToken.revoked,
        refreshToken.createdAt,
        refreshToken.DeletionDate,
        refreshToken.ModifiedDate,
        refreshToken.CreationDate
        );
    }
}