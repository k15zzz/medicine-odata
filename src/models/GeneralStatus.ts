export interface GeneralStatus {
    Ref_Key: string;            // Уникальный идентификатор
    DataVersion: string;        // Версия данных
    DeletionMark: boolean;      // Признак удаления
    Code: string;               // Код
    Description: string;        // Краткое описание
    "Статус": string;           // Статус
    Predefined: boolean;        // Предопределённый
    PredefinedDataName: string; // Имя предопределённых данных
}
