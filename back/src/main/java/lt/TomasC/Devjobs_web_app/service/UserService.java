package lt.TomasC.Devjobs_web_app.service;


import lt.TomasC.Devjobs_web_app.dto.user.UserMapper;
import lt.TomasC.Devjobs_web_app.dto.user.UserRequestDTO;
import lt.TomasC.Devjobs_web_app.dto.user.UserResponseDTO;
import lt.TomasC.Devjobs_web_app.exception.AlreadyExistsException;
import lt.TomasC.Devjobs_web_app.model.User;
import lt.TomasC.Devjobs_web_app.model.UserPosition;
import lt.TomasC.Devjobs_web_app.repository.RoleRepository;
import lt.TomasC.Devjobs_web_app.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public UserService(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    public UserResponseDTO createUser(UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new AlreadyExistsException("Email '" + dto.email() + "' already exists");
        }
        User user = UserMapper.toEntity(dto);

        if (user.getUserPosition() == UserPosition.JOBSEEKER) {
            user.getRoles().add(roleRepository.findByName("ROLE_USER"));
        } else {
            user.getRoles().add(roleRepository.findByName("ROLE_COMPANY"));
        }

        userRepository.save(user);

        return UserMapper.toDTO(user);
    }
}
