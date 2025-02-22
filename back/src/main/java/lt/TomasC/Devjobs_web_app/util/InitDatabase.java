package lt.TomasC.Devjobs_web_app.util;

import lt.TomasC.Devjobs_web_app.model.Role;
import lt.TomasC.Devjobs_web_app.model.User;
import lt.TomasC.Devjobs_web_app.repository.RoleRepository;
import lt.TomasC.Devjobs_web_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@Configuration
public class InitDatabase {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public InitDatabase(UserRepository userRepository, RoleRepository roleRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Bean
    public CommandLineRunner initialize() {
        return args -> {
            if (roleRepository.count() == 0) {
                Role roleAdmin = new Role("ROLE_ADMIN");
                Role roleUser = new Role("ROLE_USER");
                Role roleCompany = new Role("ROLE_COMPANY");
                roleRepository.save(roleAdmin);
                roleRepository.save(roleUser);
                roleRepository.save(roleCompany);
                System.out.println("Roles for admin,user and company initialized, check util/InitDatabase to change initialization");
            }
            if (!userRepository.existsByEmail("admin@admin.com")) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@admin.com");
                admin.setPassword(passwordEncoder.encode("Something9!"));
                admin.getRoles().add(roleRepository.findByName("ROLE_ADMIN"));
                admin.getRoles().add(roleRepository.findByName("ROLE_USER"));
                admin.getRoles().add(roleRepository.findByName("ROLE_COMPANY"));
                userRepository.save(admin);
                System.out.println("Admin created with email admin@admin.com password Something9!, roles user, company, admin attached.");
            }
        };
    }
}
