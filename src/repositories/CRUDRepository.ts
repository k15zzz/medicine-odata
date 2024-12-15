export interface CRUDRepository<T> {
    readAll(): Promise<T[]>
    create(data: T): Promise<T>
    update(data: T): Promise<T>
    remove(guid: string): Promise<void>
}