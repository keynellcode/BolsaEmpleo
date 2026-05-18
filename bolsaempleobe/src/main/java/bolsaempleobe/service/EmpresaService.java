package bolsaempleobe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import bolsaempleobe.dto.EmpresaDTO;
import bolsaempleobe.model.Empresa;
import bolsaempleobe.repository.EmpresaRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final PasswordEncoder passwordEncoder;

    public Empresa registrar(EmpresaDTO dto) {
        Empresa e = new Empresa();
        e.setNombre(dto.getNombre());
        e.setLocalizacion(dto.getLocalizacion());
        e.setCorreo(dto.getCorreo());
        e.setTelefono(dto.getTelefono());
        e.setDescripcion(dto.getDescripcion());
        e.setClave(passwordEncoder.encode(dto.getClave()));
        e.setAprobada(false);
        e.setFechaRegistro(LocalDateTime.now());
        return empresaRepository.save(e);
    }

    public Empresa getPorCorreo(String correo) {
        return empresaRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }

    public Empresa getPorId(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }

    public List<Empresa> getPendientes() {
        return empresaRepository.findByAprobadaFalse();
    }

    public Empresa aprobar(Long id) {
        Empresa e = getPorId(id);
        e.setAprobada(true);
        return empresaRepository.save(e);
    }
}