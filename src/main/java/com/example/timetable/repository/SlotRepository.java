package com.example.timetable.repository;

import com.example.timetable.model.Faculty;
import com.example.timetable.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {
    List<Slot> findByFacultyId(Long facultyId);
}
