package bolsaempleobe.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "empresa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    private String clave;

    private String nombre;

    private String localizacion;

    private String correo;

    private String telefono;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private boolean aprobada;

    private LocalDateTime fechaRegistro;

    @JsonIgnore
    @OneToMany(mappedBy = "empresa", fetch = FetchType.LAZY)
    private List<Puesto> puestos;
}