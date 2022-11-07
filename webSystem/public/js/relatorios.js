const ExcelJS = require('exceljs');
const { faker } = require('@faker-js/faker');

const workbook = new ExcelJS.Workbook();

const sheet = workbook.addWorksheet('Demonstrativo de Fluxo de Caixa');

sheet.columns = [
    {header: 'Data', key: 'data'},
    {header: 'Recebimento de Clientes', key: 'valorEntrada'},
    {header: 'Pagamento a Fornecedores', key: 'valorSaida'},
    {header: 'Total', key: 'total'}
]

for (let i = 0; i < 100; i++) {
    sheet.addRow({
        data: faker.date.between('2004-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        valorEntrada: faker.finance.amount(),
        valorSaida: faker.finance.amount()
    });
}

sheet.getRow(1).font = {
    bold: true,
    color:{ argb: 'FFAD28'}
}

sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    bgColor: { argb: '143E64'}
}

sheet.workbook.xlsx.writeFile('Demonstrativo de Fluxo de Caixa.xlsx')