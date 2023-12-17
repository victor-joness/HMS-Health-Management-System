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

    expect(res.status).toBe(200);
    expect(createdUser.msg).toBe("Usuário não registrado!");
  });

  it("Caso Senha errada", async () => {
    const newUser = {
      email: "victor@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/login").send(newUser);
    const createdUser = res.body;

    expect(res.status).toBe(200);
    expect(createdUser.msg).toBe("Senha incorreta!");
  });

  it("Caso Exista user no banco de dados", async () => {
    const newUser = {
      email: "victor@gmail.com",
      password: "victor",
    };

    const res = await request(app).post("/api/login").send(newUser);
    const createdUser = res.body;

    expect(res.status).toBe(200);
    expect(createdUser.msg).toBe("Usuário logado!");
  });
});

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

describe("API Tests Registro", () => {});
