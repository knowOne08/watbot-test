import express from 'express';
import { whatsappRoutes } from './router';
import bodyParser from 'body-parser';

export const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from your microservice!');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', whatsappRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});