package lt.TomasC.Devjobs_web_app.controller;


import jakarta.validation.Valid;
import lt.TomasC.Devjobs_web_app.dto.user.AvatarResponseDTO;
import lt.TomasC.Devjobs_web_app.dto.user.UserMapper;
import lt.TomasC.Devjobs_web_app.dto.user.UserRequestDTO;
import lt.TomasC.Devjobs_web_app.dto.user.UserResponseDTO;
import lt.TomasC.Devjobs_web_app.model.User;
import lt.TomasC.Devjobs_web_app.service.UserService;
import lt.TomasC.Devjobs_web_app.util.WebUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResponseDTO> createUser(@Valid @ModelAttribute UserRequestDTO dto) {
        try {
            User user = userService.createUser(dto);
            URI location = WebUtil.createLocation("/{id}", user.getId());
            return ResponseEntity.created(location).body(UserMapper.toDTO(user));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{userId}/avatar")
    public ResponseEntity<byte[]> getUserAvatar(@PathVariable Long userId) {
        AvatarResponseDTO avatar = userService.getUserAvatar(userId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(avatar.contentType()))
                .body(avatar.data());
    }
    @GetMapping("/avatar")
    public ResponseEntity<byte[]> getUserPrivateAvatar() {
        AvatarResponseDTO avatarResponseDTO = userService.getUserPrivateAvatar();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(avatarResponseDTO.contentType()))
                .body(avatarResponseDTO.data());
    }

}
