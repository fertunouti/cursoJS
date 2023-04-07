function criarApostasOrdenadasComLimite(n, x, w, numerosSelecionados) {
    let tamanhoConjunto = numerosSelecionados.length;
    let contador = {};
     for (let numero of numerosSelecionados) {
     contador[numero] = 0;
     }
    let apostas = [];
     for (let i = 0; i < n; i++) {
        let aposta = [];
        let numerosDisponiveis = [...numerosSelecionados];
        for (let j = 0; j < x; j++) {
           let numero = numerosDisponiveis[Math.floor(Math.random() * numerosDisponiveis.length)];
           while (contador[numero] >= w) {
            numerosDisponiveis = numerosDisponiveis.filter(num => num !== numero);
             numero = numerosDisponiveis[Math.floor(Math.random() * numerosDisponiveis.length)];
        }
      contador[numero]++;
      aposta.push(numero);
      numerosDisponiveis = numerosDisponiveis.filter(num => num !== numero);
  }
  aposta.sort((a, b) => a - b);
  apostas.push(aposta);
}
return apostas;
}

function contarNumerosSorteados(numeros, resultado) {
let contagem = {};
for (let i = 0; i < numeros.length; i++) {
  contagem[numeros[i]] = 0;
}

for (let i = 0; i < resultado.length; i++) {
  for (let j = 0; j < resultado[i].length; j++) {
    contagem[resultado[i][j]]++;
  }
}
  return contagem;
}
 
function submitForm() {
    var n = document.getElementById("n").value;
    var x = document.getElementById("x").value;
    var w = document.getElementById("w").value;
    var numeros_selecionados = [];
    var checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      numeros_selecionados.push(parseInt(checkboxes[i].value));
    }
    var result = criarApostasOrdenadasComLimite(n, x, w, numeros_selecionados);
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";
    for (var i = 0; i < result.length; i++) {
      resultContainer.innerHTML += "Aposta [" + (i + 1) + "]:    " + result[i].join(", ") + "<br>";
     }
    
    let contagemDosNumeros = contarNumerosSorteados(numeros_selecionados, result);
    
    
    
    let canvasAnterior = document.querySelector("canvas");
    if (canvasAnterior) {
          canvasAnterior.remove();
    }

    let canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    //canvas.width = 300;
    canvas.height = 500;
    //canvas.style=display: block; box-sizing: border-box; height: 400px; width: 800px;";
    document.body.appendChild(canvas);

    let ctx = canvas.getContext("2d");

    let labels = [];
    let data = [];
    for (let numero in contagemDosNumeros) {
      labels.push(numero);
      data.push(contagemDosNumeros[numero]);
    }

    let chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
            {
            label: "Contagem dos números sorteados",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: "1"
          }
        ]
      },
       options: {
         scales: {  yAxes: [ { ticks: { beginAtZero: true  } } ]  }
       }
    });

    
}





