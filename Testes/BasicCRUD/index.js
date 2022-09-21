const myPromise = new Promise((resolve, reject) => {

    const button = document.querySelector('#submit')
    button.addEventListener('click', function() {
        login();
    });
    
    
    const login = async () => {
        let controller = require("./controllers/clienteController");
        let nome = document.getElementById('nome').value;
        let cpf = document.getElementById('cpf').value;
        await controller.login({nome: nome, cpf: cpf});
    }
    
})

myPromise.then((data) => {
    console.log(data);
})
// (async () => {
//     // await cliente.insertClient({nome: "Rodrigo", cpf: "30264851870"});
    
//     // console.log(await cliente.selectClients());
// })();