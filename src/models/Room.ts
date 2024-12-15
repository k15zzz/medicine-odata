export interface Room {
    Ref_Key: string;            // Уникальный идентификатор
    DataVersion: string;        // Версия данных
    DeletionMark: boolean;      // Признак удаления
    Code: string;               // Код
    Description: string;        // Краткое описание
    "Описание": string;         // Описание палаты
    Predefined: boolean;        // Предопределённый
    PredefinedDataName: string; // Имя предопределённых данных
}
