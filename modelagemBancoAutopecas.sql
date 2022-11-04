Drop Table if exists PedidoDetalhe;
Drop Table if exists Pedido;
Drop Table if exists Cliente;
Drop Table if exists PedidoStatus;
Drop Table if exists Cobranca;
Drop Table if exists SituacaoCobranca;
Drop Table if exists TipoCobranca;
Drop Table if exists CompraDetalhe;
Drop Table if exists Compra;
Drop Table if exists FormaPagamento;
Drop Table if exists Produto;
Drop Table if exists Categoria;
Drop Table if exists FuncionarioEndereco;
Drop Table if exists Funcionario;
Drop Table if exists Departamento;
Drop Table if exists Cargo;
Drop Table if exists Perfil;
Drop Table if exists CompraSituacao;
Drop Table if exists Fornecedor;

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
   ,IM_Foto			varChar(256)	Null
   ,NR_SKU			VarChar(14)		Not Null
   ,VL_BaseDeCompra Numeric(10,2) 	Not Null
   ,VL_Preco 		Numeric(10,2) 	Not Null
   ,FL_Disponivel	Char(1)			Not Null
   ,NR_Quantidade	Int				Not Null
   ,DS_Marca 		VarChar(64) 	Not Null
   ,ID_Categoria 	Int 			Not Null
   ,Constraint PK_ID_Produto 				Primary Key (ID_Produto)
   ,Constraint FK_ID_Categoria_Categoria 	Foreign Key (ID_Categoria) References Categoria (ID_Categoria)
   ,Constraint CK_FL_ProdutoDisponivel 		Check (FL_Disponivel In (0,1))
);

Insert Into Produto (NM_Produto, DS_Descricao, NR_SKU, VL_BaseDeCompra, VL_Preco, FL_Disponivel, NR_Quantidade, DS_Marca, ID_Categoria)
	Values ('Cheirinho', 'Bom cheiro para carros', 'CA12907221', 10.00, 14.90, 1, 0, 'CheiroBom', 1)
          ,('Bateria', 'Bateria para carros', 'CE12444643', 1000.00 1200.00, 1, 0, 'Moura', 2)
          ,('Amortecedor', 'Amortecedor para carros', 'CM12444234', 80.00, 99.90, 0, 0, 'Nike', 3);

Create Table FormaPagamento
(
	ID_FormaPagamento 	Int 			auto_increment
   ,DS_FormaPagamento 	VarChar(32) 	Not Null
   ,Constraint PK_ID_FormaPagamento Primary Key (ID_FormaPagamento)
);

Insert Into	FormaPagamento (DS_FormaPagamento) 
	Values ('Cartão de Crédito')
	      ,('Cartão de Débito')
          ,('Dinheiro')
          ,('Boleto')
          ,('PIX');

Create Table Departamento
(
	ID_Departamento 	Int 			auto_increment
   ,DS_Departamento 	VarChar(40) 	Not Null
   ,Constraint PK_ID_Departamento Primary Key (ID_Departamento)
);

Insert Into	Departamento (DS_Departamento) 
	Values ('Financeiro')
	      ,('RH')
          ,('Operacional')
          ,('Gestão');

Create Table Cargo
(
	ID_Cargo		 	Int 			auto_increment
   ,DS_Cargo 			VarChar(40) 	Not Null
   ,Constraint PK_ID_Cargo Primary Key (ID_Cargo)
);

Insert Into	Cargo (DS_Cargo)
	Values ('Vendedor')
		  ,('Gerente')
          ,('Estoquista')
          ,('Aux de Contas a Pagar')
          ,('Aux de Compras')
          ,('Analista de Recrutamento e Seleção');

Create Table Perfil
(
	ID_Perfil 	Int 			auto_increment
   ,DS_Perfil 	VarChar(16) 	Not Null
   ,Constraint PK_ID_Perfil Primary Key (ID_Perfil)
);

Insert Into	Perfil (DS_Perfil)
	Values ('Gerente')
	      ,('Comercial')
		  ,('Financeiro')
		  ,('RH');

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
   ,DT_Demissao 		Date	 		Null
   ,Constraint PK_ID_Funcionario 				Primary Key (ID_Funcionario)
   ,Constraint FK_ID_Departamento_Departamento 	Foreign Key (ID_Departamento) 	References Departamento (ID_Departamento)
   ,Constraint FK_ID_Cargo_Cargo			 	Foreign Key (ID_Cargo) 			References Cargo (ID_Cargo)
   ,Constraint FK_ID_Perfil_Perfil 				Foreign Key (ID_Perfil) 		References Perfil (ID_Perfil)
   ,Constraint CK_FL_Habilitado 				Check (FL_Habilitado In (0,1))
);
    
Insert Into	Funcionario (NM_Nome, NR_CPF, DT_Nascimento, NR_Codigo, DS_Login, NR_Senha, ID_Departamento, ID_Cargo, ID_Perfil, FL_Habilitado, DT_Admissao, DT_Demissao) 
	Values ('Joaquim', '12345678912', '2000-12-01', '11234', 'Joaquim', '1234', 4, 2, 1, 1, '2022-01-01', Null)
		  ,('Lukas', '35824302863', '2003-04-09', '1182007', 'Lukas', '1234', 3, 1, 2, 0, '2021-03-01', '2021-10-28');

