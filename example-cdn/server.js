import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000; // You can choose any available port

app.use(cors());

// Serve static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example CDN server listening at http://localhost:${port}`);
});
