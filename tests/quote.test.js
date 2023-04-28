const request = require("supertest");
const app = require("../server");


describe("Fuel Quote Form Tests", () => {
  test("get  data", async () => {
    const res = await request(app).get("/quotes")
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Not all required fields are filled")
  });
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
      user: "6434369bf92d1cbc8822a699",
      galReq: 2500,
      dDate:"08/08/2025",
      address: "22018 Treesdale Ln, Katy, TX 77494",
      sPrice: "1.71",
      amountDue: "3800" 
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
    expect(res.body.message).toBe("All fields are required");
  });
  test("Update quote", async () => {
    const res = await request(app).patch("/quotes").send({
      user: "6434369bf92d1cbc8822a694",
      galReq: 2500,
      dDate:"",
      address: "22018 Treesdale Ln, Katy, TX 77494",
      sPrice: "1.71",
      amountDue: "0"  
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });
  test("Incorrect delete quote", async () => {
    const res = await request(app).delete("/quotes").send({
      id: '644bf650a3293d779f88df08'
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User not found");
  });
  test("delete quote", async () => {
    const res = await request(app).delete("/quotes").send({
      _id: '644bf6c26a4708c25d79fee6'
    }).set('Authorization', `Bearer ${myToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User not found");
  });
  
});
