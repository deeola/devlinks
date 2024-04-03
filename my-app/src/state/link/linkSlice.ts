/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createSlice } from "@reduxjs/toolkit";
import { type MergedValues, type TLinkState } from "../../types";

const initialState: TLinkState = {
  links: []
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setAllPrompts: (state, action) => {
      state.links = action.payload;
    },
    addNewLink: (state, action) => {
      const { payload } = action;
      payload.forEach((prompt: any) => {
        const existingIndex = state.links.findIndex(
          (link) => link.id === prompt.id
        );
        if (existingIndex !== -1) {
          state.links[existingIndex] = prompt;
        } else {
          state.links.push(prompt);
        }
      });
    },
    removeLink: (state, action) => {
      state.links = state.links.filter((link) => link.id !== action.payload);
    }
  }
});

export const { setAllPrompts, addNewLink, removeLink } = linkSlice.actions;

export const selectAllLinks = (state: { link: { links: MergedValues[] } }) => state.link.links;

export default linkSlice.reducer;
