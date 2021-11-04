
//Action Creators

  //1. For Tasks Reducer

  export const loadTasks = (tasks) => {
    return{
        type:"LOAD_TASKS",
        tasks: tasks
    }
}

export const changeTaskStatus = (data) => {
    return{
        type:"CHANGE_STATUS",
        data: data
    }
}

    //2. For Assignees Reducer 

export const loadAssignees = (assignees) => {
    return{
        type:"LOAD_ASSIGNEES",
        assignees: assignees
    }
}

export const changeChosenAssignees = (filteredAssignees) => {
    return{
        type: "CHANGE_CHOSEN_ASSIGNEES",
        assignees: filteredAssignees
    }
}


//3. For Statuses Reducer 

export const loadStatuses = (statuses) => {
    return{
        type:"LOAD_STATUSES",
        statuses: statuses
    }
}

export const changeChosenStatuses = (filteredStatuses) => {
    return{
        type: "CHANGE_CHOSEN_STATUSES",
        statuses: filteredStatuses
    }
}

    //4. For searchTerm Reducer

export const changeSearchTerm = (searchTerm) => {

    return{
        type: "CHANGE_SEARCH_TERM",
        searchTerm: searchTerm
    }
        
}

//5. For clicked task reducer 
export const changeClickedTask = (taskID) => {

    return{
        type: "CHANGE_CLICKED_TASK",
        taskID: taskID
    }
        
}
