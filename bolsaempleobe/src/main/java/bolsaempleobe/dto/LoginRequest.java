package bolsaempleobe.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String usuario; // correo o identificacion
    private String clave;
}