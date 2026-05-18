package bolsaempleobe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import bolsaempleobe.config.JwtUtil;
import bolsaempleobe.dto.LoginRequest;
import bolsaempleobe.dto.LoginResponse;
import bolsaempleobe.repository.AdministradorRepository;
import bolsaempleobe.repository.EmpresaRepository;
import bolsaempleobe.repository.OferenteRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmpresaRepository empresaRepository;
    private final OferenteRepository oferenteRepository;
    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        // Intentar como Administrador
        var admin = administradorRepository.findByIdentificacion(request.getUsuario());
        if (admin.isPresent()) {
            if (!passwordEncoder.matches(request.getClave(), admin.get().getClave()))
                throw new RuntimeException("Credenciales inválidas");
            String token = jwtUtil.generateToken(
                    admin.get().getIdentificacion(), "ADMIN", admin.get().getId());
            return new LoginResponse(token, "ADMIN", admin.get().getId(), "Administrador");
        }
        // Intentar como Empresa
        var empresa = empresaRepository.findByCorreo(request.getUsuario());
        if (empresa.isPresent()) {
            if (!empresa.get().isAprobada())
                throw new RuntimeException("Empresa no aprobada");
            String token = jwtUtil.generateToken(
                    empresa.get().getCorreo(), "EMPRESA", empresa.get().getId());
            return new LoginResponse(token, "EMPRESA",
                    empresa.get().getId(), empresa.get().getNombre());
        }

        // Intentar como Oferente
        var oferente = oferenteRepository.findByCorreo(request.getUsuario());
        if (oferente.isPresent()) {
            if (!oferente.get().isAprobado())
                throw new RuntimeException("Oferente no aprobado");
            String token = jwtUtil.generateToken(
                    oferente.get().getCorreo(), "OFERENTE", oferente.get().getId());
            return new LoginResponse(token, "OFERENTE",
                    oferente.get().getId(), oferente.get().getNombre());
        }

        throw new RuntimeException("Usuario no encontrado");
    }
}