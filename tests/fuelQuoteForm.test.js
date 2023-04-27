const request = require("supertest");
const app = require("../server");

describe("Fuel Quote Form Tests", () => {
  test("post invalid data", async () => {
    const res = await request(app).post("/quote").send({
      user_credentials: "6434369bf92d1cbc8822a694",
      gallons_requested: 2500,
      delivery_date:"",
      address1: "22018 Treesdale Ln",
      address2:"",
      city:"Katy",
      _state: "Tx",
      zipcode: "77450",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required")
  });

  test("create quote", async () => {
    const res = await request(app).post("/quote").send({
      user_credentials: "6434369bf92d1cbc8822a694",
      gallons_requested: 2500,
      delivery_date:"2023-04-21",
      address1: "22018 Treesdale Ln",
      address2:"",
      city:"Katy",
      _state: "Tx",
      zipcode: "77450",
      suggested_price: "1.71",
      total_amount_due: "4275" 
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("New quote created");
  });

  test("invalid quote", async () => {
    const res = await request(app).put("/quote").send({
      user_credentials: "6434369bf92d1cbc8822a694",
      gallons_requested: 2500,
      delivery_date:"",
      address1: "22018 Treesdale Ln",
      address2:"",
      city:"Katy",
      _state: "Tx",
      zipcode: "77450",
      suggested_price: "1.71",
      total_amount_due: "0" 
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid quote data received");
  });
});
