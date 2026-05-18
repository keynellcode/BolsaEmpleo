package bolsaempleobe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bolsaempleobe.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/empresas/pendientes")
    public ResponseEntity<?> empresasPendientes() {
        return ResponseEntity.ok(adminService.getEmpresasPendientes());
    }

    @GetMapping("/oferentes/pendientes")
    public ResponseEntity<?> oferentesPendientes() {
        return ResponseEntity.ok(adminService.getOferentesPendientes());
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
}