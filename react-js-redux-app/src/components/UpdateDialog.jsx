// import { Dialog, DialogContent, DialogTitle, TextField, Button, Stack, DialogActions } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { updateTaskFromList } from "../slices/tasksSlice";

// const UpdateDialog = ({open, handleClickClose}) => {

//     const [Task, setTask] = useState('')
//     const [Description, setDescription] = useState('')
//     const [id, setId] = useState(0) 

//     const dispatch = useDispatch()

//     const handleUpdateTask = () => {
//         console.log('handle update calling')
//         dispatch(updateTaskFromList({id, Task, Description}))
//         handleClickClose()
//     } 
    
//     const { selectedTask } = useSelector((state) => state.tasks)

//     useEffect(() => {
//         console.log('open dialog side effect ')
//         if(Object.keys(selectedTask).length !== 0){
//             setTask(selectedTask.Task)
//             setDescription(selectedTask.Description)
//             setId(selectedTask.id)
//             console.log('value',selectedTask.Task)
//         }
//         console.log('data', selectedTask)
//     },[selectedTask])

//   return (
//     <>
//         <Dialog
//         open={open}
//         onClose={handleClickClose}
//         PaperProps={{
//             component: 'form',
//             onSubmit: (event) => {
//                 event.preventDefault();
//                 const formData = new formData(event.currentTarget);
//                 const formJson = Object.fromEntries(formData.entries())
//                 const task = formJson.task
//                 console.log(task, 'task')
//                 const description = formJson.description
//                 console.log('description', description) 
//                 handleClickClose();
//             }
//         }}
//         fullWidth='xl' 
//         >
//             <DialogContent>
//             <DialogTitle sx={{textAlign:'center'}}>Update Task</DialogTitle>
//                     <Stack spacing={2}>
//                         <TextField label='Task' size="small" fullWidth value={Task} onChange={(e) => setTask(e.target.value)}/>
//                         <TextField label='Description' size="small" fullWidth value={Description} onChange={(e) => setDescription(e.target.value)}/>
//                     </Stack>
//             </DialogContent>
//             <DialogActions>
//                 <Button variant="contained" onClick={handleUpdateTask}>update</Button>
//                 <Button variant="outlined" onClick={handleClickClose}>cancel</Button>
//             </DialogActions>
//         </Dialog>
//     </>
//   )
// };

// export default UpdateDialog;




// JSON server


import { Dialog, DialogContent, DialogTitle, TextField, Button, Stack, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateTaskInServer } from "../slices/tasksSlice";

const UpdateDialog = ({open, handleClickClose}) => {

    const [Task, setTask] = useState('')
    const [Description, setDescription] = useState('')
    const [id, setId] = useState(0) 

    const dispatch = useDispatch()

    const handleUpdateTask = () => {
        console.log('handle update calling')
        dispatch(updateTaskInServer({id, Task, Description}))
        handleClickClose()
    } 
    
    const { selectedTask } = useSelector((state) => state.tasks)

    useEffect(() => {
        console.log('open dialog side effect ')
        if(Object.keys(selectedTask).length !== 0){
            setTask(selectedTask.Task)
            setDescription(selectedTask.Description)
            setId(selectedTask.id)
            console.log('value',selectedTask.Task)
        }
        console.log('data', selectedTask)
    },[selectedTask])

  return (
    <>
        <Dialog
        open={open}
        onClose={handleClickClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new formData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries())
                const task = formJson.task
                console.log(task, 'task')
                const description = formJson.description
                console.log('description', description) 
                handleClickClose();
            }
        }}
        fullWidth='xl' 
        >
            <DialogContent>
            <DialogTitle sx={{textAlign:'center'}}>Update Task</DialogTitle>
                    <Stack spacing={2}>
                        <TextField label='Task' size="small" fullWidth value={Task} onChange={(e) => setTask(e.target.value)}/>
                        <TextField label='Description' size="small" fullWidth value={Description} onChange={(e) => setDescription(e.target.value)}/>
                    </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleUpdateTask}>update</Button>
                <Button variant="outlined" onClick={handleClickClose}>cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
};

export default UpdateDialog;
