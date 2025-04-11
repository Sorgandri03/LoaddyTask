package it.laboratory.loaddytask.controller;

import it.laboratory.loaddytask.repository.EmployeeRepo;
import it.laboratory.loaddytask.repository.EmployerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private EmployerRepo employerRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

}
