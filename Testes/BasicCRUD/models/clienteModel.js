class Cliente {
    constructor(obj) {
        obj ?? {}

        this.nome = obj.nome ?? '';
        this.cpf = obj.cpf ?? '';
    }
};

module.exports = Cliente;