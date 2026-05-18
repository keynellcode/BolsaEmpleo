package bolsaempleobe.dto;

import lombok.Data;

@Data
public class OferenteDTO {
    private Long id;
    private String identificacion;
    private String nombre;
    private String apellido;
    private String nacionalidad;
    private String telefono;
    private String correo;
    private String residencia;
    private String clave;        // solo para registro
    private boolean aprobado;
}