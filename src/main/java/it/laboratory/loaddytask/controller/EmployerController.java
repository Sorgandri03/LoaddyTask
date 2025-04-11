package it.laboratory.loaddytask.controller;

import java.util.List;

import it.laboratory.loaddytask.model.Employer;
import it.laboratory.loaddytask.repository.EmployerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmployerController {

    @Autowired
    private EmployerRepo employerRepo;

//    public EmployerController(EmployerRepo employerRepo) {
//        this.employerRepo = employerRepo;
//    }

    @GetMapping("/employers")
    public List<Employer> findAll() {
        return employerRepo.findAll();
    }

    @GetMapping("/employers/{id}")
    public ResponseEntity<Employer> findById(@PathVariable int id) {
        return employerRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/employers")
    public String save(@RequestBody Employer employer) {
        employerRepo.save(employer);
        return "Success";
    }

    @PutMapping("/employers/{id}")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Employer employer) {
        return employerRepo.findById(id)
                .map(existingEmployer -> {
                    if (employer.getName() != null) {
                        existingEmployer.setName(employer.getName());
                    }
                    if (employer.getSurname() != null) {
                        existingEmployer.setSurname(employer.getSurname());
                    }
                    if (employer.getDateOfBirth() != null) {
                        existingEmployer.setDateOfBirth(employer.getDateOfBirth());
                    }
                    if (employer.getCellPhone() != null) {
                        existingEmployer.setCellPhone(employer.getCellPhone());
                    }
                    if (employer.getEmail() != null) {
                        existingEmployer.setEmail(employer.getEmail());
                    }
                    if (employer.getPassword() != null) {
                        existingEmployer.setPassword(employer.getPassword());
                    }
                    employerRepo.save(existingEmployer);
                    return ResponseEntity.ok("Success");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/employers/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        return employerRepo.findById(id)
                .map(existingEmployer -> {
                    employerRepo.delete(existingEmployer);
                    return ResponseEntity.ok("Success");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
