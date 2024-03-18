import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountActivationToken {
  id: string;
  userId: string;
  token: string;
  validated: boolean;
  validatedAt?: Date;
  expires: Date;
}

type ApiStatus = "idle" | "loading" | "succeeded" | "failed";

interface Errors {
  message: string;
  canRegen?: boolean;
  needsGen?: boolean;
}

interface ApiInfo {
  status: ApiStatus;
  errors: Errors | null;
}

interface ActivationTokenSlice {
  token: {
    info: AccountActivationToken | null;
    status: ApiStatus;
    errors: Errors | null;
  };
  activating: ApiInfo;
  regen: ApiInfo;
}

const initialState: ActivationTokenSlice = {
  token: {
    info: null,
    status: "idle",
    errors: null
  },
  activating: {
    status: "idle",
    errors: null
  },
  regen: {
    status: "idle",
    errors: null
  }
};

interface SetApiStatusPayload {
  api: "token" | "activating" | "regen";
  status: ApiStatus;
}

interface SetApiErrorsPayload extends SetApiStatusPayload {
  errors: Errors;
}

const accountActivationStatusSlice = createSlice({
  name: "Activation Token",
  initialState,
  reducers: {
    setApiStatus(
      state: ActivationTokenSlice,
      action: PayloadAction<SetApiStatusPayload>
    ) {
      const { status, api } = action.payload;

      state[`${api}`].status = status;
    },
    setApiErrors(
      state: ActivationTokenSlice,
      action: PayloadAction<SetApiErrorsPayload>
    ) {
      const { api, errors, status } = action.payload;

      state[`${api}`].status = status;
      state[`${api}`].errors = errors;
    },
    setActivationToken(
      state: ActivationTokenSlice,
      action: PayloadAction<AccountActivationToken>
    ) {
      const { payload } = action;

      state.token.info = payload;
    },
    reset(state: ActivationTokenSlice) {
      state.token = {
        info: null,
        status: "idle",
        errors: null
      };

      state.activating = {
        status: "idle",
        errors: null
      };

      state.regen = {
        status: "idle",
        errors: null
      };
    }
  }
});

export const { setApiStatus, setApiErrors, setActivationToken, reset } =
  accountActivationStatusSlice.actions;
export default accountActivationStatusSlice.reducer;
