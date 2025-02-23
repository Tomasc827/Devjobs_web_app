package lt.TomasC.Devjobs_web_app.repository;

import lt.TomasC.Devjobs_web_app.model.JobAdDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<JobAdDescription,Long> {
}
