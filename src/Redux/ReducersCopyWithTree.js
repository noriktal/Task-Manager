import { createSelector } from "reselect";
import { combineReducers } from "redux";

//Initial States

const initTasks = [];

const initAssignees = {assignees: [], chosenAssignees: []};

const initStatuses = {statuses: [], chosenStatuses: []};

const initSearchTerm = "";




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
//Combined Reducer

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    assigneesContainer: assigneesReducer,
    statusesContainer: statusesReducer,
    searchTerm: searchTermReducer
    });

//Selectors

export const selectTasks = state => state.tasks;

export const selectAssignees = state => state.assigneesContainer.assignees;
export const selectChosenAssignees = state => state.assigneesContainer.chosenAssignees;
 
export const selectStatuses = state => state.statusesContainer.statuses;
export const selectChosenStatuses = state => state.statusesContainer.chosenStatuses;

export const selectSearchTerm = state => state.searchTerm;

export const selectChosenAssigneesIDs = createSelector(
    [selectChosenAssignees],
    (chosenAssignees) => chosenAssignees.map(assignee => assignee.id)
)

export const selectChosenStatusesIDs = createSelector(
    [selectChosenStatuses],
    (chosenStatuses) => chosenStatuses.map(status => status.id)
)

export const selectTasksByFilters = createSelector(
    [selectTasks, selectSearchTerm,selectChosenAssigneesIDs, selectChosenStatusesIDs],
    (tasks, searchTerm, chosenAssigneesIDs, chosenStatuses) => {
        
        return tasks.filter(task => (task.data.title.toLowerCase().includes(searchTerm) &&
                                    (task.data.assignees.some(assignee => chosenAssigneesIDs.includes(assignee))) &&
                                    (chosenStatuses.includes(task.data.status))
                            ));
    }
);

    //A selector to map from task-assignees ids to assignees names 
export const selectAssigneesByTask = createSelector(
  [selectTasksByFilters, selectAssignees], 
  (tasks, assignees) => {
      //taskAssignee is actually an id
      const taskAssigneeIDs = tasks.map(task => task.data.assignees); //assignee IDs array for each task
      const namesParentArray = taskAssigneeIDs.map(taskAssigneesArray => { //parent array of names
        const namesChildArray = taskAssigneesArray.map(taskAssigneeID => { //for each id- a name string
            let identifiedAssignee = assignees.find(assignee => assignee.id === taskAssigneeID);
            return `${identifiedAssignee.firstName} ${identifiedAssignee.lastName}`
        })
         return namesChildArray;
      })
      return namesParentArray;
  } 
)

  
    // Sorting the tasks hierarchically - two selectors: 1) for tree; 2) for sorted tasks array

            //I Building a tree of nested tasks - a variation of the algorithm suggested here: https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/

  export const selectTasksTree = createSelector(
    [selectTasks], 
    tasks => {
        
            //1.Creating an array of nodes(a node for each task : {ownID:"id", parentID:"pid"}) 
        const taskNodes = [];
        
        for(const task of tasks){
            if(task.pid){
                taskNodes.push({ownID:task.id, parentID: task.pid});
            }else{
                taskNodes.push({ownID:task.id, parentID: "table"});
            }
        }

            //1.1 Adding a "parent" node for tasks without parents- in order to have a single root element
      
        taskNodes.push({ownID: "table", parentID: null})

       
           // 2. Creating a mapping that will help identify parent task in the next step
       
        const idMapping = taskNodes.reduce((acc, node, i) => {
            acc[node.ownID] = i;
            return acc;
          }, {});

          //3.Creating the tree

          let root;
          taskNodes.forEach(node => {
            // Handling the root element
        if (node.parentID === null) {
            root = node;
            return;
        }
            // Locating the parent node
          const parentNode = taskNodes[idMapping[node.parentID]];
            // Adding current node to its parent's `children` array
          parentNode.children = [...(parentNode.children || []), node];
        });

        return root;
        
        
    });

    //II Sorting the tasks according to tree structure

    export const selectSortedTasks = createSelector(
        [selectTasksTree, selectTasks], 
        (root, tasks) => {


            //1. Sorting IDs

            const sortedTaskIDs = [];

            const pushChildren = (parent) => {
    
                if(parent.children){
                    //*Adding a "hasChildren" flag for conditional presentation in TableRow later
                    if(parent.parentID !== null ){
                        const parentTask = tasks.find(task => task.id === parent.ownID);
                        parentTask.hasChildren = true;
                    }
                    
                    parent.children.forEach(child => {
                        sortedTaskIDs.push(child.ownID);
                        
                        if(child.hasOwnProperty("children")){
                            pushChildren(child);
                        }
                    })
                }
            }
            
            pushChildren(root);

                //2. Sorting task objects
    
                const sortedTasks = [];
                
    
            sortedTaskIDs.forEach(id => {
                const currentTask = tasks.find(task => task.id === id);
                sortedTasks.push(currentTask);
            })
            return sortedTasks;
        })

        
        
        //Now same sorting as before, but only the filtered tasks for presentation

        export const selectSortedFilteredTasks = createSelector(
            [selectSortedTasks, selectTasksByFilters], 
            (allTasks, filteredTasks) => {

               const filteredIDs = filteredTasks.map(task => task.id);
               const sortedFilteredTasks = allTasks.filter(task => filteredIDs.includes(task.id))
               return sortedFilteredTasks;
            })



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