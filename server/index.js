const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getPage", (req, res) => {
  const rawComments = fs.readFileSync("./server/database/comments.json");
  const comments = JSON.parse(rawComments);
  res.json(comments);
});

app.post("/comment", async (req, res) => {
  try {
    const { author, message } = req.body;
    const comments = await fs.readFileSync("./server/database/comments.json");
    const jsonData = JSON.parse(comments);

    jsonData.push({
      author,
      message,
    });

    const jsonString = JSON.stringify(jsonData);

    await fs.writeFileSync(
      "./server/database/comments.json",
      jsonString,
      "utf-8",
      (err) => {
        if (err) throw err;
        console.log("Data added to file");
      }
    );
    res.send({ success: true });
  } catch (e) {
    console.log("error", e);
    res.send({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
