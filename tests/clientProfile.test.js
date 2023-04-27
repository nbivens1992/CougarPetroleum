const request = require("supertest");
const app = require("../server");

describe("Profile Management Tests", () => {
  /*test("GET /", async () => {
    const res = await request(app).get("/userInfo");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.userCredentials).toBe(2);
    expect(res.body.data.fullName).toBe("Clyde Jackson");
    expect(res.body.data.address1).toBe("1500 Riverdale Rd");
    expect(res.body.data.address2).toBe(undefined);
    expect(res.body.data.city).toBe("Houston");
    expect(res.body.data.state).toBe("TX");
    expect(res.body.data.zipCode).toBe("23456");
  });*/

  test("POST / valid data", async () => {
    const res = await request(app).post("/userInfo").send({
      user_credentials: "64305f34478060c68ee424a6",
      fullname: "John Doe",
      address1: "400 Broadway Ave.",
      address2: "1234 Main St.",
      city: "Houston",
      _state: "TX",
      zipcode: "12345",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("New client created");
  });

  test("POST / empty fields", async () => {
    const res = await request(app).post("/userInfo").send({
      user_credentials: "64305f34478060c68ee424a6",
      fullname: "",
      address1: "",
      address2: undefined,
      city: "",
      _state: "",
      zipcode: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields except for address2 are required");
  });

  test("POST / invalid input", async () => {
    const res = await request(app).post("/userInfo").send({
      user_credentials: "64305f34478060c68ee424a6",
      fullname: "John-Paul Joseph-James Johnson-Miller-Smith-Doverson the Third of Westchester",
      address1: "1234 Main St.",
      address2: "345 Cullen Blvd.",
      city: "Houston",
      _state: "TX",
      zipcode: "12",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid client data received");
  });

  test("POST / duplicate data", async () => {
    const res = await request(app).post("/userInfo").send({
      user_credentials: "64305f34478060c68ee424a6",
      fullname: "John Doe",
      address1: "1234 Main St.",
      address2: "345 Cullen Blvd.",
      city: "Houston",
      _state: "TX",
      zipcode: "12345",
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Client already exists");
  });

  test("PUT / valid data", async () => {
    const res = await request(app).put("/userInfo").send({
      user_credentials: "64305f34478060c68ee424a6",
      fullname: "Clyde Jackson",
      address1: "500 Freedom Ln",
      city: "Houston",
      _state: "TX",
      zipcode: "45678",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe();
  });

  test("PUT / client not found", async () => {
    const res = await request(app).put("/userInfo").send({
      user_credentials: "64305f34478060c68ee422a8",
      fullname: "Bob McDonald",
      address1: "123 Washington Ave.",
      city: "Tampa Bay",
      state: "FL",
      zipcode: "70702",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Client not found");
  });

  test("PUT / empty fields", async () => {
    const res = await request(app).put("/userInfo").send({
      user_credentials: "",
      fullname: "",
      address1: "",
      address2: undefined,
      city: "",
      state: "",
      zipcode: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "At least one field is required"
    );
  });

  /*test("PUT / invalid input", async () => {
    const res = await request(app).put("/userInfo").send({
      user_credentials: "64305f34478060c68ee424a6",
      fullname: "Steve Jackson",
      address1: "500 Freedom Ln",
      address2: undefined,
      city: "Houston",
      state: "TX",
      zipcode: "123",
    });
    expect(res.statusCode).toBe(400);
  });
  test("DELETE /", async () => {
    const res = await request(app).delete("/userInfo");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Profile deleted");
    expect(res.body.data.length).toBe(2);
  });
  test("DELETE / client not found", async () => {
    const res = await request(app).delete("/userInfo");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Client not found");
  });*/
});