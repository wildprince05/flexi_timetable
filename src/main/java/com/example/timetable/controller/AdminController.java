package com.example.timetable.controller;

import com.example.timetable.dto.FacultyDTO;
import com.example.timetable.dto.SlotDTO;
import com.example.timetable.dto.StudentDTO;
import com.example.timetable.dto.SubjectDTO;
import com.example.timetable.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/subject")
    public ResponseEntity<?> createSubject(@RequestBody SubjectDTO dto) {
        return ResponseEntity.ok(adminService.createSubject(dto));
    }

    @PostMapping("/faculty")
    public ResponseEntity<?> createFaculty(@RequestBody FacultyDTO dto) {
        return ResponseEntity.ok(adminService.createFaculty(dto));
    }

    @PostMapping("/student")
    public ResponseEntity<?> createStudent(@RequestBody StudentDTO dto) {
        return ResponseEntity.ok(adminService.createStudent(dto));
    }

    @PostMapping("/slot")
    public ResponseEntity<?> createSlot(@RequestBody SlotDTO dto) {
        return ResponseEntity.ok(adminService.createSlot(dto));
    }

    @GetMapping("/subjects")
    public ResponseEntity<?> getAllSubjects() {
        return ResponseEntity.ok(adminService.getAllSubjects());
    }

    @GetMapping("/faculties")
    public ResponseEntity<?> getAllFaculties() {
        return ResponseEntity.ok(adminService.getAllFaculties());
    }

    @GetMapping("/slots")
    public ResponseEntity<?> getAllSlots() {
        return ResponseEntity.ok(adminService.getAllSlots());
    }
}
