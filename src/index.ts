import express from 'express';
import { loggerMiddleware } from './middleware/logger';
import { validatorMiddleware } from './middleware/validator';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/image', [loggerMiddleware, validatorMiddleware], routes);

app.listen(port, () => {
  console.log('Server is up running ', port);
});

export default app;
