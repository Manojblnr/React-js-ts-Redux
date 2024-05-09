// import React, { useState } from "react";
// import { Button, FormControl, Stack, TextField } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { addTaskToList } from "../slices/tasksSlice";

// const Form = () => {
//     const dispatch = useDispatch();

//     const [Task, setTask] = useState<string>('');
//     const [Description, setDescription] = useState<string>('');

//     const addTask = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log("Task", Task);
//         console.log('Description', Description);
//         dispatch(addTaskToList({ Task, Description }));

//         setTask('');
//         setDescription('');
//     };

//     return (
//         <>
//             <FormControl component="form" onSubmit={addTask}>
//                 <Stack direction='column' spacing={2}>
//                     <TextField
//                         label='Task Name'
//                         size="small"
//                         sx={{ width: '500px' }}
//                         value={Task}
//                         onChange={(e) => setTask(e.target.value)}
//                     />
//                     <TextField
//                         label='Task Description'
//                         size="small"
//                         sx={{ width: '500px' }}
//                         value={Description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     <Stack alignItems={"flex-end"}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             size="small"
//                             sx={{ width: '100px' }}
//                         >
//                             Add
//                         </Button>
//                     </Stack>
//                 </Stack>
//             </FormControl>
//         </>
//     );
// };

// export default Form;




// JSON server

import React, { useState } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTaskToList, addTaskToServer } from "../slices/tasksSlice";
import { AppDispatch } from "../store";

const Form = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [Task, setTask] = useState<string>('');
    const [Description, setDescription] = useState<string>('');
    const [id, setId] = useState(0) 


    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Task", Task);
        console.log('Description', Description);
        dispatch(addTaskToServer({id, Task, Description}));

        setTask('');
        setDescription('');
    };

    return (
        <>
            <FormControl component="form" onSubmit={addTask}>
                <Stack direction='column' spacing={2}>
                    <TextField
                        label='Task Name'
                        size="small"
                        sx={{ width: '500px' }}
                        value={Task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <TextField
                        label='Task Description'
                        size="small"
                        sx={{ width: '500px' }}
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Stack alignItems={"flex-end"}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            sx={{ width: '100px' }}
                        >
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </>
    );
};

export default Form;
