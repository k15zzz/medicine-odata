import {BaseRepository} from "~/repositories/BaseRepository";
import {Position} from "~/models/Position";
import {CRUDRepository} from "~/repositories/CRUDRepository";

export class PositionRepository extends BaseRepository implements CRUDRepository<Position> {
    constructor() {
        super('http://localhost/lab8/odata/standard.odata/');
    }

    async readAll(): Promise<Position[]> {
        const response = await this.get<{ value: Position[] }>('Catalog_Должности?$format=json');
        return response.value;
    }

    async create(patient: Position): Promise<Position> {
        return this.post('Catalog_Должности', patient);
    }

    async update(patient: Position): Promise<Position> {
        return this.path(`Catalog_Должности(guid'${patient.Ref_Key}')`, patient);
    }

    async remove(guid: string): Promise<void> {
        await this.delete(`Catalog_Должности(guid'${guid}')`);
    }
}
