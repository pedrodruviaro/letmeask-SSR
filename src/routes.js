const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

router.get("/room", (req, res) => {
    res.render("room", { title: "Home" });
});

router.get("/create", (req, res) => {
    res.render("create-pass", { title: "Home" });
});

module.exports = router;
