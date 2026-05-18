package bolsaempleobe.repository;

import bolsaempleobe.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
    List<Caracteristica> findByPadreIsNull(); // solo las raíces
    List<Caracteristica> findByPadreId(Long padreId);
}