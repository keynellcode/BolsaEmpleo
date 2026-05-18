package bolsaempleobe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import bolsaempleobe.dto.BusquedaPuestoDTO;
import bolsaempleobe.dto.PuestoCaracteristicaDTO;
import bolsaempleobe.dto.PuestoDTO;
import bolsaempleobe.model.*;
import bolsaempleobe.repository.*;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PuestoService {

    private final PuestoRepository puestoRepository;
    private final PuestoCaracteristicaRepository puestoCaracteristicaRepository;
    private final EmpresaRepository empresaRepository;
    private final CaracteristicaRepository caracteristicaRepository;

    public Puesto crear(PuestoDTO dto) {
        Empresa empresa = empresaRepository.findById(dto.getEmpresaId())
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        Puesto p = new Puesto();
        p.setTitulo(dto.getTitulo());
        p.setDescripcion(dto.getDescripcion());
        p.setSalario(dto.getSalario());
        p.setTipoPublicacion(dto.getTipoPublicacion());
        p.setActivo(true);
        p.setFecha(LocalDateTime.now());
        p.setEmpresa(empresa);
        Puesto saved = puestoRepository.save(p);

        if (dto.getRequisitos() != null) {
            for (PuestoCaracteristicaDTO r : dto.getRequisitos()) {
                Caracteristica c = caracteristicaRepository
                        .findById(r.getCaracteristicaId())
                        .orElseThrow(() -> new RuntimeException("Característica no encontrada"));
                PuestoCaracteristica pc = new PuestoCaracteristica();
                pc.setPuesto(saved);
                pc.setCaracteristica(c);
                pc.setNivel(r.getNivel());
                puestoCaracteristicaRepository.save(pc);
            }
        }
        return saved;
    }

    public List<Puesto> getPublicosRecientes() {
        return puestoRepository
                .findTop5ByTipoPublicacionAndActivoTrueOrderByFechaDesc("PUBLICO");
    }

    public List<Puesto> getPorEmpresa(Long empresaId) {
        return puestoRepository.findByEmpresaId(empresaId);
    }

    public List<Puesto> buscar(BusquedaPuestoDTO dto) {
        return puestoRepository.buscarPorCaracteristicas(dto.getCaracteristicaIds());
    }

    public Puesto desactivar(Long id) {
        Puesto p = puestoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Puesto no encontrado"));
        p.setActivo(false);
        return puestoRepository.save(p);
    }
}