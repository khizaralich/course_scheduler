import React, { useState, useEffect } from 'react';
import './CourseScheduler.css';

function CourseScheduler() {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseNumber: '',
    termNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/course/${formData.courseCode}/${formData.courseNumber}/${formData.termNumber}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setError('Course not found. Please check your input.');
      }
    } catch (err) {
      setError('Failed to fetch course information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.courseCode.trim() && 
           formData.courseNumber.trim() && 
           formData.termNumber.trim();
  };

  return (
    <div className="course-scheduler">
      {/* Left Panel - Search Form */}
      <div className="search-panel">
        <div className="card-header">
          <h2>Search Courses</h2>
          <p>Find course information and availability</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  placeholder="e.g., CS"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseNumber">Course Number</label>
                <input
                  type="text"
                  id="courseNumber"
                  name="courseNumber"
                  value={formData.courseNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., 135"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="termNumber">Term Number</label>
                <input
                  type="text"
                  id="termNumber"
                  name="termNumber"
                  value={formData.termNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., 1239"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={!isFormValid() || loading}
            >
              {loading ? 'Searching...' : 'Search Course'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Results and Courses */}
      <div className="results-panel">
        {/* Course Details Result */}
        {result && (
          <div className="results-card">
            <div className="card-header">
              <h3>Course Details</h3>
            </div>
            <div className="card-body">
              <div className="course-details">
                <h4>{result.courseCode} {result.courseNumber}</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Course Name</strong>
                    <span>{result.name}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Term</strong>
                    <span>{result.termNumber}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Max Capacity</strong>
                    <span>{result.maxCapacity}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Enrolled</strong>
                    <span>{result.enrolledStudents}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Available Seats</strong>
                    <span>{result.availableSeats}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Status</strong>
                    <span>{result.isFull ? 'Full' : 'Available'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Courses */}
        <div className="results-card">
          <div className="card-header">
            <h3>Available Courses</h3>
          </div>
          <div className="card-body">
            <div className="courses-list">
              {courses.map((course, index) => (
                <div key={index} className="course-item">
                  <div className="course-info">
                    <strong>{course.subject} {course.number}</strong>
                    <div className="course-name">{course.name}</div>
                  </div>
                  <div className={`course-status ${course.availableSeats === 0 ? 'full' : ''}`}>
                    {course.availableSeats === 0 ? 'Full' : `${course.availableSeats} seats`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseScheduler;
