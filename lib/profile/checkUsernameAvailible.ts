import fetchCheckAvailableUsername from "../api/query/profile/fetchCheckUsernameAvailable";

/**
 * This function will check if a specific username is availible.
 * @param {username} username the username to be checked
 * @returns {boolean} returns true if the username is not present in the
 * database and false if the username is present.
 * @returns {null} returns null if an error occurs.
 */
const checkUsernameAvailible = async (
  username: string
): Promise<boolean | null> => {
  let flag: null | boolean = null;

  await fetchCheckAvailableUsername(username)
    .then((res) => {
      const queryData: { username: string | null } =
        res.data.checkUsernameAvailable;

      if (queryData === null) {
        flag = true;
      } else if (queryData.username.length > 0) {
        flag = false;
      }
    })
    .catch((err) => {
      console.error(err);
    });

  return flag;
};

export default checkUsernameAvailible;
