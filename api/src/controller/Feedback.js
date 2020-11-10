import FeedbackValidator from '../validator/Feedback.js';
import { getAllFeedbacks, insertFeedback } from '../repository/Feedback.js';

const index = async (_, response) => {
  try {
    const feedbacks = await getAllFeedbacks();

    response
      .status(200)
      .json({ message: 'feedbacks successfully listed', payload: feedbacks });
  } catch (error) {
    response.status(500).json({
      message: 'sorry, it was not possible to insert your feedback',
      payload: [],
    });
  }
};
const store = async (request, response) => {
  const { isValid, error } = await FeedbackValidator.insert(request.body);

  if (!isValid)
    return response.status(400).json({ message: error.errors, payload: [] });

  try {
    await insertFeedback(request.body);
    response
      .status(200)
      .json({ message: 'feedback successfully inserted', payload: [] });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: 'sorry, it was not possible to insert your feedback',
      payload: [],
    });
  }
};

const Feedback = { index, store };

export default Feedback;
