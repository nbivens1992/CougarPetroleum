const request = require("supertest");
const app = require("../server");
const quote = require("../models/quote");

describe("GET /quotes", () => {
  it("GET/valid history", async () => {
    
    // Create a test FuelQuote object with valid data
    const fuelQuote = new quote({
      user: "644725279a5bcc55a314f046",
      galReq: 2500,
      dDate: "2023-04-28",
      address1: "22018 Treesdale ln",
      address2: "",
      city: "Katy",
      state: "TX",
      zip: "77450",
      sPrice: 1.71,
      amountDue: 4275,
    });

    // Save the test FuelQuote object to the database
    await fuelQuote.save();

    // Send a GET request to the endpoint
    const res = await request(app).get("/quotes");

    // Check that the response status is 200 OK
    expect(res.status).toBe(200);

    // Check that the response message is "Quote history found"
    expect(res.body.message).toBe("Quote history found");

    // Check that the response history array contains the test FuelQuote object
    expect(res.body.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user: "644725279a5bcc55a314f046",
          galReq: 2500,
          dDate: "2023-04-28",
          address1: "22018 Treesdale ln",
          address2: "",
          city: "Katy",
          state: "TX",
          zip: "77450",
          sPrice: 1.71,
          amountDue: 4275,
        }),
      ])
    );
  });

  test("GET / no available quotes", async () => {
    const res = await request(app).get("/quotes");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("No quotes found");
  });
});