const { generateQrPayload } = require("./qrGenerator");

function createQrService() {
  const generatedTickets = new Set();

  return {
    generate(ticket) {
      if (generatedTickets.has(ticket?.id)) {
        throw new Error("QR code already generated for this ticket.");
      }

      const payload = generateQrPayload(ticket);

      generatedTickets.add(ticket.id);

      return {
        payload,
      };
    },
  };
}

module.exports = {
  createQrService,
};