package com.example.timetable.controller;

import com.example.timetable.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(studentService.getStudentProfile(userDetails.getUsername()));
    }

    @GetMapping("/slots")
    public ResponseEntity<?> getAvailableSlots() {
        return ResponseEntity.ok(studentService.getAvailableSlots());
    }

    @GetMapping("/enrollments")
    public ResponseEntity<?> getMyEnrollments() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(studentService.getMyEnrollments(userDetails.getUsername()));
    }

    @PostMapping("/enroll/{slotId}")
    public ResponseEntity<?> enrollInSlot(@PathVariable Long slotId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(studentService.enrollInSlot(userDetails.getUsername(), slotId));
    }

    @GetMapping("/subjects")
    public ResponseEntity<?> getAllSubjects() {
        return ResponseEntity.ok(studentService.getAllSubjects());
    }
}
