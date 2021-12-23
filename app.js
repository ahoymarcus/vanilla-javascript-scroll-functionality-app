// https://www.youtube.com/watch?v=c5SIG7Ie0dM
// 3 hs  36'  10''

// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels



// ********** set date ************
const date = document.getElementById('date');

// see that both methods work nice
//date.textContent = new Date().getFullYear();
date.innerHTML = new Date().getFullYear();



// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');


navToggle.addEventListener('click', function() {
	/*
		Versão da funcionalidade não utilizada, porque ela traz o Height do elemento linksContainer pré-definido, o que dificulta a manutenção em casos onde há um número variável de links.........
		
		linksContainer.classList.toggle('show-links');
	
	
	
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
});




// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
window.addEventListener('scroll', function() {
	//console.log(window.pageYOffset);
	
	const scrollHeight = window.pageYOffset;
	const navHeight = navbar.getBoundingClientRect().height;
	//console.log(scrollHeight + ' :: ' + navHeight);
	
	if (scrollHeight > navHeight) {
		navbar.classList.add('fixed-nav');
	} else {
		navbar.classList.remove('fixed-nav');
	}
	
	if (scrollHeight > 500) {
		topLink.classList.add('show-link');
	} else {
		topLink.classList.remove('show-link');
	}
	
});




// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');


scrollLinks.forEach(function(link) {
	link.addEventListener('click', function(e) {
		// prevent link to act
		e.preventDefault();
		
		// navigate to specific spot
		// usar slice(1) para despresar o valor # 
		const id = e.currentTarget.getAttribute('href').slice(1);
		console.log(id);
		
		const elementForNavigation = document.getElementById(id);
		
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
	});
});


















