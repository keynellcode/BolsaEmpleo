package bolsaempleobe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import bolsaempleobe.dto.OferenteCaracteristicaDTO;
import bolsaempleobe.dto.OferenteDTO;
import bolsaempleobe.model.*;
import bolsaempleobe.repository.*;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OferenteService {

    private final OferenteRepository oferenteRepository;
    private final OferenteCaracteristicaRepository habilidadRepository;
    private final CaracteristicaRepository caracteristicaRepository;
    private final PasswordEncoder passwordEncoder;

    public Oferente registrar(OferenteDTO dto) {
        Oferente o = new Oferente();
        o.setIdentificacion(dto.getIdentificacion());
        o.setNombre(dto.getNombre());
        o.setApellido(dto.getApellido());
        o.setNacionalidad(dto.getNacionalidad());
        o.setTelefono(dto.getTelefono());
        o.setCorreo(dto.getCorreo());
        o.setResidencia(dto.getResidencia());
        o.setClave(passwordEncoder.encode(dto.getClave()));
        o.setAprobado(false);
        o.setFechaRegistro(LocalDateTime.now());
        return oferenteRepository.save(o);
    }

    public Oferente getPorCorreo(String correo) {
        return oferenteRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Oferente no encontrado"));
    }

    public Oferente getPorId(Long id) {
        return oferenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Oferente no encontrado"));
    }

    public List<Oferente> getPendientes() {
        return oferenteRepository.findByAprobadoFalse();
    }

    public Oferente aprobar(Long id) {
        Oferente o = getPorId(id);
        o.setAprobado(true);
        return oferenteRepository.save(o);
    }

    public void actualizarHabilidades(Long oferenteId,
                                      List<OferenteCaracteristicaDTO> habilidades) {
        habilidadRepository.deleteByOferenteId(oferenteId);
        Oferente oferente = getPorId(oferenteId);

        for (OferenteCaracteristicaDTO dto : habilidades) {
            Caracteristica c = caracteristicaRepository.findById(dto.getCaracteristicaId())
                    .orElseThrow(() -> new RuntimeException("Característica no encontrada"));
            OferenteCaracteristica oc = new OferenteCaracteristica();
            oc.setOferente(oferente);
            oc.setCaracteristica(c);
            oc.setNivel(dto.getNivel());
            habilidadRepository.save(oc);
        }
    }

    public List<OferenteCaracteristica> getHabilidades(Long oferenteId) {
        return habilidadRepository.findByOferenteId(oferenteId);
    }
}