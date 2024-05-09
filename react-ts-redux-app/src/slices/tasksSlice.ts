// import { createSlice } from "@reduxjs/toolkit";


// export type Task = {
//     id:number
//     Task: string
//     Description: string
// }


// export type TasksState = {
//     tasksList: Task[];
//     selectedTask: Task;
// }
// const initialState: TasksState = {
//     tasksList: [],
//     selectedTask: {
//         id:0,
//         Task:'',
//         Description: ''
//     }
// }

// const tasksSlice  = createSlice({
//     name : 'tasksSlice',
//     initialState,
//     reducers :{
//         addTaskToList: (state, action) => {
//             const num = Math.random() * 100 // random id generation
//             const id = num.toFixed(0)
//             let task = {...action.payload, id}
//             state.tasksList.push(task)
//         },
//         removeTaskFromList: (state, action) => {
//             state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)    
//         },
//         updateTaskFromList: (state, action) => {
//             state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
//         },
//         setSelectedTask: (state, action) => {
//             state.selectedTask = action.payload
//         }

//     }
// })


// export const { addTaskToList, removeTaskFromList, updateTaskFromList, setSelectedTask} = tasksSlice.actions
// export default tasksSlice.reducer



// export type RootState = ReturnType<typeof tasksSlice.reducer>;




// JSON server



import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


export type Task = {
    id:number
    Task: string
    Description: string
}


export type TasksState = {
    tasksList: Task[];
    selectedTask: Task;
    isLoading: boolean;
    error: string  
}
const initialState: TasksState = {
    tasksList: [],
    selectedTask: {
        id:0,
        Task:'',
        Description: ''
    },
    isLoading:false,
    error:''

}


const BASE_URL = 'http://localhost:2000/tasks'

// Get Thunk Action Creator

export const getTasksFromServer = createAsyncThunk(
    'tasks/getTasksFromServer', async (_, {rejectWithValue}) => {
        const response = await fetch(BASE_URL)

        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'No tasks found'})
        }
    }
)


// Post Thunk Action Creator

export const addTaskToServer = createAsyncThunk(
    'tasks/addTaskToServer', async (task:Task, {rejectWithValue}) => {
        const options = {
            method: 'POST',
            body:JSON.stringify(task),
            Headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const response = await fetch(BASE_URL, options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error: 'Add Task is Failed'})
        }
    }
)

// PATCH Thunk Action creator

export const updateTaskInServer = createAsyncThunk(
    
    'tasks/updateTaskInServer', async (task:Task, {rejectWithValue}) => {

        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }
        console.log('id', task.id)
        const response = await fetch(BASE_URL + '/' + task.id,  options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error: 'Update Task failed'})
        }
    }
)




const tasksSlice  = createSlice({
    name : 'tasksSlice',
    initialState,
    reducers :{
        addTaskToList: (state, action) => {
            const num = Math.random() * 100 // random id generation
            const id = num.toFixed(0)
            let task = {...action.payload, id}
            state.tasksList.push(task)
        },
        removeTaskFromList: (state, action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)    
        },
        updateTaskFromList: (state, action) => {
            state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        }

    },

    extraReducers:(builder) => {
        builder 
            .addCase(getTasksFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasksFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasksList = action.payload
            })
            .addCase(getTasksFromServer.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.tasksList = []
                state.error = action.payload.error
            })

            // addTaskToServer
            .addCase(addTaskToServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTaskToServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasksList = [...state.tasksList, action.payload]
            })
            .addCase(addTaskToServer.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = action.payload.error
            })  

            // updateTaskInServer
            .addCase(updateTaskInServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTaskInServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTaskInServer.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = action.payload.error
            })
    }
})


export const { addTaskToList, removeTaskFromList, updateTaskFromList, setSelectedTask} = tasksSlice.actions
export default tasksSlice.reducer



export type RootState = ReturnType<typeof tasksSlice.reducer>;

