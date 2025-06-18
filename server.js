const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqaSwgZKXHah15MXv78VItS3Cjb_iyg2GgRLpn12f19RUFjHHqlRRjbpn9JhwSL8CiplAbtMqRHjjQ/pub?gid=1548610688&single=true&output=csv';

app.get("/api/trip-data", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    const csv = await response.text();
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});