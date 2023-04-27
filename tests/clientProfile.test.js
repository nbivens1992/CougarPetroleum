const request = require("supertest");
const app = require("../server");

let server;

beforeAll(() => {
  server = app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
});

afterAll(() => {
  server.close();
});

describe("Profile Management Tests", () => {
  /*test("GET /", async () => {
    const res = await request(app).get("/userInfos");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.userCredentials).toBe(2);
    expect(res.body.data.fullName).toBe("Clyde Jackson");
    expect(res.body.data.address1).toBe("1500 Riverdale Rd");
    expect(res.body.data.address2).toBe(undefined);
    expect(res.body.data.city).toBe("Houston");
    expect(res.body.data.state).toBe("TX");
    expect(res.body.data.zip).toBe("23456");
  });*/

  test("POST / valid data", async () => {
    const res = await request(app).post("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "John Doe",
      address1: "400 Broadway Ave.",
      address2: "1234 Main St.",
      city: "Houston",
      state: "TX",
      zip: "12345",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("New client created");
  });

  test("POST / empty fields", async () => {
    const res = await request(app).post("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "",
      address1: "",
      address2: undefined,
      city: "",
      state: "",
      zip: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields except for address2 are required");
  });

  test("POST / invalid inpatch", async () => {
    const res = await request(app).post("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "John-Paul Joseph-James Johnson-Miller-Smith-Doverson the Third of Westchester",
      address1: "1234 Main St.",
      address2: "345 Cullen Blvd.",
      city: "Houston",
      state: "TX",
      zip: "12",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid client data received");
  });

  test("POST / duplicate data", async () => {
    const res = await request(app).post("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "John Doe",
      address1: "1234 Main St.",
      address2: "345 Cullen Blvd.",
      city: "Houston",
      state: "TX",
      zip: "12345",
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Client already exists");
  });

  test("PATCH / valid data", async () => {
    const res = await request(app).patch("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "Clyde Jackson",
      address1: "500 Freedom Ln",
      city: "Houston",
      state: "TX",
      zip: "45678",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe();
  });

  test("PATCH / client not found", async () => {
    const res = await request(app).patch("/userInfos").send({
      user: "64305f34478060c68ee422a8",
      fullName: "Bob McDonald",
      address1: "123 Washington Ave.",
      city: "Tampa Bay",
      state: "FL",
      zip: "70702",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Client not found");
  });

  test("PATCH / empty fields", async () => {
    const res = await request(app).patch("/userInfos").send({
      user: "",
      fullName: "",
      address1: "",
      address2: undefined,
      city: "",
      state: "",
      zip: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "At least one field is required"
    );
  });

  /*test("PATCH / invalid inpatch", async () => {
    const res = await request(app).patch("/userInfos").send({
      user: "6449e10cea53e49b879fa395",
      fullName: "Steve Jackson",
      address1: "500 Freedom Ln",
      address2: undefined,
      city: "Houston",
      state: "TX",
      zip: "123",
    });
    expect(res.statusCode).toBe(400);
  });
  test("DELETE /", async () => {
    const res = await request(app).delete("/userInfos");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Profile deleted");
    expect(res.body.data.length).toBe(2);
  });
  test("DELETE / client not found", async () => {
    const res = await request(app).delete("/userInfos");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Client not found");
  });*/
});