document.addEventListener('DOMContentLoaded', function () {
    const calcPlanoForm = document.getElementById('calcPlanoForm');
    const resultPlanoForm = document.getElementById('resultado');

    calcPlanoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const idade = parseInt(document.getElementById('idade').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);

        const imc = calcularIMC(peso, altura);
        const precosOperadoraA = calcularPrecosOperadoraA(idade, imc);
        const fatorComorbidade = calcularFatorComorbidade(imc);
        const precosOperadoraB = calcularPrecosOperadoraB(fatorComorbidade, imc);
        const planoMaisVantajoso = determinarPlanoMaisVantajoso(precosOperadoraA, precosOperadoraB);

        exibirResultados(precosOperadoraA, precosOperadoraB, planoMaisVantajoso);
    });

    function calcularIMC(peso, altura) {
        const alturaMetros = altura / 100;
        return peso / (alturaMetros * alturaMetros);
    }

    function calcularPrecosOperadoraA(idade, imc) {
        const planoBasico = 100 + (idade * 10 * (imc / 10));
        const planoStandard = (150 + (idade * 15)) * (imc / 10);
        const planoPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

        return {
            planoBasico,
            planoStandard,
            planoPremium
        };
    }

    function getClassificacaoIMC(imc) {
        if (imc < 18.5) {
            return 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 25) {
            return 'Normal';
        } else if (imc >= 25 && imc < 30) {
            return 'Sobrepeso';
        } else if (imc >= 30 && imc < 35) {
            return 'Obesidade';
        } else if (imc >= 35 && imc < 40) {
            return 'Obesidade Mórbida grave';
        } else {
            return 'Obesidade Mórbida muito grave';
        }
    }

    function calcularFatorComorbidade(imc) {
        const classificacaoIMC = getClassificacaoIMC(imc);

        switch (classificacaoIMC) {
            case 'Abaixo do peso':
                return 10;
            case 'Normal':
                return 1;
            case 'Sobrepeso':
                return 6;
            case 'Obesidade':
                return 10;
            case 'Obesidade Mórbida grave':
                return 20;
            case 'Obesidade Mórbida muito grave':
                return 30;
            default:
                return 0;
        }
    }

    function calcularPrecosOperadoraB(fatorComorbidade, imc) {
        const planoBasico = 100 + (fatorComorbidade * 10 * (imc / 10));
        const planoStandard = (150 + (fatorComorbidade * 15)) * (imc / 10);
        const planoPremium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

        return {
            planoBasico,
            planoStandard,
            planoPremium
        };
    }

    function determinarPlanoMaisVantajoso(precosOperadoraA, precosOperadoraB) {
        const planosOperadoraA = Object.values(precosOperadoraA);
        const planosOperadoraB = Object.values(precosOperadoraB);

        const menorPrecoOperadoraA = Math.min(...planosOperadoraA);
        const menorPrecoOperadoraB = Math.min(...planosOperadoraB);

        if (menorPrecoOperadoraA < menorPrecoOperadoraB) {
            return 'Operadora A';
        } else if (menorPrecoOperadoraB < menorPrecoOperadoraA) {
            return 'Operadora B';
        } else {
            return 'Ambas as operadoras têm o mesmo plano mais vantajoso.';
        }
    }

    function exibirResultados(precosOperadoraA, precosOperadoraB, planoMaisVantajoso) {
        const tabelaResultados = `
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Plano Básico</th>
                        <th>Plano Standard</th>
                        <th>Plano Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Operadora A</th>
                        <td>${precosOperadoraA.planoBasico.toFixed(2)}</td>
                        <td>${precosOperadoraA.planoStandard.toFixed(2)}</td>
                        <td>${precosOperadoraA.planoPremium.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Operadora B</th>
                        <td>${precosOperadoraB.planoBasico.toFixed(2)}</td>
                        <td>${precosOperadoraB.planoStandard.toFixed(2)}</td>
                        <td>${precosOperadoraB.planoPremium.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <p>O plano mais vantajoso é oferecido pela: ${planoMaisVantajoso}</p>
        `;

        resultPlanoForm.innerHTML = tabelaResultados;
    }
});