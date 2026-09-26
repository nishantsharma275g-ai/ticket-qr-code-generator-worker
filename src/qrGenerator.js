const QRCode = require("qrcode");

function generateQrPayload(ticket) {
  if (!ticket || typeof ticket !== "object") {
    throw new Error("Invalid ticket data.");
  }

  if (typeof ticket.id !== "string" || ticket.id.trim() === "") {
    throw new Error("Ticket ID is required.");
  }

  return `ticket:${ticket.id}`;
}

async function generateQrImage(payload) {
  if (typeof payload !== "string" || payload.trim() === "") {
    throw new Error("QR payload is required.");
  }

  return QRCode.toDataURL(payload);
}

module.exports = {
  generateQrPayload,
  generateQrImage,
};