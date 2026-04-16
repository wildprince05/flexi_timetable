package com.example.timetable.dto;

import lombok.Data;

@Data
public class StudentDTO {
    private String name;
    private String department;
    private Integer semester;
    private Integer requiredCredits;
    private String username;
    private String password;
}
