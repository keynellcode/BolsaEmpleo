package bolsaempleobe.dto;

import lombok.Data;

@Data
public class EmpresaDTO {
    private Long id;
    private String nombre;
    private String localizacion;
    private String correo;
    private String telefono;
    private String descripcion;
    private String clave;        // solo para registro, nunca se devuelve
    private boolean aprobada;
}