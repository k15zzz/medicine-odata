import { BaseRepository } from "~/repositories/BaseRepository";
import { Diagnosis } from "~/models/Diagnosis";
import {CRUDRepository} from "~/repositories/CRUDRepository";

export class DiagnosisRepository extends BaseRepository implements CRUDRepository<Diagnosis>{
    constructor() {
        super('http://localhost/lab8/odata/standard.odata/');
    }

    async readAll(): Promise<Diagnosis[]> {
        const response = await this.get<{ value: Diagnosis[] }>('Catalog_Диагнозы');
        return response.value;
    }

    async create(patient: Diagnosis): Promise<Diagnosis> {
        return this.post('Catalog_Диагнозы', patient);
    }

    async update(patient: Diagnosis): Promise<Diagnosis> {
        return this.path(`Catalog_Диагнозы(guid'${patient.Ref_Key}')`, patient);
    }

    async remove(guid: string): Promise<void> {
        await this.delete(`Catalog_Диагнозы(guid'${guid}')`);
    }
}
