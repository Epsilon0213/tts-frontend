import React, { useState } from 'react';

const CourseSelection = ({ onCourseSelect }) => {
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleCourseChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCourse(selectedValue);
    onCourseSelect(selectedValue);
    // console.log(selectedValue);

  };

  return (
    <form class="course-select">
      <select id="course-select" value={selectedCourse} onChange={handleCourseChange}>
        <option value="default">Select your Class Course</option>
        <option value="mh1011">MH1011</option>
        <option value="ee3017">EE3017</option>
        <option value="ee2002">EE2002</option>
      </select>
    </form>
  );
};

export default CourseSelection;
