package lt.TomasC.Devjobs_web_app.dto.job_ad;

import lt.TomasC.Devjobs_web_app.model.EmploymentType;
import lt.TomasC.Devjobs_web_app.model.Location;

import java.time.LocalDateTime;

public record JobAdResponseDTO(Long id, String position, EmploymentType employmentType, Location location,
                               LocalDateTime localDateTime, String companyName, Long userId) {
}
