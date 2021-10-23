const router = require("express").Router();
const Room = require("./controllers/roomController");
const Question = require("./controllers/questionController");

// ROOM ROUTES
router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

router.get("/room/:id", Room.open);

router.get("/create-room", (req, res) => {
    res.render("create-pass", { title: "Create Room" });
});

router.post("/create-room", Room.create);

// QUESTION ROUTES
router.post("/question/new/:roomId", Question.create);

router.post("/question/:roomId/:questionId/:action", (req, res) => {
    res.send("hello");
});

module.exports = router;
