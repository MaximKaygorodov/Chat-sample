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

const updateDatabaseTable = async (table, data) => {
  const rawData = await fs.readFileSync(`./backendend/database/${table}`);
  const jsonData = JSON.parse(rawData);

  const id = jsonData.slice(-1)[0]?.id + 1 || 1;
  console.log(jsonData.slice(-1)[0]);
  jsonData.push({ ...data, id });
  console.log(jsonData);

  const jsonString = JSON.stringify(jsonData);
  console.log(jsonString);

  const res = await fs.writeFileSync(
    `./backendend/database//${table}`,
    jsonString,
    "utf-8",
    (err) => {
      if (err) throw err;
      console.log("Data added to file");
    }
  );
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/getPage", (req, res) => {
  const rawComments = fs.readFileSync("./backendend/database/comments.json");
  const comments = JSON.parse(rawComments);
  res.json(comments);
});

app.post("/comment", async (req, res) => {
  try {
    const { author, message, isNewAuthor } = req.body;
    await updateDatabaseTable("comments.json", { author, message });
    res.send({ success: true });
  } catch (e) {
    console.log("error", e);
    res.send({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
