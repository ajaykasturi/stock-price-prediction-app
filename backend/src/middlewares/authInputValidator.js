import { signInSchema } from "../validators/schemaValidator.js";
function authInputValidator(req, res, next) {
  const parsed = signInSchema.safeParse(req.body);
  if (parsed.success) {
    next();
    return;
  }
  res.status(411).json({ errors: parsed?.error?.issues });
  return;
}
export default authInputValidator;
