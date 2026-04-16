package com.example.timetable.config;

import com.example.timetable.model.Subject;
import com.example.timetable.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private SubjectRepository subjectRepository;

    private Subject createSubject(String name, int credits) {
        Subject subject = new Subject();
        subject.setName(name);
        subject.setCredits(credits);
        return subject;
    }

    @Autowired
    private com.example.timetable.repository.UserRepository userRepository;
    
    @Autowired
    private com.example.timetable.repository.StudentRepository studentRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedSubjects();
        seedStudents();
        seedFacultiesAndSlots();
    }

    private void seedSubjects() {
        if (subjectRepository.count() == 0) {
            System.out.println("Seeding Electronics Engineering (VLSI Design and Technology) Subjects...");

            List<Subject> vlsiSubjects = Arrays.asList(
                // Semester I
                createSubject("IP23111 - Induction Programme", 0),
                createSubject("HS23111 - Communicative English", 3),
                createSubject("MA23111 - Matrices and Calculus", 4),
                createSubject("PH23112 - Physics for Electronics Engineering", 3),
                createSubject("GE23111 - Problem Solving and C Programming", 3),
                createSubject("EC23111 - Circuit Analysis", 4),
                createSubject("GE23112 - Heritage of Tamils", 0),
                createSubject("GE23121 - Problem Solving and C Programming Laboratory", 1),
                createSubject("GE23122 - Engineering Practices Laboratory", 1),
                createSubject("PH23121 - Physics Laboratory", 1),

                // Semester II
                createSubject("HS23211 - Professional English", 2),
                createSubject("MA23211 - Statistics and Numerical Methods", 4),
                createSubject("CY23211 - Engineering Chemistry", 3),
                createSubject("AD23211 - Python for Data Science", 3),
                createSubject("GE23213 - Tamils and Technology", 0),
                createSubject("EC23231 - Electronic Devices and Circuits", 4),
                createSubject("GE23231 - Engineering Graphics", 4),
                createSubject("CY23221 - Chemistry Laboratory", 1),
                createSubject("AD23221 - Python for Data Science Laboratory", 1),
                createSubject("GE23221 - Communication Laboratory", 1),

                // Semester III
                createSubject("GE23311 - Environmental Science and Sustainability", 2),
                createSubject("CS23312 - Object Oriented Programming", 3),
                createSubject("EV23311 - Wide Band-gap Devices", 3),
                createSubject("EC23312 - Digital System Design", 3),
                createSubject("EC23313 - Signals and Systems", 4),
                createSubject("EC23321 - Digital System Design Laboratory", 1),
                createSubject("CS23322 - Object Oriented Programming Laboratory", 1),
                createSubject("EC23IC1 - PCB Design", 1),

                // Semester IV
                createSubject("MA23412 - Random Process and Linear Algebra", 4),
                createSubject("EV23411 - Microprocessors and Microcontrollers", 3),
                createSubject("EC23412 - Electromagnetic Fields", 3),
                createSubject("EC23413 - Linear Integrated Circuits", 3),
                createSubject("EC23431 - Digital Signal Processing", 4),
                createSubject("EC23432 - Networks and Security", 3),
                createSubject("EV23421 - Microprocessors and Microcontrollers Laboratory", 1),
                createSubject("EC23422 - Linear Integrated Circuits Laboratory", 1),
                createSubject("CC23IC2 - Design Thinking for Engineers", 1),

                // Semester V
                createSubject("EV23511 - ASIC Design", 3),
                createSubject("EC23512 - VLSI and Chip Design", 3),
                createSubject("Professional Elective I", 3),
                createSubject("Professional Elective II", 3),
                createSubject("EC23531 - Embedded Systems and IOT Design", 4),
                createSubject("AL23431 - Artificial Intelligence and Machine Learning", 4),
                createSubject("EC23521 - VLSI Laboratory", 1),
                createSubject("EV23IC3 - Introduction to ARM Based System Design", 1),

                // Semester VI
                createSubject("EV23611 - CMOS Analog and Mixed Signal IC Design", 3),
                createSubject("EV23612 - Digital Logic Synthesis using HDL", 4),
                createSubject("Professional Elective III", 3),
                createSubject("Professional Elective IV", 3),
                createSubject("Open Elective - I", 3),
                createSubject("Open Elective - II", 3),
                createSubject("EC23621 - Mini Project", 2),
                createSubject("EV23622 - CMOS Analog and Digital VLSI Laboratory", 1),

                // Semester VII
                createSubject("GE23711 - Human Values and Ethics", 2),
                createSubject("Elective - Management", 3),
                createSubject("EV23711 - Physical Design and Automation", 3),
                createSubject("EV23712 - RF Integrated Circuits and Systems", 3),
                createSubject("Professional Elective V", 3),
                createSubject("Professional Elective VI", 3),
                createSubject("EV23721 - Internship", 2),

                // Semester VIII
                createSubject("Open Elective - III", 3),
                createSubject("EV23821 - Project Work", 10)
            );

            subjectRepository.saveAll(vlsiSubjects);
            System.out.println("VLSI Subjects seeded successfully! Total subjects: " + vlsiSubjects.size());
        }
    }

    private void seedStudents() {
        if (studentRepository.count() == 0) {
            System.out.println("Seeding First and Second Year VLSI Students...");

            // First Years: 211725050001 to 211725050125
            for (int i = 1; i <= 125; i++) {
                String idPart = String.format("%03d", i);
                String rollNo = "211725050" + idPart;
                createStudent(rollNo, "vlsi1@" + idPart, "First Year Student " + i, 1, 20); // roughly 20 credits required for sem 1
            }

            // Second Years: 2117240050001 to 2117240050158
            for (int i = 1; i <= 158; i++) {
                String idPart = String.format("%03d", i);
                String rollNo = "2117240050" + idPart;
                createStudent(rollNo, "vlsi2@" + idPart, "Second Year Student " + i, 3, 18); // roughly 18 credits required for sem 3
            }
            
            System.out.println("Students seeded successfully!");
        }
    }

    private void createStudent(String username, String rawPassword, String name, int semester, int credits) {
        com.example.timetable.model.User user = new com.example.timetable.model.User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(com.example.timetable.model.Role.ROLE_STUDENT);
        userRepository.save(user);

        com.example.timetable.model.Student student = new com.example.timetable.model.Student();
        student.setUser(user);
        student.setName(name);
        student.setDepartment("VLSI Design and Technology");
        student.setSemester(semester);
        student.setRequiredCredits(credits);
        studentRepository.save(student);
    }

    @Autowired
    private com.example.timetable.repository.FacultyRepository facultyRepository;

    @Autowired
    private com.example.timetable.repository.SlotRepository slotRepository;

    private void seedFacultiesAndSlots() {
        if (facultyRepository.count() == 0) {
            System.out.println("Seeding Faculties and Slots...");
            Subject sub1 = subjectRepository.findAll().stream().filter(s -> s.getName().contains("Calculus")).findFirst().orElse(null);
            Subject sub2 = subjectRepository.findAll().stream().filter(s -> s.getName().contains("Physics")).findFirst().orElse(null);
            Subject sub3 = subjectRepository.findAll().stream().filter(s -> s.getName().contains("Circuit")).findFirst().orElse(null);
            
            if (sub1 != null && sub2 != null && sub3 != null) {
                com.example.timetable.model.Faculty f1 = createFaculty("fac1", "fac123", "Dr. Alan Turing", sub1, 60);
                com.example.timetable.model.Faculty f2 = createFaculty("fac2", "fac123", "Dr. Richard Feynman", sub2, 60);
                com.example.timetable.model.Faculty f3 = createFaculty("fac3", "fac123", "Dr. Claude Shannon", sub3, 60);

                createSlot(sub1, f1, java.time.LocalTime.of(9, 0), java.time.LocalTime.of(10, 30), "Room 101", 60);
                createSlot(sub1, f1, java.time.LocalTime.of(11, 0), java.time.LocalTime.of(12, 30), "Room 102", 60);
                createSlot(sub2, f2, java.time.LocalTime.of(9, 0), java.time.LocalTime.of(10, 30), "Room 201", 60);
                createSlot(sub3, f3, java.time.LocalTime.of(14, 0), java.time.LocalTime.of(15, 30), "Room 303", 60);
                System.out.println("Faculties and Slots seeded successfully!");
            }
        }
    }

    private com.example.timetable.model.Faculty createFaculty(String username, String pass, String name, Subject subject, int capacity) {
        com.example.timetable.model.User user = new com.example.timetable.model.User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(pass));
        user.setRole(com.example.timetable.model.Role.ROLE_FACULTY);
        userRepository.save(user);

        com.example.timetable.model.Faculty faculty = new com.example.timetable.model.Faculty();
        faculty.setUser(user);
        faculty.setName(name);
        faculty.setSubject(subject);
        faculty.setMaxCapacity(capacity);
        return facultyRepository.save(faculty);
    }

    private void createSlot(Subject subject, com.example.timetable.model.Faculty faculty, java.time.LocalTime start, java.time.LocalTime end, String room, int seats) {
        com.example.timetable.model.Slot slot = new com.example.timetable.model.Slot();
        slot.setSubject(subject);
        slot.setFaculty(faculty);
        slot.setStartTime(start);
        slot.setEndTime(end);
        slot.setRoomNumber(room);
        slot.setMaxSeats(seats);
        slot.setAvailableSeats(seats);
        slotRepository.save(slot);
    }
}

