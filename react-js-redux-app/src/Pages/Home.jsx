import { Stack} from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import TaskListTable from "../components/TaskListTable";
import UpdateDialog from "../components/UpdateDialog";

const Home = () => {
  return (
    <>
        <Stack spacing={5}>
            <Navbar/>
            <Form/>
            <TaskListTable/>

            <UpdateDialog/>
        </Stack>
    </>
  )
};

export default Home;
