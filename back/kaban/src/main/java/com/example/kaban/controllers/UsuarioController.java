package com.example.kaban.controllers;

import com.example.kaban.dtos.UsuarioRecordDTO;
import com.example.kaban.models.UsuarioModel;
import com.example.kaban.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kanban")
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping("/usuarios")
    public ResponseEntity<Object> criarUsuario(@RequestBody @Valid UsuarioRecordDTO usuarioRecordDTO){
        var usuarioModel = new UsuarioModel();
        BeanUtils.copyProperties(usuarioRecordDTO, usuarioModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuarioModel));
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioModel>> buscaUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findAll());
    }
}
