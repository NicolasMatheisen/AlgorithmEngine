import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { generateHTML } from './htmlGenerator.js';

const app = express();
const PORT = 3000;
const ROOT_FOLDER = './src/algorithms'; 

function getAlgorithmsData() {
    const scanDir = fs.readdirSync(ROOT_FOLDER, { recursive: true, withFileTypes: true });
    const collectOnlyFiles = scanDir.filter(dirent => dirent.isFile());

    return collectOnlyFiles.reduce((grouped, file) => {
        const topic = path.relative(ROOT_FOLDER, file.parentPath);
        if (!grouped[topic]) {
            grouped[topic] = [];
        }
        grouped[topic].push(file.name);
        return grouped;
    }, {});
}


app.get('/', (req, res) => {
    console.log('localhost wurde aufgerufen! Scanne Ordner...');
    
    const algorithmsByTopic = getAlgorithmsData();
    
    const htmlContent = generateHTML(algorithmsByTopic, false); 
    
    res.send(htmlContent);
});


app.listen(PORT, () => {
    console.log(`Server läuft! Öffne http://localhost:${PORT} in deinem Browser.`);
});