const request = require("supertest");
const app = require("../server");

describe("GET /fuel-quote-history", () => {
  it("GET/valid history", async () => {
    
    // Create a test FuelQuote object with valid data
    const fuelQuote = new FuelQuote({
      user_credentials: "644725279a5bcc55a314f046",
      gallons_requested: 2500,
      delivery_date: "2023-04-28",
      address1: "22018 Treesdale ln",
      address2: "",
      city: "Katy",
      _state: "TX",
      zipcode: "77450",
      suggested_price: 1.71,
      total_amount_due: 4275,
    });

    // Save the test FuelQuote object to the database
    await fuelQuote.save();

    // Send a GET request to the endpoint
    const res = await request(app).get("/fuel-quote-history");

    // Check that the response status is 200 OK
    expect(res.status).toBe(200);

    // Check that the response message is "Quote history found"
    expect(res.body.message).toBe("Quote history found");

    // Check that the response history array contains the test FuelQuote object
    expect(res.body.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_credentials: "644725279a5bcc55a314f046",
          gallons_requested: 2500,
          delivery_date: "2023-04-28",
          address1: "22018 Treesdale ln",
          address2: "",
          city: "Katy",
          _state: "TX",
          zipcode: "77450",
          suggested_price: 1.71,
          total_amount_due: 4275,
        }),
      ])
    );
  });

  test("GET / no available quotes", async () => {
    const res = await request(app).get("/fuel-quote-history");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("No quotes found");
  });
});