const bcrypt = require("bcrypt");
const moment = require("moment");
const Database = require("../database/config");

class Room {
    async create(req, res) {
        const { title, password } = req.body;
        const createdAt = moment().format("YYYY-MM-DD");

        try {
            // hasing password
            const salt = await bcrypt.genSalt(5);
            const hashedPassword = await bcrypt.hash(password, salt);

            const db = await Database();

            let roomId = 0;
            let isRoom = true;

            while (isRoom) {
                for (let i = 0; i < 6; i++) {
                    roomId === 0
                        ? (roomId = String(Math.floor(Math.random() * 10)))
                        : (roomId += String(Math.floor(Math.random() * 10)));
                }

                const roomIds = await db.all(`SELECT id FROM rooms`);
                isRoom = roomIds.some((id) => id === roomId);

                if (!isRoom) {
                    await db.run(
                        `INSERT INTO rooms (id, title, password, createdAt) VALUES (${parseInt(
                            roomId
                        )}, '${title}', '${hashedPassword}', '${createdAt}')`
                    );

                    await db.close();

                    res.redirect(`/room/${roomId}`);
                }
            }
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    async open(req, res) {
        const roomId = req.params.id;

        const db = await Database();

        const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);
        if (!room) return res.redirect("/");

        const questions = await db.all(
            `SELECT * FROM questions WHERE roomId = ${roomId} AND read = 0 ORDER BY id DESC`
        );
        const readedQuestions = await db.all(
            `SELECT * FROM questions WHERE roomId = ${roomId} AND read = 1 ORDER BY id DESC`
        );

        await db.close();

        res.render("room", {
            title: `Room ${roomId}`,
            questions,
            readedQuestions,
            room,
        });
    }
}

module.exports = new Room();
