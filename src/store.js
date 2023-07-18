import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./states/login.state";
import authApi from "./services/auth.service";
import userSlice from "./states/user.state";
import noteApi from "./services/notes.service"
import userApi from "./services/user.service";
import ratingApi from "./services/rating.service";
import dashboardApi from "./services/dashboard.service";


export default configureStore({
    reducer: {
        [loginSlice.name]: loginSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userSlice.name]: userSlice.reducer,
        [noteApi.reducerPath]: noteApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ratingApi.reducerPath]: ratingApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
        authApi.middleware, noteApi.middleware, userApi.middleware, ratingApi.middleware, dashboardApi.middleware
    )
})
