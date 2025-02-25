import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import cors from 'cors';

console.log("[LOG]: lib start");

const app = express();
app.use(cors());
app.use(express.json());

console.log("[LOG]: app start");

// Используем docker DNS имена для микросервисов
const AUTH_SERVICE_URL = 'http://auth-service:3000';
const USER_SERVICE_URL = 'http://user-service:4000';

// Прокси-эндпоинт для логина
app.post('/login', async (req: Request, res: Response) => {
    
    console.log("[LOG]: start /logs");
    
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        const axiosError = error as AxiosError;
       
        console.error('Ошибка при запросе в Auth Service:', axiosError.message);
        
        res.status(axiosError.response?.status || 500).json(axiosError.response?.data || { error: axiosError.message });
    }
});

// Прокси-эндпоинт для регистрации
app.post('/register', async (req: Request, res: Response) => {

    console.log("[LOG]: start /register");

    try {
        const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body);
        res.json(response.data);
    } catch (error) {
        const axiosError = error as AxiosError;
        
        console.error('[ERROR]: Error feth in User Service:', axiosError.message);
        
        res.status(axiosError.response?.status || 500).json( axiosError.response?.data || { error: axiosError.message } );
    }
});

// Прокси-эндпоинт для защищённого ресурса
// @ts-ignore
app.get('/protected', async (req: Request, res: Response) => {
    
    console.log("[LOG]: start /protected");

    try {
        const token = req.headers.authorization;

        if (!token) return res.status(401).json({ error: '[ERROR]: non token' });

        const response = await axios.get(`${AUTH_SERVICE_URL}/protected`, { headers: { Authorization: token } });
        res.json(response.data);
    } catch (error) {
        const axiosError = error as AxiosError;
        
        console.error('[ERROR]: Error feth in Auth Service (protected):', axiosError.message);
        
        res.status(axiosError.response?.status || 500).json(axiosError.response?.data || { error: axiosError.message });
    }
});

// app start
app.listen(5000, () => console.log('[LOG]: API Gateway app on port :5000'));
