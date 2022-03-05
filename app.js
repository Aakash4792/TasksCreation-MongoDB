const mongoose = require("mongoose");
const Task = require("./models/tasksschema");

const dbURI = "mongodb+srv://aakashsivakumar02:25340210Mongodb!@cluster0.yadj7.mongodb.net/Cluster1?retryWrites=true&w=majority";


const createNewTask = async (desc,status) => {
    const newtask = new Task({
        description : desc,
        completed : status
    });
    await newtask.save();
}

const createTasks = async() => {
    let arr = [{desc:"task1",stat : false},{desc:"task2",stat : true},{desc:"task3",stat : false},{desc:"task4",stat : true}];
    for(let i = 0; i < arr.length; i++){
        await createNewTask(arr[i].desc,arr[i].stat);
    }
}
const readTasks = async() => {
    let ans = await Task.find({completed:false});
    return ans;
}
const updateTasks = async() => {
    let ans = await Task.updateMany({completed:false},{ $set: {completed: true} });
    return ans;
}
const perfomFunctions = async() => {

    //Creating Tasks
    await createTasks();
    console.log("4 Tasks created...");

    //Displaying all created tasks : 
    console.log("All created tasks : ");
    let alltasks = await Task.find();
    console.log(alltasks);

    //Reading incomplete tasks
    let incompletetasks = await readTasks();
    console.log("Incomplete tasks : ");
    console.log(incompletetasks);


    //Updating incomplete tasks as complete
    await updateTasks();
    console.log("Tasks updated");
    console.log("All tasks after updation: ");
    alltasks = await Task.find();
    console.log(alltasks);

    //Deleting task1 with its id
    let task1 = await Task.findOne({description:"task1"});
    let task1id = task1._id;
    let deleteddoc = await Task.findByIdAndDelete(task1id);
    console.log("Deleted document : ");
    console.log(deleteddoc);

    console.log("ALl tasks after deletion: ");
    alltasks = await Task.find();
    console.log(alltasks);


}
mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("connected");
    perfomFunctions();
  })
  .catch((err) => {
    console.log(err);
  });
