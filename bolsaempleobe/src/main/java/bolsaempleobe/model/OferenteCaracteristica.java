package bolsaempleobe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "oferente_caracteristica")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OferenteCaracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer nivel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "oferente_id")
    private Oferente oferente;

    @ManyToOne
    @JoinColumn(name = "caracteristica_id")
    private Caracteristica caracteristica;
}