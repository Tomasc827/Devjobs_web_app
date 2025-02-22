package lt.TomasC.Devjobs_web_app.dto.user;

import lt.TomasC.Devjobs_web_app.model.UserPosition;

public record UserResponseDTO(long id, String name, UserPosition userPosition) {


}
