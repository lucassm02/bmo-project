import knex from '../config/kenx.js';

const getAllFeedbacks = () => knex('tb_feedback');

const insertFeedback = ({ feedback, message }) =>
  knex('tb_feedback').insert({ feedback, message });

export { getAllFeedbacks, insertFeedback };
