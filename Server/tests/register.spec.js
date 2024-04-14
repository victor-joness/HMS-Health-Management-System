const request = require("supertest");
const app = require("../server");

describe("API Tests Register", () => {
  it("Adicionar um novo usuário", async () => {
    const newUser = {
      name: "Novo Usuário",
      email: "novo_usuario@example.com",
      password: "novasenha123",
    };

    //const res = await request(app).post("/api/register").send(newUser);

    //expect(res.status).toBe(201);
    //expect(res.body).toHaveProperty("id");
    //expect(res.body.name).toBe(newUser.name);
    //expect(res.body.email).toBe(newUser.email);
  });
});
