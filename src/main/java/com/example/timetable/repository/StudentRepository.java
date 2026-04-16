package com.example.timetable.repository;

import com.example.timetable.model.Student;
import com.example.timetable.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser(User user);
}
