import app from "./app";
import { config } from "./config";

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`[LOG]: API Gateway running on port ${PORT}`);
});
