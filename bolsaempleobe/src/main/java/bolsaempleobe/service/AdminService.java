package bolsaempleobe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import bolsaempleobe.model.Empresa;
import bolsaempleobe.model.Oferente;
import bolsaempleobe.repository.EmpresaRepository;
import bolsaempleobe.repository.OferenteRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EmpresaRepository empresaRepository;
    private final OferenteRepository oferenteRepository;

    public List<Empresa> getEmpresasPendientes() {
        return empresaRepository.findByAprobadaFalse();
    }

    public List<Oferente> getOferentesPendientes() {
        return oferenteRepository.findByAprobadoFalse();
    }

    public Empresa aprobarEmpresa(Long id) {
        Empresa e = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
        e.setAprobada(true);
        return empresaRepository.save(e);
    }

    public Oferente aprobarOferente(Long id) {
        Oferente o = oferenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Oferente no encontrado"));
        o.setAprobado(true);
        return oferenteRepository.save(o);
    }
}