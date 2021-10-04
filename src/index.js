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
const svg_btnPlay = "<svg data-icon='play' class='svg-inline--fa fa-play fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor' d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'></path></svg>";
const svg_btnPause = "<svg data-icon='pause' class='svg-inline--fa fa-pause fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor' d='M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z'></path></svg>";
const svg_btnBackward = "<svg data-icon='fast-backward' class='svg-inline--fa fa-fast-backward fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z'></path></svg>";
const svg_btnForward = "<svg data-icon='fast-forward' class='svg-inline--fa fa-fast-forward fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z'></path></svg>";
const svg_btnVolume = {
    medium: "<svg data-icon='volume-medium' class='svg-inline--fa fa-volume-down fa-w-12' role='img' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 480 512' xml:space='preserve'><path fill='currentColor' d='M215,71.1l-89,88.9H24c-13.3,0-24,10.7-24,24v144c0,13.2,10.7,24,24,24h102.1l89,89c15,15,41,4.5,41-17V88 C256,66.6,230,56,215,71.1z M480,256c0-63.5-32.1-121.9-85.8-156.2c-11.2-7.1-26-3.8-33.1,7.5s-3.8,26.2,7.4,33.4 C408.3,166,432,209.1,432,256s-23.7,90-63.5,115.4c-11.2,7.1-14.5,22.1-7.4,33.4c6.5,10.4,21.1,15.1,33.1,7.5 C447.9,377.9,480,319.5,480,256z M338.2,179.1c-11.6-6.3-26.2-2.2-32.6,9.4c-6.4,11.6-2.2,26.2,9.5,32.6 C328,228.3,336,241.6,336,256c0,14.4-8,27.7-20.9,34.8c-11.6,6.4-15.8,21-9.5,32.6c6.4,11.7,21,15.8,32.6,9.5 c28.2-15.5,45.8-45,45.8-76.9S366.5,194.7,338.2,179.1L338.2,179.1z'/></svg>",
    low: "<svg data-icon='volume-down' class='svg-inline--fa fa-volume-down fa-w-12' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path fill='currentColor' d='M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z'></path></svg>",
    up: "<svg data-icon='volume-up' class='svg-inline--fa fa-volume-up fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='currentColor' d='M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z'></path></svg>",
    muted: "<svg data-icon='volume-mute' class='svg-inline--fa fa-volume-mute fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z'></path></svg>"
};
player__btnPlayPause.innerHTML = svg_btnPlay;
player__btnBackward.innerHTML = svg_btnBackward;
player__btnForward.innerHTML = svg_btnForward;
player__btnVolume.innerHTML = svg_btnVolume.medium;
player__timer_currentTime.innerHTML = "0:00";
player__timer_totalTime.innerHTML = "0:00";

// On ajoute les éléments aux différents containers
player__btnPlayPause_container.appendChild(player__btnPlayPause);
player__btnBackward_container.appendChild(player__btnBackward);
player__btnForward_container.appendChild(player__btnForward);
player__btnVolume_container.appendChild(player__btnVolume);
player__timer_container.appendChild(player__timer_currentTime);
player__timer_container.appendChild(document.createTextNode(' / '));
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

// On créé l'élément audio sans SRC
const elAudio = new Audio();
elAudio.src = "https://soundcloud.com/universcience-2/belle-lune-1";
elAudio.id = "audioElement";

// Ajout du player dans le container global
global_container.appendChild(elAudio);
global_container.appendChild(player__container);

// Ajout du container dans le body
document.body.appendChild(global_container);

// Signature
console.log("%c🚀 Player in native JavaScript", "font-size: 1.5rem; padding: 20px 10px; margin: 0; background: hsl(271deg 49% 17% / 50%);");
console.log("%cBy Wilfried Jumelle - wjumelle@gmail.com", "font-size: 1rem; font-weight: bold;");

/**
 * Début du traitement de SoundCloud
 */

