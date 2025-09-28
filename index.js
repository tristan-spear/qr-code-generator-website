import express from "express";
import QRCode from 'qrcode';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home.ejs"); 
});

app.post("/link-submit", (req, res) => {
    const link = req.body.link;
    res.render();
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});