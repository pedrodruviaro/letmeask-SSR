const Database = require("../database/config");
const moment = require("moment");

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
}

module.exports = new Question();
