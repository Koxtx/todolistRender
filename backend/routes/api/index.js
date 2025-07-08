const router = require("express").Router();
const apiTodos = require("./todos");

router.use("/todos", apiTodos);

module.exports = router;
