create table clientes (
	id serial primary key,
	nome text not null,
	cpf varchar(11) unique not null,
    data_nascimento date not null,
    telefone varchar(11) not null,
    email text not null,
    senha text not null
);      

create table conta_clientes (
    numero_conta serial primary key,
    saldo decimal(10,2) default 0.00,
    cliente_id serial references clientes(id),
    foreign key (cliente_id) references clientes(id)
);