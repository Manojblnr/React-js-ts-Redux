// import React, { useState } from "react";
// import {
//     TableContainer,
//     Table,
//     TableHead,
//     TableCell,
//     TableBody,
//     TableRow,
//     IconButton
// } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store"; // Assuming RootState is the type of your Redux store's root state
// import UpdateDialog from "./UpdateDialog";
// import { setSelectedTask, removeTaskFromList, Task } from "../slices/tasksSlice";

// const TaskListTable = () => {
//     const dispatch = useDispatch();
//     const { tasksList } = useSelector((state: RootState) => state.tasks);
//     const [open, setOpen] = useState<boolean>(false);

//     const handleClickOpen = (task: Task) => {
//         console.log('edit is calling')
//         setOpen(true);
//         dispatch(setSelectedTask(task));
//     };

//     const handleClickClose = () => {
//         setOpen(false);
//     };

//     const handleDelete = (task: Task) => {
//         console.log('delete is calling', task);
//         dispatch(removeTaskFromList(task));
//         console.log('Task successfully deleted');
//     };

//     return (
//         <>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableCell>Id</TableCell>
//                         <TableCell>Task</TableCell>
//                         <TableCell>Description</TableCell>
//                         <TableCell>Actions</TableCell>
//                     </TableHead>
//                     <TableBody>
//                         {tasksList && tasksList.map((task, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{index}</TableCell>
//                                 <TableCell>{task.Task}</TableCell>
//                                 <TableCell>{task.Description}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleClickOpen(task)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton>
//                                         <DeleteIcon onClick={() => handleDelete(task)} />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <UpdateDialog open={open} handleClickClose={handleClickClose} />
//         </>
//     );
// };

// export default TaskListTable;



// JSON server


import React, { useEffect, useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store"; // Assuming RootState is the type of your Redux store's root state
import UpdateDialog from "./UpdateDialog";
import { removeTaskFromList, Task, getTasksFromServer, setSelectedTask, deleteTaskFromServer } from "../slices/tasksSlice";

const TaskListTable = () => {
    const { tasksList } = useSelector((state: RootState) => state.tasks);
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = (task: Task) => {
        console.log('edit is calling')
        setOpen(true);
        dispatch(setSelectedTask(task));
    };
    
    const handleClickClose = () => {
        setOpen(false);
    };
    
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getTasksFromServer())
    },[dispatch])



    const handleDelete = (task: Task) => {
        console.log('delete is calling', task);
        dispatch(deleteTaskFromServer(task))
        .then(() => {
            dispatch(removeTaskFromList(task))
        })
        console.log('Task successfully deleted');
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Id</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableHead>
                    <TableBody>
                        {tasksList && tasksList.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{task.Task}</TableCell>
                                <TableCell>{task.Description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleClickOpen(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon onClick={() => handleDelete(task)} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <UpdateDialog open={open} handleClickClose={handleClickClose} />
        </>
    );
};

export default TaskListTable;

