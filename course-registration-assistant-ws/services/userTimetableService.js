const { UserTimetable} = require('../models/index')
const mongoose = require('mongoose');
const { updateOne } = require('../models/timetable');

const createNewTimetable = async (newTimetable) => {
  const userTimetable = await UserTimetable.findOne({
    userId: new mongoose.Types.ObjectId(newTimetable.userId)
  });
  if (userTimetable !== null) {
    
    userTimetable.timetable.push(newTimetable);
    await UserTimetable.findOneAndUpdate(userTimetable);
    return UserTimetable.findOne({
      userId: new mongoose.Types.ObjectId(newTimetable.userId)
    });
  } else {
    const newUserTimetable = await UserTimetable.create(newTimetable);
    newUserTimetable.timetable.push(newTimetable);
    await UserTimetable.findOneAndUpdate(newUserTimetable);
    return UserTimetable.findOne({
      userId: new mongoose.Types.ObjectId(newTimetable.userId)
    });
  }
  
}

const getAllTimetable = async () => {
  return UserTimetable.find();
}

const getAllTimetableByUserId = async (userId) => {
  return UserTimetable.findOne({"userId": new mongoose.Types.ObjectId(userId)});
}

const updateTimetable = async(id, newTimetable) => {
  return UserTimetable.updateOne({
    timetable: { $elemMatch: {"_id": new mongoose.Types.ObjectId(id)}}
  }, {
    $set: {
      "timetable.$.courses": newTimetable.courses,
      // "timetable.$.name": newTimetable.name,
      // "timetable.$.year": newTimetable.year,
      // "timetable.$.semester": newTimetable.semester
    }
  })

}

module.exports = {
  createNewTimetable,
  getAllTimetable,
  getAllTimetableByUserId,
  updateTimetable
}
