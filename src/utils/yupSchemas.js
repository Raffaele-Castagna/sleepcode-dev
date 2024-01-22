import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const emailSchema = Yup.string()
  .required("Email richiesta!")
  .email("Email invalida");

  const idSchema = Yup.string()
  .required("Uid needed");

  const usrRegSchema = Yup.string()
  .required("Username richiesto!")

  const pwdSchema = Yup.string()
  .password()
  .required("Password richiesta!")
  .min(8, "Password dev'essere almeno 8 caratter")
  .max(64, "Password troppo grande! (max: 64)")
  .minLowercase(1, "Password deve contenere almeno 1 lettera minuscola")
  .minUppercase(1, "Password deve contenere almeno 1 lettera maiuscola")
  .minSymbols(1, "Password deve contenere almeno 1 simbolo speciale")
  .minNumbers(1, "Password must contain at least 1 number");


  export const loginSchema = {
    email: emailSchema,
    password: pwdSchema,
  };

  export const regSchema = {
    email: emailSchema,
    username: usrRegSchema,
    password: pwdSchema,
  };

  export const uSchema = {
    uid : idSchema
  }

