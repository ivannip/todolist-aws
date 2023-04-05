const list = require("../models/list");

exports.addTask = async ({task}) => {
      const newList = new list({
        task: task,
        doneStatus: false,
      });
      try {
        const savedList = await newList.save();
        return savedList;
      } catch (err) {
          throw err
      }
}

exports.updateStatus = async ({id, task, doneStatus, actionType}) => {
    try {
        if (actionType === "byID") {
            const updatedList = await list.findByIdAndUpdate({ _id: id }, { $set: {task, doneStatus} });
            return updatedList;
        }
    } catch (err) {
        throw err
    }
}

exports.findAll = async () => {
    try {
        const foundLists = list.find({});
        return foundLists
    } catch (err) {
        throw err;
    }
}

exports.deleteTask = async ({id, actionType}) => {
        if (actionType === "deleteAll") {
            list.deleteMany()
            .then(() => {
              return {message: "Records are deleted!"};
            })
            .catch((err) => {
                throw err
            });
          } else {
            list.findByIdAndDelete(id)
            .then(() => {
                return {message: "Record is deleted!"};
            })
            .catch((err) => {
              throw err
            });
          }
}