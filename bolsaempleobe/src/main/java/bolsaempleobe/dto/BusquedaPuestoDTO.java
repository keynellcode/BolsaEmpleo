package bolsaempleobe.dto;

import lombok.Data;
import java.util.List;

@Data
public class BusquedaPuestoDTO {
    private List<Long> caracteristicaIds;
}