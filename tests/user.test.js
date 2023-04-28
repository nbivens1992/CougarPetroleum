const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken');


// Generate a JWT token for the test user
const myToken =  jwt.sign({
    "User": {
        "username": "nbivens",
    }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' });


describe("User Form Tests", () => {
  test("post invalid data", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required")
  });
  test("post invalid data", async () => {
    const res = await request(app).post("/users").send({
      wrongunsername: "890j"
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required")
  });

  test("post invalid data", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required")
  });

  test("create user", async () => {
    const res = await request(app).post("/users").send({
      username: "myTestUser",
      password: "123abc"
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("New user created");
  });

  test("invalid user", async () => {
    const res = await request(app).patch("/users").send({
      username: "myTestUserhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      password: undefined
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });
});