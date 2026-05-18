package bolsaempleobe.service;

import bolsaempleobe.dto.CaracteristicaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import bolsaempleobe.model.Caracteristica;
import bolsaempleobe.repository.CaracteristicaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CaracteristicaService {

    private final CaracteristicaRepository caracteristicaRepository;

    public List<Caracteristica> getArbol() {
        return caracteristicaRepository.findByPadreIsNull();
    }

    public Caracteristica crear(String nombre, Long padreId) {
        Caracteristica c = new Caracteristica();
        c.setNombre(nombre);
        if (padreId != null) {
            Caracteristica padre = caracteristicaRepository.findById(padreId)
                    .orElseThrow(() -> new RuntimeException("Padre no encontrado"));
            c.setPadre(padre);
        }
        return caracteristicaRepository.save(c);
    }

    public List<CaracteristicaDTO> getArbolDTO() {
        List<Caracteristica> raices = caracteristicaRepository.findByPadreIsNull();
        return raices.stream().map(this::toDTO).toList();
    }

    private CaracteristicaDTO toDTO(Caracteristica c) {
        CaracteristicaDTO dto = new CaracteristicaDTO();
        dto.setId(c.getId());
        dto.setNombre(c.getNombre());
        dto.setPadreId(c.getPadre() != null ? c.getPadre().getId() : null);

        List<Caracteristica> hijos = caracteristicaRepository.findByPadreId(c.getId());
        dto.setSubCaracteristicas(hijos.stream().map(this::toDTO).toList());

        return dto;
    }
}