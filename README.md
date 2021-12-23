# Scroll Function App - JavaScript Vanilla   

<br />

Este pequeno, já bem mais complexo dentro da série Vanilla JS Apps cria um app de estudo para testar a funcionalidade de scroll do browser, de modo a aperfeiçoar toda a navegação dos links, corrigindo as variações de tamanho para o elemento Navbar que muda nos diversos tamanhos de tela.

<br />

O problema que ocorre aqui está relacionado tanto com o processo de crescimento, quanto de diminuição do Navbar em função do tamanho do dispositivo, mas também em relação ao seu estado fixo ou não em relação ao posicionamento da tela.
tudo isso, então, é que deve ser solucionado para a navegação melhorar em termos de UX. 

<br />

- Abaixo, parte do script que cuida dos cálculos para ujuste de navegação:

<br />

```
/*
	Calculate the Heights: for that we have to subtract the heights of the navbar (when small screen or the other)
*/
const navHeight = navbar.getBoundingClientRect().height;
const containerHeight = linksContainer.getBoundingClientRect().height;

const isFixedNav = navbar.classList.contains('fixed-nav');

let navigationPosition = elementForNavigation.offsetTop - navHeight;

if (!isFixedNav) {
	navigationPosition = navigationPosition - navHeight;
}

/*
	Em dispositivo pequeno, nós lidamos tanto com o navHeight (que já foi subtraído), quanto o height de containerHeight.....
*/
if (navHeight > 82) { 
	navigationPosition = navigationPosition + containerHeight;
}

window.scrollTo({
	left: 0,
	top: navigationPosition,
});
linksContainer.style.height = 0;
```

<br />

Ademais, este projeto também inclui uma outra funcionalidade para aprimorar a manutenção do app que é o cálculo dinâmico do tamanho do elemento de links de navegação para ajuste automático do tamanho navbar quando aberto. De outra forma, adição ou subtração de links demandam correção manual do 'height' do elemento:

<br />

Abaixo, trecho do script que realiza o acerto descrito acima:

<br />

```
/*
	Element.getBoundingClientRect(): retorna o size e position concretos do elemento relativa ao viewport 
	VEJA que propositalmente este elemento tem Height 0 para ficar escondido, e é por isso que esta solução usa um container para ser setado em 0 e deixar ainda o elmento de interesse com valor de height intacto
*/
const containerHeight = linksContainer.getBoundingClientRect();
console.log('containerHeightcontainerHeight = ', containerHeight);

const linksHeight = links.getBoundingClientRect().height;
console.log('linksHeight = ', linksHeight);

/*
	PROBLEMA: estamos aqui alterando os valores CSS com JS de forma inline. E inline styling precede o feito externamente. 
	Isto vai causar no design que em dispositivo grande, o @media não consiga tirar o valor altera de Height..........
	A correção está lá no @media com !important:
	.links-container {
		height: auto !important;
	}
*/	
if (containerHeight.height === 0) {
	linksContainer.style.height = `${linksHeight}px`;
} else {
	linksContainer.style.height = 0;
}
```


<br />

#### Vanilla Projects (the 15 Projects) -  canal Coding Addict

Conjunto de projetos JavaScript inspirados na apresentação do professor **Johm Smilga** para aprofundar no conhecimento da linguagem.:[^1]


<br />

### Imagem do App Scroll Function em tela grande:

![Imagem do App Scroll Function em tela grande](/public/images/javascript-vanilla-scroll-function-01.png)


<br />

### Imagem do App Scroll Function em tela pequena:

![Imagem do App Scroll Function em tela pequena](/public/images/javascript-vanilla-scroll-function-02.png)


<br />



<br />
<br />

[^1]:Coding Addict - John Smilga 

