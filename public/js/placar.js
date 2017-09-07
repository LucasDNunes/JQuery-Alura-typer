
$("#btn-placar").click(mostraPlacar);


function mostraPlacar(){
	//$(".placar").toggle();// nesse caso esse função togle vai mostrar o placar, vai clicar e se ja tiver aberto vai fechar e se tiver fechado vai mostrar, da para fazer usando o ".show()" que vai mostar, e para esconder usando o ".hidden()" que esconde. o toggle  faz os 2 sendo mais pratico;
	$(".placar").stop().slideToggle(700);// existe o slideDown e o SlideUp, eles fazem a transição ser mais suave e pode passar tempo em parametro, tempo em milisegundos, usando o toggle é o pratico para fazer os dois; stop do jQuery. Essa função faz exatamente o que precisamos, a animação que estiver acontecendo no momento é interrompida, e uma próxima é iniciada.
}

function inserePlacar(){
	var tabela = $(".placar").find("tbody"); //A função .find() recebe como parâmetro seletores CSS, e busca em seus filhos algum elemento que atenda aquela busca. Podemos simplificar e fazer tudo em uma linha apenas; ou seja o.find é para pear um elemento dentro do elemento selecionado;
	var usuario = $("#usuarios").val();
	var numPalavras = $("#contPalavras").text();

	// var linha = "<tr>"+ 	 // em vezde fazer assim, foi criado uma função para boter atrlar a ação de remover a linha
	// 				"<td>"+ usuario + "</td>"+
	// 				"<td>"+ numPalavras + "</td>"+
	// 				 "<td>"+ btnRemover + "</td>"+
	// 			"</tr>";

	var linha = novaLinha(usuario, numPalavras);
	linha.find(".btn-remover").click(removeLinha);

//	tabela.append(linha);  //Esta função adiciona a string ou elemento HTML que é passada como parâmetro como último filho do elemento em qual ela for chamada. ou seja ela joga o conteudo da variavel linha no html

	tabela.prepend(linha);//.prepend(). Ela adiciona a string/HTML passada como primeiro filho do elemento selecionado:
	$(".placar").slideDown(700);
	scrollPlacar();
}

function novaLinha(usuario, numPalavras){
	var linha = $("<tr>");
	var colunaUsu = $("<td>").text(usuario);
	var colunaNum = $("<td>").text(numPalavras);
	var colunaRemover = $("<td>");
	var link = $("<a>").addClass("btn-remover").attr("href","#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colunaRemover.append(link);

	linha.append(colunaUsu);
	linha.append(colunaNum);
	linha.append(colunaRemover);

	return linha;
}

function scrollPlacar(){
	var posicaoPlacar = $(".placar").offset().top;//a função offset do jQuery. Ela nos dá a posição em que determinado elemento se encontra na página. Essa função nos retorna a distância em que o elemento está do topo e da esquerda da página. Se acessarmos o valor do topo (top), teremos o valor exato para onde queremos scrollar a página. 
	$("body").animate({
		scrollTop: posicaoPlacar+"px"
	},1000);
}

function removeLinha(){
		event.preventDefault(); // para o boato nao levar para o topo da pagina pq esta indo para um link cego essa função evita isso;
		var linha = $(this).parent().parent(); // para remover a linha tenho que remover o tr, para isso eu acesso o pai dele que é o td e depois aesso o tr e por fim removo ele, por isso dois parent();
		linha.fadeOut();//O jQuery já possui uma função que vai diminuindo a opacidade de um elemento aos poucos, até o seu total desaparecimento, essa função é a fadeOut
		setTimeout(function(){
			linha.remove();
		},1000);

//Assim como existem o slideUp, slideDown e slideToggle, existem funções semelhantes que executam o fade, o fadeIn, fadeOut e fadeToggle, respectivamente.
}

$("#botao-sync").click(sincronizaPlacar);

function sincronizaPlacar() {
	var placar = [];
	var linha = $("tbody > tr");// pegando todas TR que são filhas de tbody
	linha.each(function(){ // esse função each é como se fosse um foreach , vai percorrer todos os tr 
	var usuario = $(this).find("td:nth-child(1)").text(); // (nth-child) é um seletor avançado do css, pegando o primeiro td que tem no tr, no caso selecionando o primeiro filho td do tr;
	var palavras = $(this).find("td:nth-child(2)").text();// selecioando o segundo filho que é as palavras;
	
	var score = { // criando um objeto para mandar para o banco de dados;
		usuario:usuario, // usuario e pontos, é os nomes que es~tao salvos no meu banco, estou apenas colocando os valores neles
		pontos:palavras
	};
		placar.push(score);
	});
	var dados = { // criando um objeto para passar por metodo post, pois nao pode mandar um array e sim objetos;
		placar:placar
	};
	$.post("http://localhost:3000/placar",dados,function(){
		console.log("salvou");
		$(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar");// ativando o trigger, para mostrar que salvou no banco e alterando o que vai mostrar 
	}).fail(function(){// mostrar a msg de erro caso tenha
		$(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
	}).always(function(){
		setTimeout(function(){// desativando o trigger com tempo
		$(".tooltip").tooltipster("close");	
		},1500);
	});
}

function atualizaPlacar() {
	$.get("http://localhost:3000/placar",function(data){
		$(data).each(function(){ // data é o que recebe do metodo get; passando o data para $(), para ele poder usar a função each
			var linha = novaLinha(this.usuario, this.pontos);
			linha.find(".btn-remover").click(removeLinha);// adiciona a funcao para remover os itens do placar

			$("tbody").append(linha); // adicionando os dados no placar
		})
	});
}