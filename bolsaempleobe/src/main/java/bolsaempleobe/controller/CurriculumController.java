package bolsaempleobe.controller;

import bolsaempleobe.config.JwtUtil;
import bolsaempleobe.repository.CurriculumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import bolsaempleobe.model.Curriculum;
import bolsaempleobe.model.Oferente;

@RestController
@RequestMapping("/api/curriculum")
@RequiredArgsConstructor
public class CurriculumController {

    private final CurriculumRepository curriculumRepository;
    private final JwtUtil jwtUtil;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping("/oferente/{oferenteId}")
    public ResponseEntity<?> getCurriculum(@PathVariable Long oferenteId) {
        return curriculumRepository.findByOferenteId(oferenteId)
                .map(c -> ResponseEntity.ok().body(c))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/descargar/{archivo}")
    public ResponseEntity<Resource> descargar(@PathVariable String archivo) {
        try {
            Path path = Paths.get(UPLOAD_DIR).resolve(archivo);
            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + archivo + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/subir")
    public ResponseEntity<?> subir(
            @RequestParam("archivo") MultipartFile file,
            @RequestHeader("Authorization") String token
    ) {

        try {

            Long oferenteId = jwtUtil.extractId(token.substring(7));

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String nombreArchivo =
                    "cv_" + oferenteId + "_" + file.getOriginalFilename();

            Path filePath = uploadPath.resolve(nombreArchivo);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            Curriculum curriculum = curriculumRepository
                    .findByOferenteId(oferenteId)
                    .orElse(new Curriculum());

            Oferente oferente = new Oferente();
            oferente.setId(oferenteId);

            curriculum.setOferente(oferente);
            curriculum.setArchivo(nombreArchivo);

            curriculumRepository.save(curriculum);

            return ResponseEntity.ok("CV subido correctamente");

        } catch (IOException e) {
            return ResponseEntity.badRequest()
                    .body("Error al subir el archivo");
        }
    }
}