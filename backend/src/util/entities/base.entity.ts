export class BaseEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    organization_id: number
}