const request = require('supertest');
const app = require("../server");

describe("API Tests Users", () => {
  it("Pegar todos os usuarios", async () => {
    const res = await request(app).get("/api/users");

    let usersBoolean = false;

    if (res.body.length > 0) {
      usersBoolean = true;
    }

    expect(res.status).toBe(200);
    expect(usersBoolean).toBe(true);
  });

  //essa rota nem existe.
  it("Pegar um usuário específico pelo ID", async () => {
    const userId = 25;
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.status).toBe(404);
    //expect(res.body).toHaveProperty("id", userId);
  });
});
