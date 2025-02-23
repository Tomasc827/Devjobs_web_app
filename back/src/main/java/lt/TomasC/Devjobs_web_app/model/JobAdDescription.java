package lt.TomasC.Devjobs_web_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "job_ad_descriptions")
public class JobAdDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String description;
    @Column(length = 2000)
    private String requirements;
    @Column(length = 2000)
    private String expectations;

    public JobAdDescription() {

    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getExpectations() {
        return expectations;
    }

    public void setExpectations(String expectations) {
        this.expectations = expectations;
    }
}
