
// synchronous operation

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     tasksList : [],
//     selectedTask : {}
// }

// const tasksSlice = createSlice({
//     name:'tasksSlice',
//     initialState,
//     reducers:{
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


// // filter:
// //      This method iterates through the each element of the array and evaluates condition.
// //      It creates a new array containing only the elements that satisfy condition.
// //      This method basically used for creating and deleting the elements.  

// //      note: returns the new array of satisfied condition elements only
// //        1. Finding Specific Item

// // map
// //       method is designed to transform each element of an array
// //      For updating the element use map
// //      note: returns the new array of all the elements
// //      1. Updating Items
// //      2. Displaying a List of Items




// asynchronous operation using the json server

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tasksList : [],
    selectedTask : {},
    isLoading: false,
    error:''
}


const BASE_URL = 'http://localhost:8000/tasks'

// Get Thunk Action Creator

export const getTasksFromServer = createAsyncThunk(
    'tasks/getTasksFromServer', async (_, {rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error: 'No Tasks found'})
        }
    }
)



// Post Thunk Action creator

export const addTaskToServer = createAsyncThunk(
    
    'tasks/addTaskToServer', async (task, {rejectWithValue}) => {

        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }

        const response = await fetch(BASE_URL, options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error: 'Add Tasks failed'})
        }
    }
)



// PATCH Thunk Action creator

export const updateTaskInServer = createAsyncThunk(
    
    'tasks/updateTaskInServer', async (task, {rejectWithValue}) => {

        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }

        const response = await fetch(BASE_URL + '/' + task.id,  options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error: 'Update Task failed'})
        }
    }
)


const tasksSlice = createSlice({
    name:'tasksSlice',
    initialState,
    reducers:{
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
            .addCase(getTasksFromServer.rejected, (state, action) => {
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
                state.tasksList = state.tasksList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected, (state, action) => {
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
            .addCase(updateTaskInServer.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
            })
    }
})


export const { addTaskToList, removeTaskFromList, updateTaskFromList, setSelectedTask} = tasksSlice.actions
export default tasksSlice.reducer


