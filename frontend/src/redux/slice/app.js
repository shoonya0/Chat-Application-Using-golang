import { createSlice } from "@reduxjs/toolkit";
// 

import { dispatch } from "../store.js";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // CONTACT, STARRED ,SHARED
    }
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSidebar(currState, action) {
            currState.sidebar.open = !currState.sidebar.open;
        },
        updateSidebarType(currState, action) {
            currState.sidebar.type = action.payload.type;
        }
    }
});

// Reducer
export default slice.reducer;

// thunk function to perform async action/function
export function ToggleSidebar() {
    return async () => {
        dispatch(slice.actions.toggleSidebar());
    }
}

export function UpdateSidebarType(type) {
    return async () => {
        dispatch(slice.actions.updateSidebarType({ type, }))
    }
}
