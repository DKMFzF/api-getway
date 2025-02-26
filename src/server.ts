import "./monitoring/tracing.monitoring";
import app from "./app";
import { config } from "./config/index.config";
import { LOGS } from './utils/logs.service.condition';
import setupSwagger from "./docs/swagger.docs";

/**
 * starting service
 */

const PORT = config.PORT;

// generation-docs
setupSwagger(app);

// open-port
app.listen(PORT, () => console.log(LOGS.START_SERVICE, PORT));
