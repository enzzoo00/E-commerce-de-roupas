package controller;

import model.Cliente;
import java.util.HashMap;
import java.util.Map;

public class AutenticacaoController {
    private Map<String, Cliente> clientesCadastrados = new HashMap<>();

    public Cliente cadastrarCliente(int id, String nome, String email, String senha) {
        String senhaHash = String.valueOf(senha.hashCode());
        Cliente cliente = new Cliente(id, nome, email, senhaHash);
        clientesCadastrados.put(email, cliente);
        return cliente;
    }

    public boolean login(String email, String senha) {
        Cliente cliente = clientesCadastrados.get(email);
        if (cliente != null) {
            String senhaHash = String.valueOf(senha.hashCode());
            return cliente.getSenhaHash().equals(senhaHash);
        }
        return false;
    }

    public void logout(Cliente cliente) {
        // Lógica para encerrar a sessão do cliente
    }
}
