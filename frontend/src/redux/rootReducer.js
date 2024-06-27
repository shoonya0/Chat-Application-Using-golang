import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slice/app";

// slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',

    // whiteList:[],
    // blackList:[],
}

const rootReducers = combineReducers({
    app: appReducer,
});

export { rootPersistConfig, rootReducers };