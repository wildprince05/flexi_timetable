package com.example.timetable.repository;

import com.example.timetable.model.Faculty;
import com.example.timetable.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByUser(User user);
}
