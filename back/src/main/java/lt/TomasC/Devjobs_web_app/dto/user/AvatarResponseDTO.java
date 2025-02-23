package lt.TomasC.Devjobs_web_app.dto.user;

public record AvatarResponseDTO(
        byte[] data,
        String contentType
) {}
