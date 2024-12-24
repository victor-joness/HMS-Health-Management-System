const request = require("supertest");
const app = require("../server");

describe("API Tests Register", () => {
  it("Tentar adicionar um usuário com email já cadastrado", async () => {
    const newUser = {
      name: "Luana Valente",
      email: "Soraia_Lopes@example.org",
      password: "ObY8KLcUQsj0Cua",
      Img: "https://loremflickr.com/400/400?lock=2711734429098668"
    };

    const res = await request(app).post("/api/register").send(newUser);

    expect(res.status).toBe(500);
    expect(res.body.code).toBe(500);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Email já cadastrado");
    expect(res.body.data).toBeNull();
  });
  
  it("Registrar um novo usuário", async () => {
    const newUser = {
      name: "Luana Valente",
      email: `Soraia_Lopes_${Date.now()}@example.org`, // Email único
      password: "ObY8KLcUQsj0Cua",
      Img: "https://loremflickr.com/400/400?lock=2711734429098668"
    };

    const res = await request(app).post("/api/register").send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.code).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data.user).toHaveProperty("id");
    expect(res.body.data.user.name).toBe(newUser.name);
    expect(res.body.data.user.email).toBe(newUser.email);
    expect(res.body.data.token).not.toBeNull();
  });
});