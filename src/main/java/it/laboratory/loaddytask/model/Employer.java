package it.laboratory.loaddytask.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "employer", schema = "loaddy")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = true)
    private String companyName;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL)
    private List<Team> teams;

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public String getCompanyName() { return companyName; }

    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public List<Team> getTeams() { return teams; }

    public void setTeams(List<Team> teams) { this.teams = teams; }
}
