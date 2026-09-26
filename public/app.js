const form = document.querySelector("#ticket-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const titleError = document.querySelector("#title-error");
const formStatus = document.querySelector("#form-status");
const generateButton = document.querySelector("#generate-button");

const loading = document.querySelector("#loading");
const emptyState = document.querySelector("#empty-state");
const result = document.querySelector("#result");

const qrImage = document.querySelector("#qr-image");
const ticketId = document.querySelector("#ticket-id");
const qrPayload = document.querySelector("#qr-payload");

function sanitizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

function setTitleError(message) {
  titleError.textContent = message;
  titleError.hidden = !message;
  titleInput.setAttribute("aria-invalid", String(Boolean(message)));
}

function setLoading(isLoading) {
  loading.hidden = !isLoading;
  generateButton.disabled = isLoading;

  if (isLoading) {
    emptyState.hidden = true;
    result.hidden = true;
  }
}

function showEmptyState() {
  emptyState.hidden = false;
  result.hidden = true;
}

function showResult(qr) {
  emptyState.hidden = true;
  result.hidden = false;

  qrImage.src = qr.image;
  qrImage.alt = `Generated QR code for ticket ${qr.ticketId}`;
  ticketId.textContent = qr.ticketId;
  qrPayload.textContent = qr.payload;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  setTitleError("");
  formStatus.textContent = "";

  const title = sanitizeText(titleInput.value);
  const description = sanitizeText(descriptionInput.value);

  if (!title) {
    setTitleError("Ticket title is required.");
    titleInput.focus();
    return;
  }

  console.info(
    "[Analytics] User interacted with Ticket QR Code Generator Worker"
  );

  setLoading(true);

  try {
    const createResponse = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const createData = await createResponse.json();

    if (!createResponse.ok) {
      throw new Error(
        createData.error || "Unable to create the ticket."
      );
    }

    const qrResponse = await fetch(
      `/api/tickets/${createData.ticket.id}/qr`,
      {
        method: "POST",
      }
    );

    const qrData = await qrResponse.json();

    if (!qrResponse.ok) {
      throw new Error(
        qrData.error || "Unable to generate the QR code."
      );
    }

    showResult(qrData.qr);

    formStatus.textContent = "Ticket created and QR code generated.";

    form.reset();
  } catch (error) {
    showEmptyState();

    formStatus.textContent =
      error.message ||
      "The service is temporarily unavailable. Please try again.";
  } finally {
    setLoading(false);
  }
});

showEmptyState();