package lt.TomasC.Devjobs_web_app.dto.job_ad;

import lt.TomasC.Devjobs_web_app.model.JobAd;

public class JobAdMapper {

    public static JobAd toEntity(JobAdRequestDTO dto) {
        JobAd jobAd = new JobAd();
        jobAd.setLocation(dto.location());
        jobAd.setPosition(dto.position().toLowerCase());
        jobAd.setEmploymentType(dto.employmentType());
        return jobAd;
    }

    public static JobAdResponseDTO toDTO(JobAd jobAd) {
        return new JobAdResponseDTO(jobAd.getId(),
                jobAd.getPosition(),
                jobAd.getEmploymentType(),
                jobAd.getLocation(),
                jobAd.getPostedAt(),
                jobAd.getUser().getName(),
                jobAd.getUser().getId());
    }
}
