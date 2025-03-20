require("dotenv").config();
const { describe, it, afterEach } = require("mocha");
const axios = require("axios");
const { faker } = require("@faker-js/faker");

let expect;
(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

const PORT = process.env.PORT;
const ip = process.env.IP;
const BASE_URL = process.env.BASE_URL
const baseURL = `http://${BASE_URL}:${PORT}`;

let token;

describe("Auth Controller API", function () {
  this.timeout(15000);

  afterEach(async function () {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  it("should register a new user", async function () {
    try {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "Password@123",
      };

      const response = await axios.post(`${baseURL}/api/v1/auth/register`, userData);
      expect(response.status).to.equal(201);
      expect(response.data.message).to.equal("User created successfully");
    } catch (error) {
      expect.fail(`API request failed: ${error.response?.data || error.message}`);
    }
  });
});
