package com.project.course_scheduler;

import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CourseSchedulerController {
    
    @RequestMapping("/hello")
    public String Hello() {
        return "Hello World";
    }
    
    @GetMapping("/api/courses")
    public List<Map<String, String>> getCourses() {
        // Mock data - replace with actual course data later
        return Arrays.asList(
            Map.of("code", "CS", "number", "135", "name", "Elementary Algorithm Design"),
            Map.of("code", "CS", "number", "136", "name", "Elementary Algorithm Design and Data Abstraction"),
            Map.of("code", "MATH", "number", "135", "name", "Algebra for Honours Mathematics"),
            Map.of("code", "MATH", "number", "137", "name", "Calculus 1 for Honours Mathematics")
        );
    }
    
    @GetMapping("/api/course/{courseCode}/{courseNumber}/{termNumber}")
    public Map<String, Object> getCourseInfo(@PathVariable String courseCode,
                                            @PathVariable String courseNumber,
                                            @PathVariable String termNumber) {
        Map<String, Object> response = new HashMap<>();
        response.put("courseCode", courseCode);
        response.put("courseNumber", courseNumber);
        response.put("termNumber", termNumber);
        response.put("message", String.format("Course: %s %s, Term: %s - Mock data for now", 
                                             courseCode, courseNumber, termNumber));
        response.put("maxEnrollmentCapacity", 100);
        response.put("enrolledStudents", 75);
        response.put("availableSeats", 25);
        
        return response;
    }
    
    @GetMapping("/")
    public String index() {
        return "Course Scheduler Backend is running! Frontend should be on http://localhost:3000";
    }
} 