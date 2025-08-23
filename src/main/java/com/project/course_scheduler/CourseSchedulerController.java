package com.project.course_scheduler;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseSchedulerController{
    
    @RequestMapping("/hello")
    public String Hello(){
        return "Hello World";
    }
} 