import db from './tursoClient';

//kreiranje tablica SAMO ako nisu već
//https://www.youtube.com/watch?v=GoDERit8mVo
//https://turso.tech/

export async function createTables() {
  await db.batch([
    `CREATE TABLE IF NOT EXISTS favoriteShows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_mail TEXT NOT NULL,
      tvmaze_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      image TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS favoriteActors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_mail TEXT NOT NULL,
      tvmaze_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      image TEXT NOT NULL
    )`
  ]);
}


export async function insertNewShow(tvmaze_id: number, user_mail: string, name: string, image: string) {

  const existing = await db.execute(
    'SELECT * FROM favoriteShows WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );

  if (existing.rows.length > 0) {
    return { inserted: false, message: "already in favorites" };
  }

  await db.execute(
    'INSERT INTO favoriteShows (tvmaze_id, user_mail, name, image) VALUES (?, ?, ?, ?)',
    [tvmaze_id, user_mail, name, image]
  );

  return { inserted: true, message: "added to favorites" };
}


export async function deleteShow(tvmaze_id: number, user_mail: string) {

  const existing = await db.execute(
    'SELECT * FROM favoriteShows WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );

  if (existing.rows.length === 0) {
    return { deleted: false, message: "not found" };
  }

  await db.execute(
    'DELETE FROM favoriteShows WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );

  return { deleted: true, message: "deleted successfully" };
}


export async function getShows(user_mail: string) {
  const result = await db.execute(
    'SELECT * FROM favoriteShows WHERE user_mail = ?',
    [user_mail]
  );
  return result.rows;
}


export async function getShowById(tvmaze_id: number, user_mail: string) {
  const result = await db.execute(
    'SELECT * FROM favoriteShows WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );
  return result.rows[0] || null;
}

export async function getActorById(tvmaze_id: number, user_mail: string) {
  const result = await db.execute(
    'SELECT * FROM favoriteActors WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );
  return result.rows[0] || null;
}

export async function insertNewActor(tvmaze_id: number, user_mail: string, name: string, image: string) {
  const existing = await db.execute(
    'SELECT * FROM favoriteActors WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );

  if (existing.rows.length > 0) {
    return { inserted: false, message: "already in favorites" };
  }

  await db.execute(
    'INSERT INTO favoriteActors (tvmaze_id, user_mail, name, image) VALUES (?, ?, ?, ?)',
    [tvmaze_id, user_mail, name, image]
  );

  return { inserted: true, message: "added to favorites" };
}


export async function getActors(user_mail: string) {
  const result = await db.execute(
    'SELECT * FROM favoriteActors WHERE user_mail = ?',
    [user_mail]
  );
  return result.rows;
}

export async function deleteActor(tvmaze_id: number, user_mail: string) {

  const existing = await db.execute(
    'SELECT * FROM favoriteActors WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );

  if (existing.rows.length === 0) {
    return { deleted: false, message: "not found" };
  }

  await db.execute(
    'DELETE FROM favoriteActors WHERE tvmaze_id = ? AND user_mail = ?',
    [tvmaze_id, user_mail]
  );

  return { deleted: true, message: "deleted successfully" };
}