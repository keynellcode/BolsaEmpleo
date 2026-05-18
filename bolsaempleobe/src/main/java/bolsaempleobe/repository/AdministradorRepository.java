package bolsaempleobe.repository;

import bolsaempleobe.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    Optional<Administrador> findByIdentificacion(String identificacion);
}