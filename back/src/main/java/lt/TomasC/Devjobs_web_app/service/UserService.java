package lt.TomasC.Devjobs_web_app.service;


import jakarta.transaction.Transactional;
import lt.TomasC.Devjobs_web_app.dto.user.AvatarResponseDTO;
import lt.TomasC.Devjobs_web_app.dto.user.UserMapper;
import lt.TomasC.Devjobs_web_app.dto.user.UserRequestDTO;
import lt.TomasC.Devjobs_web_app.dto.user.UserResponseDTO;
import lt.TomasC.Devjobs_web_app.exception.AlreadyExistsException;
import lt.TomasC.Devjobs_web_app.exception.NotFoundException;
import lt.TomasC.Devjobs_web_app.model.User;
import lt.TomasC.Devjobs_web_app.model.UserImage;
import lt.TomasC.Devjobs_web_app.model.UserPosition;
import lt.TomasC.Devjobs_web_app.repository.RoleRepository;
import lt.TomasC.Devjobs_web_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional
public class UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private void checkAvatar(User user) {
        if (user.getAvatar() == null || user.getAvatar().getData() == null) {
            throw new NotFoundException("Avatar not found");
        }
    }

    public User createUser(UserRequestDTO dto) throws IOException {
        if (userRepository.existsByEmail(dto.email())) {
            throw new AlreadyExistsException("Email '" + dto.email() + "' already exists");
        }
        User user = UserMapper.toEntity(dto);

        UserImage avatar = UserMapper.imageToEntity(dto);

        if (user.getUserPosition() == UserPosition.JOBSEEKER) {
            user.getRoles().add(roleRepository.findByName("ROLE_USER"));
        } else {
            user.getRoles().add(roleRepository.findByName("ROLE_COMPANY"));
        }

        user.setAvatar(avatar);

        user.setPassword(passwordEncoder.encode(dto.password()));

     return userRepository.save(user);

    }

    public AvatarResponseDTO getUserAvatar(Long userId) {
            User user = userRepository.findById(userId).orElseThrow(()-> new NotFoundException("User not found"));
            checkAvatar(user);

        return new AvatarResponseDTO(
                user.getAvatar().getData(),
                user.getAvatar().getContentType()
        );
    }

    public AvatarResponseDTO getUserPrivateAvatar() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user  = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException(
                "User not found"));
        checkAvatar(user);

        return new AvatarResponseDTO(
                user.getAvatar().getData(),
                user.getAvatar().getContentType()
        );
    }


}
