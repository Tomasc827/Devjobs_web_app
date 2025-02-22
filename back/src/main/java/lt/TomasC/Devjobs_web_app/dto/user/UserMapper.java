package lt.TomasC.Devjobs_web_app.dto.user;

import lt.TomasC.Devjobs_web_app.model.User;

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

}
