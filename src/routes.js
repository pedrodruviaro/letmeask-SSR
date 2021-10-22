const router = require("express").Router();
const Room = require("./controllers/roomController");

// Render home page
router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

// render room
router.get("/room/:id", Room.open);

// render create pass
router.get("/create-room", (req, res) => {
    res.render("create-pass", { title: "Create Room" });
});

// Creating a room
router.post("/create-room", Room.create);

module.exports = router;
