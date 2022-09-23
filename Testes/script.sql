Drop Table if exists Funcionario;

Create Table Funcionario
(
	ID_Funcionario	 	Int 			auto_increment
   ,DS_Login 			VarChar(40) 	Not Null
   ,NR_Senha			VarChar(11)		Not Null
   ,Constraint PK_ID_Funcionario	 	Primary Key (ID_Funcionario)
);

Insert Into Funcionario (DS_Login, NR_Senha) Values ('Lukas', '1234');
Insert Into Funcionario (DS_Login, NR_Senha) Values ('Yasmin', '1234');
Insert Into Funcionario (DS_Login, NR_Senha) Values ('Karen', '1234');

Select *
	From Funcionario