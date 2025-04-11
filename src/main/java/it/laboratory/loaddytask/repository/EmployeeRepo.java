package it.laboratory.loaddytask.repository;

import it.laboratory.loaddytask.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

}
