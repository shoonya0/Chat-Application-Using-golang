// configureStore used to make our code much cleaner and easier to read
import { configureStore } from '@reduxjs/toolkit';

// the use of useSelector and useDispatch hooks from react-redux library is to access the Redux store and dispatch actions
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

// by this our data do not lost even if we refresh our page
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducers } from './rootReducer';

// here we are using local storage as our storage
const store = configureStore({
    // here we are using persistReducer to persist our data means to store our data in local storage
    reducer: persistReducer(rootPersistConfig, rootReducers),

    // middleware is a function that can run before an action is dispatched to a reducer here immutableCheck and serializableCheck is set to false because we are using local storage to store our data
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }),
});

// here we are using persistStore to persist our data means to store our data in local storage
const persistor = persistStore(store);

// here we are using dispatch to dispatch our actions
const { dispatch } = store;

// here we are using useSelector to access the Redux store
const useSelector = useAppSelector;

// here we are using useDispatch to dispatch our actions
const useDispatch = () => useAppDispatch();

export { store, persistor, useSelector, useDispatch, dispatch };