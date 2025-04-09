package it.laboratory.loaddytask.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiControllers {

    @GetMapping(value = "/")
    public String getHome() {
        return "Hello World!";
    }
}
