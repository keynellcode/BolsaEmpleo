package bolsaempleobe.dto;

import lombok.Data;
import java.util.List;

@Data
public class CaracteristicaDTO {
    private Long id;
    private String nombre;
    private Long padreId;
    private List<CaracteristicaDTO> subCaracteristicas;
}