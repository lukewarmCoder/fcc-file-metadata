require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// CORS and static
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ storage: multer.memoryStorage() });

// Input name must be 'upfile'
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    // If no file was sent
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;
  return res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});