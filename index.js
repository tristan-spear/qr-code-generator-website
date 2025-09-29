import express from "express";
import QRCode from 'qrcode';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home.ejs"); 
});

app.post("/link-submit", async (req, res) => {

    // Old Attempt : 

    // const link = req.body.link;
    // console.log(link);

    // QRCode.toFile('./public/qr-file.png', link, {
    //     color: {
    //         dark: '#000000',  // Black dots
    //         light: '#ffffffff' // Transparent background
    //     }
    //     }, function (err) {
    //         if (err) throw err
    //     console.log('done')
    // })
    // res.render("qr.ejs", {qrlink : link}); 

    // Fixed version
    const link = req.body.link;

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
            dark:"#000000ff",
            light:"#ffffffff"
        }
    }
    try {
        const qr = await QRCode.toDataURL(link, opts);
        res.render("qr.ejs", { qrlink: link, qr_data: qr });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error generating QR code");
    } 
}); 

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
