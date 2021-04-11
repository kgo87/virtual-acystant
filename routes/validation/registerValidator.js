/* eslint-disable no-undef */
const validatorFactory = require("./validatorFactory");

const registerValidator = validatorFactory({
  email: { type: "email" },
  password: { type: "string", empty: false }
});

module.exports = registerValidator;