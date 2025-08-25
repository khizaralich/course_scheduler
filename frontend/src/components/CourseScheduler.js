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

  // Fetch courses on component mount
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
        const data = await response.text();
        setResult({
          message: data,
          courseInfo: {
            courseCode: formData.courseCode,
            courseNumber: formData.courseNumber,
            termNumber: formData.termNumber
          }
        });
      } else {
        setError('Failed to fetch course information. Please try again.');
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
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Search Course Information</h2>
            <p>Enter course details to get enrollment and schedule information</p>
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

            {result && (
              <div className="result-card">
                <h3>Search Results</h3>
                <div className="result-content">
                  <div className="course-info">
                    <p><strong>Course Code:</strong> {result.courseInfo.courseCode}</p>
                    <p><strong>Course Number:</strong> {result.courseInfo.courseNumber}</p>
                    <p><strong>Term:</strong> {result.courseInfo.termNumber}</p>
                  </div>
                  <div className="api-response">
                    <p><strong>API Response:</strong></p>
                    <code>{result.message}</code>
                  </div>
                </div>
              </div>
            )}

            <div className="available-courses">
              <h3>Available Courses</h3>
              <div className="courses-list">
                {courses.map((course, index) => (
                  <div key={index} className="course-item">
                    <strong>{course.code} {course.number}</strong> - {course.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseScheduler;
