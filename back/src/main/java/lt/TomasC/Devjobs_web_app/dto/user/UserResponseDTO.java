package lt.TomasC.Devjobs_web_app.dto.user;

import lt.TomasC.Devjobs_web_app.model.UserPosition;

public record UserResponseDTO(Long id, String name, UserPosition userPosition) {


}
