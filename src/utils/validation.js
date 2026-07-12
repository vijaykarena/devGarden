const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not Strong!");
  }
};

const validateEditProfileData = (req) => {
  const editFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "bio",
    "skills",
  ];
  const isEditValid = Object.keys(req.body).every((field) =>
    editFields.includes(field),
  );

  return isEditValid;
};

module.exports = { validateSignupData, validateEditProfileData };
