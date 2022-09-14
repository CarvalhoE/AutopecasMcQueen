Drop Table if exists PedidoDetalhe;
Drop Table if exists Pedido;
Drop Table if exists Estoque;
Drop Table if exists Produto;
Drop Table if exists Categoria;
Drop Table if exists Cliente;
Drop Table if exists FuncionarioEndereco;
Drop Table if exists Funcionario;
Drop Table if exists Departamento;
Drop Table if exists Cargo;
Drop Table if exists Perfil;
Drop Table if exists FormaPagamento;
Drop Table if exists PedidoStatus;
Drop Table if exists NotaFiscal;

Create Table Categoria
(
	ID_Categoria Int 			auto_increment
   ,DS_Categoria VarChar(32) 	Not Null
   ,Constraint PK_ID_Categoria Primary Key (ID_Categoria)
);

Create Table Produto
(
	ID_Produto 		Int 			Auto_Increment
   ,NM_Produto 		VarChar(128) 	Not Null
   ,DS_Descricao	VarChar(256)	Not Null
   ,IM_Foto			VarChar(256)	Null
   ,NR_SKU			VarChar(14)		Not Null
   ,VL_Preco 		Numeric(10,2) 	Not Null
   ,DS_Marca 		VarChar(64) 	Not Null
   ,ID_Categoria 	Int 			Not Null
   ,Constraint PK_ID_Produto 				Primary Key (ID_Produto)
   ,Constraint FK_ID_Categoria_Categoria 	Foreign Key (ID_Categoria) References Categoria (ID_Categoria)
);

Create Table Estoque
(
	ID_Produto 				Int
   ,NR_Quantidade 			Int 		Not Null
   ,FL_Disponivel 			Char(1) 	Not Null
   ,DT_UltimaAtualizacao 	DateTime 	Not Null
   ,Constraint PK_ID_Produto 			Primary Key (ID_Produto)
   ,Constraint FK_ID_Produto_Produto 	Foreign Key (ID_Produto) References Produto (ID_Produto)
   ,Constraint CK_FL_Disponivel 		Check (FL_Disponivel In (0,1))
);

Create Table Cliente
(
	ID_Cliente		Int				auto_increment
   ,NM_Nome		 	VarChar(64)		Not Null
   ,NR_CPF		 	VarChar(14)		Not Null
   ,DS_Email	 	VarChar(32)		Not Null
   ,DS_CEP		 	VarChar(8)		Not Null
   ,DS_Endereco	 	VarChar(64)		Not Null
   ,DS_UF		 	VarChar(2)		Not Null
   ,DS_Cidade	 	VarChar(16)		Not Null
   ,DS_Numero	 	VarChar(8)		Not Null
   ,DT_Cadastro 	DateTime 		Not Null
   ,Constraint PK_ID_Cliente Primary Key (ID_Cliente)
);

Create Table Departamento
(
	ID_Departamento 	Int 			auto_increment
   ,DS_Departamento 	VarChar(40) 	Not Null
   ,Constraint PK_ID_Departamento Primary Key (ID_Departamento)
);

Create Table Cargo
(
	ID_Cargo		 	Int 			auto_increment
   ,DS_Cargo 			VarChar(40) 	Not Null
   ,Constraint PK_ID_Cargo Primary Key (ID_Cargo)
);

Create Table Perfil
(
	ID_Perfil 	Int 			auto_increment
   ,DS_Perfil 	VarChar(16) 	Not Null
   ,Constraint PK_ID_Perfil Primary Key (ID_Perfil)
);

Create Table Funcionario
(
	ID_Funcionario		Int				auto_increment
   ,NM_Nome		 		VarChar(100)	Not Null
   ,NR_CPF				VarChar(11)		Not Null	Unique
   ,NR_Telefone			VarChar(11)		Null
   ,DS_Email			VarChar(64)		Null
   ,DT_Nascimento		Date			Not Null
   ,NR_Codigo	 		VarChar(14)		Not Null
   ,DS_Login         	VarChar(14)    	Not Null	Unique
   ,NR_Senha	 		VarChar(14)		Not Null
   ,ID_Departamento		Int				Not Null
   ,ID_Cargo			Int				Not Null
   ,ID_Perfil			Int				Not Null 
   ,FL_Habilitado		Char(1)			Not Null
   ,DT_Admissao 		Date	 		Not Null
   ,DT_Demissao 		Date	 		Not Null
   ,Constraint PK_ID_Funcionario 				Primary Key (ID_Funcionario)
   ,Constraint FK_ID_Departamento_Departamento 	Foreign Key (ID_Departamento) 	References Departamento (ID_Departamento)
   ,Constraint FK_ID_Cargo_Cargo			 	Foreign Key (ID_Cargo) 			References Cargo (ID_Cargo)
   ,Constraint FK_ID_Perfil_Perfil 				Foreign Key (ID_Perfil) 		References Perfil (ID_Perfil)
   ,Constraint CK_FL_Habilitado 				Check (FL_Habilitado In (0,1))
);

Create Table FuncionarioEndereco
(
	ID_FuncionarioEndereco		Int				auto_increment
   ,ID_Funcionario				Int 			Not Null
   ,DS_Logradouro		 		VarChar(126)	Null
   ,DS_Numero		 			VarChar(5)		Null
   ,DS_Complemento		 		VarChar(40)		Null
   ,DS_CEP		 				VarChar(8)		Null
   ,DS_Bairro		 			VarChar(40)		Null
   ,DS_Cidade		 			VarChar(40)		Null
   ,DS_UF		 				VarChar(2)		Null
   ,Constraint PK_ID_FuncionarioEndereco 		Primary Key (ID_FuncionarioEndereco)
   ,Constraint FK_ID_Funcionario_Funcionario 	Foreign Key (ID_Funcionario) 	References Funcionario (ID_Funcionario)
);

Create Table FormaPagamento
(
	ID_FormaPagamento 	Int 			auto_increment
   ,DS_FormaPagamento 	VarChar(32) 	Not Null
   ,Constraint PK_ID_FormaPagamento Primary Key (ID_FormaPagamento)
);

Create Table PedidoStatus
(
	ID_PedidoStatus Int				auto_increment
   ,DS_Status	 	VarChar(40)		Not Null
   ,Constraint PK_ID_PedidoStatus Primary Key (ID_PedidoStatus)
);

Create Table NotaFiscal		-- Em desenvolvimento
(
	ID_NotaFiscal 		Int 			auto_increment
   ,NR_NotaFiscal 		Int			 	Not Null
   ,DT_Cadastro			DateTime	    Not Null
   ,Constraint PK_ID_NotaFiscal 		Primary Key (ID_NotaFiscal)
);

Create Table Pedido
(
	ID_Pedido 			Int 			auto_increment
   ,ID_NotaFiscal 		Int			 	Not Null
   ,VL_PrecoTotal 		Numeric(12,2) 	Not Null
   ,DT_Pedido 			DateTime	 	Not Null
   ,DT_Efetivacao		DateTime		Null
   ,ID_PedidoStatus 	Int 			Not Null
   ,ID_Cliente 			Int 			Not Null
   ,ID_Funcionario 		Int 			Not Null
   ,ID_FormaPagamento 	Int 			Not Null
   ,Constraint PK_ID_Pedido 					Primary Key (ID_Pedido)
   ,Constraint FK_ID_NotaFiscal_NotaFiscal 		Foreign Key (ID_NotaFiscal) 	References NotaFiscal (ID_NotaFiscal)
   ,Constraint FK_ID_PedidoStatus_PedidoStatus 	Foreign Key (ID_PedidoStatus) 	References PedidoStatus (ID_PedidoStatus)
   ,Constraint FK_ID_Cliente_Cliente 			Foreign Key (ID_Cliente) 		References Cliente (ID_Cliente)
   ,Constraint FK_ID_Funcionario2_Funcionario 	Foreign Key (ID_Funcionario) 	References Funcionario (ID_Funcionario)
   ,Constraint FK_ID_FormaPagamento 			Foreign Key (ID_FormaPagamento) References FormaPagamento (ID_FormaPagamento)
);

Create Table PedidoDetalhe
(
	ID_PedidoDetalhe 	Int 			auto_increment
   ,ID_Pedido 			Int 			Not Null
   ,ID_Produto 			Int 			Not Null
   ,NR_Quantidade 		Int 			Not Null
   ,VL_Total 			Numeric(5,2) 	Not Null
   ,Constraint PK_ID_PedidoDetalhe 			Primary Key (ID_PedidoDetalhe)
   ,Constraint FK_ID_Pedido_Pedido 			Foreign Key (ID_Pedido) 	References Pedido (ID_Pedido)
   ,Constraint FK_ID_PedidoProduto_Produto 	Foreign Key (ID_Produto)	References Produto (ID_Produto)
);

 -- Inserts
 
 Insert Into
	Departamento (DS_Departamento) Values ('Financeiro');
Insert Into
	Departamento (DS_Departamento) Values ('RH');
Insert Into
	Departamento (DS_Departamento) Values ('Operacional');
Insert Into
	Departamento (DS_Departamento) Values ('Gestão');
    
Insert Into
	Cargo (DS_Cargo) Values ('Vendedor');
Insert Into
	Cargo (DS_Cargo) Values ('Gerente');
Insert Into
	Cargo (DS_Cargo) Values ('EStoquista');
Insert Into
	Cargo (DS_Cargo) Values ('Aux de Contas a Pagar');
Insert Into
	Cargo (DS_Cargo) Values ('Aux de Compras');
Insert Into
	Cargo (DS_Cargo) Values ('Analista de Recrutamento e Seleção');
    
Insert Into
	PedidoStatus (DS_Status) Values ('Pedido Em Aberto');
Insert Into
	PedidoStatus (DS_Status) Values ('Pagamento Efetuado');
Insert Into
	PedidoStatus (DS_Status) Values ('Pagamento Rejeitado');
Insert Into
	PedidoStatus (DS_Status) Values ('Pedido Cancelado');
    
Insert Into
	Perfil (DS_Perfil) Values ('Gerente');
Insert Into
	Perfil (DS_Perfil) Values ('Comercial');
Insert Into
	Perfil (DS_Perfil) Values ('Financeiro');
Insert Into
	Perfil (DS_Perfil) Values ('RH');