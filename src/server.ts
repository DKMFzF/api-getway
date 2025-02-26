import app from "./app";
import { config } from "./config/index.config";
import { LOGS } from './utils/logs.service.condition';

/**
 * starting service
 */

const PORT = config.PORT;

app.listen(PORT, () => console.log(LOGS.START_SERVICE, PORT));
