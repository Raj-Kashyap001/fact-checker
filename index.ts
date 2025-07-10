import express from "express";
import analyzeMessage from "./process-text-message";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/process", (req, res) => {
  res.render("pages/process", { message: null, success: false });
});

app.post("/data-text", async (req, res) => {
  const { message } = req.body;
  if (!message)
    return res.status(400).render("pages/process", {
      message: "No Message Provided",
      success: false,
    });

  return res.status(200).render("pages/process", await analyzeMessage(message));
});

app.listen(PORT, () => {
  console.log(`INFO: Server is linsting to localhost:${PORT}`);
});
