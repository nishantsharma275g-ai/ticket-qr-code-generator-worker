const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ticket QR Code Generator running on port ${PORT}`);
});