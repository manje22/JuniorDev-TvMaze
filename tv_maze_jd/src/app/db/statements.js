
const db = require('better-sqlite3')('database.db')

const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS favoriteShows(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_mail TEXT NOT NULL,
            tvmaze_id INTEGER UNIQUE,
            name TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `
    db.prepare(sql).run()
};

createTable();


export const insertNewShow = (tvmaze_id, user_mail, name, image) => {
    const existing = db.prepare(`SELECT * FROM favoriteShows WHERE tvmaze_id = ? AND user_mail = ?`).get(tvmaze_id, user_mail);
    if (existing) {
        console.log("Already in favorites");
        return {inserted: false, message: "already in favs"};
    }

    const sql = `
        INSERT OR IGNORE INTO favoriteShows (tvmaze_id, user_mail, name, image)
        VALUES(?,?,?,?)
    `
    db.prepare(sql).run(tvmaze_id, user_mail, name, image);
    return {inserted: true, message: "added to favs"};
}

export const deleteShow = (tvmaze_id, user_mail) => {
  const existing = db
    .prepare(`SELECT * FROM favoriteShows WHERE tvmaze_id = ? AND user_mail = ?`)
    .get(tvmaze_id, user_mail);
  if (!existing) {
    console.log("Not found");
    return;
  }

  const sql = `
        DELETE FROM favoriteShows WHERE id = ?
    `;
  db.prepare(sql).run(existing.id);
};

export const getShows = (user_mail) =>{
    const sql = `
        SELECT * FROM favoriteShows WHERE user_mail = ?
    `
    const rows = db.prepare(sql).all(user_mail)
    return rows
}

export const getShowbyId = (tvmaze_id, user_mail) => {
    const sql = `
        SELECT * FROM favoriteShows
        WHERE tvmaze_id = ? AND user_mail = ?
    `
    const rows = db.prepare(sql).get(tvmaze_id, user_mail)
    console.log("rows: ", rows);
    return rows
}
