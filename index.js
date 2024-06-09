// index.mjs
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const apiKey="f56b055c-d20d-40af-8636-3a849421f78e";
const config = {
    headers: { 'X-API-Token': apiKey },
  };
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route that renders the index.ejs template
app.get('/', (req, res) => {
    // Pass data to the template
    res.render('index.ejs');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
