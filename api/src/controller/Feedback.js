import FeedbackValidator from '../validator/Feedback.js';
import { getAllFeedbacks, insertFeedback } from '../repository/Feedback.js';

const index = (request, response) => {};
const store = async (request, response) => {
  const { isValid, error } = await FeedbackValidator.insert(request.body);

  if (!isValid) return response.status(400).json({ message: error.errors });

  try {
    await insertFeedback(request.body);
    response.status(200).json({ message: 'feedback successfully inserted' });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'sorry, it was not possible to insert your feedback' });
  }
};

const Feedback = { index, store };

export default Feedback;
