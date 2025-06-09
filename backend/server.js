import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';

const jsonFilePath = '../backend/runners.json';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Route pour obtenir les coureurs
app.get('/api/runners', async (req, res) => {
  try {
    const data = await fs.readFile(jsonFilePath, { encoding: 'utf-8', flag: 'r' });
    const runners = JSON.parse(data);
    res.json(runners);
  } catch (error) {
    console.error('Error reading the JSON file:', error);
  }
});

// Route pour ajouter un coureur ou enregistré chrono
app.post('/api/runners', async (req, res) => {
  try {
    const newRunner = req.body;
    const data = await fs.readFile(jsonFilePath, { encoding: 'utf-8', flag: 'r' });
    const runners = JSON.parse(data);

    // Trouver le coureur par numéro de dossard
    const runnerIndex = runners.findIndex(runner => runner.bibNumber === newRunner.bibNumber);

    if (runnerIndex !== -1) {
      // Mettre à jour le temps du coureur existant
      runners[runnerIndex].time = newRunner.time;
    } else {
      runners.push(newRunner);
    }

    await fs.writeFile(jsonFilePath, JSON.stringify(runners, null, 2), { encoding: 'utf-8', flag: 'w' });

    res.status(201).send('Runner time updated successfully');
  } catch (error) {
    console.error('Error updating runner time:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
