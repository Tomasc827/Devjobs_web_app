package lt.TomasC.Devjobs_web_app.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lt.TomasC.Devjobs_web_app.model.UserPosition;

public record UserRequestDTO(
        @NotNull(message = "Name cannot be null")
        @Size(min = 3,max = 255, message = "Name must be from 3 to 255 characters")
        @Pattern(regexp = "^[a-zA-Z0-9 ]+$")
        String name,
        @NotNull(message = "Email cannot be null")
        @Size(max = 255, message = "Email cannot exceed 255 characters")
        @Pattern(
                regexp = "^[a-zA-Z0-9][a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]*(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@"
                        + "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",
                message = "Must be a valid email address"
        )
        String email,
        @NotNull(message = "Password cannot be null")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[\\S]{8,255}$",
                message = "Password must contain at least one lowercase letter, one uppercase letter, " +
                        "one number, one special character, and be 8-255 characters long"
        )
        String password,
        @NotNull(message = "User position cannot be null")
        UserPosition userPosition
) {


}
