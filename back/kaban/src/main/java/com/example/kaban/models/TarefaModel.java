package com.example.kaban.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "TB_TAREFA")
public class TarefaModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idTarefa;
    private String descricao;
    private String nomeSetor;
    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;
    private LocalDate dataCadastro;
    private String status;

    @ManyToOne
    @JoinColumn(name = "fkUsuario", nullable = false)
    private UsuarioModel usuarioModel;

    public UUID getIdTarefa() {
        return idTarefa;
    }

    public void setIdTarefa(UUID idTarefa) {
        this.idTarefa = idTarefa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }

    public Prioridade getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Prioridade prioridade) {
        this.prioridade = prioridade;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UsuarioModel getUsuarioModel() {
        return usuarioModel;
    }

    public void setUsuarioModel(UsuarioModel usuarioModel) {
        this.usuarioModel = usuarioModel;
    }

    public enum Prioridade{
        BAIXA("Baixa"),
        MEDIA("Media"),
        ALTA("Alta");

        private final String label;

        Prioridade(String label){
            this.label = label;
        }

        public String getLabel(){
            return label;
        }
    }

}
