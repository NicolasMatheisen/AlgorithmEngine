const http = require('http');
const fileSystem = require('fs').promises;
const path = require('path');
const { scanDirectory } = require('./src/scanner');

const PORT = 3000;

const server = http.createServer(async (request, response) => {
    if (request.url === '/api/files' && request.method === 'GET') {
        try {
            const targetPath = path.join(__dirname, 'meine-dateien');
            const folderTree = await scanDirectory(targetPath);
            
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(folderTree));
        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Ordner-Scan fehlgeschlagen' }));
        }
        return;
    }

    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);
    
    try {
        const fileContent = await fileSystem.readFile(filePath);
        
        let contentType = 'text/html';
        if (filePath.endsWith('.js')) contentType = 'application/javascript';
        if (filePath.endsWith('.css')) contentType = 'text/css';

        response.writeHead(200, { 'Content-Type': contentType });
        response.end(fileContent);
    } catch (error) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 - Datei nicht gefunden');
    }
});

server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});