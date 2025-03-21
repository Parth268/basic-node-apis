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
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

let token;
let testUser = { email: TEST_EMAIL, password: TEST_PASSWORD };

describe("Clean all and Drop database API", function () {
    this.timeout(15000);

    afterEach(async function () {
        await new Promise((resolve) => setTimeout(resolve, 500));
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

            // Store token for further tests
            token = response.data.token;
        } catch (error) {
            expect.fail(`API request failed: ${error.response?.data || error.message}`);
        }
    });

    it("should drop all tables from the database", async function () {
        try {
            if (!token) {
                expect.fail("No valid authentication token");
            }
            let payload = {
                drop_token: "dfgtryujmhnbvcdsertyjhnbfder4567uyjhgfderw4567uyhjmbnvcxdsew34567iyukhjnbvf"
            }

            const response = await axios.post(`${baseURL}/api/v1/database/drop-all`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );


            expect(response.status).to.equal(200);
            expect(response.data.message).to.equal("All collections dropped successfully");
        } catch (error) {
            expect.fail(`API request failed: ${error.response?.data || error.message}`);
        }
    });
});
