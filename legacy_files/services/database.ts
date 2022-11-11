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
    user_uid: string;
};

export type PracticePlan = {
    id: number;
    name: string;
    duration_days: number;
    code: string;
    practice_type_id: number;
    user_uid: string;
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

export type ExerciseEnrollment = {
    id: number;
    exercise_id: number;
    user_uid: string;
};

export type PracticePlanEnrollment = {
    id: number;
    practice_plan_id: number;
    user_uid: string;
};

// export type UserAttributes = {
//     id: number;
//     display_name: string,
//     user_uid: string;
//     email: string;
// };

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
    await createPracticePlanEnrollmentTable(db);
    await createExerciseEnrollmentTable(db);
    // await createUserAttributesTable(db);
};

export const clearDatabase = async (db: SQLiteDatabase) => {
    const tables = [
        'exercise_enrollment',
        'practice_plan_enrollment',
        'exercise',
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
            "user_uid" TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        );`;
    await db.executeSql(table_sql);
};

export const insertPracticeTypeRow = async (db: SQLiteDatabase, practice_type: PracticeType) => {
    const insertQuery = `
        INSERT INTO "practice_type" ("name", "sub_type", "user_uid") 
        VALUES ("${practice_type.name}", "${practice_type.sub_type}", "${practice_type.user_uid}")
    ;`;
    return db.executeSql(insertQuery);
};

export const updatePracticeTypeRow = async (db: SQLiteDatabase, practice_type: PracticeType) => {
    const replaceQuery = `
        REPLACE INTO "practice_type" (id, "name", "sub_type", "user_uid") 
        VALUES (${practice_type.id}, "${practice_type.name}", "${practice_type.sub_type}", "${practice_type.user_uid}")
    ;`;
    return db.executeSql(replaceQuery);
};

export const deletePracticeTypeRow = async (db: SQLiteDatabase, practice_type: PracticeType) => {
    const insertQuery = `DELETE FROM practice_type WHERE id == ${practice_type.id};`;
    return db.executeSql(insertQuery);
};

export const insertDefaultPracticeTypes = async (db: SQLiteDatabase, user_uid: string) => {
    const insertQuery = `
        INSERT INTO "practice_type" ("name", "sub_type", "user_uid") 
        VALUES 
            ('Fundamental', 'Flow', '${user_uid}'),
            ('Fundamental', 'Fingers', '${user_uid}'),
            ('Fundamental', 'Freedom', '${user_uid}'),
            ('Fundamental', 'Fronts', '${user_uid}'),
            ('Fundamental', 'Flex', '${user_uid}'),
            ('Solo', '', '${user_uid}'),
            ('Etude', '', '${user_uid}')
    ;`;
    return db.executeSql(insertQuery);
};

export const getPracticeTypesByUser = async (db: SQLiteDatabase, user_uid: string): Promise<PracticeType[]> => {
    const practice_types: PracticeType[] = [];
    const results = await db.executeSql(`SELECT * FROM practice_type WHERE user_uid == "${user_uid}";`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            practice_types.push(result.rows.item(index))
        }
    });
    return practice_types;
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
            "user_uid"	TEXT NOT NULL,
            FOREIGN KEY("practice_type_id") REFERENCES "practice_type"("id"),
            PRIMARY KEY("id")
        );`;
    await db.executeSql(table_sql);
};

export const insertPracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const insertQuery = `
        INSERT INTO "practice_plan" ("name", "duration_days", "code", "practice_type_id", "user_uid") 
        VALUES ("${practice_plan.name}", ${practice_plan.duration_days}, "${practice_plan.code}", ${practice_plan.practice_type_id}, "${practice_plan.user_uid}")
    ;`;
    return db.executeSql(insertQuery);
};

export const updatePracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const replaceQuery = `
        REPLACE INTO "practice_plan" (id, "name", "duration_days", "code", "practice_type_id", "user_uid") 
        VALUES (${practice_plan.id}, "${practice_plan.name}", ${practice_plan.duration_days}, "${practice_plan.code}", ${practice_plan.practice_type_id}, "${practice_plan.user_uid}")
    ;`;
    return db.executeSql(replaceQuery);
};

export const deletePracticePlanRow = async (db: SQLiteDatabase, practice_plan: PracticePlan) => {
    const insertQuery = `DELETE FROM practice_plan WHERE id == ${practice_plan.id};`;
    return db.executeSql(insertQuery);
};

export const getPracticePlansByUser = async (db: SQLiteDatabase, user_uid: string): Promise<PracticePlan[]> => {
    const practice_plans: PracticePlan[] = [];
    const results = await db.executeSql(`SELECT * FROM practice_plan WHERE user_uid == "${user_uid}";`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            practice_plans.push(result.rows.item(index))
        }
    });
    return practice_plans;
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

export const getPracticePlanByCode = async (db: SQLiteDatabase, code: string): Promise<PracticePlan[]> => {
    const practice_plans: PracticePlan[] = [];
    const results = await db.executeSql(`SELECT * FROM practice_plan WHERE code == "${code}" LIMIT 1;`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            practice_plans.push(result.rows.item(index))
        }
    });
    return practice_plans;
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

export const getExercises = async (db: SQLiteDatabase): Promise<Exercise[]> => {
    const exercises: Exercise[] = [];
    const results = await db.executeSql(`SELECT * FROM exercise;`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            exercises.push(result.rows.item(index))
        }
    });
    return exercises;
};

