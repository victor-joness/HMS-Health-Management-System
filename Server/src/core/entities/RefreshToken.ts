import { BaseEntity } from "./BaseEntity";

export class RefreshToken extends BaseEntity {

  constructor(
    public id: number,
    public userId: number,
    public token: string,
    public expiresAt: string,
    public revoked: boolean,
    public createdAt : string,
    public DeletionDate: string | null,
    public ModifiedDate: string | null,
    public CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.id = id;
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.revoked = revoked;
    this.createdAt = createdAt;
  }
}
