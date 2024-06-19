const container = document.querySelector('.plateau') // selectionne la div plateau et on le met dans container

const scoreBoard = document.querySelector('.score') // la même 

const btnStart = document.querySelector('.btnStart'); 

const countdown = document.getElementById('countdown'); //selection du timer à partir de l'index 

// Variables

let derniereCachette = false;
let gameOver = false;
let score;

btnStart.addEventListener('click',startGame); // startGame est le nom de la methode mais il faut la créer via une fonction




function startGame(){

	btnStart.style.display = 'none';
	setTimeout(function(){
		creationPlateau(); // Cela va initier le lancement du plateau
		startZombies(); // Initialisation des zombies lors du bouton cliqué 
		score = 0;
		scoreBoard.innerHTML = score;
		scoring();
	},1000) // décalage du plateau de 1 seconde pour que ce soit synchroniser 

	// Countdown
	var counter = 10;
	var timer = setInterval(function(){
			countdown.innerText = '0:0' + counter;
			counter --; // Décrémentation jusqu'à 0 
			
		if(counter == 0 ){ 
			setTimeout(function(){
				countdown.innerHTML = "<div class='alert alert-danger'>Too bad, you didn't make it. Maybe next time</div>" // Implémenter une classe bootstrap dans une propriété JS ?
				clearInterval(timer); 
			}, 1000);
			gameOver = true;
		}
	}, 1300); // Interval entre le timer
}




function startZombies(){
	let cachette = randomUp();

	let temp = Math.floor(Math.random() * 3) + 1;

	let tempClass = temp > 1 ? 'up' : 'up2'; // Calcul inferieur ou superier à 1 de up ou up2 
	
	// Condition ternaire = avant le point d'interrogation estl a condition / 1 er resultat correspond à la condition et le 2em à l'inverse, ecrire des conditions plus rapidement. Le : represente le else

	cachette.classList.add(tempClass);

	const time = Math.round(Math.random()* (1500 - 250) +250); // Math random : renvoie un nombre flottant pseudo aléatoire compris dans l'interval 0, 1(1 : est exclu / 0.99 marche);

	setTimeout(function(){
		cachette.classList.remove(tempClass);

		if(!gameOver) startZombies();

		},time);

}




function randomUp(){
	// On crée une varaible pour afficher aléatoirement les elements
	const cachettes = document.querySelectorAll('.cachette'); // On met la class .cachette dans la variable cachettes

	// constante qui va générer un chiffre aléatoire parmi les 9 occurences

	// Super important ! // 
	const idx = Math.floor(Math.random()* cachettes.length); // la constance idx va prendre le nombre qu'il va cherche dans la varaible  cachette qui stocke la class cachette et il fera un calcul aléatoire avec le nombre 9 

	if(cachettes[idx].zombieId === derniereCachette){
		// On relance la génération de l'index
		return randomUp();
	}

	// On stocke le résultat dans la variable derriere cachette 
	derniereCachette = cachettes[idx].zombieId;

	// On retourne la valeur obtenue

	return cachettes[idx];
}




function creationPlateau(){
	
	let cachetteCrees = 9;
	container.innerHTML = '';


	// Creation d'une boucle pour la création de div qui represente les 9 cachettes et pas plus


	for(let x = 0; x< cachetteCrees; x++){

		// créer les div
		let div = document.createElement('div');

		// Ajout de class à chaque div crée
		div.setAttribute('class', 'cachette');

		div.zombieId = x; 

		// On crée dynamiquement une div avec une class et un event (tir) pour les zombies et Lola

		//zombies

		let zombie = document.createElement('div');
		zombie.setAttribute('class', 'zombie');
		zombie.onclick = tir;
		div.appendChild(zombie); // on rattache zombie a la div parent


		//Lola

		let lola = document.createElement('div');
		lola.setAttribute('class', 'lola');
		lola.onclick = tir2;
		div.appendChild(lola);



		// mur 
		let mur = document.createElement('div');
		mur.setAttribute('class', 'mur');
		div.appendChild(mur);


		// on rattache les 9 divs crées à la div plateau il suffit juste de cliquer pour voir les 9 divs apparaitre
		container.appendChild(div);

	}
}



function scoring(){
	scoreBoard.innerHTML = "Score : " + score;
	let message = score >=10 ? "C'est gagné ! " : " vous avez perdu, voulez vous refaire une partie";

	if(score >= 10 || score <0){
		gameOver = true;
		btnStart.style.display = 'block';

		confirm(message);
		document.location.href = "index.html"; // rechargement de la page du jeu 
	}
}


function tir(){
	
	score++; // incrementer le score +1
	this.parentNode.classList.remove('up');
	scoring();

}


function tir2(){
	
	score = score -5; // incrementer le score +1
	this.parentNode.classList.remove('up2');
	scoring();
}

