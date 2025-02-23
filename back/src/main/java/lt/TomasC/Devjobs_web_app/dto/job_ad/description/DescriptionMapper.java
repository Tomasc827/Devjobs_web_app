package lt.TomasC.Devjobs_web_app.dto.job_ad.description;

import lt.TomasC.Devjobs_web_app.model.JobAdDescription;

public class DescriptionMapper {
    public static JobAdDescription toEntity(DescriptionRequestDTO dto) {
        JobAdDescription jobAdDescription = new JobAdDescription();
        jobAdDescription.setDescription(dto.description());
        jobAdDescription.setExpectations(dto.expectations());
        jobAdDescription.setRequirements(dto.requirements());
        return jobAdDescription;
    }

    public static DescriptionResponseDTO toDTO(JobAdDescription jobAdDescription) {
        return new DescriptionResponseDTO(jobAdDescription.getId(),
                jobAdDescription.getDescription(),
                jobAdDescription.getRequirements(),
                jobAdDescription.getExpectations());
    }
}
