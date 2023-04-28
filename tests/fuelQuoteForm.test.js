const request = require("supertest");
const app = require("../server");


describe("Fuel Quote Form Tests", () => {
  test("post invalid data", async () => {
    const res = await request(app).post("/quotes").send({
      user: "6434369bf92d1cbc8822a694",
      galReq: 2500,
      dDate:"",
      address: "22018 Treesdale Ln, Katy, TX 77494"
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Not all required fields are filled")
  });

  test("create quote", async () => {
    
    const res = await request(app).post("/quotes").send({
      user: "6434369bf92d1cbc8822a694",
      galReq: 2500,
      dDate:"2023-04-21",
      address: "22018 Treesdale Ln, Katy, TX 77494",
      sPrice: "1.71",
      amountDue: "4275" 
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("New quote created");
  });

  test("invalid quote", async () => {
    const res = await request(app).patch("/quotes").send({
      user: "6434369bf92d1cbc8822a694",
      galReq: 2500,
      dDate:"",
      address: "22018 Treesdale Ln, Katy, TX 77494",
      sPrice: "1.71",
      amountDue: "0" 
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid quote data received");
  });
});
