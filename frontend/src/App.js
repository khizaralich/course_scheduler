import React from 'react';
import './App.css';
import CourseScheduler from './components/CourseScheduler';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Course Scheduler</h1>
      </header>
      <main>
        <CourseScheduler />
      </main>
    </div>
  );
}

export default App;
