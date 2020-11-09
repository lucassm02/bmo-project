import { Router } from 'express';
import Feedback from './controller/Feedback.js';

const routes = Router();

routes.get('/feedbacks', Feedback.index);
routes.post('/feedbacks', Feedback.store);

export default routes;
