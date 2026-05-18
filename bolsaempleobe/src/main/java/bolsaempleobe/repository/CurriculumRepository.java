package bolsaempleobe.repository;

import bolsaempleobe.model.Curriculum;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CurriculumRepository extends JpaRepository<Curriculum, Long> {
    Optional<Curriculum> findByOferenteId(Long oferenteId);
}