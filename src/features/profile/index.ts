import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

// TODO: Add a loading state in the profile or account slice.
// * Use the state to prevent unnecessary changes to the slice and the force updates when needed.

const initialState: User = {
  id: "",
  name: "",
  email: "",
  image: "",
  role: "USER",
  username: "",
  bio: ""
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    // Populate profile on login
    populateProfile(state: User, action: PayloadAction<User>) {
      const { id, name, email, image, role, username, bio } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.image = image;
      state.role = role;
      state.username = username;
      state.bio = bio;
    },
    // Remove user profile on logout
    removeProfile(state: User) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.image = "";
      state.role = "USER";
      state.username = "";
      state.bio = "";
    },
    // Update profile
    updateProfile(state: User, action: PayloadAction<User>) {
      const { id, name, email, image, role, username, bio } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.image = image;
      state.role = role;
      state.username = username;
      state.bio = bio;
    }
  }
});

export const { populateProfile, removeProfile, updateProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
