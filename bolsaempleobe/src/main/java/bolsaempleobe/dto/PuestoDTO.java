package bolsaempleobe.dto;

import lombok.Data;
import java.util.List;

@Data
public class PuestoDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Double salario;
    private String tipoPublicacion;
    private boolean activo;
    private Long empresaId;
    private String empresaNombre;
    private List<PuestoCaracteristicaDTO> requisitos;
}