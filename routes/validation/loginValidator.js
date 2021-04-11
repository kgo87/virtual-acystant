/* eslint-disable no-undef */
const validatorFactory = require("./validatorFactory");

const loginValidator = validatorFactory({
  email: { type: "email" },
  password: { type: "string", empty: false }
});

module.exports = loginValidator;