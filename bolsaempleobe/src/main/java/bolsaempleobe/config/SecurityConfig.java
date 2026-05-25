package bolsaempleobe.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Rutas públicas
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/empresas/registro").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/oferentes/registro").permitAll()
                        .requestMatchers(HttpMethod.GET,  "/api/puestos/publicos").permitAll()
                        .requestMatchers(HttpMethod.POST,  "/api/puestos/buscar").permitAll()
                        .requestMatchers(HttpMethod.GET,  "/api/caracteristicas/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/caracteristicas").permitAll()
                        // Rutas por rol
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/empresas/**").hasRole("EMPRESA")
                        .requestMatchers("/api/oferentes/**").hasRole("OFERENTE")
                        .requestMatchers(HttpMethod.POST, "/api/puestos").hasRole("EMPRESA")
                        .requestMatchers(HttpMethod.PUT,  "/api/puestos/**").hasRole("EMPRESA")
                        .requestMatchers(HttpMethod.GET,  "/api/puestos/empresa").hasRole("EMPRESA")
                        .requestMatchers(HttpMethod.GET, "/api/puestos/*/candidatos").hasRole("EMPRESA")
                        .requestMatchers(HttpMethod.GET, "/api/oferentes/*/habilidades").hasRole("EMPRESA")
                        .requestMatchers(HttpMethod.GET, "/api/curriculum/**").hasRole("EMPRESA")
                        .requestMatchers(HttpMethod.POST, "/api/curriculum/subir").hasRole("OFERENTE")
                        .requestMatchers(HttpMethod.GET, "/api/curriculum/oferente/**").hasRole("OFERENTE")
                        .requestMatchers(HttpMethod.GET, "/api/curriculum/oferente/**").hasAnyRole("OFERENTE", "EMPRESA")
                        .requestMatchers(HttpMethod.GET, "/api/curriculum/descargar/**").hasAnyRole("OFERENTE", "EMPRESA")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173")); // puerto de React
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}