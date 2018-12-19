
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

// Selector functions
const getProductFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getProductFeatureState,
  state => state.maskUserName
)

export const getCurrentUser = createSelector(
  getProductFeatureState,
  state => state.currentUser
)
