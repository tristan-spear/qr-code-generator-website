import express from "express";
import QRCode from "qrcode";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/link-submit", async (req, res) => {
  const link = req.body.link;

  try {
    const qrDataUrl = await QRCode.toDataURL(link, {
      color: {
        dark: "#000000",
        light: "#ffffffff",
      },
    });
    res.render("qr", { qrlink: link, qrDataUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating QR code.");
  }
});

export default app;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });


