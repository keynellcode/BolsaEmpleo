package bolsaempleobe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bolsaempleobe.config.JwtUtil;
import bolsaempleobe.dto.OferenteCaracteristicaDTO;
import bolsaempleobe.dto.OferenteDTO;
import bolsaempleobe.service.OferenteService;

import java.util.List;

@RestController
@RequestMapping("/api/oferentes")
@RequiredArgsConstructor
public class OferenteController {

    private final OferenteService oferenteService;
    private final JwtUtil jwtUtil;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody OferenteDTO dto) {
        try {
            return ResponseEntity.ok(oferenteService.registrar(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(@RequestHeader("Authorization") String token) {
        try {
            Long id = jwtUtil.extractId(token.substring(7));
            return ResponseEntity.ok(oferenteService.getPorId(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/habilidades")
    public ResponseEntity<?> actualizarHabilidades(
            @RequestHeader("Authorization") String token,
            @RequestBody List<OferenteCaracteristicaDTO> habilidades) {
        try {
            Long id = jwtUtil.extractId(token.substring(7));
            oferenteService.actualizarHabilidades(id, habilidades);
            return ResponseEntity.ok("Habilidades actualizadas");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/habilidades")
    public ResponseEntity<?> getHabilidades(
            @RequestHeader("Authorization") String token) {
        try {
            Long id = jwtUtil.extractId(token.substring(7));
            return ResponseEntity.ok(oferenteService.getHabilidades(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/habilidades")
    public ResponseEntity<?> getHabilidadesPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(oferenteService.getHabilidades(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}