// Fonction qui permet de récupérer l'URL du média streamable à partir d'une URL simple SoundCloud
// Ex d'url : https://soundcloud.com/universcience-2/palito-et-le-secret-de-la-cabosse
// Params : l'élément <audio> et l'URL simple SoundCloud
function URLToResolve(elem, url){
    console.log('URLToResolve()', elem);
    const streamableUrl = "https://cf-media.sndcdn.com/UNiKAPqgeTHO.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vVU5pS0FQcWdlVEhPLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjMzMzMyNzU4fX19XX0_&Signature=D3X3jGkhw5UCnF2fZNXpNqKBAO3LMfXZYGm8uuwu~4A1icLuLZatJ-PCWd7m44rJgC9frFGZ6mhgr07GNBaD8QBJWUoLhuUnYDo2gWcJyUvrci7Yek2ItdT5PXhhr~fztvnsFDVmm~BLeAhf774cAMAgruWY5Cy1IWvf25O7eLRjvSixKSzyeSG5sqFj2M2TaHGSjdsr~nPvIJUF5vgTj6WL-yLzE2YhiuBRi2ZnmnSIfpP30wohRvZkvyUlChNoG9neU4HX4hItF7m~~PIx9BERrbgoRpNgqBVVLz6pOwsqsuFzCz15acvkcqQQgIobhewUECHKnfrvxINXftT3XQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ";
    elem.src = streamableUrl;
    initPlayer(elem);
}

// Fonction qui initialise le player Plyr
// Params : l'élément <audio> les options de configuration de Plyr
function initPlayer(elem) {
    console.log('initPlayer()', elem);

    // On bind les boutons 
    player__btnPlayPause.addEventListener('click', function(){
        if(elem.paused) {
            elem.play();
            player__btnPlayPause.innerHTML = svg_btnPause;
        } else {
            elem.pause();
            player__btnPlayPause.innerHTML = svg_btnPlay;
        }
    });

    player__btnBackward.addEventListener('click', function(){
        const cur = elem.currentime;
        const nextTimer = 0;
        (cur - 15 < 0) ? nextTimer = 0 : nextTimer = (cur - 15);
        elem.currentime = nextTimer;
    });

    player__btnForward.addEventListener('click', function(){
        const cur = elem.currentime;
        const dur = elem.duration;
        const nextTimer = 0;
        (cur + 15 > dur) ? nextTimer = 0 : nextTimer = (cur + 15);
        elem.currentime = nextTimer;
        if(nextTimer == 0) {
            elem.pause();
        }
    });

    player__btnVolume.addEventListener('click', function(){
        if(elem.volume > 0) {
            elem.volume = 0;
            player__btnVolume.innerHTML = svg_btnVolume.muted;
        } else {
            elem.volume = .5;
            player__btnVolume.innerHTML = svg_btnVolume.medium;
        }
    });

    // On bind des events liés au player
	elem.addEventListener('error', function(event) {
		var errorStatus = "initPlayer JS : Player ERORR";
		console.error(errorStatus);
	});

    elem.addEventListener('timeupdate', function(event) {
        // Mise à jour de la progressBar
        var duration = elem.duration,
            currTime = elem.currentTime,
            frac = currTime / duration,
            progress = Math.round(frac * 100), //% du temps passé
            buffered = elem.buffered.end(elem.buffered),
            fracBuff = buffered / duration,
            progressBuffer = Math.round(fracBuff * 100);

        updateProgress(player__progressBar, progress, player__timer_currentTime, currTime, duration);
        updateBuffer(player__progressBar_buffer, progressBuffer);

        // Mise à jour du currentTime
        if(elem.currentTime) {
            player__timer_currentTime.innerHTML = formatTime(elem.currentTime);
        } else {
            console.log('Lol');
            player__timer_currentTime.innerHTML = formatTime(0);
        }
    });

	elem.addEventListener('canplay', function(event) {
        player__timer_totalTime.innerHTML = formatTime(elem.duration);
	});
}

// Fonction de mise à jours de la bar de progression pour l'avancée
function updateProgress(bar, prog, timer, curr, duration) {
    bar.style.width = prog+'%';
    timer.innerHTML = formatTime(curr) + ' / ' + formatTime(duration);
}

// Fonction de mise à jours de la bar de loaded
function updateBuffer(bar, prog) {
    bar.style.width = prog+'%';
}

// Fonction de formattage de l'affichage de la date
function formatTime(time) {
    var hours = Math.floor(time / 3600),
        mins  = Math.floor((time % 3600) / 60),
        secs  = Math.floor(time % 60);

    if(secs < 10) {
        secs = '0'+secs;
    }

    if(hours) {
        if(mins < 10) {
            mins = '0'+mins;
        }

        return hours + ':' + mins + ':' + secs; 
    } else {
        return mins + ':' + secs; 
    }
}

// Lorsque le DOM a fini de se charger on le parcourt à la recherche de tous les players
// On exécute pour chacun la fonction URLToResolve() qui va chercher l'URL streamable du média SoundCloud
document.addEventListener("DOMContentLoaded", function() {
    URLToResolve(elAudio, elAudio.src);
});