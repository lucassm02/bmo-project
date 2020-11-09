import * as Yup from 'yup';

const insert = async (requestBody) => {
  const schema = Yup.object().shape({
    feedback: Yup.string().required().max(200),
    stars: Yup.number().required().min(1).max(5),
  });

  try {
    await schema.validate(requestBody);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error };
  }
};

const FeedbackValidator = { insert };

export default FeedbackValidator;
