$("#btn-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
	$("#spinner").toggle();
	$.get("http://localhost:3000/frases", trocaFrase)
	.fail(function () {
		$("#erro").toggle();
		setTimeout(function(){
            $("#erro").toggle();
        },2000);
	})
	.always(function(){//função always para invocar um código sempre (erro ou sucesso) após da requisição AJAX.
		$("#spinner").toggle();
    });
}

function trocaFrase(data){
	var frase = $(".frase");
	var numeroAleatrorio = Math.floor(Math.random() * data.length); //Math.floor, que arredonda o número para baixo;
	//frase.text(data[numeroAleatrorio].texto);
	frase.text(data.text)
	tamanhoFrase();
	atualizaTempo(data.tempo);
}

function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();

    var dados = {id : fraseId}; //criacao do objeto JS que guarda a id

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}