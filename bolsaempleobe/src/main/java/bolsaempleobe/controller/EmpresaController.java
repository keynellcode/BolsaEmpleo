package bolsaempleobe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bolsaempleobe.dto.EmpresaDTO;
import bolsaempleobe.service.EmpresaService;

import java.security.Principal;

@RestController
@RequestMapping("/api/empresas")
@RequiredArgsConstructor
public class EmpresaController {

    private final EmpresaService empresaService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody EmpresaDTO dto) {
        try {
            return ResponseEntity.ok(empresaService.registrar(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(Principal principal) {
        try {
            return ResponseEntity.ok(empresaService.getPorCorreo(principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}