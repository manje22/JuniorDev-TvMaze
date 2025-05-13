
const db = require('better-sqlite3')('database.db')

const createTable = () => {
    const sql = `
        CREATE TABLE favoriteShows(
            id INTEGER,
            name TEXT NOT NULL,
            age INTEGER
        )
    `
    db.prepare(sql).run()
}

const insertTable = (name, age) => {
    const sql = `
        INSERT INTO favoriteShows (name, age)
        VALUES(?,?)
    `
    db.prepare(sql).run(name, age)
}

const getUsers =() =>{
    const sql = `
        SELECT * FROM favoriteShows
    `
    const rows = db.prepare(sql).all()
    console.log(rows);
}

const getUser =(id) =>{
    const sql = `
        SELECT * FROM favoriteShows
        WHERE id = ?
    `
    const rows = db.prepare(sql).all()
    console.log(rows);
}