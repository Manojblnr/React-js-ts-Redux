// import React, { useEffect, useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Button,
//     Stack,
//     DialogActions
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store"; // Assuming RootState is the type of your Redux store's root state
// import { updateTaskFromList, Task } from "../slices/tasksSlice";

// interface UpdateDialogProps {
//     open: boolean;
//     handleClickClose: () => void;
// }

// const UpdateDialog = ({ open, handleClickClose }: UpdateDialogProps) => {
//     const [Task, setTask] = useState<string>('');
//     const [Description, setDescription] = useState<string>('');
//     const [id, setId] = useState<number>(0);

//     const dispatch = useDispatch();

//     const handleUpdateTask = () => {
//         console.log('handle update calling');
//         dispatch(updateTaskFromList({ id, Task, Description }));
//         handleClickClose();
//     };

//     const { selectedTask } = useSelector((state: RootState) => state.tasks);

//     useEffect(() => {
//         console.log('open dialog side effect');
//         if (Object.keys(selectedTask).length !== 0) {
//             setTask(selectedTask.Task);
//             setDescription(selectedTask.Description);
//             setId(selectedTask.id || 0);
//             console.log('value', selectedTask.Task);
//         }
//         console.log('data', selectedTask);
//     }, [selectedTask]);

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 onClose={handleClickClose}
//                 PaperProps={{
//                     component: 'form',
//                     onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => {
//                         event.preventDefault();
//                         const formData = new FormData(event.currentTarget);
//                         const formJson: any = Object.fromEntries(formData.entries());
//                         const task = formJson.task;
//                         console.log(task, 'task');
//                         const description = formJson.description;
//                         console.log('description', description);
//                         handleClickClose();
//                     }
//                 }}
//                 fullWidth={true}
//             >
//                 <DialogContent>
//                     <DialogTitle sx={{ textAlign: 'center' }}>Update Task</DialogTitle>
//                     <Stack spacing={2}>
//                         <TextField
//                             label='Task'
//                             size="small"
//                             fullWidth
//                             value={Task}
//                             onChange={(e) => setTask(e.target.value)}
//                         />
//                         <TextField
//                             label='Description'
//                             size="small"
//                             fullWidth
//                             value={Description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </Stack>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant="contained" onClick={handleUpdateTask}>update</Button>
//                     <Button variant="outlined" onClick={handleClickClose}>cancel</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default UpdateDialog;





// JSON server

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Stack,
    DialogActions
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store"; // Assuming RootState is the type of your Redux store's root state
import { updateTaskInServer } from "../slices/tasksSlice";

interface UpdateDialogProps {
    open: boolean;
    handleClickClose: () => void;
}

const UpdateDialog = ({ open, handleClickClose }: UpdateDialogProps) => {
    const [Task, setTask] = useState<string>('');
    const [Description, setDescription] = useState<string>('');
    const [id, setId] = useState<number>(0);

    const dispatch = useDispatch<AppDispatch>();

    const handleUpdateTask = () => {
        console.log('handle update calling');
        dispatch(updateTaskInServer({ id, Task, Description }));
        handleClickClose();
    };

    const { selectedTask } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        console.log('open dialog side effect');
        if (Object.keys(selectedTask).length !== 0) {
            setTask(selectedTask.Task);
            setDescription(selectedTask.Description);
            setId(selectedTask.id as number);
            console.log('value', selectedTask.Task);
        }
        console.log('data', selectedTask);
    }, [selectedTask]);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClickClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson: any = Object.fromEntries(formData.entries());
                        const task = formJson.task;
                        console.log(task, 'task');
                        const description = formJson.description;
                        console.log('description', description);
                        handleClickClose();
                    }
                }}
                fullWidth={true}
            >
                <DialogContent>
                    <DialogTitle sx={{ textAlign: 'center' }}>Update Task</DialogTitle>
                    <Stack spacing={2}>
                        <TextField
                            label='Task'
                            size="small"
                            fullWidth
                            value={Task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <TextField
                            label='Description'
                            size="small"
                            fullWidth
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleUpdateTask}>update</Button>
                    <Button variant="outlined" onClick={handleClickClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateDialog;
