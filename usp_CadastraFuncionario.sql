Drop Procedure if Exists usp_CadastraFuncionario;

Delimiter $$
Create Procedure usp_CadastraFuncionario
(
	nomeFuncionario 	VarChar(200)
   ,cpfFuncionario 		VarChar(11)
)

Begin
	Insert Into Funcionario Set
		NM_Nome = nomeFuncionario
	   ,NR_CPF = cpfFuncionario;
    
    Insert Into FuncionarioEndereco Set
		ID_Funcionario = (Select Max(ID_Funcionario)
						     From Funcionario)
	   ,DS_Logradouro = 
End $$

Call usp_CadastraFuncionario('Lukas','12345849')