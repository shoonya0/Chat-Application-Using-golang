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
// here dispatch is imported from store.js to dispatch the action to the reducer
export function ToggleSidebar() {
    return async () => {
        dispatch(slice.actions.toggleSidebar());
    }
}

export function UpdateSidebarType(type) {
    return async () => {
        dispatch(
            // here updateSidebarType is the action which is used to update the type of the sidebar
            slice.actions.updateSidebarType({ type, })
        )
    }
}
