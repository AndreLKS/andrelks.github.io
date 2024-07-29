const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

const app = express();
const port = 3000;

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));

const extractAndSumValues = (text) => {
    const regex = /217EMPRESTIMO SOBRE A RMC\s*R\$\s*([\d.,]+)/g;
    let match;
    let totalSum = 0;

    while ((match = regex.exec(text)) !== null) {
        const valueStr = match[1].replace(/\./g, '').replace(/,/g, '.');
        const value = parseFloat(valueStr);
        if (!isNaN(value)) {
            totalSum += value;
        }
    }

    return totalSum;
};

app.post('/upload', upload.single('pdf'), async (req, res) => {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const total = extractAndSumValues(data.text);
    fs.unlinkSync(filePath); // Remove o arquivo após o processamento
    res.json({ total: total.toFixed(2) });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
