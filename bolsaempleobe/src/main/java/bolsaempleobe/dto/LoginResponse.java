package bolsaempleobe.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String rol;   // "EMPRESA", "OFERENTE", "ADMIN"
    private Long id;
    private String nombre;
}