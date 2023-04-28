const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken');


// Generate a JWT token for the test user
const myToken =  jwt.sign({
    "UserInfo": {
        "username": "nbivens",
    }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' });


describe("Fuel UserInfo Form Tests", () => {
  test("post invalid data", async () => {
    const res = await request(app).post("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "Steve Jackson",
      address1: "500 Freedom Ln",
      address2: undefined,
      city: undefined,
      state: "TX"
    }).set('Authorization', `Bearer ${myToken}`);;
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required")
  });

  test("create userInfo", async () => {
    const res = await request(app).post("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "Steve Jackson",
      address1: "500 Freedom Ln",
      address2: undefined,
      city: "Houston",
      state: "TX",
      zip: "12345",
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("New user created");
  });

  test("invalid userInfo", async () => {
    const res = await request(app).patch("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "Steve Jackson",
      address1: "500 Freedom Ln",
      address2: undefined,
      city: "Houston",
      state: "TX",
      zip: "123", 
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });
  test("userInfo", async () => {
    const res = await request(app).patch("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "Steve Jackson",
      address1: "500 Freedom Ln",
      address2: undefined,
      city: "Houston",
      state: "TX",
      zip: "777777", 
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });
  test("Incorrect delete userInfo", async () => {
    const res = await request(app).delete("/userInfos").send({
      id: '644bf650a3293d779f88df08'
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User not found");
  });
  test("delete userInfo", async () => {
    const res = await request(app).delete("/userInfos").send({
      _id: '644bf6c26a4708c25d79fee6'
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User not found");
  });
});
