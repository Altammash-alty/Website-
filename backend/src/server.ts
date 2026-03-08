import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Read directly from the frontend data/json folder
const dataDir = path.join(process.cwd(), '../data/json');

const readJSONFile = (filename: string, fallback: any = []) => {
  try {
    const filePath = path.join(dataDir, filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
  }
  return fallback;
};

// Basic API Routes
app.get('/', (req, res) => {
  res.send('Hermetica Backend API is running...');
});

// Endpoint for Projects (Aggregated from all year files)
app.get('/api/projects', (req, res) => {
  res.json({
    "2024": readJSONFile('Projects_2024.json'),
    "2025": readJSONFile('Projects_2025.json'),
    "2026": readJSONFile('Projects_2026.json')
  });
});

// Endpoint for Events
app.get('/api/events', (req, res) => {
  res.json(readJSONFile('Events.json'));
});

// Endpoint for Guest Lectures
app.get('/api/guest-lectures', (req, res) => {
  res.json(readJSONFile('GuestLectures.json'));
});

// Endpoint for Team Members (Aggregated)
app.get('/api/members', (req, res) => {
  res.json({
    firstYear: readJSONFile('Members_1stYear.json'),
    secondYear: readJSONFile('Members_2ndYear.json'),
    thirdYear: readJSONFile('Members_3rdYear.json'),
    finalYear: readJSONFile('Members_FinalYear.json')
  });
});

// Endpoint for Gallery
app.get('/api/gallery', (req, res) => {
  res.json(readJSONFile('Gallery.json', {}));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
