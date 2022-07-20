import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    role: Joi.string().min(2).required(),
    rate: Joi.number().required(),
    employeeId: Joi.string().min(5).required(),
  });
  const validation = memberValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
      data: undefined,
    });
  }
  return next();
};

export default { validateCreation };
