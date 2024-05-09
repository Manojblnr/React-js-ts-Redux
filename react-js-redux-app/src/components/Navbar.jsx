import { TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

  const {tasksList, error} = useSelector((state) => state.tasks)

  return (
    <>
        <Typography variant="h4" color={'blue'}>Project Management</Typography>
        <Typography variant="body1">{`Currently ${tasksList.length} tasks pending`}</Typography>
          {
            (error !== '' ? <Typography variant="body2" style={{color:'red'}}>{error}</Typography> : null)
          }
    </>
  )
};

export default Navbar;
