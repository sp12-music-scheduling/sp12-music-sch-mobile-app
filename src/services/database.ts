/*
 * 
 * The prototype is being developed using SQLite. We
 * will look to migrate to Firebase or comparable
 * service for final deployment.
 * 
 */

import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

/*
    Models       
    ----------------------
*/

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

export type Exercise = {
    id: number;
    name: string;
    descr: string;
    video_link: string;
    start_tempo: number;
    goal_tempo: number;
    tempo_progression: string;
    practice_plan_id: number;
};

/*
    Main       
    ----------------------
    Global Database Function(s)
*/

export const getDBConnection = async () => {
    return openDatabase({ name: 'sp12-music-app.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
    await createPracticeTypeTable(db);
    await createPracticePlanTable(db);
    await createExerciseTable(db);
};

export const clearDatabase = async (db: SQLiteDatabase) => {
    const tables = [
        'exeercise',
        'practice_plan', 
        'practice_type',
    ];
    tables.forEach(table => 
        deleteTable(db, table)
    );
};

const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
};


/*
    TABLE       
    ----------------------
    Practice Type
*/

const createPracticeTypeTable = async (db: SQLiteDatabase) => {
    const table_sql = `
        CREATE TABLE IF NOT EXISTS "practice_type" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "sub_type"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        );`;
    await db.executeSql(table_sql);
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


/*
    TABLE       
    ----------------------
    Practice Plan
*/

const createPracticePlanTable = async (db: SQLiteDatabase) => {
    const table_sql = `
        CREATE TABLE IF NOT EXISTS "practice_plan" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "duration_days"	INTEGER NOT NULL,
            "code"	TEXT NOT NULL UNIQUE,
            "practice_type_id"	INTEGER NOT NULL,
            FOREIGN KEY("practice_type_id") REFERENCES "practice_type"("id"),
            PRIMARY KEY("id")
        );`;
    await db.executeSql(table_sql);
};

export const insertPracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const insertQuery = `
        INSERT INTO "practice_plan" ("name", "duration_days", "code", "practice_type_id") 
        VALUES ("${practice_plan.name}", ${practice_plan.duration_days}, "${practice_plan.code}", ${practice_plan.practice_type_id})
    ;`;
    return db.executeSql(insertQuery);
};

export const updatePracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const replaceQuery = `
        REPLACE INTO "practice_plan" (id, "name", "duration_days", "code", "practice_type_id") 
        VALUES (${practice_plan.id}, "${practice_plan.name}", ${practice_plan.duration_days}, "${practice_plan.code}", ${practice_plan.practice_type_id})
    ;`;
    return db.executeSql(replaceQuery);
};

export const deletePracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const insertQuery = `DELETE FROM practice_plan WHERE id == ${practice_plan.id};`;
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


/*
    TABLE       
    ----------------------
    Exercise
*/

const createExerciseTable = async (db: SQLiteDatabase) => {
    const table_sql = `
    CREATE TABLE IF NOT EXISTS "exercise" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL,
        "descr"	TEXT,
        "video_link"	TEXT,
        "start_tempo"	INTEGER NOT NULL,
        "goal_tempo"	INTEGER NOT NULL,
        "tempo_progression"	TEXT,
        "practice_plan_id"	INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("practice_plan_id") REFERENCES "practice_plan"("id")
    );`;
    await db.executeSql(table_sql);
};

export const getExercises = async (db: SQLiteDatabase, practice_plan: PracticePlan): Promise<Exercise[]> => {
    const exercises: Exercise[] = [];
    const results = await db.executeSql(`SELECT * FROM exercise WHERE practice_plan_id == ${practice_plan.id};`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            exercises.push(result.rows.item(index))
        }
    });
    return exercises;
};

export const insertExerciseRow = async (db: SQLiteDatabase, exercise: Exercise) => {
    const insertQuery = `
        INSERT INTO "exercise" ("name", "descr", "video_link", "start_tempo", "goal_tempo", "tempo_progression", "practice_plan_id") 
        VALUES ("${exercise.name}", "${exercise.descr}", "${exercise.video_link}", ${exercise.start_tempo}, ${exercise.goal_tempo}, "${exercise.tempo_progression}", ${exercise.practice_plan_id})
    ;`;
    return db.executeSql(insertQuery);
};

export const updateExerciseRow = async (db: SQLiteDatabase, exercise: Exercise) => {
    const replaceQuery = `
        REPLACE INTO "exercise" (id, "name", "descr", "video_link", "start_tempo", "goal_tempo", "tempo_progression", "practice_plan_id") 
        VALUES (${exercise.id},"${exercise.name}", "${exercise.descr}", "${exercise.video_link}", ${exercise.start_tempo}, ${exercise.goal_tempo}, "${exercise.tempo_progression}", ${exercise.practice_plan_id})
    ;`;
    return db.executeSql(replaceQuery);
};

export const deleteExerciseRow = async (db: SQLiteDatabase, exercise: Exercise) => {
    const insertQuery = `DELETE FROM exercise WHERE id == ${exercise.id};`;
    return db.executeSql(insertQuery);
};