import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {RootState}  from "../store"; // Assuming RootState is the type of your Redux store's root state

const Navbar = () => {
    const { tasksList, error } = useSelector((state: RootState) => state.tasks);

    return (
        <>
            <Typography variant="h4" color={'blue'}>Project Management</Typography>
            <Typography variant="body1">{`Currently ${tasksList.length} tasks pending`}</Typography>
            {
                (error !== '' ? <Typography variant="body2" style={{color:'red'}}>{error}</Typography> : null)
            }
        </>
    );
};

export default Navbar;
