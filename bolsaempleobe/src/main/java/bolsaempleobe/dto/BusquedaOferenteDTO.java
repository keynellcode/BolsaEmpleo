package bolsaempleobe.dto;

import lombok.Data;
import java.util.List;

@Data
public class BusquedaOferenteDTO {
    private List<PuestoCaracteristicaDTO> requisitos; // caracteristica + nivel mínimo
}