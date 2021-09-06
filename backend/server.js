const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

// public folder
app.use(express.static("public"));

// Upload Endpoint
app.post("/upload", (req, res, next) => {
  console.log(req.files.file);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No file uploaded",
    });
  }
  const retrievedFile = req.files.file;
  const uploadPath = `${__dirname}/public/uploads/${retrievedFile.name}`;

  // Use the mv() method to place the file somewhere on your server
  retrievedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: retrievedFile.name,
      filePath: `/uploads/${retrievedFile.name}`,
    });
  });
});

app.listen(5000, () => {
  console.log("Server started...");
});
