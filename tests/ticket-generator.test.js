const { validateTicket } = require("../src/ticketValidator");
const { sanitizeInput } = require("../src/sanitizeInput"); 
const { generateQrPayload } = require("../src/qrGenerator");
const { createQrService } = require("../src/qrService");

describe("Ticket validation", () => {
  test("accepts a valid ticket", () => {
    const ticket = {
      title: "Printer maintenance",
      description: "Replace the printer cartridge",
    };

    const result = validateTicket(ticket);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("rejects a ticket with a missing title", () => {
    const ticket = {
      description: "Replace the printer cartridge",
    };

    const result = validateTicket(ticket);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBeDefined();
  });

  test("rejects a ticket with an empty title", () => {
    const ticket = {
      title: "   ",
      description: "Replace the printer cartridge",
    };

    const result = validateTicket(ticket);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBeDefined();
  });

  test("handles malformed input without crashing", () => {
    expect(() => validateTicket(null)).not.toThrow();
    expect(() => validateTicket(undefined)).not.toThrow();

    const result = validateTicket(null);

    expect(result.valid).toBe(false);
  });
});

describe("Input sanitization", () => {
  test("removes HTML tags from text input", () => {
    const input = "<script>alert('xss')</script>Printer maintenance";

    const result = sanitizeInput(input);

    expect(result).not.toContain("<script>");
    expect(result).not.toContain("</script>");
    expect(result).toContain("Printer maintenance");
  });

  test("sanitizes potentially dangerous HTML attributes", () => {
    const input = '<img src="x" onerror="alert(1)">Ticket';

    const result = sanitizeInput(input);

    expect(result).not.toContain("onerror");
    expect(result).toContain("Ticket");
  });

  test("handles non-string input safely", () => {
    expect(() => sanitizeInput(null)).not.toThrow();
    expect(() => sanitizeInput(undefined)).not.toThrow();
    expect(() => sanitizeInput(123)).not.toThrow();
  });
});

describe("QR generation", () => {
  test("generates a QR payload for a valid ticket", () => {
    const ticket = {
      id: "ticket-001",
      title: "Printer maintenance",
    };

    const result = generateQrPayload(ticket);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toContain("ticket-001");
  });

  test("rejects QR generation when ticket ID is missing", () => {
    const ticket = {
      title: "Printer maintenance",
    };

    expect(() => generateQrPayload(ticket)).toThrow();
  });

  test("rejects QR generation for invalid ticket data", () => {
    expect(() => generateQrPayload(null)).toThrow();
    expect(() => generateQrPayload(undefined)).toThrow();
  });

  test("generates the same payload for the same ticket", () => {
    const ticket = {
      id: "ticket-001",
      title: "Printer maintenance",
    };

    const first = generateQrPayload(ticket);
    const second = generateQrPayload(ticket);

    expect(first).toBe(second);
  });
});

describe("QR submission rules", () => {
  test("allows the first QR submission for a ticket", () => {
    const service = createQrService();

    const result = service.generate({
      id: "ticket-001",
      title: "Printer maintenance",
    });

    expect(result).toBeDefined();
    expect(result.payload).toBe("ticket:ticket-001");
  });

  test("prevents duplicate QR submissions for the same ticket", () => {
    const service = createQrService();

    const ticket = {
      id: "ticket-001",
      title: "Printer maintenance",
    };

    service.generate(ticket);

    expect(() => service.generate(ticket)).toThrow(
      "QR code already generated for this ticket."
    );
  });

  test("allows QR generation for different tickets", () => {
    const service = createQrService();

    const first = service.generate({
      id: "ticket-001",
      title: "Printer maintenance",
    });

    const second = service.generate({
      id: "ticket-002",
      title: "Network issue",
    });

    expect(first.payload).toBe("ticket:ticket-001");
    expect(second.payload).toBe("ticket:ticket-002");
  });
});