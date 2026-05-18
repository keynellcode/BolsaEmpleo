package bolsaempleobe.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "oferente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Oferente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    private String clave;

    private String identificacion;

    private String nombre;

    private String apellido;

    private String nacionalidad;

    private String telefono;

    private String correo;

    private String residencia;

    private boolean aprobado;

    private LocalDateTime fechaRegistro;

    @JsonIgnore
    @OneToOne(mappedBy = "oferente")
    private Curriculum curriculum;

    @JsonIgnore
    @OneToMany(mappedBy = "oferente", fetch = FetchType.LAZY)
    private List<OferenteCaracteristica> habilidades;
}