import type { userRequestType} from "../../../types/global/responseapi";
import type { registerForm } from "../../../types/user/repostori";

const usernamevalidation = (username: string) => {
  if (username.length < 3) {
    throw Error("username must be contains at least 3 character");
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    // if (!/^[a-z][A-Z][0-9]+$/.test(username)) {
    throw Error("username must be contain uppercase Lowercase or number");
  }
  return username;
};

const emailValidation = (email: string) => {
  if (email.length < 5) {
    throw Error("emaill must be contains at least 5 character");
  }
  if (!/^[a-zA-Z0-9.%_=-]+\@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(email)) {
    throw Error("email formats must be correct");
  }
  return email;
};

const passwordValidation = (password: string) => {
  if (password.length < 3) {
    throw Error("password minimal 3 character");
  }
  let isStrong = 0;
  if (/(?=.*[a-z])/.test(password)) isStrong++;
  if (/(?=.*[A-Z])/.test(password)) isStrong++;
  if (/(?=.*\d)/.test(password)) isStrong++;
  if (/(?=.*[!@#$%^&*])/.test(password)) isStrong++;
  if (isStrong < 3) {
    throw Error("password weak");
  }
  return password;
};

export const registerValidation = (validator: registerForm) => {
  try {
    usernamevalidation(validator.name);
    emailValidation(validator.email);
    passwordValidation(validator.password);
    const res : userRequestType = {
      status: 200,
      message: "success",
      data : {
        name: validator.name,
        email: validator.email,
        password: validator.password,
      },
    };
    return res;
  } catch (e: any) {
    const res = {
      status: 422,
      message: e.message
    };
    return res;
  }
};

const data = {
  name: "iniest123",
  email: "iniemail@gmail.com",
  password: "dqwidq",
};

registerValidation(data);
