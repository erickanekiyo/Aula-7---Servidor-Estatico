const express = require('express');
const path = require('path');
const app = express();
const PORT = 80;

//Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

//Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

//Rota para Projects.html
app.get('/Projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/projects.html'));
});

//Rota para Animation.html
app.get('/Animation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/animation.html'));
});

//Rota para Copy.html
app.get('/Copy.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/copy.html'));
});

//Rota para Guess.html
app.get('/Guess.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/guess.html'));
});

//Rota para Canvas.html
app.get('/Canvas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/canvas.html'));
});

//Rota para CSS
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/style/style.css'));
});

//Rota para imagens
app.get('/img/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, 'public/img', imageName));
});

//ROTA DE FALLBACK
app.get('*', (req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página Não Encontrada</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: "Inter", "Segoe UI", sans-serif;
                    background: linear-gradient(180deg, #0f111a, #181b25);
                    color: #e4e6eb;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 20px;
                }
                h1 { 
                    color: #6ab7ff; 
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                }
                p { 
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                }
                .menu {
                    margin-top: 20px;
                }
                .menu a {
                    color: #6ab7ff;
                    text-decoration: none;
                    margin: 0 15px;
                    padding: 10px 20px;
                    border: 1px solid #6ab7ff;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }
                .menu a:hover {
                    background: rgba(106, 183, 255, 0.1);
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <h1>Página Não Encontrada</h1>
            <p>A página que você está procurando não existe.</p>
            <div class="menu">
                <a href="/">Home</a>
                <a href="/Projects.html">Projetos</a>
            </div>
        </body>
        </html>
    `);
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log('=' .repeat(50));
    console.log('SERVIDOR INICIADO COM SUCESSO!');
    console.log('=' .repeat(50));
    console.log(`Porta: ${PORT}`);
    console.log(`Local: http://localhost`);
    console.log(`Rede: http://${localIP}`);
    console.log('=' .repeat(50));
    console.log('http://localhost/');
    console.log('http://localhost/Home.html');
    console.log('http://localhost/Projects.html');
    console.log('http://localhost/Animation.html');
    console.log('http://localhost/Copy.html');
    console.log('http://localhost/Guess.html');
    console.log('http://localhost/Canvas.html');
    console.log('=' .repeat(50));
    console.log(`http://${localIP}`);
    console.log('=' .repeat(50));
});

//Obter IP local
function getLocalIP() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}