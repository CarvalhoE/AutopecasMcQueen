Drop Table if exists Cliente;

Create Table Cliente
(
	ID_Cliente 	Int 			auto_increment
   ,NM_Nome 	VarChar(40) 	Not Null
   ,NR_CPF		VarChar(11)		Not Null
   ,Constraint PK_ID_Cliente 	Primary Key (ID_Cliente)
);

Insert Into Cliente (NM_Nome, NR_CPF) Values ('Lukas', '35824302863');
Insert Into Cliente (NM_Nome, NR_CPF) Values ('Yasmin', '42604906805');
Insert Into Cliente (NM_Nome, NR_CPF) Values ('Karen', '32095158830');

Select *
	From Cliente