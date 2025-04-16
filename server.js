const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Import koneksi WA
const connectWA = require("./connection.js");

// Setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Simpan log ke file
const logFile = path.join(__dirname, "log.txt");
function writeLog(msg) {
  const full = `[${new Date().toLocaleString()}] ${msg}\n`;
  fs.appendFileSync(logFile, full);
  console.log(full);
}

// Route utama: form input nomor WA
app.get("/", (req, res) => {
  res.send(`
    <h2>Bot WhatsApp Can</h2>
    <form method="POST" action="/link">
      <label>Masukkan Nomor WhatsApp (62xxx):</label><br>
      <input type="text" name="number" required />
      <button type="submit">Tautkan</button>
    </form>
    <br><a href="/log">Lihat Log</a>
  `);
});

// Endpoint buat nerima input WA dan konek ke WA
app.post("/link", (req, res) => {
  const number = req.body.number;
  writeLog(`Nomor ${number} dimasukkan untuk ditautkan.`);
  
  // Jalankan koneksi WA
  connectWA(number);

  res.send(`
    <p>Nomor ${number} sedang diproses...</p>
    <a href="/">Kembali</a>
  `);
});

// Tampilkan isi log di browser
app.get("/log", (req, res) => {
  if (!fs.existsSync(logFile)) return res.send("Belum ada log.");
  const logs = fs.readFileSync(logFile, "utf-8");
  res.send(`<pre>${logs}</pre><a href="/">Kembali</a>`);
});

app.listen(port, () => {
  writeLog(`Server web aktif di http://localhost:${port}`);
});
