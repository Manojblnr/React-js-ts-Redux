// import { Button, FormControl, Stack, TextField } from "@mui/material";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTaskToList } from "../slices/tasksSlice";

// const Form = () => {
    
//     const dispatch = useDispatch()

//     const [Task, setTask] = useState('')
//     const [Description, setDescription] = useState('')

//     const addTask = (e) => {
//         e.preventDefault()
//         console.log("Task", Task);
//         console.log('Description', Description)
//         dispatch(addTaskToList({Task, Description}))

//         setTask('')
//         setDescription('')
//     }

//   return (
//     <>
//         <FormControl>
//             <Stack direction='column' spacing={2}>
//                 <TextField label='Task Name'size="small" sx={{width:'500px'}} value={Task} onChange={(e) => setTask(e.target.value)}/>
//                 <TextField label='Task Description' size="small" sx={{width:'500px'}} value={Description} onChange={(e) => setDescription(e.target.value)}/>
//                 <Stack alignItems={"flex-end"}>
//                     <Button variant="contained" size="small" sx={{width:'100px'}} onClick={(e) => addTask(e)}>Add</Button>
//                 </Stack>
//             </Stack>
//         </FormControl> 
//     </>
//   )
// };

// export default Form;




// json server


import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../slices/tasksSlice";

const Form = () => {
    
    const dispatch = useDispatch()

    const [Task, setTask] = useState('')
    const [Description, setDescription] = useState('')

    const addTask = (e) => {
        e.preventDefault()
        console.log("Task", Task);
        console.log('Description', Description)
        dispatch(addTaskToServer({Task, Description}))

        setTask('')
        setDescription('')
    }

  return (
    <>
        <FormControl>
            <Stack direction='column' spacing={2}>
                <TextField label='Task Name'size="small" sx={{width:'500px'}} value={Task} onChange={(e) => setTask(e.target.value)}/>
                <TextField label='Task Description' size="small" sx={{width:'500px'}} value={Description} onChange={(e) => setDescription(e.target.value)}/>
                <Stack alignItems={"flex-end"}>
                    <Button variant="contained" size="small" sx={{width:'100px'}} onClick={(e) => addTask(e)}>Add</Button>
                </Stack>
            </Stack>
        </FormControl> 
    </>
  )
};

export default Form;
