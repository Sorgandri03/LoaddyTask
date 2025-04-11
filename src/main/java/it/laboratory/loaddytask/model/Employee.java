package it.laboratory.loaddytask.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee", schema = "loaddy")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public Team getTeam() { return team; }

    public void setTeam(Team team) { this.team = team; }
}
