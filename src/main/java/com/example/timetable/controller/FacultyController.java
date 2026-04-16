package com.example.timetable.controller;

import com.example.timetable.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faculty")
@PreAuthorize("hasRole('FACULTY')")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class FacultyController {

    @Autowired
    FacultyService facultyService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(facultyService.getFacultyProfile(userDetails.getUsername()));
    }

    @GetMapping("/slots")
    public ResponseEntity<?> getMySlots() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(facultyService.getMySlots(userDetails.getUsername()));
    }

    @GetMapping("/slots/{slotId}/students")
    public ResponseEntity<?> getEnrolledStudents(@PathVariable Long slotId) {
         UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         return ResponseEntity.ok(facultyService.getEnrolledStudents(slotId, userDetails.getUsername()));
    }
}
