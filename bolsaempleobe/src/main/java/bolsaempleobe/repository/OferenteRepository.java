package bolsaempleobe.repository;

import bolsaempleobe.model.Oferente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OferenteRepository extends JpaRepository<Oferente, Long> {
    Optional<Oferente> findByCorreo(String correo);
    List<Oferente> findByAprobadoFalse();
    long count();
}