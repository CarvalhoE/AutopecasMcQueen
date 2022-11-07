//#region Inicialização de variáveis
const produtos = new Array();
//#endregion

//#region Retornar tabela ao HTML
let displayHtmlData = () => {
    let html = "";
    let valorTotal = 0;
    for (let i = 0; i < produtos.length; i++) {
        html += `<tr id="row${i}">
                     <td>${produtos[i].sku}</td>
                     <td>${produtos[i].nome}</td>
                     <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produtos[i].valor)}</td>
                     <td>${produtos[i].quantidade}</td>
                     <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produtos[i].valorTotal)}</td>
                     <td><button id="${i}" class="cancel" type="button" onclick="remove_OnClick(${produtos[i].id})"><i class="fa fa-times" /></button></td>
                 </tr>`;
        valorTotal += produtos[i].valorTotal;
    }
    $('#tableBody').html(html);
    $('#lValorTotal').html(`Valor Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}`);
    $('#valorTotal').val(valorTotal).change();
}
//#endregion

//#region Adicionar Produto
let add_OnClick = () => {
    //#region Recuperação de Dados
    let produto_Selected = $('#produtoNovaCompra').val();
    let produtoDetails = produto_Selected.split('|');
    let id = produtoDetails[3];
    let sku = produtoDetails[0];
    let nome = produtoDetails[1];
    let valor = Number(produtoDetails[2]);
    let quantidade = Number($('#quantidade').val());
    //#endregion
    
    if (produtos.length == 0) {
        produtos.push({
            id: id,
            sku: sku,
            nome: nome,
            valor: valor,
            quantidade: quantidade,
            valorTotal: quantidade * valor
        });
    } else {
        let index = produtos.findIndex(obj => obj.sku == sku)
        if (index >= 0) {
            produtos[index].quantidade += quantidade;
            produtos[index].valorTotal = produtos[index].quantidade * valor;
        } else {
            produtos.push({
                id: id,
                sku: sku,
                nome: nome,
                valor: valor,
                quantidade: quantidade,
                valorTotal: quantidade * valor
            });
        }
    }
    $('#produtos').val(JSON.stringify(produtos, null)).change();
    displayHtmlData()
};
//#endregion

//#region Validação de forma de pagamento.
let formaPagamento = $('#formaPagamento');
formaPagamento.on('change', () => {
    let numeroParcelas = $('#numeroParcelas');
    formaPagamento.val() == "1" ? numeroParcelas.css({'visibility':'visible'}) : numeroParcelas.css({'visibility':'hidden'})
});
//#endregion

//#region Remoção de Produto da tabela e array.
let remove_OnClick = (id) => {
    
    produtos.filter((a,i) => {
        if (id == a.id) {
            produtos.splice(i, 1);
            displayHtmlData();
        }
    });
}
//#endregion