package com.example.timetable.repository;

import com.example.timetable.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findBySlotId(Long slotId);
    boolean existsByStudentIdAndSlotId(Long studentId, Long slotId);
}
