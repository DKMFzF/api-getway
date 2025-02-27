# API Gateway for the Finance Analyzer project

[Дока на русском](./docs/README.ru.md)

_The gateway is intended for the Finance Analyzer project, but this does not mean that it can only work in the environment of this project. To use it in another project, it is enough to define your evn environment.__

## Description
The API Gateway is a gateway that provides interaction between clients and microservices in the application architecture. It manages authentication, request routing, caching, and logging.

## Functionality
- **Routing requests** to authentication and user services.
- **Logging of requests**.
- **Error handling** with centralized middleware.
- **Limit on the number of requests** (Rate Limiting) using Redis.
-**Caching** responses from microservices.
- **Query tracing monitoring** via OpenTelemetry.

## Technologies used
- **Node.js** + **Express** is the main framework.
- **Axios** – for sending HTTP requests to microservices.
- **Redis** – caching data and limiting the frequency of requests.
- **PM2 (Cluster Mode)** – load balancing across processors.
- **Swagger** – API documentation.
- **OpenTelemetry** – query tracing.
- **Helmet** and **Compression** – protection and optimization.

## Project structure
```
api-gateway/
│── src/
│   ├── config/           # conf file
│   ├── middleware/       # Middleware (logs, err, limit)
│   ├── monitoring/       # Monitoring (OpenTelemetry)
│   ├── routes/           # API-path
│   ├── utils/            # Utils and Const
│   ├── app.ts            # main app
│   ├── server.ts         # start server
│── docker-compose.yml    # container
│── README.md             # description
```

## Installation and launch
### Local launch
```bash
yarn install
yarn start
```

### Launching in Docker
```bash
docker-compose up --build
```

## Environment variables (.env)
The environment variable is specially created both for and by design, without hiding variables. The gateway is intended for the Finance Analyzer project 

```
PORT=5000

AUTH_SERVICE_URL=http://auth-service:3000
AUTH_SERVICE_ROUTE=/auth
AUTH_SERVICE_URL_LOGIN=/login
AUTH_SERVICE_URL_PROTECTED=/protected

USER_SERVICE_URL=http://user-service:4000
USER_SERVICE_ROUTE=/user
USER_SERVICE_URL_REGISTER=/register

REDIS_HOST=redis
REDIS_PORT=6379

SWAGGER_DOCS=/api-docs
```

## API Routes
### Authentication
- **POST** `/auth/login` – JWT login.
- **GET** `/auth/protected` – Token verification (cached in Redis).

### User Service
- **POST** `/user/register` – User registration.

## Monitoring
The Gateway API supports tracing via OpenTelemetry.

## Author

[Kirill Doroshev (DKMFzF)](https://vk.com/dkmfzf)

## License
MIT