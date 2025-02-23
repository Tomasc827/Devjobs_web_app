package lt.TomasC.Devjobs_web_app.dto.job_ad.description;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DescriptionRequestDTO(@Size(min = 3,max = 2000,
        message = "Description must be from 3 to 2000 characters")
                                    @Pattern(regexp = "^[a-zA-Z0-9 .,></?!'@£$%^&*(){}_=+-]*&", message = "Letters, " +
                                            "numbers and special symbols .,></?!'@£$%^&*(){}_=+- are allowed for " +
                                            "description")
                                    String description,
                                    @Size(min = 3,max = 2000,
                                            message = "Requirements must be from 3 to 2000 characters")
                                    @Pattern(regexp = "^[a-zA-Z0-9 .,></?!'@£$%^&*(){}_=+-]*&", message = "Letters, " +
                                            "numbers and special symbols .,></?!'@£$%^&*(){}_=+- are allowed for " +
                                            "requirements")
                                    String requirements,@Size(min = 3,max = 2000,
        message = "Expectations must be from 3 to 2000 characters")
                                    @Pattern(regexp = "^[a-zA-Z0-9 .,></?!'@£$%^&*(){}_=+-]*&", message = "Letters, " +
                                            "numbers and special symbols .,></?!'@£$%^&*(){}_=+- are allowed for " +
                                            "expectation")
                                    String expectations) {
}
