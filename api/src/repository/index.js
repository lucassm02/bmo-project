import knex from '../config/kenx.js';

const getAllFeedbacks = async () => await knex('tb_feedback');
const insertFeedback = async ({ feedback, message }) =>
  await knex('tb_feedback').insert({ feedback, message });

export { getAllFeedbacks, insertFeedback };
