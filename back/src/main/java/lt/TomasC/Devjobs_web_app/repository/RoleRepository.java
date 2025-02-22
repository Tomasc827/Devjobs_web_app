package lt.TomasC.Devjobs_web_app.repository;

import lt.TomasC.Devjobs_web_app.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Byte> {
    Role findByName(String name);
}
