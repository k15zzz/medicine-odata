import {BaseRepository} from "~/repositories/BaseRepository";
import {Patient} from "~/models/Patient";
import {CRUDRepository} from "~/repositories/CRUDRepository";

export class PatientRepository extends BaseRepository implements CRUDRepository<Patient> {
    constructor() {
        super('http://localhost/lab8/odata/standard.odata/');
    }

    async readAll(): Promise<Patient[]> {
        const response = await this.get<{ value: Patient[] }>('Catalog_Пациенты');
        return response.value;
    }

    async create(patient: Patient): Promise<Patient> {
        return this.post('Catalog_Пациенты', patient);
    }

    async update(patient: Patient): Promise<Patient> {
        return this.path(`Catalog_Пациенты(guid'${patient.Ref_Key}')`, patient);
    }

    async remove(guid: string): Promise<void> {
        await this.delete(`Catalog_Пациенты(guid'${guid}')`);
    }
}
