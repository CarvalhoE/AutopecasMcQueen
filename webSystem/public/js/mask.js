$(document).ready(function () {
    $('.date').inputmask('99/99/9999', {
        removeMaskOnSubmit: true
    });
    $('.time').inputmask('99:99:99', {
        removeMaskOnSubmit: true
    });
    $('.cep').inputmask('99999-999', {
        removeMaskOnSubmit: true
    });
    $('.phone').inputmask('(99) 99999-9999', {
        removeMaskOnSubmit: true
    });
    $('.landline').inputmask('(99) 9999-9999', {
        removeMaskOnSubmit: true
    });
    $('.cpf').inputmask('999.999.999-99', {
        removeMaskOnSubmit: true
    });
    $('.cnpj').inputmask('99.999.999/9999-99', {
        removeMaskOnSubmit: true
    });
    $('.sku').inputmask('AA-99999999', {
        removeMaskOnSubmit: true
    });
    $('.money').inputmask('decimal', {
        'alias': 'numeric',
        'groupSeparator': '.',
        'autoGroup': true,
        'digits': 2,
        'radixPoint': ",",
        'digitsOptional': false,
        'allowMinus': false,
        'prefix': 'R$ ',
        'placeholder': '',
        'rightAlign': false,
        removeMaskOnSubmit: true
    });
});