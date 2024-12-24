const request = require("supertest");
const app = require("../server");

describe("API Tests Users", () => {
  let res; // Variável para armazenar a resposta

  // Requisição antes de todos os testes
  beforeAll(async () => {
    res = await request(app).get("/api/users");
  });

  it("O código deve ser 200 para a rota /api/users", () => {
    expect(res.body.code).toBe(200);
  });

  it("A resposta deve ter a estrutura correta", () => {
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("data");
  });

  it("A lista de usuários deve estar vazia ou ser uma lista válida", () => {
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("A mensagem deve ser 'sucess'", () => {
    expect(res.body.message).toBe("sucess");
  });

  test("O status deve ser 'ok'", () => {
    expect(res.body.status).toBe("ok");
  });

  //rota n exite
  it("Deve retornar erro ao buscar usuário com ID inválido", async () => {
    const invalidUserId = "abc"; // Teste com um ID inválido
    const resInvalid = await request(app).get(`/api/users/${invalidUserId}`);
    expect(resInvalid.status).toBe(404); // Ou o status que você espera para dados inválidos
    //expect(resInvalid.body.message).toBe("ID de usuário inválido");
  });

  it("Cada usuário deve ter as propriedades corretas", () => {
    res.body.data.forEach((user) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("role");
      expect(user).toHaveProperty("img");
      expect(user).toHaveProperty("age");
      expect(user).toHaveProperty("phoneNumber");
      expect(user).toHaveProperty("phoneEmergency");
      expect(user).toHaveProperty("creationDate");
      expect(user).toHaveProperty("createdUser");
      expect(user).toHaveProperty("deletionDate");

      // Testar tipos de dados específicos
      expect(typeof user.id).toBe("number");
      expect(typeof user.name).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.password).toBe("string");
      expect(typeof user.role).toBe("number");
      expect(typeof user.img).toBe("string");
      expect(user.age).toBeNull();
      expect(user.phoneNumber).toBeNull();
      expect(user.phoneEmergency).toBeNull();
      expect(typeof user.creationDate).toBe("string");
      expect(typeof user.createdUser).toBe("number");
      expect(user.deletionDate).toBeNull();
    });
  });

  // Teste para rota que não existe (retorno 404)
  it("Pegar um usuário específico pelo ID", async () => {
    const userId = 25;
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.status).toBe(404);
    // expect(res.body).toHaveProperty("id", userId);
  });
});