package it.laboratory.loaddytask.repository;

import it.laboratory.loaddytask.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepo extends JpaRepository<Employer, Integer> {

}
