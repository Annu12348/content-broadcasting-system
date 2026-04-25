import server from './src/app.js'
import { config } from './src/config/config.js';
import databaseConnection from './src/database/db.js';

databaseConnection()

server.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
});