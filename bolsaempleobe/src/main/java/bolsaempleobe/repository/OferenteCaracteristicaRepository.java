package bolsaempleobe.repository;

import bolsaempleobe.model.OferenteCaracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface OferenteCaracteristicaRepository extends JpaRepository<OferenteCaracteristica, Long> {
    List<OferenteCaracteristica> findByOferenteId(Long oferenteId);
    @Transactional
    void deleteByOferenteId(Long oferenteId);
}