
import 'dotenv/config';
import express from 'express';
import routes from './routes';

import { setupSwagger } from "./swagger/swagger";

console.log('DATABASE_URL:', process.env.DATABASE_URL);
const app = express();
app.use(express.json());
app.use('', routes);

const PORT = process.env.PORT || 3000;

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
app.listen(3333, () => {
  console.log(`🚀 Server is running on http://localhost:3333`);
});