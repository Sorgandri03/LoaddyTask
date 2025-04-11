package it.laboratory.loaddytask.controller;

import it.laboratory.loaddytask.repository.EmployerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ApiControllers {

//    @Autowired
//    private EmployerRepo employerRepo;

    @GetMapping(value = "/")
    public String redirectToLogin() {
        return "redirect:/login";
    }

}
