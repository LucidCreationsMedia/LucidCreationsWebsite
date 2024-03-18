import checkUsernameAvailible from "./checkUsernameAvailible";
import editUserProfile, {
  EditUserProfileProps
} from "../api/mutation/profile/editUserProfile";

/**
 * This function will attempt to generate a variation of a given username
 * by prepending or appending 4 random digits to it,
 * @param {string } username the username to make a variation of
 * @returns {string} the modified username.
 */
const generateUsername = async (username: string): Promise<string> => {
  let newUsername: string = username;
  let validFlag: boolean = false;

  // Generated the 4 random numbers
  const genNumbers = (): string => {
    const nums: number[] = [];

    for (let i = nums.length; i < 4; i++) {
      nums[nums.length] = Math.round(Math.random() * (9 - 0) + 0);
    }

    if (nums.length === 4) {
      return nums.toString().replaceAll(",", "");
    }
  };

  // Will attempt different variations until 1 variation is valid.
  while (!validFlag) {
    const nums = genNumbers();

    if (await checkUsernameAvailible(newUsername + nums)) {
      newUsername = newUsername + nums;
      validFlag = true;
      break;
    } else if (await checkUsernameAvailible(nums + newUsername)) {
      newUsername = nums + newUsername;
      validFlag = true;
      break;
    }
  }

  return newUsername;
};

/**
 * Used to generate the profile of the user upon account creation
 * @param {EditUserProfileProps} userProfile the user object from NextAuth.
 */

const generateProfile = async (
  userProfile: EditUserProfileProps
): Promise<void> => {
  const newUserProfile: EditUserProfileProps = Object.assign(userProfile);
  const { userId, name, bio } = newUserProfile;
  const newUsername: string = await generateUsername(userProfile.username);

  newUserProfile.username = newUsername;

  editUserProfile({ userId, name, username: newUsername, bio });
};

export default generateProfile;
export { generateUsername };
