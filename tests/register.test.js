const request = require("supertest");
const app = require("../server");

describe("Registration Tests", () => {
  /*test("GET /", async () => {
    const res = await request(app).get("/register");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toEqual(2);
    expect(res.body.data[0].username).toBe("John");
    expect(res.body.data[0].password).toBe("johnpass");
    expect(res.body.data[1].username).toBe("Clyde");
    expect(res.body.data[1].password).toBe("clydepass");
  });*/

  test("POST / valid data", async () => {
    const res = await request(app).post("/register").send({
      username: "TestUser#3",
      password: "testpassword",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toEqual("New user TestUser created");
  });

  test("POST / empty fields", async () => {
    const res = await request(app).post("/register").send({
      username: "",
      password: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  test("POST / duplicate username", async () => {
    const res = await request(app).post("/register").send({
      username: "MyCoolUsername",
      password: "password",
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Duplicate username");
  });
});