package com.example.kaban.controllers;

import com.example.kaban.dtos.TarefaRecordDTO;
import com.example.kaban.dtos.UsuarioRecordDTO;
import com.example.kaban.models.TarefaModel;
import com.example.kaban.repositories.TarefaRepository;
import com.example.kaban.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/kanban")
public class TarefaController {

    @Autowired
    TarefaRepository tarefaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping("/tarefas")
    public ResponseEntity<Object> criarTarefa(@RequestBody @Valid TarefaRecordDTO tarefaRecordDTO){
        var tarefaModel = new TarefaModel();
        BeanUtils.copyProperties(tarefaRecordDTO, tarefaModel);

        var usuarioModel = usuarioRepository.findById(tarefaRecordDTO.idUsuario());
        if(usuarioModel.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        tarefaModel.setUsuarioModel(usuarioModel.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaRepository.save(tarefaModel));
    }

    @GetMapping("/tarefas")
    public ResponseEntity<List<TarefaModel>> buscarTarefas(){
        return ResponseEntity.status(HttpStatus.OK).body(tarefaRepository.findAll());
    }

    @GetMapping("/tarefas/{idTarefa}")
    public ResponseEntity<Object> buscaTarefaIndividual(@PathVariable(value = "idTarefa") UUID idTarefa){
        Optional<TarefaModel> tarefa_ = tarefaRepository.findById(idTarefa);
        if(tarefa_.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar o id da tarefa");
        }

        return ResponseEntity.status(HttpStatus.OK).body(tarefa_.get());
    }

    @PutMapping("/tarefas/{idTarefa}")
    public ResponseEntity<Object> editaTarefa(@PathVariable(value = "idTarefa") UUID idTarefa,
                                                @RequestBody @Valid TarefaRecordDTO tarefaRecordDTO){
        Optional<TarefaModel> tarefa_ = tarefaRepository.findById(idTarefa);
        if(tarefa_.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar o id da tarefa");
        }

        var tarefaModel = tarefa_.get();

        tarefaModel.setDescricao(tarefaRecordDTO.descricao());
        tarefaModel.setNomeSetor(tarefaRecordDTO.nomeSetor());
        tarefaModel.setPrioridade(tarefaRecordDTO.prioridade());
        tarefaModel.setDataCadastro(tarefaRecordDTO.dataCadastro());
        tarefaModel.setStatus(tarefaRecordDTO.status());

        var usuarioModel = usuarioRepository.findById(tarefaRecordDTO.idUsuario());
        if(usuarioModel.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel encontrar o usuario");
        }

        tarefaModel.setUsuarioModel(usuarioModel.get());

        return ResponseEntity.status(HttpStatus.OK).body(tarefaRepository.save(tarefaModel));
    }

    @DeleteMapping("/tarefas/{idTarefa}")
    public ResponseEntity<Object> excluirTarefa(@PathVariable(value = "idTarefa") UUID idTarefa){
        Optional<TarefaModel> tarefa_ = tarefaRepository.findById(idTarefa);
        if(tarefa_.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar o id da tarefa");
        }

        tarefaRepository.delete(tarefa_.get());
        return ResponseEntity.status(HttpStatus.OK).body("Tarefa deletada com sucesso");
    }
}
