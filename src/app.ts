import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Используем docker DNS имена для микросервисов
const AUTH_SERVICE_URL = 'http://auth-service:3000';
const USER_SERVICE_URL = 'http://user-service:4000';

// Прокси-эндпоинт для логина:
app.post('/login', async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Ошибка при запросе в Auth Service:', axiosError.message);
        res.status(axiosError.response?.status || 500).json(
            axiosError.response?.data || { error: axiosError.message }
        );
    }
});

// Прокси-эндпоинт для регистрации:
app.post('/register', async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body);
        res.json(response.data);
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Ошибка при запросе в User Service:', axiosError.message);
        res.status(axiosError.response?.status || 500).json(
            axiosError.response?.data || { error: axiosError.message }
        );
    }
});

// Прокси-эндпоинт для защищённого ресурса:
// @ts-ignore
app.get('/protected', async (req: Request, res: Response) => {
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
        const axiosError = error as AxiosError;
        console.error('Ошибка при запросе в Auth Service (protected):', axiosError.message);
        res.status(axiosError.response?.status || 500).json(
            axiosError.response?.data || { error: axiosError.message }
        );
    }
});

app.listen(5000, () => console.log('API Gateway запущен на порту 5000'));
