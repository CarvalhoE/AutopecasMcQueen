Drop Table if exists PedidoDetalhe;
Drop Table if exists Pedido;
Drop Table if exists PedidoStatus;
Drop Table if exists Cliente;
Drop Table if exists FormaPagamento;
Drop Table if exists Produto;
Drop Table if exists Categoria;
Drop Table if exists Funcionario;

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
   ,FL_Habilitado		Char(1)			Not Null
   ,Constraint PK_ID_Funcionario 				Primary Key (ID_Funcionario)
   ,Constraint CK_FL_Habilitado 				Check (FL_Habilitado In (0,1))
);
    
Insert Into	Funcionario (NM_Nome, NR_CPF, DT_Nascimento, NR_Codigo, DS_Login, NR_Senha, FL_Habilitado) 
	Values ('Joaquim', '12345678912', '2000-12-01', '1123426', 'Joaquim', '1234', 1)
		  ,('Lukas', '35824302863', '2003-04-09', '1182007', 'Lukas', '1234', 0);

Create Table Categoria
(
	ID_Categoria Int 			auto_increment
   ,DS_Categoria VarChar(32) 	Not Null
   ,Constraint PK_ID_Categoria Primary Key (ID_Categoria)
);

Insert Into Categoria (DS_Categoria) 
	Values ('Acessório')
          ,('Elétrica')
          ,('Mecânica');

Create Table Produto
(
	ID_Produto 		Int 			Auto_Increment
   ,NM_Produto 		VarChar(128) 	Not Null
   ,DS_Descricao	VarChar(256)	Not Null
   ,NR_SKU			VarChar(10)		Not Null
   ,VL_Preco 		Numeric(10,2) 	Not Null
   ,DS_Marca 		VarChar(64) 	Not Null
   ,ID_Categoria 	Int 			Not Null
   ,Constraint PK_ID_Produto 				Primary Key (ID_Produto)
   ,Constraint FK_ID_Categoria_Categoria 	Foreign Key (ID_Categoria) References Categoria (ID_Categoria)
);

Insert Into Produto (NM_Produto, DS_Descricao, NR_SKU, VL_Preco, DS_Marca, ID_Categoria)
	Values ('Cheirinho', 'Bom cheiro para carros', 'CA93820584', '14.90', 'Apple', 1)
          ,('Bateria', 'Bateria para carros', 'CE19475937', '1200.00', 'Moura', 2)
          ,('Amortecedor', 'Amortecedor para carros', 'CM83027504', '99.90', 'Philips', 3);

Create Table FormaPagamento
(
	ID_FormaPagamento 	Int 			auto_increment
   ,DS_FormaPagamento 	VarChar(32) 	Not Null
   ,Constraint PK_ID_FormaPagamento Primary Key (ID_FormaPagamento)
);

Insert Into	FormaPagamento (DS_FormaPagamento) 
	Values ('Cartão de Crédito')
	      ,('Cartão de Débito')
          ,('Dinheiro');

Create Table Cliente
(
	ID_Cliente		Int				auto_increment
   ,NM_Nome		 	VarChar(64)		Not Null
   ,NR_CPF		 	VarChar(14)		Not Null
   ,DS_Email	 	VarChar(32)		Not Null
   ,NR_Telefone		VarChar(11)		Null
   ,DT_Nascimento	Date			Not Null
   ,DT_Cadastro 	DateTime 		Not Null
   ,Constraint PK_ID_Cliente Primary Key (ID_Cliente)
);

Insert Into Cliente (NM_Nome, NR_CPF, DS_Email, DT_Nascimento, DT_Cadastro) 
	Values ('Karen Reis', '32095158830', 'karenreis@gmail.com', '1985-08-26', '2022-09-17')
	      ,('Rodrigo Jose', '30264851870', 'rodrigojose@hotmail.com', '1982-10-28', '2022-10-05');

Create Table PedidoStatus
(
	ID_PedidoStatus Int				auto_increment
   ,DS_Status	 	VarChar(40)		Not Null
   ,Constraint PK_ID_PedidoStatus Primary Key (ID_PedidoStatus)
);

Insert Into PedidoStatus (DS_Status) 
	Values ('Pedido Em Aberto')
	      ,('Pagamento Efetuado')
          ,('Pagamento Rejeitado')
          ,('Pedido Cancelado');

Create Table Pedido
(
	ID_Pedido 				Int 			auto_increment
   ,ID_Funcionario 			Int 			Not Null
   ,ID_Cliente 				Int 			Not Null
   ,DT_Pedido 				DateTime	 	Not Null
   ,VL_Valor	 			Numeric(12,2) 	Not Null
   ,DT_Efetivacao			DateTime		Null
   ,ID_PedidoStatus 		Int 			Not Null
   ,DT_Status				DateTime		Null
   ,DS_MotivoCancelamento 	VarChar(128)	Null
   ,FL_Parcelado			char(1)			Not Null
   ,NR_QtdParcelas			int				Null
   ,ID_FormaPagamento 		Int 			Not Null
   ,Constraint PK_ID_Pedido 					Primary Key (ID_Pedido)
   ,Constraint FK_ID_PedidoStatus_PedidoStatus 	Foreign Key (ID_PedidoStatus) 	References PedidoStatus (ID_PedidoStatus)
   ,Constraint FK_ID_Cliente_Cliente 			Foreign Key (ID_Cliente) 		References Cliente (ID_Cliente)
   ,Constraint FK_ID_Funcionario2_Funcionario 	Foreign Key (ID_Funcionario) 	References Funcionario (ID_Funcionario)
   ,Constraint FK_ID_FormaPagamento 			Foreign Key (ID_FormaPagamento) References FormaPagamento (ID_FormaPagamento)
   ,Constraint CK_FL_Parcelado 					Check (FL_Parcelado In (0,1))
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