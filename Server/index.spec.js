const request = require("supertest");
const app = require("./server");

describe("API Tests Login", () => {
  // Teste para verificar se a rota de login do user usuário está funcionando corretamente
  it("Caso Não exista o user no banco", async () => {
    const newUser = {
      email: "newuser@example.com",
      password: "123456",
    };

    const res = await request(app).post("/api/login").send(newUser);
    const createdUser = res.body;

    expect(res.status).toBe(404);
    expect(createdUser.msg).toBe("Usuário não registrado!");
  });

  it("Caso Senha errada", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin2",
    };

    const res = await request(app).post("/api/login").send(user);
    const createdUser = res.body;

    expect(res.status).toBe(404);
    expect(createdUser.msg).toBe("Senha incorreta!");
  });

  /* it("Caso Exista user no banco de dados", async () => {
    const newUser = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const res = await request(app).post("/api/login").send(newUser);
    const createdUser = res.body;

    expect(createdUser.msg).toBe("Usuário logado!");
  }); */
});