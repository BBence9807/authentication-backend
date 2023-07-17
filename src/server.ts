import express from 'express';
import * as dotenv from 'dotenv';
import authRoutes from './controller/auth-controller';
import {DatabaseServer} from "./config/DatabaseServer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

// Mount the authentication routes
app.use('/auth', authRoutes);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    DatabaseServer.getInstance();
});
