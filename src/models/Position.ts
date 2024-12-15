export interface Position {
    Ref_Key: string;            // Уникальный идентификатор
    DataVersion: string;        // Версия данных
    DeletionMark: boolean;      // Признак удаления
    Code: string;               // Код
    Description: string;        // Краткое описание
    "Название": string;         // Название должности
    Predefined: boolean;        // Предопределённый
    PredefinedDataName: string; // Имя предопределённых данных
}
