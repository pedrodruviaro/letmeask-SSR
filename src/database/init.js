const Database = require("./config");

async function initDb() {
    const db = await Database();

    // rooms table
    await db.run(
        "CREATE TABLE rooms (id INTEGER PRIMARY KEY, title TEXT NOT NULL, createdAt TEXT NOT NULL, password TEXT NOT NULL)"
    );

    //questions table
    await db.run(
        "CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT NOT NULL, createdAt TEXT NOT NULL, roomId INTEGER NOT NULL, read INTEGER NOT NULL)"
    );

    await db.close();
}

initDb();
