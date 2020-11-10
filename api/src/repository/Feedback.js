import knex from '../config/kenx.js';

const getAllFeedbacks = () => knex('tb_feedback');

const insertFeedback = ({ feedback, stars }) =>
  knex('tb_feedback').insert({ feedback, stars });

export { getAllFeedbacks, insertFeedback };
