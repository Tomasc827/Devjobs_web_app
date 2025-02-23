package lt.TomasC.Devjobs_web_app.dto.job_ad;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lt.TomasC.Devjobs_web_app.model.EmploymentType;
import lt.TomasC.Devjobs_web_app.model.Location;

public record JobAdRequestDTO(@NotNull(message = "Position cannot be null")
                              @Size(min = 2,max = 255, message = "Position must be from 2 to 255 characters")
                              @Pattern(regexp = "^[a-zA-Z0-9 .,!&£$-]*$")
                              String position,
                              @NotNull(message = "Employment type cannot be null")
                              EmploymentType employmentType,
                              @NotNull(message = "Location cannot be null")
                              Location location) {
}
