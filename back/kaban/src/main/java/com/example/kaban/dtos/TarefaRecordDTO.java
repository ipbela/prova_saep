package com.example.kaban.dtos;

import com.example.kaban.models.TarefaModel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record TarefaRecordDTO(@NotBlank String descricao, @NotBlank String nomeSetor, @NotNull TarefaModel.Prioridade prioridade, @NotNull
                              LocalDate dataCadastro, @NotBlank String status, @NotNull UUID idUsuario) {
}
