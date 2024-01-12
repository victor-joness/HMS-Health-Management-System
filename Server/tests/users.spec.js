const request = require('supertest');
const app = require("../server");

describe("API Tests Users", () => {
  it("Get all users", async () => {
    const res = await request(app).get("/api/users");

    let usersBoolean = false;

    if (res.body.length > 0) {
      usersBoolean = true;
    }

    expect(res.status).toBe(200);
    expect(usersBoolean).toBe(true);

    /*
    expect(usersBoolean).toEqual(true);
    expect(usersBoolean).toHaveProperty(true);
    */
  });
});
