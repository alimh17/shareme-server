import Joi from "joi";

//? ----------------------- Start Register Form Validation -------------------------

interface IRegisterSchema {
  username: string;
  email: string;
  password: string;
}

const registerSchema = Joi.object<IRegisterSchema>({
  username: Joi.string().required().min(4).max(64).messages({
    "string.required": "نام کاربری الزامی می باشد",
    "string.min": "نام کاربری نباید کمتر از 4 کاراکتر باشد",
    "string.max": "نام کاربری نمی تواند بیشتر از 64 کاراکتر باشد",
  }),
  email: Joi.string().required().email().messages({
    "string.required": "ایمیل الزامی می باشد",
    "string.email": "ایمیل معتبر نمی باشد",
  }),
  password: Joi.string().required().min(8).max(64).messages({
    "string.required": "رمز عبور الزامی می باشد",
    "string.min": "رمز عبور نباید کمتر از 8 کاراکتر باشد",
    "string.max": "رمز عبور نباید بیشتر از 64 کاراکتر باشد",
  }),
});
//? ----------------------- End Register Form Validation -------------------------

//? ----------------------- Start Login Form Validation ---------------------------

interface ILoginSchema {
  email: string;
  password: string;
}

const loginSchema = Joi.object<ILoginSchema>({
  email: Joi.string().required().email().messages({
    "string.required": "ایمیل الزامی می باشد",
    "string.email": "ایمیل معتبر نمی باشد",
  }),
  password: Joi.string().required().min(8).max(64).messages({
    "string.required": "رمز عبور الزامی می باشد",
    "string.min": "رمز عبور نباید کمتر از 8 کاراکتر باشد",
    "string.max": "رمز عبور نباید بیشتر از 64 کاراکتر باشد",
  }),
});

//? ----------------------- End Login Form Validation ---------------------------

export { registerSchema, loginSchema };
