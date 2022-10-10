$(document).ready(function(){
    $(  '.date'   ).inputmask(  '99/99/9999',           {removeMaskOnSubmit: true}  );
    $(  '.time'   ).inputmask(  '99:99:99',             {removeMaskOnSubmit: true}  );
    $(  '.cep'    ).inputmask(  '99999-999',            {removeMaskOnSubmit: true}  );
    $(  '.phone'  ).inputmask(  '(99) 99999-9999',     {removeMaskOnSubmit: true}  );
    $(  '.cpf'    ).inputmask(  '999.999.999-99',       {removeMaskOnSubmit: true}  );
    $(  '.money'  ).inputmask(  '999.999.999.999,99',   {removeMaskOnSubmit: true}  );
});