export class BaseEntity {
    constructor(
        public DeletionDate: string | null,
        public ModifiedDate: string | null,
        public CreationDate: string
    ) {
        this.DeletionDate = DeletionDate;
        this.ModifiedDate = ModifiedDate;
        this.CreationDate = CreationDate;
    }
}