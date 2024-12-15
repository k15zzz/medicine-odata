import {BaseRepository} from "~/repositories/BaseRepository";
import {Room} from "~/models/Room";
import {CRUDRepository} from "~/repositories/CRUDRepository";
import {Position} from "~/models/Position";

export class RoomRepository extends BaseRepository implements CRUDRepository<Room> {
    constructor() {
        super('http://localhost/lab8/odata/standard.odata/');
    }

    async readAll(): Promise<Room[]> {
        const response = await this.get<{ value: Room[] }>('Catalog_Палаты');
        return response.value;
    }

    async create(patient: Room): Promise<Room> {
        return this.post('Catalog_Палаты', patient);
    }

    async update(patient: Room): Promise<Room> {
        return this.path(`Catalog_Палаты(guid'${patient.Ref_Key}')`, patient);
    }

    async remove(guid: string): Promise<void> {
        await this.delete(`Catalog_Палаты(guid'${guid}')`);
    }
}
