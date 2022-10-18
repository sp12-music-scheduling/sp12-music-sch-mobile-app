// TEMPORARY
// USING AS REFERENCE TO LEARN

import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

//
// MODELS
//

export type PracticeType = {
    id: number;
    name: string;
    sub_type: string;
};

export type PracticePlan = {
    id: number;
    name: string;
    duration_days: number;
    code: string;
    practice_type: PracticeType;
};

//
// Functions
//

export const getDBConnection = async () => {
    return openDatabase({ name: 'sp12-music-app.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
    const create_practice_type_table = `
        CREATE TABLE IF NOT EXISTS "practice_type" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL UNIQUE,
            "sub_type"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        );`;
    await db.executeSql(create_practice_type_table);
    const create_practice_plan_table = `
        CREATE TABLE IF NOT EXISTS "practice_plan" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "duration_days"	INTEGER NOT NULL,
            "code"	TEXT NOT NULL UNIQUE,
            "practice_type_id"	INTEGER NOT NULL,
            FOREIGN KEY("practice_type_id") REFERENCES "practice_type"("id"),
            PRIMARY KEY("id")
        );`;
    await db.executeSql(create_practice_plan_table);
};
