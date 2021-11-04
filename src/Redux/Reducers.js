import { combineReducers } from "redux";

//Initial States

const initTasks = [];

const initAssignees = {assignees: [], chosenAssignees: []};

const initStatuses = {statuses: [], chosenStatuses: []};

const initSearchTerm = "";

const initClickedTaskID = "";


//Reducers

export const tasksReducer = (state = initTasks, action) => {
    switch(action.type){
        case "LOAD_TASKS":
            return action.tasks;
        case "CHANGE_STATUS":
            const chosenTask = state.find(task => task.id === action.data.taskID);
            const chosenIndex = state.findIndex(task => task.id === action.data.taskID);
            const copiedList = [...state];
            const updatedTask = {...chosenTask, data:{...chosenTask.data, status:action.data.status}};
            copiedList[chosenIndex] = updatedTask;            
            return copiedList;

        default:
            return state;
    }
}

export const assigneesReducer = (state = initAssignees, action) => {
    switch(action.type){
        case "LOAD_ASSIGNEES":
            return {assignees: action.assignees, chosenAssignees: action.assignees};
        case "CHANGE_CHOSEN_ASSIGNEES":
            return {assignees: [...state.assignees], chosenAssignees: action.assignees}
        default:
            return state;
    }
}

export const statusesReducer = (state = initStatuses, action) => {
    switch(action.type){
        case "LOAD_STATUSES":
            return {statuses: action.statuses, chosenStatuses: action.statuses}
        case "CHANGE_CHOSEN_STATUSES":
            return {statuses: [...state.statuses], chosenStatuses: action.statuses}
        default:
            return state;
    }
}

export const searchTermReducer = (state = initSearchTerm, action) => {

    switch(action.type){
        case "CHANGE_SEARCH_TERM":
            return action.searchTerm;
        default:
            return state;
    }
}

export const clickedTaskReducer = (state = initClickedTaskID, action) =>{
    switch(action.type){
        case "CHANGE_CLICKED_TASK":
            return action.taskID;
        default:
            return state;
    }
}


//Combined Reducer

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    assigneesContainer: assigneesReducer,
    statusesContainer: statusesReducer,
    searchTerm: searchTermReducer,
    clickedTask: clickedTaskReducer
    });

