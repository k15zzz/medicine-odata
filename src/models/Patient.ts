export interface Patient {
    Ref_Key: string;            // Уникальный идентификатор
    DataVersion: string;        // Версия данных
    DeletionMark: boolean;      // Признак удаления
    Code: string;               // Код
    Description: string;        // Краткое описание
    "ФИО": string;              // ФИО пациента
    "Возраст": string;          // Возраст пациента
    Predefined: boolean;        // Предопределённый
    PredefinedDataName: string; // Имя предопределённых данных
}