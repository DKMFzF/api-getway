const express = require('express');
const axios = require('axios');
const cors = require('cors'); // подключаем пакет cors

const app = express();
app.use(cors()); // разрешаем CORS для всех запросов
app.use(express.json());

// Используем docker DNS имена для микросервисов
const AUTH_SERVICE_URL = 'http://auth-service:3000';
const USER_SERVICE_URL = 'http://user-service:4000';

// Прокси-эндпоинт для логина:
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе в Auth Service:', error.message);
        res.status(error.response ? error.response.status : 500).json(
            error.response ? error.response.data : { error: error.message }
        );
    }
});

// Прокси-эндпоинт для регистрации:
app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе в User Service:', error.message);
        res.status(error.response ? error.response.status : 500).json(
            error.response ? error.response.data : { error: error.message }
        );
    }
});

// Прокси-эндпоинт для защищённого ресурса:
app.get('/protected', async (req, res) => {
    console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Нет токена' });
        }
        const response = await axios.get(`${AUTH_SERVICE_URL}/protected`, {
            headers: { Authorization: token }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе в Auth Service (protected):', error.message);
        res.status(error.response ? error.response.status : 500).json(
            error.response ? error.response.data : { error: error.message }
        );
    }
});

app.listen(5000, () => console.log('API Gateway запущен на порту 5000'));
