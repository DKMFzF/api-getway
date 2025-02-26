// import { Request, Response } from 'express';
// import { proxyRequest } from '../services/proxy.service';
// import { config } from '../config';

// /** 
//  * контроллер для защищенного маршрута 
//  */

// export const protectedRoute = async (req: Request, res: Response) => {
//     try {
//         const token = req.headers.authorization;
//         if (!token) return res.status(401).json({ error: '[ERROR]: Missing token' });

//         const data = await proxyRequest(`${config.AUTH_SERVICE_URL}/protected`, 'GET', null, { Authorization: token });
//         res.json(data);
//     } catch (error: any) {
//         res.status(error.status).json({ error: error.message });
//     }
// };