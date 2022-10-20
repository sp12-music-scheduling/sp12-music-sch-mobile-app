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
    practice_type_id: number;
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
            "name"	TEXT NOT NULL,
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

const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
};

export const clearDatabase = async (db: SQLiteDatabase) => {
    const tables = [
        'practice_plan', 
        'practice_type',
    ];
    tables.forEach(table => deleteTable(db, table));
};

export const insertPracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const insertQuery = `
        INSERT INTO "practice_plan" ("name", "duration_days", "code", "practice_type_id") 
        VALUES ("${practice_plan.name}", ${practice_plan.duration_days}, "${practice_plan.code}", ${practice_plan.practice_type_id})
    ;`;
    return db.executeSql(insertQuery);
};

export const getPracticePlans = async (db: SQLiteDatabase): Promise<PracticePlan[]> => {
    const practice_plans: PracticePlan[] = [];
    const results = await db.executeSql(`SELECT * FROM practice_plan;`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            practice_plans.push(result.rows.item(index))
        }
    });
    return practice_plans;
};

export const isPracticePlanCodeAvailable = async (db: SQLiteDatabase, code: string): Promise<boolean> => {
    const practice_plans: PracticePlan[] = [];
    const results = await db.executeSql(`SELECT id FROM practice_plan WHERE code == "${code}" LIMIT 1;`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            practice_plans.push(result.rows.item(index))
        }
    });
    return practice_plans.length == 0;
};

export const insertDefaultPracticeTypes = async (db: SQLiteDatabase) => {
    const insertQuery = `
        INSERT INTO "practice_type" ("name", "sub_type") 
        VALUES 
            ('Fundamental', 'Flow'),
            ('Fundamental', 'Fingers'),
            ('Fundamental', 'Freedom'),
            ('Fundamental', 'Fronts'),
            ('Fundamental', 'Flex'),
            ('Solo', ''),
            ('Etude', '')
    ;`;
    return db.executeSql(insertQuery);
};

// https://blog.logrocket.com/using-sqlite-with-react-native/

export const getPracticeTypes = async (db: SQLiteDatabase): Promise<PracticeType[]> => {
    const practice_types: PracticeType[] = [];
    const results = await db.executeSql(`SELECT * FROM practice_type;`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            practice_types.push(result.rows.item(index))
        }
    });
    return practice_types;
};