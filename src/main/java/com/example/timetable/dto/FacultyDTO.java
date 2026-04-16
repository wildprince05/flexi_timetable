package com.example.timetable.dto;

import lombok.Data;

@Data
public class FacultyDTO {
    private String name;
    private Long subjectId;
    private Integer maxCapacity;
    private String username;
    private String password;
}
