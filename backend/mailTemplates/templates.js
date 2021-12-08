import emailConfirmationTemplate from "./emailConfirmationTemplate.js";
import passwordResetTemplate from "./passwordResetTemplate.js";

const emailTemplate = (template, payload) => {
  switch (template) {
    case "passwordReset":
      return passwordResetTemplate(payload);
    case "emailConfirmation":
      return emailConfirmationTemplate(payload);
    default:
      return "template not found";
  }
};

export { emailTemplate };
