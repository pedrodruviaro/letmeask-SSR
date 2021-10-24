const Database = require("../database/config");
const moment = require("moment");
const bcrypt = require("bcrypt");

class Question {
    async create(req, res) {
        const roomId = req.params.roomId;
        const question = req.body.question;
        const createdAt = moment(new Date()).format("YYYY-MM-DD hh:mm");

        try {
            const db = await Database();

            // checking if room exists
            const room = await db.get(
                `SELECT * FROM rooms WHERE id = ${parseInt(roomId)}`
            );
            if (!room) return res.redirect("/");

            // inserting question
            await db.run(
                `INSERT INTO questions (question, createdAt, roomId, read) VALUES ('${question}', '${createdAt}', ${parseInt(
                    roomId
                )}, 0)`
            );

            await db.close();
            return res.redirect(`/room/${roomId}`);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    async action(req, res) {
        // http://localhost:3000/question/640494/8/delete
        const questionId = req.params.questionId;
        const roomId = req.params.roomId;
        const action = req.params.action;
        const roomPassword = String(req.body.password);

        try {
            const db = await Database();

            const room = await db.get(
                `SELECT * FROM rooms WHERE id = ${roomId}`
            );
            if (!room) return res.status(404).json("Room not found");

            const passwordMatch = await bcrypt.compare(
                roomPassword,
                room.password
            );

            if (!passwordMatch) {
                return res.render("incorrect-password", { roomId });
            }

            if (action === "check") {
                await db.run(
                    `UPDATE questions SET read = 1 WHERE id = ${questionId} AND roomId = ${roomId} `
                );
                res.redirect(`/room/${roomId}`);
            } else if (action === "delete") {
                await db.run(
                    `DELETE FROM questions WHERE id = ${questionId} AND roomId = ${roomId};`
                );
                res.redirect(`/room/${roomId}`);
            } else {
                res.status(400).json("Invalid action");
            }

            await db.close();
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = new Question();
