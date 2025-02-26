// import axios from 'axios';

// /**
//  * функция для проксирования запросов к микросервисам
//  * можно использовать эту функцию для любого запросак микросервисам
//  */

// export const proxyRequest = async (url: string, method: 'GET' | 'POST', data?: any, headers?: any) => {
//     try {
//         const response = await axios({ url, method, data, headers });
//         return response.data;
//     } catch (error: any) {
//         throw { status: error.response?.status || 500, message: error.message };
//     }
// };
