type FormValidatorTypes = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const FormValidator = (formData: FormValidatorTypes) => {
  const email = formData.email.trim();
  const username = formData.username.trim();
  const password = formData.password.trim();
  const repeatPassword = formData.repeatPassword.trim();

  if (
    email !== "" &&
    email.length >= 8 &&
    email.length <= 40 &&
    email.includes("@") &&
    email.includes(".com")
  ) {
    if (
      username.length >= 5 &&
      username.length <= 25 &&
      !username.includes(" ")
    ) {
      if (password.length >= 8 && password.length <= 30) {
        if (password === repeatPassword) {
          return { success: true, message: "Signup Succcess" };
        } else {
          return { success: false, message: "Passwords didn't match." };
        }
      } else {
        return {
          success: false,
          message: "Password must be between 8 and 30 characters.",
        };
      }
    } else {
      return {
        success: false,
        message: "Username must be spaceless between 5 and 25 characters.",
      };
    }
  } else {
    return { success: false, message: "Please enter a valid email address." };
  }
};