Create Table FuncionarioEndereco
(
	ID_FuncionarioEndereco		Int				auto_increment
   ,ID_Funcionario				Int 			Not Null
   ,DS_Logradouro		 		VarChar(100)	Null
   ,DS_Numero		 			VarChar(5)		Null
   ,DS_Complemento		 		VarChar(40)		Null
   ,DS_CEP		 				VarChar(8)		Null
   ,DS_Bairro		 			VarChar(40)		Null
   ,DS_Cidade		 			VarChar(40)		Null
   ,DS_UF		 				VarChar(2)		Null
   ,Constraint PK_ID_FuncionarioEndereco 		Primary Key (ID_FuncionarioEndereco)
   ,Constraint FK_ID_Funcionario_Funcionario 	Foreign Key (ID_Funcionario) 	References Funcionario (ID_Funcionario)
);

Insert Into	FuncionarioEndereco (ID_Funcionario, DS_Logradouro, DS_Numero, DS_Complemento, DS_CEP, DS_Bairro, DS_Cidade, DS_UF)
	Values (1, 'Rua Cruzeiro', '666', 'Cela 4, Pavilhão 8', '08161530', 'São Miguel', 'São Paulo', 'SP')
		  ,(2, 'Rua Clemente', '804', 'Sem Complemento', '08190430', 'Vila Itaim', 'São Paulo', 'SP');

Create Table Fornecedor
(
	ID_Fornecedor 		Int 			auto_increment
   ,NM_Empresa 			VarChar(32) 	Not Null
   ,NR_CNPJ 			VarChar(14) 	Not Null
   ,DS_Logradouro		VarChar(100)	Null
   ,DS_Bairro		 	VarChar(40)		Null
   ,DS_Cidade		 	VarChar(40)		Null
   ,DS_CEP		 		VarChar(8)		Null
   ,NR_Telefone			VarChar(11)		Not Null
   ,DS_Email			VarChar(64)		Not Null
   ,NR_Banco			VarChar(5)		Null
   ,NR_Agencia			VarChar(5)		Null
   ,NR_Conta			VarChar(10)		Null
   ,Constraint PK_ID_Fornecedor	 	Primary Key (ID_Fornecedor)
);

Insert Into	Fornecedor (NM_Empresa, NR_CNPJ, NR_Telefone, DS_Email, NR_Banco, NR_Agencia, NR_Conta)
	Values ('Super Latas Fornecedor LTDA.', '16595359000199', '1155555129', 'contato@superlatas.com.br', '305', '1274', '010355259');

Create Table CompraSituacao
(
	ID_CompraSituacao 	Int 			auto_increment
   ,DS_Situacao 		VarChar(32) 	Not Null
   ,Constraint PK_ID_CompraSituacao	 	Primary Key (ID_CompraSituacao)
);

Insert Into CompraSituacao (DS_Situacao) 
	Values ('Efetivada')
	      ,('Cancelada')
          ,('Finalizada')
          ,('Pendente');

Create Table Compra
(
	ID_Compra 				Int				auto_increment
   ,VL_ValorTotal			Numeric(16,2)	Not Null
   ,ID_CompraSituacao		Int				Not Null
   ,DT_Compra				DateTime		Not Null
   ,ID_Funcionario			Int				Not Null
   ,ID_Fornecedor			Int				Not Null
   ,ID_FormaPagamento		Int				Not Null
   ,Constraint PK_ID_Compra 							Primary Key (ID_Compra)
   ,Constraint FK_ID_CompraSituacao_CompraSituacao 		Foreign Key (ID_CompraSituacao) References CompraSituacao (ID_CompraSituacao)
   ,Constraint FK_ID_Funcionario3_Funcionario 			Foreign Key (ID_Funcionario) 	References Funcionario (ID_Funcionario)
   ,Constraint FK_ID_Fornecedor_Fornecedor 				Foreign Key (ID_Fornecedor) 	References Fornecedor (ID_Fornecedor)
   ,Constraint FK_ID_FormaPagamento2_FormaPagamento 	Foreign Key (ID_FormaPagamento) References FormaPagamento (ID_FormaPagamento)
);

Insert Into Compra (VL_ValorTotal, ID_CompraSituacao, DT_Compra, ID_Funcionario, ID_Fornecedor, ID_FormaPagamento) 
	Values (300056.00, 3, '2022-02-25', 1, 1, 4)
	      ,(500000.00, 2, '2021-09-15', 2, 1, 4);

