package lt.TomasC.Devjobs_web_app.controller;


import jakarta.validation.Valid;
import lt.TomasC.Devjobs_web_app.dto.user.UserRequestDTO;
import lt.TomasC.Devjobs_web_app.dto.user.UserResponseDTO;
import lt.TomasC.Devjobs_web_app.service.UserService;
import lt.TomasC.Devjobs_web_app.util.WebUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/register")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO dto) {
        UserResponseDTO responseDTO = userService.createUser(dto);

        URI location = WebUtil.createLocation("/{id}", responseDTO.id());

        return ResponseEntity.ok(responseDTO);
    }
}
