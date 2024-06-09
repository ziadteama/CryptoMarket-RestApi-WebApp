// index.mjs
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

function sortDataBySymbol(data) {
  data.sort((a, b) => {
    if (a.symbol < b.symbol) {
      return -1;
    }
    if (a.symbol > b.symbol) {
      return 1;
    }
    return 0;
  });

  return data;
}

const app = express();
const port = 3000;
const apiKey = "f56b055c-d20d-40af-8636-3a849421f78e";
const apiUrl = "https://api.blockchain.com/v3/exchange/tickers";
const config = {
  headers: { "X-API-Token": apiKey },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(apiUrl, config);
    const data = sortDataBySymbol(response.data);
    res.render("index.ejs", { cryptocurrencies: data });
  } catch (error) {
    res
      .status(500)
      .send("Error fetching cryptocurrency data. Please try again later.");
  }
});

app.post("/checkPrice", async (req, res) => {
  const searchId = req.body.selectedCrypto;
  console.log(searchId);
  try {
    const response1 = await axios.get(apiUrl + `/${searchId}`, config);
    const symbol = response1.data.symbol;
    const price = response1.data.last_trade_price;
    const response2 = await axios.get(apiUrl, config);
    const data = sortDataBySymbol(response2.data);
    res.render("index.ejs", {
      symbol: symbol,
      price: price,
      cryptocurrencies: data,
    });
  } catch (error) {
    res
      .status(500)
      .send("Error fetching cryptocurrency data. Please try again later.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
