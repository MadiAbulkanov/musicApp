import { combineReducers } from "@reduxjs/toolkit";
import artistSlice from "../features/artists/artists.slice";
import albumSlice from "../features/albums/albums.slice";
import trackSlice from "../features/tracks/tracks.slice";
import userSlice from "../features/user/user.slice";
import trackHistorySlice from "../features/trackHistory/trackHistory.slice";

export const rootReducer = combineReducers({
    [artistSlice.name]: artistSlice.reducer,
    [albumSlice.name]: albumSlice.reducer,
    [trackSlice.name]: trackSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [trackHistorySlice.name]: trackHistorySlice.reducer,
});