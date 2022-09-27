Drop Table if exists Funcionario;

Create Table Funcionario
(
	ID_Funcionario	 	Int 			auto_increment
   ,NM_Nome 			VarChar(40)	    Not Null
   ,DS_Login 			VarChar(40) 	Not Null
   ,NR_Senha			VarChar(11)		Not Null
   ,Constraint PK_ID_Funcionario	 	Primary Key (ID_Funcionario)
);

Insert Into Funcionario (NM_Nome, DS_Login, NR_Senha) Values ('Lukas', 'Lukas', '1234');
Insert Into Funcionario (NM_Nome, DS_Login, NR_Senha) Values ('Yasmin', 'Yasmin', '1234');
Insert Into Funcionario (NM_Nome, DS_Login, NR_Senha) Values ('Karen', 'Karen', '1234');

Select *
	From Funcionario