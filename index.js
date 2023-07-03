const express = require('express');
const bodyParser = require('body-parser');
const Wappalyzer = require('wappalyzer');





const port = process.env.PORT || 3000;

const options = {
    debug: false,
    delay: 500,
    maxWait: 10000,
    recursive: false,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
  };
const wappalyzer = new Wappalyzer(options);
const app = express();

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route to accept URL
app.post('/getdetails', async (req, res) => {
  const { url } = req.body;
  let rawurl = url;

  // console.log("Main url=",rawurl)
  try {
    const site = await wappalyzer.open(rawurl);
    const results = await site.analyze();

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: `Failed to analyze the URL: ${error.message}` });
  }
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });