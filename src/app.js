const express = require("express");
const path = require("path");

const { validateTicket } = require("./ticketValidator");
const { sanitizeInput } = require("./sanitizeInput");
const {
  generateQrImage,
} = require("./qrGenerator");
const { createQrService } = require("./qrService");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const tickets = new Map();
const qrService = createQrService();

app.post("/api/tickets", (req, res) => {
  const validation = validateTicket(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Invalid ticket data.",
      fields: validation.errors,
    });
  }

  const id = `ticket-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const ticket = {
    id,
    title: sanitizeInput(req.body.title),
    description: sanitizeInput(req.body.description || ""),
  };

  tickets.set(id, ticket);

  return res.status(201).json({ ticket });
});

app.post("/api/tickets/:id/qr", async (req, res) => {
  const ticket = tickets.get(req.params.id);

  if (!ticket) {
    return res.status(404).json({
      error: "Ticket not found.",
    });
  }

  try {
    const result = qrService.generate(ticket);
    const image = await generateQrImage(result.payload);

    return res.status(201).json({
      qr: {
        ticketId: ticket.id,
        payload: result.payload,
        image,
      },
    });
  } catch (error) {
    if (error.message === "QR code already generated for this ticket.") {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Unable to generate QR code.",
    });
  }
});

app.get("/api/tickets", (req, res) => {
  const ticketList = Array.from(tickets.values());

  return res.status(200).json({
    tickets: ticketList,
    message: ticketList.length === 0 ? "No data found" : undefined,
  });
});

app.use((error, req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    return res.status(400).json({
      error: "Invalid JSON request.",
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Something went wrong. Please try again.",
  });
});

module.exports = app;