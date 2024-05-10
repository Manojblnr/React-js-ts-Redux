// import { TableContainer,Table, TableHead, TableCell, TableBody, TableRow,  IconButton } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import UpdateDialog from "./UpdateDialog";
// import { setSelectedTask, removeTaskFromList } from "../slices/tasksSlice";

// const TaskListTable = () => {

//     const {tasksList} = useSelector((state) => state.tasks)

//     const [open, setOpen] = useState(false)

//     const handleClickOpen = (task) => {
//         setOpen(true)
//         dispatch(setSelectedTask(task))
//     }

//     const handleClickClose = () => {
//         setOpen(false)
//     }
    
//     const dispatch = useDispatch()

//     const handleDelete = (task) => {
//         console.log('delete is calling', task)
//         dispatch(removeTaskFromList(task))
//         console.log('Task successfully deleted')
//     }

//   return (
//     <>
//         <TableContainer>
//             <Table>
//                 <TableHead>
//                     <TableCell>Id</TableCell>
//                     <TableCell>Task</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Actions</TableCell> 
//                 </TableHead>
//                 <TableBody>
//                     {
//                         tasksList && tasksList.map((task, index) => {
//                             return(
//                                 <TableRow key={index}>
//                                 <TableCell>{index}</TableCell>
//                                 <TableCell>{task.Task}</TableCell>
//                                 <TableCell>{task.Description}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleClickOpen(task)}>
//                                         <EditIcon></EditIcon>
//                                     </IconButton>
//                                     <IconButton>
//                                         <DeleteIcon onClick={() => handleDelete(task)}></DeleteIcon>
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                             )
//                         })
//                     }
//                 </TableBody>
//             </Table>
//         </TableContainer>

//         <UpdateDialog open={open} handleClickClose={handleClickClose}/>
//     </>
//   )
// };

// export default TaskListTable;



// const TableData  = [
//     {   
//         id:1,
//         Task:'Task one',
//         Description:'Description 1'
//     },
//     {
//         id:2,
//         Task:'Task Two',
//         Description:'Description 2'
//     },
//     {
//         id:3,
//         Task:'Task Three',
//         Description:'Description 3'
//     }

// ]




// API json server

import { TableContainer,Table, TableHead, TableCell, TableBody, TableRow,  IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UpdateDialog from "./UpdateDialog";
import { setSelectedTask, removeTaskFromList, getTasksFromServer, deleteTaskFromServer } from "../slices/tasksSlice";

const TaskListTable = () => {

    const {tasksList} = useSelector((state) => state.tasks)

    const [open, setOpen] = useState(false)

    const handleClickOpen = (task) => {
        setOpen(true)
        dispatch(setSelectedTask(task))
    }

    const handleClickClose = () => {
        setOpen(false)
    }
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTasksFromServer())
    },[dispatch])



    const handleDelete = (task) => {
        console.log('delete is calling', task)
        dispatch(deleteTaskFromServer(task))
        .then(() => {
            dispatch(removeTaskFromList(task))
        })
        console.log('Task successfully deleted')
    }

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
                    {
                        tasksList && tasksList.map((task, index) => {
                            return(
                                <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{task.Task}</TableCell>
                                <TableCell>{task.Description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleClickOpen(task)}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon onClick={() => handleDelete(task)}></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>

        <UpdateDialog open={open} handleClickClose={handleClickClose}/>
    </>
  )
};

export default TaskListTable;



const TableData  = [
    {   
        id:1,
        Task:'Task one',
        Description:'Description 1'
    },
    {
        id:2,
        Task:'Task Two',
        Description:'Description 2'
    },
    {
        id:3,
        Task:'Task Three',
        Description:'Description 3'
    }

]