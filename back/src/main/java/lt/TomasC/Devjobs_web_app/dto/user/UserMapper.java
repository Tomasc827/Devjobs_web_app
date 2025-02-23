package lt.TomasC.Devjobs_web_app.dto.user;

import lt.TomasC.Devjobs_web_app.model.User;
import lt.TomasC.Devjobs_web_app.model.UserImage;

import java.io.IOException;
import java.time.LocalDateTime;

public class UserMapper {

    public static User toEntity(UserRequestDTO dto) {
        User user =new User();
        user.setName(dto.name().toLowerCase());
        user.setEmail(dto.email().toLowerCase());
        user.setPassword(dto.password());
        user.setUserPosition(dto.userPosition());
        return user;
    }

    public static UserResponseDTO toDTO(User user) {
        return new UserResponseDTO(user.getId(),
                user.getName(),
                user.getUserPosition());
    }

    public static UserImage imageToEntity(UserRequestDTO dto) throws IOException {
        if (dto.avatar() != null && !dto.avatar().isEmpty()) {
            UserImage avatar = new UserImage();
            avatar.setFilename(dto.avatar().getOriginalFilename());
            avatar.setContentType(dto.avatar().getContentType());
            avatar.setData(dto.avatar().getBytes());
            avatar.setFileSize(dto.avatar().getSize());
            avatar.setUploadedAt(LocalDateTime.now());
            return avatar;
        }
        return null;
    }

}
