const uuidv4 = require("uuid").v4;

let lists = [];

exports.findAll = async () => {
    return lists;
}

exports.addTask = async ({task}) => {
    const newList = {
        _id: uuidv4(),
        task: task,
        doneStatus: false,
      };
      lists.push(newList);
      return newList;
} 

exports.updateStatus = async ({id, task, doneStatus, actionType}) => {
    if (actionType === "byID") {
        const list = lists.find(lt => lt._id == id);
        // if (list) {
        //   return {message: "No record found!"};
        // } else {
        //   list.doneStatus = doneStatus || list.doneStatus;
        //   list.task = task || list.task;
        //   return list;
        // }
        
        const idx = lists.findIndex(list => list._id == id);
        if (idx > -1) {
          lists.splice(idx, 1, {...list, task: task, doneStatus:doneStatus});
          return {...list, task: task, doneStatus:doneStatus}
        } else {
          return {message: "No record found!"};
        }    
    }  
}

exports.deleteTask = async ({id, actionType}) => {
    if (actionType === "deleteAll") {
        lists = [];
        return {message: "Records are deleted!"};
      } else {
          const idx = lists.findIndex(list => list._id == id)
          if (idx > -1) {
            lists.splice(idx, 1);
            return {message: "Record is deleted!"};
          } else {
            return {message: "No record found!"};
          }
      }
}