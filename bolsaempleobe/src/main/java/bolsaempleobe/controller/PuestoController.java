package bolsaempleobe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bolsaempleobe.config.JwtUtil;
import bolsaempleobe.dto.BusquedaPuestoDTO;
import bolsaempleobe.dto.PuestoDTO;
import bolsaempleobe.service.PuestoService;

@RestController
@RequestMapping("/api/puestos")
@RequiredArgsConstructor
public class PuestoController {

    private final PuestoService puestoService;
    private final JwtUtil jwtUtil;

    @GetMapping("/publicos")
    public ResponseEntity<?> getPublicos() {
        return ResponseEntity.ok(puestoService.getPublicosRecientes());
    }

    @PostMapping("/buscar")
    public ResponseEntity<?> buscar(@RequestBody BusquedaPuestoDTO dto) {
        return ResponseEntity.ok(puestoService.buscar(dto));
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody PuestoDTO dto,
                                   @RequestHeader("Authorization") String token) {
        try {
            Long empresaId = jwtUtil.extractId(token.substring(7));
            dto.setEmpresaId(empresaId);
            return ResponseEntity.ok(puestoService.crear(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/empresa")
    public ResponseEntity<?> getPorEmpresa(
            @RequestHeader("Authorization") String token) {
        try {
            Long empresaId = jwtUtil.extractId(token.substring(7));
            return ResponseEntity.ok(puestoService.getPorEmpresa(empresaId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/desactivar")
    public ResponseEntity<?> desactivar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(puestoService.desactivar(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/candidatos")
    public ResponseEntity<?> getCandidatos(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(puestoService.getCandidatos(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}