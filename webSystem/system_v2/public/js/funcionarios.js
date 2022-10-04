let ckbFuncionarios = document.getElementsByClassName('ckbFuncionarios')

ckbFuncionarios.AddEventListener('click', function() {
    ckbAtual = ckbFuncionarios.item
    console.log(ckbFuncionarios)
})