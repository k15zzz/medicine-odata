export interface Diagnosis {
    Ref_Key: string;            // Уникальный идентификатор
    DataVersion: string;        // Версия данных
    DeletionMark: boolean;      // Признак удаления
    Code: string;               // Код
    Description: string;        // Краткое описание
    "Название": string;         // Название диагноза
    "КодМКБ": string;           // Код МКБ
    Predefined: boolean;        // Предопределённый
    PredefinedDataName: string; // Имя предопределённых данных
}
