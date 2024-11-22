package com.example.kaban.dtos;

import jakarta.validation.constraints.NotBlank;

public record UsuarioRecordDTO(@NotBlank String nome, @NotBlank String email) {
}
