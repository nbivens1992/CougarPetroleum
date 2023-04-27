const request = require("supertest");
const app = require("../server");


describe("Login Tests", () => {
  test("GET /", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toEqual(2);
    expect(res.body.data[0].username).toBe("nbivens");
    expect(res.body.data[0].password).toBe("123abc");
    expect(res.body.data[1].username).toBe("williamBivens");
    expect(res.body.data[1].password).toBe("123abc");
  });

  test("POST / valid data", async () => {
    const res = await request(app).post("/users").send({
      username: "Clyde",
      password: "clydepass",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toEqual(1);
    expect(res.body.data[0].username).toBe("Clyde");
    expect(res.body.data[0].password).toBe("clydepass");
  });

  test("POST / empty fields", async () => {
    const res = await request(app).post("/users").send({
      username: "",
      password: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  test("POST / user does not exist", async () => {
    const res = await request(app).post("/users").send({
      username: "Steve",
      password: "stevepass",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User does not exist");
  });
});