Create Table CompraDetalhe
(
	ID_CompraDetalhe 			Int				auto_increment
   ,ID_Compra					Int				Not Null
   ,ID_Produto					int				Not Null
   ,NR_Quantidade 				Int 			Not Null
   ,VL_ValorUnitario			Numeric(5,2)	Not Null
   ,VL_Total					Numeric(16,2)	Not Null
   ,Constraint PK_ID_CompraDetalhe 				Primary Key (ID_CompraDetalhe)
   ,Constraint FK_ID_Compra_Compra 				Foreign Key (ID_Compra) References Compra (ID_Compra)
   ,Constraint FK_ID_CompraProduto_Produto 		Foreign Key (ID_Produto) References Produto (ID_Produto)
   ,Constraint CK_VL_Total 						Check (VL_Total >= VL_ValorUnitario)
);

Insert Into CompraDetalhe (ID_Compra, ID_Produto, NR_Quantidade, VL_ValorUnitario, VL_Total) 
	Values (1, 1, 1000, 0.56, 560)
	      ,(1, 2, 3000, 100.0, 300000)
	      ,(2, 3, 10000, 50.0, 500000);

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
   ,NR_QtdParcelas			int				Null
   ,ID_FormaPagamento 		Int 			Not Null
   ,Constraint PK_ID_Pedido 					Primary Key (ID_Pedido)
   ,Constraint FK_ID_PedidoStatus_PedidoStatus 	Foreign Key (ID_PedidoStatus) 	References PedidoStatus (ID_PedidoStatus)
   ,Constraint FK_ID_Cliente_Cliente 			Foreign Key (ID_Cliente) 		References Cliente (ID_Cliente)
   ,Constraint FK_ID_Funcionario2_Funcionario 	Foreign Key (ID_Funcionario) 	References Funcionario (ID_Funcionario)
   ,Constraint FK_ID_FormaPagamento 			Foreign Key (ID_FormaPagamento) References FormaPagamento (ID_FormaPagamento)
);

Insert Into Pedido (ID_Funcionario, ID_Cliente, DT_Pedido, VL_Valor, DT_Efetivacao, ID_PedidoStatus, DT_Status, NR_QtdParcelas, ID_FormaPagamento) 
	Values (1, 1, '2022-11-01', 2454.90, '2022-11-01', 2, '2022-11-01', Null, 3);

Create Table PedidoDetalhe
(
	ID_PedidoDetalhe 	Int 			auto_increment
   ,ID_Pedido 			Int 			Not Null
   ,ID_Produto 			Int 			Not Null
   ,NR_Quantidade 		Int 			Not Null
   ,VL_Unitario			Numeric(10,2) 	Not Null
   ,VL_Total 			Numeric(10,2) 	Not Null
   ,Constraint PK_ID_PedidoDetalhe 			Primary Key (ID_PedidoDetalhe)
   ,Constraint FK_ID_Pedido_Pedido 			Foreign Key (ID_Pedido) 	References Pedido (ID_Pedido)
   ,Constraint FK_ID_PedidoProduto_Produto 	Foreign Key (ID_Produto)	References Produto (ID_Produto)
);

Insert Into PedidoDetalhe (ID_Pedido, ID_Produto, NR_Quantidade, VL_Unitario, VL_Total)
	Values (1, 2, 2, 1200.00, 2400.00)
          ,(1, 1, 1, 14.90, 14.90);

Create Table TipoCobranca
(
	ID_TipoCobranca		int				auto_increment
   ,DS_TipoCobranca		VarChar(32)		Not Null
   ,Constraint PK_ID_TipoCobranca		Primary Key (ID_TipoCobranca)	
);

Insert Into TipoCobranca (DS_TipoCobranca) 
	Values ('Débito')
		  ,('Crédito');

Create Table SituacaoCobranca
(
	ID_SituacaoCobranca		int				auto_increment
   ,DS_SituacaoCobranca		VarChar(32)		Not Null
   ,Constraint PK_ID_SituacaoCobranca		Primary Key (ID_SituacaoCobranca)	
);

Insert Into SituacaoCobranca (DS_SituacaoCobranca)
	Values ('Efetivado')
		  ,('Cancelado')
          ,('Pendente')
          ,('Em Atraso')
          ,('Estornado');

Create Table Cobranca
(
	ID_Cobranca				 	int				auto_increment
   ,DS_Descricao				VarChar(100)	Not Null
   ,DT_Registro					DateTime 		Not Null
   ,ID_TipoCobranca				int				Not Null
   ,VL_Valor					Numeric(16,2)	Not Null
   ,ID_SituacaoCobranca			int				Not Null
   ,Constraint PK_ID_Cobranca							Primary Key (ID_Cobranca)
   ,Constraint FK_ID_TipoCobranca_TipoCobranca			foreign key (ID_TipoCobranca) References TipoCobranca (ID_TipoCobranca)
   ,Constraint FK_ID_SituacaoCobranca_SituacaoCobranca	foreign key (ID_SituacaoCobranca) References SituacaoCobranca (ID_SituacaoCobranca)
);

Insert Into Cobranca (DS_Descricao, DT_Registro, ID_TipoCobranca, VL_Valor, ID_SituacaoCobranca)
	Values ('Pagamento a colaboradores', '2022-09-10', 1, 2000.00, 1)
		  ,('Reabastecimento de estoque', '2022-02-25', 1, 300056.00, 1)
          ,('Estorno de compra de produto', '2022-10-01', 2, 350.00, 1);