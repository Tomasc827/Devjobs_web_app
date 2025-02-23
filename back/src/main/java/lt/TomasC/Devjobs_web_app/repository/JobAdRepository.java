package lt.TomasC.Devjobs_web_app.repository;

import lt.TomasC.Devjobs_web_app.model.EmploymentType;
import lt.TomasC.Devjobs_web_app.model.JobAd;
import lt.TomasC.Devjobs_web_app.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobAdRepository extends JpaRepository<JobAd,Long> {
    boolean existsByPositionAndEmploymentTypeAndLocation(String position, EmploymentType employmentType, Location location);

    Page<JobAd> findByPositionContainingAndEmploymentTypeAndLocation(String position,EmploymentType employmentType,
                                                           Location location,
                                                            Pageable pageable);

    Page<JobAd> findByPositionContainingAndLocation(String position, Location location,Pageable pageable);

    Page<JobAd> findByPositionContainingAndEmploymentType(String position, EmploymentType employmentType,Pageable pageable);

    Page<JobAd> findByLocationAndEmploymentType(Location location, EmploymentType employmentType,Pageable pageable);

    Page<JobAd> findByPositionContaining(String position,Pageable pageable);

    Page<JobAd> findByLocation(Location location,Pageable pageable);

    Page<JobAd> findByEmploymentType(EmploymentType employmentType,Pageable pageable);

}
