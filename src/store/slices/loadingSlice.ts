import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  fullPageLoading: Record<string, boolean>;
  isOpacityFooter: boolean;
  [key: string]: any; // For dynamic loading states
}

const initialState: LoadingState = {
  fullPageLoading: {},
  isOpacityFooter: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    enableLoader: (state, action: PayloadAction<string>) => {
      const actionType = action.payload;
      state[actionType] = true;
      state.fullPageLoading[actionType] = true;
    },

    disableLoader: (state, action: PayloadAction<string>) => {
      const actionType = action.payload;
      state[actionType] = false;
      state.fullPageLoading[actionType] = false;
    },

    setOpacityFooter: (state, action: PayloadAction<boolean>) => {
      state.isOpacityFooter = action.payload;
    },
  },
});

export const { enableLoader, disableLoader, setOpacityFooter } =
  loadingSlice.actions;

export type { LoadingState };
export default loadingSlice.reducer;
