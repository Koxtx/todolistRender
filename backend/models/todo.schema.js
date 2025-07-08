const schema = require("mongoose").Schema;

const todoSchema = schema({
  content: String,
  done: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
});

module.exports = todoSchema;
