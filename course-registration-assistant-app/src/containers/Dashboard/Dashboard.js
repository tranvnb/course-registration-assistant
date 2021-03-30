import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import HeaderNla25 from '../../components/HeaderNla25/HeaderNla25';
import Week from '../../components/Week';
import { userLogout } from '../Login/loginSlice';
import style from './Dashboard.module.scss';
import { getAllCourses, selectCourse } from './DashboardSlice';

const DAY_MAX_WORKING_TIME_BLOCK_BK = 24;
const DAY_MAX_WORKING_TIME_BLOCK = 13;

const timeTable = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
const timeTableLabelBk = ["07:00 - 07:30", "07:30 - 08:00", "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30", "16:30 - 17:00", "17:00 - 17:30", "17:30 - 18:00", "18:00 - 18:30", "18:30 - 19:00"];
const timeTableLabel = ["7:00", "8:00", "9:00", "10:00","11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];




const Dashboard = () => {

  const dispatch = useDispatch();
  // const courses = useSelector(state => {
  //   return state.dashboard.courses.map(({ name, courses }) => {
  //     return {
  //       name, courses: courses.map(courseInGroup => {
  //         return courseInGroup.filter(course => {
  //           return course.isSelected
  //         });
  //       })
  //     }
  //   });
  // }); // need to flatten the course structure

  const courses = useSelector(state => {
    // return state.dashboard.courses.filter(i => i.isSelected)
    return state.dashboard.selectedCourses;
  }); // FLATTEN the course structure

  useEffect(() => {
    dispatch(getAllCourses());
    setTimeout(function(){ dispatch(selectCourse("23723")); }, 1000);
    setTimeout(function(){ dispatch(selectCourse("23725")); }, 3000);
    // setTimeout(function(){ dispatch(selectCourse("6")); }, 6000);
  }, []);

  const history = useHistory();

  const logout = () => {
    dispatch(userLogout());
    history.replace("/login");
  }

  return (
    <div className="row">
      <div className="col">
        {/* <div className="row">
          <div className="col">
            <HeaderNla25 />
          </div>
        </div> */}
        <div className="row">
          <div className="col-3">
            This is sidebar
            </div>
          <div className="col-9">
            <Week timeFrames={timeTableLabel} days={weekDays} courses={courses}/>
          </div>
        </div>
        {/* <div className="row">
          <div className="col">
            This is footer
            <button onClick={logout}>LOG OUT</button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard;