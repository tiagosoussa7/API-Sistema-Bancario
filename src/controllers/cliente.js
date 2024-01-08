const knex = require('../connections/knex');
const bcrypt = require('bcrypt');

const cadastrar = async (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({mensagem: 'Para efetuar o cadastro é necessário preencher todos os campos.'});
    };
    
    try {
        const emailCadastro = await knex('clientes').where({email}).first();
        
        if (emailCadastro) {
            return res.status(400).json({mensagem: `O ${email} já está sendo utilizado, por favor insira um novo email.`});
        };
        
        const cpfCadastro = await knex('clientes').where({cpf}).first();
        
        if (cpfCadastro) {
            return res.status(400).json({mensagem: `O ${cpf} já está sendo utilizado, por favor insira um novo cpf.`});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const clienteCadastrado = await knex('clientes').insert({
            nome, 
            cpf, 
            data_nascimento, 
            telefone, 
            email, 
            senha: senhaCriptografada
        }).returning('*');

        if(!clienteCadastrado[0]){
            return res.status(400).json({mensagem: `O cliente não foi cadastrado.`});
        }

        return res.status(200).json(clienteCadastrado[0]);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({mensagem: `erro interno: ${error.message}`});
    }
}
            
        

module.exports = {
    cadastrar
}