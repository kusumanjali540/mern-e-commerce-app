const validateReviewForm = (formData) => {
  const errors = [];

  if (!formData.title) {
    errors.push("Title is required");
  }
  if (!formData.comment) {
    errors.push("Comment is required");
  }
  if (!formData.reviewer) {
    errors.push("Reviewer name is required");
  }
  if (!formData.email) {
    errors.push("Email is required");
  } else if (!validateEmail(formData.email)) {
    errors.push("Email is invalid");
  }
  if (!formData.star || formData.star < 1) {
    errors.push("Star rating must be between 1 and 5");
  }

  return errors;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export { validateReviewForm, validateEmail };
