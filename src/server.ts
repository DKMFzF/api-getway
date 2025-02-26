import app from "./app";
import { config } from "./config";
import LOGS from './utils/logs.condition';

/**
 * starting service
 */

const PORT = config.PORT;

app.listen(PORT, () => console.log(LOGS.START_SERVICE, PORT));
