package bolsaempleobe.repository;

import bolsaempleobe.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByCorreo(String correo);
    List<Empresa> findByAprobadaFalse();
    long count();
}