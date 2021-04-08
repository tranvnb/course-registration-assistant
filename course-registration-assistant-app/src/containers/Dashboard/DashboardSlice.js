import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CourseService from "../../services/CourseService";
import ScheduleService from "../../services/ScheduleService/index";

export const getAllCourses = createAsyncThunk('courses/getAll', (data = {}, thunkAPI) => {
  // Skipping check duplicated requests
  return CourseService.getAllCourses()
    .then(courses => courses)
    .catch(error => {
      return thunkAPI.rejectWithValue({ message: error });
    })
});

export const getUserSchedules = createAsyncThunk('user/getSchedules', (username, thunkAPI) => {
  // Skipping check duplicated requests
  return ScheduleService.getUserSchedules(username)
    .then(schedules => schedules)
    .catch(error => {
      return thunkAPI.rejectWithValue({ message: error });
    })
});

const initialState = {
  courses: [], // all course that we have
  current_schedule: [], // selected courses for current building timetable
  schedules: [], // all the schedules/timetables the user has built
  clickedCourseCRN: "",
  error: null
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    selectCourse: (state, action) => {
      if (state.courses.length > 0) {
        const addedCourse = state.courses.find(c => c.CRN === action.payload);
        let newData = []
        if (state.current_schedule.length === 0) {
          newData.push(addedCourse);
        } else {
          newData = state.current_schedule;
          state.current_schedule.forEach(currCourse => {
            currCourse.days.forEach(currCourseDay => {
              addedCourse.days.forEach(addCourseDay => {
                if (addCourseDay.day.toLowerCase() === currCourseDay.day.toLowerCase()) {
                  // Please note the exclamation mark
                  if (!(addCourseDay.offset + addCourseDay.duration <= currCourseDay.offset || addCourseDay.offset >= currCourseDay.offset + currCourseDay.duration)) {
                    currCourseDay.numCourseInGroup++
                    if (addCourseDay.numCourseInGroup < currCourseDay.numCourseInGroup) {
                      addCourseDay.numCourseInGroup = currCourseDay.numCourseInGroup;
                    }
                    if (addCourseDay.indexInGroup <= currCourseDay.indexInGroup) {
                      addCourseDay.indexInGroup = currCourseDay.indexInGroup + 1;
                    }
                  }
                }
              })
            })
          });
          newData.push(addedCourse);
        }
        state.current_schedule = newData;
      }
    },
    deselectCourse: (state, action) => {

      // re-arrange the other courses
      let newData = [];
      if (state.current_schedule.length >= 1) {
        const removeCourseIndex = state.current_schedule.findIndex(c => c.CRN === action.payload);
        let removeCourse;
        // only remove and re-arrange if the deselected course had been selected before
        if (removeCourseIndex !== -1) {
          removeCourse = state.current_schedule.splice(removeCourseIndex, 1)[0];
          newData = state.current_schedule;
          state.current_schedule.forEach(currCourse => {
            currCourse.days.forEach(currCourseSchedule => {
              removeCourse.days.forEach(removeCourseSchedule => {
                if (removeCourseSchedule.day.toLowerCase() === currCourseSchedule.day.toLowerCase()) {
                  // Please BE AWARE the exclamation mark
                  if (!(removeCourseSchedule.offset + removeCourseSchedule.duration <= currCourseSchedule.offset || removeCourseSchedule.offset >= currCourseSchedule.offset + currCourseSchedule.duration)) {
                    currCourseSchedule.numCourseInGroup--
                    if (currCourseSchedule.indexInGroup >= removeCourseSchedule.indexInGroup) {
                      currCourseSchedule.indexInGroup--;
                    }
                  }
                }
              })
            })
          });

        }

      }

      // immer behind the scene otherwise, spread operator must be used 
      state.current_schedule = newData;
    },
    clickCourseAnnimation: (state, action) => {
      state.clickedCourseCRN = action.payload;
    }
  },
  extraReducers: {
    [getAllCourses.fulfilled]: (state, action) => {
      console.log("course has result");
      // immer behind the scene, so go a head and change the state
      state.courses = action.payload;
      state.error = null;
    },
    [getAllCourses.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getUserSchedules.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.schedules = action.payload;
    },
    [getUserSchedules.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})

export const { selectCourse, deselectCourse, clickCourseAnnimation } = DashboardSlice.actions;

export default DashboardSlice.reducer;
