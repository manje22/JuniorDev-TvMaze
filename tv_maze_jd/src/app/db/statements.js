
const db = require('better-sqlite3')('database.db')

const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS favoriteShows(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tvmaze_id INTEGER UNIQUE,
            name TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `
    db.prepare(sql).run()
};

createTable();


export const insertNewShow = (tvmaze_id, name, image) => {
    const existing = db.prepare(`SELECT * FROM favoriteShows WHERE tvmaze_id = ?`).get(tvmaze_id);
    if (existing) {
        console.log("Already in favorites");
        return;
    }

    const sql = `
        INSERT OR IGNORE INTO favoriteShows (tvmaze_id, name, image)
        VALUES(?,?,?)
    `
    db.prepare(sql).run(tvmaze_id, name, image)
}

export const deleteShow = (tvmaze_id) => {
  const existing = db
    .prepare(`SELECT * FROM favoriteShows WHERE tvmaze_id = ?`)
    .get(tvmaze_id);
  if (!existing) {
    console.log("Not found");
    return;
  }

  const sql = `
        DELETE FROM favoriteShows WHERE tvmaze_id = ?
    `;
  db.prepare(sql).run(tvmaze_id);
};

export const getShows = () =>{
    const sql = `
        SELECT * FROM favoriteShows
    `
    const rows = db.prepare(sql).all()
    return rows
}

export const getShowbyId = (tvmaze_id) => {
    const sql = `
        SELECT * FROM favoriteShows
        WHERE tvmaze_id = ?
    `
    const rows = db.prepare(sql).get(tvmaze_id)
    return rows
}
