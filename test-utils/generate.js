const faker = require("faker");

function user(overrides = {}) {
  const password = overrides.password || faker.internet.password();
  return {
    email: faker.internet.email(),
    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
    password,
  };
}

module.exports = {
  user,
};
