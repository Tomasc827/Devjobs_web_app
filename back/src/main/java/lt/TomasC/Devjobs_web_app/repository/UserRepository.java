package lt.TomasC.Devjobs_web_app.repository;

import lt.TomasC.Devjobs_web_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
