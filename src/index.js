import './components/player/scss/main.scss';
import MyLauncher from './components/starter/images/launcher.png';

const title = document.createElement('h1');
const title_text =  document.createTextNode('Mise en place du player JavaScript');

const myIcon = new Image();
myIcon.src = MyLauncher;

title.appendChild(myIcon);
title.appendChild(title_text);
document.body.appendChild(title);

// Mise en place du container global
const global_container = document.createElement('div');
global_container.classList.add('global-container');

// Création des éléments du player
const player__container = document.createElement('div');
const player__btnPlayPause = document.createElement('button');
const player__btnPlayPause_container = document.createElement('div');
const player__btnBackward = document.createElement('button');
const player__btnBackward_container = document.createElement('div');
const player__btnForward = document.createElement('button');
const player__btnForward_container = document.createElement('div');
const player__btnVolume = document.createElement('button');
const player__btnVolume_container = document.createElement('div');
const player__timer_currentTime = document.createElement('span');
const player__timer_totalTime = document.createElement('span');
const player__timer_container = document.createElement('div');
const player__progressBar = document.createElement('div');
const player__progressBar_buffer = document.createElement('div');
const player__progressBar_container = document.createElement('div');
const player__progressBar_innerContainer = document.createElement('div');

// Mise en place des différentes classes
player__container.classList.add('player__container');
player__btnPlayPause.classList.add('controls', 'player__btnPlayPause', 'isPaused');
player__btnPlayPause_container.classList.add('player__btnPlayPause-container');
player__btnBackward.classList.add('controls', 'player__btnBackward');
player__btnBackward_container.classList.add('player__btnBackward-container');
player__btnForward.classList.add('controls', 'player__btnForward');
player__btnForward_container.classList.add('player__btnForward-container');
player__btnVolume.classList.add('controls', 'player__btnVolume', 'isMedium');
player__btnVolume_container.classList.add('player__btnVolume-container');
player__timer_currentTime.classList.add('player__timer-currentTime');
player__timer_container.classList.add('player__timer-container');
player__progressBar.classList.add('controls', 'player__progressBar');
player__progressBar_buffer.classList.add('controls', 'player__progressBar-buffer');
player__progressBar_container.classList.add('player__progressBar-container');
player__progressBar_innerContainer.classList.add('player__progressBar-innerContainer');

// On initialise les valeurs
player__btnPlayPause.innerText = "Lecture";
player__btnBackward.innerText = "- 15sec";
player__btnForward.innerText = "+ 15sec";
player__btnVolume.innerText = "Volume";
player__timer_currentTime.innerText = "0:00";
player__timer_totalTime.innerText = " / 0:00";

// On ajoute les éléments aux différents containers
player__btnPlayPause_container.appendChild(player__btnPlayPause);
player__btnBackward_container.appendChild(player__btnBackward);
player__btnForward_container.appendChild(player__btnForward);
player__btnVolume_container.appendChild(player__btnVolume);
player__timer_container.appendChild(player__timer_currentTime);
player__timer_container.appendChild(player__timer_totalTime);
player__progressBar_innerContainer.appendChild(player__progressBar);
player__progressBar_innerContainer.appendChild(player__progressBar_buffer);
player__progressBar_container.appendChild(player__progressBar_innerContainer);

// On ajoute tous les containers au player__container
player__container.appendChild(player__progressBar_container);
player__container.appendChild(player__btnBackward_container);
player__container.appendChild(player__btnPlayPause_container);
player__container.appendChild(player__btnForward_container);
player__container.appendChild(player__btnVolume_container);
player__container.appendChild(player__timer_container);

// Ajout du player dans le container global
global_container.appendChild(player__container);

// Ajout du container dans le body
document.body.appendChild(global_container);

// Signature
console.log("%c🚀 Player in native JavaScript", "font-size: 1.5rem; padding: 20px 10px; margin: 0; background: hsl(271deg 49% 17% / 50%);");
console.log("%cBy Wilfried Jumelle - wjumelle@gmail.com", "font-size: 1rem; font-weight: bold;");