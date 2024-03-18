import { isBefore } from "date-fns";

interface Token {
  id: string;
  userId: string;
  token: string;
  validated: boolean;
  validatedAt?: Date;
  expires: Date;
}

interface ValidateTokenProps extends Token {
  sessionUserId: string;
}

/**
 * This function is to check if the activation token of a user is valid or already activated.
 * It is used to validate if a token is ready to be validated or not.
 * @param {ValidateTokenProps} tokenInfo the activation token for the user.
 * @returns the validation status and any error messages.
 */

const validateToken = ({
  validated,
  userId,
  validatedAt,
  expires,
  sessionUserId
}: ValidateTokenProps): { status: boolean | null; message: string } => {
  let flag = false;
  let message =
    "An error ocurred when checking if your account was activated. Please try again.";

  // Check if the token has valid values.
  if (
    validated === undefined ||
    validatedAt === undefined ||
    expires === undefined ||
    userId === undefined
  ) {
    message =
      "Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists.";
    flag = null;
  }

  // Check if the token was activated/validated.
  if (!validated || validatedAt === null) {
    message =
      "Account not activated. Please check your email for the activation link.";
  }

  // Check if the token is the proper one.
  if (userId !== sessionUserId) {
    message =
      "An error occurred when fetching your activation status. Please try again. Contact support if this issue persists.";
  }

  // Check if the validated/activated date is not past the expiry date.
  if (!isBefore(new Date(validatedAt), new Date(expires))) {
    message =
      "Your activation status is not valid. Please activate your account again by generating a new activation token.";
  }

  // Check if the user id's match, token is valid/active, and the validated/activated at is before the expiry date.
  if (
    validated &&
    userId === sessionUserId &&
    isBefore(new Date(validatedAt), new Date(expires))
  ) {
    message = "Your account is activated.";
    flag = true;
  }

  return { status: flag, message };
};

export default validateToken;
