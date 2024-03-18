import { isAfter, isBefore } from "date-fns";

interface Token {
  id: string;
  userId: string;
  token: string;
  validated: boolean;
  validatedAt?: Date;
  expires: Date;
}

/**
 * Checks if the token is ready to be activated.
 * @param sessionUserId the id of the user from the session.
 * @param token the token that is linked to the userID, fetched by another function.
 * @param requestedToken the token the user is trying to activate.
 * @returns an object that will signify if the token is ready and any errors with the
 * token or request such as the user provided token not matching the one linked to their account,
 * the token already being validate, and if the token can be regeared if it is expired.
 */

const tokenReadyToActivate = (
  sessionUserId: string,
  token: Token,
  requestedToken: string
): {
  ready: boolean;
  error: {
    error: boolean;
    errorMessage: string;
    validated: boolean;
    needRegenerate: boolean;
  };
} => {
  let ready = false;
  let error: boolean | null = null;
  let errorMessage = "";
  let validated = false;
  let needRegenerate = false;

  const {
    userId,
    token: tokenId,
    validated: tokenValidated,
    validatedAt,
    expires
  } = token;

  // Check if the token has valid values.
  if (
    validated === undefined ||
    tokenValidated === undefined ||
    expires === undefined ||
    userId === undefined
  ) {
    errorMessage =
      "Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists.";
    error = true;
  }

  // Check if the userId from the session matches the userId of the provided token.
  if (userId !== sessionUserId) {
    errorMessage =
      "An error occurred when fetching your activation status. Please try again. Contact support if this issue persists.";
    error = true;
  }

  // Check if the requested token is the same token provided.
  if (requestedToken !== tokenId) {
    errorMessage =
      "The token you are trying to activate doesn't belong to your account. Please check the provided token and try again. Contact support if this issue persists.";
    error = true;
  }

  // Check if the token is already already validated.
  if (tokenValidated) {
    // Check if the validated date is before the expiry date.
    if (isBefore(new Date(validatedAt), new Date(expires))) {
      errorMessage = "This token is already validated.";
      error = true;
      validated = true;
    } else {
      errorMessage =
        "Your activation status is not valid. Please activate your account again by generating a new activation token.";
      error = true;
      needRegenerate = true;
    }
  }

  if (isAfter(new Date(), new Date(expires))) {
    errorMessage =
      "Your token is expired. Please regenerate your token to activate your account.";
    error = true;
    needRegenerate = true;
  }

  if (isBefore(new Date(), new Date(expires))) {
    ready = true;
    error = false;
  }

  return {
    ready,
    error: {
      error,
      errorMessage,
      validated,
      needRegenerate
    }
  };
};

export default tokenReadyToActivate;
