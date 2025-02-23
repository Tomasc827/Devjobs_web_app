package lt.TomasC.Devjobs_web_app.service;


import lt.TomasC.Devjobs_web_app.dto.job_ad.JobAdMapper;
import lt.TomasC.Devjobs_web_app.dto.job_ad.JobAdRequestDTO;
import lt.TomasC.Devjobs_web_app.dto.job_ad.JobAdResponseDTO;
import lt.TomasC.Devjobs_web_app.exception.AlreadyExistsException;
import lt.TomasC.Devjobs_web_app.exception.NotFoundException;
import lt.TomasC.Devjobs_web_app.model.*;
import lt.TomasC.Devjobs_web_app.repository.DescriptionRepository;
import lt.TomasC.Devjobs_web_app.repository.JobAdRepository;
import lt.TomasC.Devjobs_web_app.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class JobAdService {

    private final UserRepository userRepository;
    private final JobAdRepository jobAdRepository;
    private final DescriptionRepository descriptionRepository;

    public JobAdService(UserRepository userRepository, JobAdRepository jobAdRepository,DescriptionRepository descriptionRepository) {
        this.userRepository = userRepository;
        this.jobAdRepository = jobAdRepository;
        this.descriptionRepository = descriptionRepository;
    }
    private User authUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));
    }


    public JobAdResponseDTO createJobAd(JobAdRequestDTO dto) {
        User user = authUser();
        if (jobAdRepository.existsByPositionAndEmploymentTypeAndLocation(dto.position(), dto.employmentType(),dto.location())) {
            throw new AlreadyExistsException("Job ad with the same name and position already exists");
        }

        JobAd jobAd = JobAdMapper.toEntity(dto);
        jobAd.setPostedAt(LocalDateTime.now());
        jobAd.setUser(user);

        JobAdDescription description = new JobAdDescription();
        description.setRequirements("No requirements");
        description.setDescription("No description");
        description.setExpectations("No expectations");

        descriptionRepository.save(description);

        jobAd.setJobAdDescription(description);

        user.getJobAds().add(jobAd);

        jobAdRepository.save(jobAd);

        return JobAdMapper.toDTO(jobAd);
    }

    public Page<JobAdResponseDTO> findAllJobs(Pageable pageable) {
        return jobAdRepository.findAll(pageable).map(JobAdMapper::toDTO);
    }

    public Page<JobAdResponseDTO> getPagedJobsParameters(String position, Location location,
                                                         EmploymentType employmentType, Pageable pageable) {
        if (position == null && location == null && employmentType == null) {
            return jobAdRepository.findAll(pageable).map(JobAdMapper::toDTO);
        }
        if (position != null && location == null && employmentType == null) {
            return jobAdRepository.findByPositionContaining(position,pageable).map(JobAdMapper::toDTO);
        }
        if (position == null && location != null && employmentType == null) {
            return jobAdRepository.findByLocation(location,pageable).map(JobAdMapper::toDTO);
        }
        if (employmentType != null && position == null && location == null) {
            return jobAdRepository.findByEmploymentType(employmentType,pageable).map(JobAdMapper::toDTO);
        }
        if (position != null && location != null && employmentType == null) {
            return jobAdRepository.findByPositionContainingAndLocation(position,location, pageable).map(JobAdMapper::toDTO);
        }
        if (employmentType != null && location != null && position == null) {
            return jobAdRepository.findByLocationAndEmploymentType(location,employmentType,pageable).map(JobAdMapper::toDTO);
        }
        if (position != null && employmentType != null && location == null) {
            return jobAdRepository.findByPositionContainingAndEmploymentType(position,employmentType,pageable).map(JobAdMapper::toDTO);
        }
        return jobAdRepository.findByPositionContainingAndEmploymentTypeAndLocation(position,employmentType,location,
                pageable).map(JobAdMapper::toDTO);
    }

    public List<String> getAllLocations() {
        return Arrays.stream(Location.values())
                .map(Location::getLocation)
                .toList();
    }
}
