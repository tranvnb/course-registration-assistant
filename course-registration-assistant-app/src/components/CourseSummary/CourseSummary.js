import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import style from './CourseSummary.module.scss';

const CourseSummary = () => {

  const selectedCourses = useSelector(state => state.dashboard.selectedCourses);
  return (
    <div className={style.summaryTable}>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>CRN</th>
            <th>Subject</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {selectedCourses.map(course => {
            return (
              <tr>
                <td>{course.CRN}</td>
                <td>{course.subject}</td>
                <td>{course.title}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default CourseSummary;