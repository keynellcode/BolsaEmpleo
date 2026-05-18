package bolsaempleobe.repository;

import bolsaempleobe.model.PuestoCaracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface PuestoCaracteristicaRepository extends JpaRepository<PuestoCaracteristica, Long> {
    List<PuestoCaracteristica> findByPuestoId(Long puestoId);
    @Transactional
    void deleteByPuestoId(Long puestoId);
}