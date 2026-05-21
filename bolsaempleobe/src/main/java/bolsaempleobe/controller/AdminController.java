package bolsaempleobe.controller;

import bolsaempleobe.repository.EmpresaRepository;
import bolsaempleobe.repository.OferenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bolsaempleobe.service.AdminService;


@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final EmpresaRepository empresaRepository;
    private final OferenteRepository oferenteRepository;

    @GetMapping("/empresas/pendientes")
    public ResponseEntity<?> empresasPendientes() {
        return ResponseEntity.ok(adminService.getEmpresasPendientes());
    }

    @GetMapping("/empresas/total")
    public ResponseEntity<?> totalEmpresas() {
        return ResponseEntity.ok(adminService.getTotalEmpresas());
    }

    @GetMapping("/oferentes/pendientes")
    public ResponseEntity<?> oferentesPendientes() {
        return ResponseEntity.ok(adminService.getOferentesPendientes());
    }
    // El endpoint para obtener la cantidad total de oferentes en general
    @GetMapping("/oferentes/total")
    public ResponseEntity<?> totalOferentes() {
        return ResponseEntity.ok(adminService.getTotalOferentes());
    }

    @PutMapping("/empresas/{id}/aprobar")
    public ResponseEntity<?> aprobarEmpresa(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(adminService.aprobarEmpresa(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/oferentes/{id}/aprobar")
    public ResponseEntity<?> aprobarOferente(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(adminService.aprobarOferente(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/empresas")
    public ResponseEntity<?> todasEmpresas() {
        return ResponseEntity.ok(empresaRepository.findAll());
    }

    @GetMapping("/oferentes")
    public ResponseEntity<?> todosOferentes() {
        return ResponseEntity.ok(oferenteRepository.findAll());
    }

    @DeleteMapping("/empresas/{id}")
    public ResponseEntity<?> eliminarEmpresa(@PathVariable Long id) {
        try {
            empresaRepository.deleteById(id);
            return ResponseEntity.ok("Empresa eliminada");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/oferentes/{id}")
    public ResponseEntity<?> eliminarOferente(@PathVariable Long id) {
        try {
            oferenteRepository.deleteById(id);
            return ResponseEntity.ok("Oferente eliminado");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}