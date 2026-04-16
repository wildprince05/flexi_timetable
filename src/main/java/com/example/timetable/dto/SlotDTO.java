package com.example.timetable.dto;

import lombok.Data;
import java.time.LocalTime;

@Data
public class SlotDTO {
    private Long subjectId;
    private Long facultyId;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomNumber;
    private Integer maxSeats;
}
