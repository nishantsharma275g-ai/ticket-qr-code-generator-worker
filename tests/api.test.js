const request = require("supertest");
const app = require("../src/app");

describe("Ticket API", () => {
  test("creates a ticket with valid data", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        title: "Printer maintenance",
        description: "Replace the printer cartridge",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.ticket).toBeDefined();
    expect(response.body.ticket.title).toBe("Printer maintenance");
  });

  test("rejects a ticket without a title", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        description: "Replace the printer cartridge",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("rejects an empty title", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        title: "   ",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("sanitizes ticket text before returning it", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        title: "<script>alert('xss')</script>Printer maintenance",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.ticket.title).not.toContain("<script>");
    expect(response.body.ticket.title).toContain("Printer maintenance");
  });
});

describe("QR API", () => {
  test("generates a QR payload for a valid ticket", async () => {
    const createResponse = await request(app)
      .post("/api/tickets")
      .send({
        title: "Printer maintenance",
      });

    const ticketId = createResponse.body.ticket.id;

    const response = await request(app)
      .post(`/api/tickets/${ticketId}/qr`);

    expect(response.statusCode).toBe(201);
    expect(response.body.qr).toBeDefined();
    expect(response.body.qr.payload).toContain(ticketId);
  });

  test("returns 404 for an unknown ticket", async () => {
    const response = await request(app)
      .post("/api/tickets/unknown-ticket/qr");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  test("prevents duplicate QR generation", async () => {
    const createResponse = await request(app)
      .post("/api/tickets")
      .send({
        title: "Network maintenance",
      });

    const ticketId = createResponse.body.ticket.id;

    await request(app)
      .post(`/api/tickets/${ticketId}/qr`);

    const secondResponse = await request(app)
      .post(`/api/tickets/${ticketId}/qr`);

    expect(secondResponse.statusCode).toBe(409);
  });
});