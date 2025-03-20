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
const BASE_URL = process.env.BASE_URL;
const baseURL = `http://${BASE_URL}:${PORT}`;

let token;
let testUser = { email: "", password: "" };

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

      // Store test user credentials for login
      testUser.email = userData.email;
      testUser.password = userData.password;
    } catch (error) {
      expect.fail(`API request failed: ${error.response?.data || error.message}`);
    }
  });

  it("should log in an existing user", async function () {
    try {
      if (!testUser.email || !testUser.password) {
        expect.fail("No test user registered for login test");
      }


      const response = await axios.post(`${baseURL}/api/v1/auth/login`, {
        email: testUser.email,
        password: testUser.password,
      });


      expect(response.status).to.equal(200);
      expect(response.data.message).to.equal("Login successful");
      expect(response.data).to.have.property("token");

      // Store token for further tests if needed
      token = response.data.token;
    } catch (error) {
      expect.fail(`API request failed: ${error.response?.data || error.message}`);
    }
  });
});
