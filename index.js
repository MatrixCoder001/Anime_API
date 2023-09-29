const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const imgDirectory = path.join(__dirname, 'img');

app.get('/', (req, res) => {
  // Read all files in the 'img' directory
  fs.readdir(imgDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }

    // Filter out only image files (you can adjust this logic based on your file extensions)
    const imageFiles = files.filter(file => {
      const extension = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
    });

    if (imageFiles.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    // Pick a random image file
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = imageFiles[randomIndex];

    // Send the random image as a response
    const imagePath = path.join(imgDirectory, randomImage);
    res.sendFile(imagePath);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
