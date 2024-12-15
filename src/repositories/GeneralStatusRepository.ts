import { BaseRepository } from "~/repositories/BaseRepository";
import { GeneralStatus } from "~/models/GeneralStatus";
import {CRUDRepository} from "~/repositories/CRUDRepository";

export class GeneralStatusRepository extends BaseRepository implements CRUDRepository<GeneralStatus>{
    constructor() {
        super('http://localhost/lab8/odata/standard.odata/');
    }

    async readAll(): Promise<GeneralStatus[]> {
        const response = await this.get<{ value: GeneralStatus[] }>('Catalog_ОбщийСтатус');
        return response.value;
    }

    async create(patient: GeneralStatus): Promise<GeneralStatus> {
        return this.post('Catalog_ОбщийСтатус', patient);
    }

    async update(patient: GeneralStatus): Promise<GeneralStatus> {
        return this.path(`Catalog_ОбщийСтатус(guid'${patient.Ref_Key}')`, patient);
    }

    async remove(guid: string): Promise<void> {
        await this.delete(`Catalog_ОбщийСтатус(guid'${guid}')`);
    }
}
