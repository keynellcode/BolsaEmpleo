package bolsaempleobe.repository;

import bolsaempleobe.model.Puesto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PuestoRepository extends JpaRepository<Puesto, Long> {
    List<Puesto> findByEmpresaId(Long empresaId);
    List<Puesto> findTop5ByTipoPublicacionAndActivoTrueOrderByFechaDesc(String tipo);

    @Query("""
        SELECT DISTINCT p FROM Puesto p
        JOIN p.requisitos r
        WHERE p.tipoPublicacion = 'PUBLICO'
        AND p.activo = true
        AND r.caracteristica.id IN :caracteristicaIds
    """)
    List<Puesto> buscarPorCaracteristicas(List<Long> caracteristicaIds);
}