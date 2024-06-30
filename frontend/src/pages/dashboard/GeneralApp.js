import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";


const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app)

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>

      {/* Chats */}
      <Chats />

      {/* Conversation */}
      <Box sx={{ height: "100%", width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)", backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper }}>
        <Conversation />
      </Box>

      {console.log(sidebar.type === "CONTACT")}
      {console.log(sidebar.type)}

      {/* contact / sidebar */}
      {/* here I have implemented imiditily invoked function expression {IIFE} to render the sidebar component based on the type of the sidebar */}
      {sidebar.open &&
        (() => {
          console.log(sidebar.type === "CONTACT")
          switch (sidebar.type) {
            case 'CONTACT':
              return <Contact />;
            case 'STARRED':
              // return <StarredMessages />;
              break;
            case "SHARED":
              return <SharedMessages />;
            default:
              return <Contact />;
          }
        })()
      }
    </Stack>
  );
};

export default GeneralApp;
