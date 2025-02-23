package lt.TomasC.Devjobs_web_app.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_ads")
public class JobAd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;
    @Enumerated(value = EnumType.STRING)
    private EmploymentType employmentType;
    @Enumerated(value = EnumType.STRING)
    private Location location;
    private LocalDateTime postedAt;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "jobAdDescription_id")
    private JobAdDescription jobAdDescription;

    public JobAd() {

    }

    public JobAdDescription getJobAdDescription() {
        return jobAdDescription;
    }

    public void setJobAdDescription(JobAdDescription jobAdDescription) {
        this.jobAdDescription = jobAdDescription;
    }

    public Long getId() {
        return id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(EmploymentType employmentType) {
        this.employmentType = employmentType;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
