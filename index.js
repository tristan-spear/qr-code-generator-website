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

app.post("/link-submit", (req, res) => {
    const link = req.body.link;
    console.log(link);

    QRCode.toFile('./public/qr-file.png', link, {
        color: {
            dark: '#000000',  // Blue dots
            light: '#ffffffff' // Transparent background
        }
        }, function (err) {
            if (err) throw err
        console.log('done')
    })
    res.render("qr.ejs", {qrlink : link}); 
})

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

export default app;