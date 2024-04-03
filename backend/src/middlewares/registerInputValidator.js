import { registerSchema } from "../validators/schemaValidator.js";
function registerInputValidator(req, res, next) {
  // console.log(req.body);
  const parsed = registerSchema.safeParse(req.body);
  if (parsed.success) {
    next();
    return;
  }
  res.status(411).json({ errors: parsed?.error?.issues });
  return;
}
export default registerInputValidator;
