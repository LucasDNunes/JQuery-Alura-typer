var tempoInicial = $("#tempo").text();
var campo = $(".campoDigitacao");

$(document).ready(function(){
	tamanhoFrase();
	inicializaContadores();
	inicializaCronometro();	
	verificaFrase();
	$("#btn-reinicia").click(reiniciaJogo);
	atualizaPlacar();

	$("#usuarios").selectize({ // plugin
		create:true,
		sortField:'text'
	});

	$(".tooltip").tooltipster({// plugin, desativando o trigger
		trigger: "custom"
	});
});


function tamanhoFrase(){
	var frase = $(".frase").text(); // .text() => é para pegar apenas o conteudo da classe .frase
	var numPalavras = frase.split(" ").length;

	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function atualizaTempo(tempo) {
	tempoInicial = tempo;
	$("#tempo").text(tempo);
}

function inicializaContadores(){
	campo.on("input", function(){
		var conteudo = campo.val(); // pega apenas o valor em numeros
	
		var qtdcaracter = conteudo.length;
		$("#contCaracter").text(qtdcaracter);
	
		var qtdPalavras = conteudo.split(/\S+/).length-1; // S+ ele ignora os espaços 
		$("#contPalavras").text(qtdPalavras);
	});
}

function inicializaCronometro(){
	campo.one("focus", function(){ // explica o focus e função one na arquivo duvidas
		var tempoRestante = $("#tempo").text();
		var cronometroID = setInterval(function(){ // esse setInterval faz com que essa função sea executada a cada tempo que eu determinar em milisegundos
			tempoRestante--;
			$("#tempo").text(tempoRestante);

			if (tempoRestante == 0 ) {					
				clearInterval(cronometroID); // esse comando faz com que a função set Interval nao seja mais executada
					finalizaJogo();
				}
			},1000);// aqui determino de quanto tempo ela será executada, tempo em milisegundos
	});
}

function finalizaJogo(){
	campo.attr("disabled",true);
	campo.toggleClass("campo-desativado");//A toggleClass. Ela funciona da seguinte maneira, se no momento que a função for chamada, o elemento possuir a classe, ela será removida. Mas se o elemento não possuir a classe, ela será adicionada.
	inserePlacar();
}

function reiniciaJogo(){
	campo.attr("disabled",false);
	campo.val("");
	$("#contPalavras").text(0);
	$("#contCaracter").text(0);
	$("#tempo").text(tempoInicial);
	inicializaCronometro();
	campo.toggleClass("campo-desativado");
	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
}

function verificaFrase(){	
	campo.on("input", function(){
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);
		if (digitado == comparavel) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}