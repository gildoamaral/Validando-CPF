// 705.484.450-52      070.987.720-03

/* 
7x  0x  5x  4x  8x  4x  4x  5x  0x
10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0  =  X (237)

11 - ( X % 11 ) = Y (primeiro dígito)
Se o dígito Y for maior que 9, consideramos 0.

7x  0x  5x  4x  8x  4x  4x  5x  0x  5x
11  10  9   8   7   6   5   4   3   2
77  0   45  32  56  24  20  20  0   10

11 - ( W % 11 ) = Z (segundo dígito)
*/

// 1. CRIANDO FUNÇÃO CONSTRUTORA
//         ela irá limpar o cpf, tirando tudo que não for número.

function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        //criei cpfLimpo como propriedade
        enumerable: true,
        //tornei cpfLimpo enumerável
        get: function () {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}



//2. CRIANDO METODO DE VALIDAÇÃO NO PROTOTYPE
//              retornará verdadeiro ou falso, validando o cpf segundo os meus padrões (poderia ser feito no settler?)

ValidaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    //                              tirei os 2 digitos no cpf
    const digito1 = this.criaDigito(cpfParcial);
    //                      this -> ValidaCPF.prototype
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;

    return this.cpfLimpo === novoCpf;
};



//3. CRIANDO OS DÍGITOS
//               Aqui, de fato, será criado os digitos do CPF

ValidaCPF.prototype.criaDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, value) => {
        ac += Number(value) * regressivo;
        regressivo--;
        return ac
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? 0 : String(digito);
}



//4. VERIFICANDO SE É SEQUENCIA
//           CPFs com sequencias completas dão verdadeiros. assim, se for sequencia, será false

ValidaCPF.prototype.isSequencia = function () {
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
}



//5. INSTÂNCIAÇÃO / RESULTADO NA PAGE
const cpfInput = document.querySelector("#cpf");
const btn = document.querySelector("#btn");
let cpf;

btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!cpfInput.value) return;
    cpf = new ValidaCPF(cpfInput.value);

    putResult(cpf);
});


function putResult (cpf) {
    const p = document.createElement("p");
    const resultado = document.querySelector("#resultado")
    resultado.innerHTML = "";

if (cpf.valida()) {
    p.innerHTML = `${cpf.cpfLimpo}: cpf válido!`
    p.style.color = "#28a745";
} else {
    p.innerHTML = `${cpf.cpfLimpo}: cpf inválido!`;
    p.style.color = "#dc3545";
}

    resultado.appendChild(p);
}



/* solução do console */

// const cpf = new ValidaCPF(cpfEnviado);
// cpf.valida() ? console.log('cpf válido!') : console.log('cpf inválido!');
