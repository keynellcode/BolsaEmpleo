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
            if (!passwordEncoder.matches(request.getClave(), empresa.get().getClave()))
                throw new RuntimeException("Credenciales inválidas");
            String token = jwtUtil.generateToken(
                    empresa.get().getCorreo(), "EMPRESA", empresa.get().getId());
            return new LoginResponse(token, "EMPRESA", empresa.get().getId(), "Empresa");
        }
        // Intentar como Oferente
        var oferente = oferenteRepository.findByCorreo(request.getUsuario());
        if (oferente.isPresent()) {
            if (!passwordEncoder.matches(request.getClave(), oferente.get().getClave()))
                throw new RuntimeException("Credenciales inválidas");
            String token = jwtUtil.generateToken(
                    oferente.get().getCorreo(), "OFERENTE", oferente.get().getId());
            return new LoginResponse(token, "OFERENTE", oferente.get().getId(), "Oferente");
        }


        throw new RuntimeException("Usuario no encontrado");
    }
}