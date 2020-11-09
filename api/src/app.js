import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: path.resolve(__dirname, '..', '..', '.env') });

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

export default app;
