package bolsaempleobe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bolsaempleobe.dto.CaracteristicaDTO;
import bolsaempleobe.service.CaracteristicaService;

@RestController
@RequestMapping("/api/caracteristicas")
@RequiredArgsConstructor
public class CaracteristicaController {

    private final CaracteristicaService caracteristicaService;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody CaracteristicaDTO dto) {
        try {
            return ResponseEntity.ok(
                    caracteristicaService.crear(dto.getNombre(), dto.getPadreId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?> getArbol() {
        return ResponseEntity.ok(caracteristicaService.getArbolDTO());
    }
}