export const getExercisesByPracticePlan = async (db: SQLiteDatabase, practice_plan: PracticePlan): Promise<Exercise[]> => {
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

/*
    TABLE       
    ----------------------
    Exercise Enrollment
*/

const createExerciseEnrollmentTable = async (db: SQLiteDatabase) => {
    const table_sql = `
    CREATE TABLE IF NOT EXISTS "exercise_enrollment" (
        "id"	INTEGER NOT NULL UNIQUE,
        "exercise_id"	INTEGER NOT NULL,
        "user_uid"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("exercise_id") REFERENCES "exercise"("id")
    );`;
    await db.executeSql(table_sql);
};

export const insertExerciseEnrollment = async (db: SQLiteDatabase, exercise_enrollment: ExerciseEnrollment) => {
    const insertQuery = `
        INSERT INTO "exercise_enrollment" ("exercise_id", "user_uid") 
        VALUES ("${exercise_enrollment.exercise_id}", "${exercise_enrollment.user_uid}");`;
    return db.executeSql(insertQuery);
};

export const deleteExerciseEnrollment = async (db: SQLiteDatabase, exercise_enrollment: ExerciseEnrollment) => {
    const deleteQuery = `DELETE FROM exercise_enrollment WHERE id == ${exercise_enrollment.id};`;
    return db.executeSql(deleteQuery);
};

export const getExerciseEnrollment = async (db: SQLiteDatabase): Promise<ExerciseEnrollment[]> => {
    const ee: ExerciseEnrollment[] = [];
    const results = await db.executeSql(`SELECT * FROM exercise_enrollment;`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            ee.push(result.rows.item(index))
        }
    });
    return ee;
};

export const getExerciseEnrollmentByExercise = async (db: SQLiteDatabase, exercise: Exercise): Promise<ExerciseEnrollment[]> => {
    const ee: ExerciseEnrollment[] = [];
    const results = await db.executeSql(`SELECT * FROM exercise_enrollment WHERE exercise_id == ${exercise.id};`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            ee.push(result.rows.item(index))
        }
    });
    return ee;
};

export const getExerciseEnrollmentByUser = async (db: SQLiteDatabase, user_uid: string): Promise<ExerciseEnrollment[]> => {
    const ee: ExerciseEnrollment[] = [];
    const results = await db.executeSql(`SELECT * FROM exercise_enrollment WHERE user_uid == "${user_uid}";`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            ee.push(result.rows.item(index))
        }
    });
    return ee;
};

/*
    TABLE       
    ----------------------
    Practice Plan Enrollment
*/

const createPracticePlanEnrollmentTable = async (db: SQLiteDatabase) => {
    const table_sql = `
    CREATE TABLE IF NOT EXISTS "practice_plan_enrollment" (
        "id"	INTEGER NOT NULL UNIQUE,
        "practice_plan_id"	INTEGER NOT NULL,
        "user_uid"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("practice_plan_id") REFERENCES "practice_plan"("id")
    );`;
    await db.executeSql(table_sql);
};

export const insertPracticePlanEnrollment = async (db: SQLiteDatabase, practice_plan_enrollment: PracticePlanEnrollment) => {
    const insertQuery = `
        INSERT INTO "practice_plan_enrollment" ("practice_plan_id", "user_uid") 
        VALUES ("${practice_plan_enrollment.practice_plan_id}", "${practice_plan_enrollment.user_uid}");`;
    return db.executeSql(insertQuery);
};

export const deletePracticePlanEnrollment = async (db: SQLiteDatabase, practice_plan_enrollment: PracticePlanEnrollment) => {
    const deleteQuery = `DELETE FROM practice_plan_enrollment WHERE id == ${practice_plan_enrollment.id};`;
    return db.executeSql(deleteQuery);
};

export const getPracticePlanEnrollmentByUser = async (db: SQLiteDatabase, user_uid: string): Promise<PracticePlanEnrollment[]> => {
    const ee: PracticePlanEnrollment[] = [];
    const results = await db.executeSql(`SELECT * FROM practice_plan_enrollment WHERE user_uid == "${user_uid}";`);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            ee.push(result.rows.item(index))
        }
    });
    return ee;
};

/*
    TABLE       
    ----------------------
    User Attributes
*/
// !!! MOVING TO FIRESTORE

// const createUserAttributesTable = async (db: SQLiteDatabase) => {
//     const table_sql = `
//     CREATE TABLE IF NOT EXISTS "user_attribute" (
//         "id"	INTEGER NOT NULL UNIQUE,
//         "display_name"	TEXT NOT NULL,
//         "user_uid"	TEXT NOT NULL,
//         "email"	TEXT NOT NULL,
//         PRIMARY KEY("id" AUTOINCREMENT)
//     );`;
//     await db.executeSql(table_sql);
// };

// export const insertUserAttributes = async (db: SQLiteDatabase, user_attribute: UserAttributes) => {
//     const insertQuery = `
//         INSERT INTO "user_attribute" ("display_name", "user_uid", "email") 
//         VALUES ("${user_attribute.display_name}", "${user_attribute.user_uid}", "${user_attribute.email}");`;
//     return db.executeSql(insertQuery);
// };

// export const updateUserAttributes = async (db: SQLiteDatabase, user_attribute: UserAttributes) => {
//     const replaceQuery = `
//         REPLACE INTO "user_attribute" ("display_name", "user_uid", "email") 
//         VALUES ("${user_attribute.display_name}", "${user_attribute.user_uid}", "${user_attribute.email}");`;
//     return db.executeSql(replaceQuery);
// };

// export const getUserAttributesByUID = async (db: SQLiteDatabase, user_uid: string): Promise<UserAttributes> => {
//     const ee: UserAttributes[] = [];
//     const results = await db.executeSql(`SELECT * FROM user_attribute WHERE user_uid == "${user_uid}" LIMIT 1;`);
//     results.forEach(result => {
//         for (let index = 0; index < result.rows.length; index++) {
//             ee.push(result.rows.item(index))
//         }
//     });
//     return ee[0];
// };
