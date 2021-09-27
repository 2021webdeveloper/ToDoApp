const router = require("express").Router();
const ToDo = require("../models/todoModel");
const User = require("../models/userModel");

//*** add toDos****//
router.route("/add").post(function (req, res) {
  let toDo = new ToDo(req.body);

  toDo.save((err, toDo) => {
    if (err) {
      return res.status(202).json({ error: "ToDo adding failure" });
    }
    if (toDo) {
      res.status(201).json({ toDo, msg: "ToDo added successfully!" });
    }
  });
});

//*** update toDos****//
router.route("/update").post(function (req, res) {
  try {
    ToDo.findById(req.body._id).then((toDo) => {
      toDo._id = req.body._id;
      toDo.title = req.body.title;
      toDo.status = req.body.status;
      toDo.taskDescription = req.body.taskDescription;
      toDo.assignedDate = req.body.assignedDate;
      toDo.assignedTime = req.body.assignedTime;
      toDo.priority = req.body.priority;

      toDo
        .save()
        .then(() => {
          res.status(201).json({ msg: "You've Updated the ToDo!" });
        })
        .catch((err) =>
          res.status(202).json({ error: "ToDo updating failed!" })
        );
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** get All todos ***//
router.get("/getAllToDos-all/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    await ToDo.find()
      .exec()
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    await res.status(500).json({ error: err.message });
  }
});

//*** get all toDos by user id ***//
router.get("/getAllToDos/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    await ToDo.find({ user_id: userId })
      .populate("user_id")
      .exec()
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    await res.status(500).json({ error: err.message });
  }
});

//*** get all active toDos by user id ***//
router.get("/getAllActiveToDos/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    await ToDo.find({ user_id: userId, status: "Active" })
      .populate("user_id")
      .exec()
      .then((item) => {
        res.status(500).json(item);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    await res.status(500).json({ error: err.message });
  }
});

//*** get all completed toDos by user id ***//
router.get("/getAllCompletedToDos/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    await ToDo.find({ user_id: userId, status: "Completed" })
      .populate("user_id")
      .exec()
      .then((item) => {
        res.status(500).json(item);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    await res.status(500).json({ error: err.message });
  }
});



//*** mark as completed  by user & toDos id  ***//
router.get("/markAsCompleted/:user_id/:todo_id", async (req, res) => {
  try {
    let userId = req.params.user_id;
    let toDoId = req.params.todo_id;
    await ToDo.updateOne(
      { _id: toDoId },
      {
        $set: {
          status: "Completed",
        },
      }
    ).then((sup) => {
      res.status(200).json({ msg: "Status updated successfully" });
    });
  } catch (err) {
    await res
      .status(400)
      .json({ error: "There was an error updating the status!" });
  }
});

//*** delete todos by id ***//
router.route("/delete/:id").delete(async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json({ msg: "Todo Deleted Successfully!" }))
      .catch((err) =>
        res.status(400).json({ error: "There was an error deleting Todo!" })
      );
  } catch (err) {
    await res.status(500).json({ error: err.message });
  }
});


module.exports = router;
