function validateTicket(ticket) {
  const errors = {};

  if (!ticket || typeof ticket !== "object") {
    return {
      valid: false,
      errors: {
        ticket: "Invalid ticket data.",
      },
    };
  }

  if (typeof ticket.title !== "string" || ticket.title.trim() === "") {
    errors.title = "Title is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateTicket,
};