import './components/player/scss/main.scss';
import MyLauncher from './components/starter/images/launcher.png';
import Audio_1 from './components/player/audios/warriors-imagine_dragons_2014.mp3';
import Audio_2 from './components/player/audios/legends_never_die-against_the_current_2017.mp3';
import Audio_3 from './components/player/audios/rise-the_glitch_2018.mp3';
import Audio_4 from './components/player/audios/burn_it_all_down_2021.mp3';

// TODO Fix : progress bar, thumb doesn't follow progress after click

// Template Lab
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

// Variable de stockage de l'UI
let player_ui = {
    svg: {
        btnPlay: "<svg aria-hidden='true' role='img' data-icon='play' class='svg-inline--fa fa-play fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor' d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'></path></svg>",
        btnPause:  "<svg aria-hidden='true' role='img' data-icon='pause' class='svg-inline--fa fa-pause fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor' d='M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z'></path></svg>",
        btnBackward: "<svg aria-hidden='true' role='img' data-icon='fast-backward' class='svg-inline--fa fa-fast-backward fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z'></path></svg>",
        btnForward: "<svg aria-hidden='true' role='img' data-icon='fast-forward' class='svg-inline--fa fa-fast-forward fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z'></path></svg>",
        btnVolume: {
            medium: "<svg aria-hidden='true' role='img' data-icon='volume-medium' class='svg-inline--fa fa-volume-down fa-w-12' role='img' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 480 512' xml:space='preserve'><path fill='currentColor' d='M215,71.1l-89,88.9H24c-13.3,0-24,10.7-24,24v144c0,13.2,10.7,24,24,24h102.1l89,89c15,15,41,4.5,41-17V88 C256,66.6,230,56,215,71.1z M480,256c0-63.5-32.1-121.9-85.8-156.2c-11.2-7.1-26-3.8-33.1,7.5s-3.8,26.2,7.4,33.4 C408.3,166,432,209.1,432,256s-23.7,90-63.5,115.4c-11.2,7.1-14.5,22.1-7.4,33.4c6.5,10.4,21.1,15.1,33.1,7.5 C447.9,377.9,480,319.5,480,256z M338.2,179.1c-11.6-6.3-26.2-2.2-32.6,9.4c-6.4,11.6-2.2,26.2,9.5,32.6 C328,228.3,336,241.6,336,256c0,14.4-8,27.7-20.9,34.8c-11.6,6.4-15.8,21-9.5,32.6c6.4,11.7,21,15.8,32.6,9.5 c28.2-15.5,45.8-45,45.8-76.9S366.5,194.7,338.2,179.1L338.2,179.1z'/></svg>",
            low: "<svg aria-hidden='true' role='img' data-icon='volume-down' class='svg-inline--fa fa-volume-down fa-w-12' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path fill='currentColor' d='M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z'></path></svg>",
            up: "<svg aria-hidden='true' role='img' data-icon='volume-up' class='svg-inline--fa fa-volume-up fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='currentColor' d='M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z'></path></svg>",
            muted: "<svg aria-hidden='true' role='img' data-icon='volume-mute' class='svg-inline--fa fa-volume-mute fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z'></path></svg>"
        },
        close: "<svg aria-hidden='true' focusable='false' data-icon='times' class='svg-inline--fa fa-times fa-w-11' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path></svg>",
    }
};

// Cr??ation variable suivi du launcher en cours
let launcher;
let player;

// Ajout des audios
// Warriors ft. Imagine Dragons (2014)
const launcher_container_aud1 = document.createElement('div');
const launcher_button_aud1 = document.createElement('button');
const launcher_name_aud1 = document.createElement('span');
launcher_container_aud1.classList.add('launcher__container');
launcher_button_aud1.classList.add('launcher__button');
launcher_button_aud1.dataset.src = Audio_1;
launcher_button_aud1.dataset.name = "Warriors ft. Imagine Dragons";
launcher_button_aud1.dataset.date = "2014";
launcher_name_aud1.classList.add('launcher__name');
launcher_button_aud1.innerHTML = player_ui.svg.btnPlay;
launcher_name_aud1.innerText = "Warriors ft. Imagine Dragons (2014)";
launcher_container_aud1.appendChild(launcher_button_aud1);
launcher_container_aud1.appendChild(launcher_name_aud1);

// Legends Never Die ft. Against The Current (2017)
const launcher_container_aud2 = document.createElement('div');
const launcher_button_aud2 = document.createElement('button');
const launcher_name_aud2 = document.createElement('span');
launcher_container_aud2.classList.add('launcher__container');
launcher_button_aud2.classList.add('launcher__button');
launcher_button_aud2.dataset.src = Audio_2;
launcher_button_aud2.dataset.name = "Legends Never Die ft. Against The Current";
launcher_button_aud2.dataset.date = "2017";
launcher_name_aud2.classList.add('launcher__name');
launcher_button_aud2.innerHTML = player_ui.svg.btnPlay;
launcher_name_aud2.innerText = "Legends Never Die ft. Against The Current (2017)";
launcher_container_aud2.appendChild(launcher_button_aud2);
launcher_container_aud2.appendChild(launcher_name_aud2);

// RISE ft. The Glitch Mob (2018)
const launcher_container_aud3 = document.createElement('div');
const launcher_button_aud3 = document.createElement('button');
const launcher_name_aud3 = document.createElement('span');
launcher_container_aud3.classList.add('launcher__container');
launcher_button_aud3.classList.add('launcher__button');
launcher_button_aud3.dataset.src = Audio_3;
launcher_button_aud3.dataset.name = "RISE ft. The Glitch Mob";
launcher_button_aud3.dataset.date = "2018";
launcher_name_aud3.classList.add('launcher__name');
launcher_button_aud3.innerHTML = player_ui.svg.btnPlay;
launcher_name_aud3.innerText = "RISE ft. The Glitch Mob (2018)";
launcher_container_aud3.appendChild(launcher_button_aud3);
launcher_container_aud3.appendChild(launcher_name_aud3);

// Burn it all down ft. PVRIS (2021)
const launcher_container_aud4 = document.createElement('div');
const launcher_button_aud4 = document.createElement('button');
const launcher_name_aud4 = document.createElement('span');
launcher_container_aud4.classList.add('launcher__container');
launcher_button_aud4.classList.add('launcher__button');
launcher_button_aud4.dataset.src = Audio_4;
launcher_button_aud4.dataset.name = "Burn it all down ft. PVRIS";
launcher_button_aud4.dataset.date = "2021";
launcher_name_aud4.classList.add('launcher__name');
launcher_button_aud4.innerHTML = player_ui.svg.btnPlay;
launcher_name_aud4.innerText = "Burn it all down ft. PVRIS (2021)";
launcher_container_aud4.appendChild(launcher_button_aud4);
launcher_container_aud4.appendChild(launcher_name_aud4);

global_container.appendChild(launcher_container_aud1);
global_container.appendChild(launcher_container_aud2);
global_container.appendChild(launcher_container_aud3);
global_container.appendChild(launcher_container_aud4);

// Fonction de l'affichage du player
setTimeout( function(){ 
    document.querySelectorAll('.launcher__button').forEach(e => {
        e.addEventListener('click', function(evt){
            // Si un player est d??j?? en cours, alors on supprime l'ancien
            if(document.querySelector('.player__container') !== null) {
                deletePlayer();
            }
            
            // Cr??ation du player
            createPlayer(e.dataset, document.body);

            // Update de l'??l??ment ?? l'int??rieur du launcher
            launcher = evt.target;
            launcher.innerHTML = player_ui.svg.btnPause;
        });
    });
}, 100 );

// Ajout du container dans le body
document.body.appendChild(global_container);

// Signature
console.log("%c???? Player in native JavaScript", "font-size: 1.5rem; padding: 20px 10px; margin: 0; background: hsl(271deg 49% 17% / 50%);");
console.log("%cBy Wilfried Jumelle - wjumelle@gmail.com", "font-size: 1rem; font-weight: bold;");

/**
 * Fonctions autour du player
 */

// Fonction qui cr???? et ajoute l'ensemble de l'UI du player au DOM
function createPlayer(elDatas, container) {
    // Cr??ation des ??l??ments du player
    const player__container = document.createElement('div');
    const player__btnPlayPause = document.createElement('button');
    const player__btnPlayPause_container = document.createElement('div');
    const player__btnBackward = document.createElement('button');
    const player__btnBackward_container = document.createElement('div');
    const player__btnForward = document.createElement('button');
    const player__btnForward_container = document.createElement('div');
    const player__btnVolume = document.createElement('button');
    const player__btnVolume_container = document.createElement('div');
    const player__name = document.createElement('p');
    const player__date = document.createElement('p');
    const player__datas_container = document.createElement('div');
    const player__timer_currentTime = document.createElement('span');
    const player__timer_totalTime = document.createElement('span');
    const player__timer_container = document.createElement('div');
    //const player__progressBar = document.createElement('div');
    const player__progressInput = document.createElement('input');
    const player__progressBar_buffer = document.createElement('div');
    const player__progressBar_container = document.createElement('div');
    const player__progressBar_innerContainer = document.createElement('div');
    const player__close = document.createElement('button');

    // Mise en place des diff??rentes classes
    player__container.classList.add('player__container');
    player__btnPlayPause.classList.add('controls', 'player__btnPlayPause', 'isPaused');
    player__btnPlayPause_container.classList.add('player__btnPlayPause-container');
    player__btnBackward.classList.add('controls', 'player__btnBackward');
    player__btnBackward_container.classList.add('player__btnBackward-container');
    player__btnForward.classList.add('controls', 'player__btnForward');
    player__btnForward_container.classList.add('player__btnForward-container');
    player__btnVolume.classList.add('controls', 'player__btnVolume', 'isMedium');
    player__btnVolume_container.classList.add('player__btnVolume-container');
    player__name.classList.add('player__name');
    player__name.id = "player__name";
    player__date.classList.add('player__date');
    player__datas_container.classList.add('player__datas-container');
    player__timer_currentTime.classList.add('player__timer-currentTime');
    player__timer_container.classList.add('player__timer-container');
    //player__progressBar.classList.add('controls', 'player__progressBar');
    player__progressInput.classList.add('player__progressBar-input');
    player__progressBar_buffer.classList.add('player__progressBar-buffer');
    player__progressBar_container.classList.add('player__progressBar-container');
    player__progressBar_innerContainer.classList.add('player__progressBar-innerContainer');
    player__close.classList.add('controls', 'player__close');

    // Choix de l'ordre d'affichage avec flex CSS
    player__progressBar_container.style.order = 1;
    player__btnBackward_container.style.order = 2;
    player__btnPlayPause_container.style.order = 3;
    player__btnForward_container.style.order = 4;
    player__btnVolume_container.style.order = 5;
    player__datas_container.style.order = 6;
    player__timer_container.style.order = 7;
    player__close.style.order = 8;

    // Mise en place du contenu des boutons
    player__btnPlayPause.innerHTML = player_ui.svg.btnPlay;
    player__btnBackward.innerHTML = player_ui.svg.btnBackward;
    player__btnForward.innerHTML = player_ui.svg.btnForward;
    player__btnVolume.innerHTML = player_ui.svg.btnVolume.medium;
    player__name.innerHTML = elDatas.name;
    player__date.innerHTML = elDatas.date;
    player__timer_currentTime.innerHTML = "0:00";
    player__timer_totalTime.innerHTML = "0:00";
    player__progressInput.setAttribute('type', 'range');
    player__progressInput.setAttribute('min', '0');
    player__progressInput.setAttribute('max', '100');
    player__progressInput.setAttribute('value', '0');
    player__close.innerHTML = player_ui.svg.close;

    // On ajoute les ??l??ments aux diff??rents containers
    player__btnPlayPause_container.appendChild(player__btnPlayPause);
    player__btnBackward_container.appendChild(player__btnBackward);
    player__btnForward_container.appendChild(player__btnForward);
    player__btnVolume_container.appendChild(player__btnVolume);
    player__datas_container.appendChild(player__name);
    player__datas_container.appendChild(player__date);
    player__timer_container.appendChild(player__timer_currentTime);
    player__timer_container.appendChild(document.createTextNode(' / '));
    player__timer_container.appendChild(player__timer_totalTime);
    player__progressBar_innerContainer.appendChild(player__progressInput);
    //player__progressBar_innerContainer.appendChild(player__progressBar);
    player__progressBar_innerContainer.appendChild(player__progressBar_buffer);
    player__progressBar_container.appendChild(player__progressBar_innerContainer);

    // On ajoute tous les containers au player__container
    player__container.appendChild(player__progressBar_container);
    player__container.appendChild(player__btnPlayPause_container);
    player__container.appendChild(player__btnBackward_container);
    player__container.appendChild(player__btnForward_container);
    player__container.appendChild(player__btnVolume_container);
    player__container.appendChild(player__datas_container);
    player__container.appendChild(player__timer_container);
    player__container.appendChild(player__close);

    // On cr???? l'??l??ment audio sans SRC
    const elAudio = new Audio();
    elAudio.src = elDatas.src;
    elAudio.volume = 0.1;
    elAudio.id = "audioElement";

    // Ajout de l'audio et du player au container du DOM
    container.appendChild(elAudio);
    container.appendChild(player__container);

    // Cr??ation de la variable qui contiendra les ??l??ments int??ractifs
    player = {
        btnPlayPause: player__btnPlayPause,
        btnBackward: player__btnBackward,
        btnForward: player__btnForward,
        btnVolume: player__btnVolume,
        //progressBar: player__progressBar,
        progressBarInput: player__progressInput,
        progressBar_buffer: player__progressBar_buffer,
        progressBar_innerContainer: player__progressBar_innerContainer,
        btnClose: player__close,
        currentTime: player__timer_currentTime,
        totalTime: player__timer_totalTime,
        currentVolume: elAudio.volume,
        name: elDatas.name,
        date: elDatas.date,
        firstElem: player__progressInput,
        lastElem: player__close
    };

    // On call l'API SoundCloud - Version CSI
    // URLToResolve(elAudio, elAudio.src, player);

    // On initialise le player
    initPlayer(elAudio, player);
}

// Fonction qui supprime un ancien player
function deletePlayer() {
    document.getElementById('audioElement').remove();
    document.querySelector('.player__container').remove();

    // Reset de l'UI
    launcher.innerHTML = player_ui.svg.btnPlay;
}

/**
 * D??but du traitement de SoundCloud
 */

// Fonction qui permet de r??cup??rer l'URL du m??dia streamable ?? partir d'une URL simple SoundCloud
// Ex d'url : https://soundcloud.com/universcience-2/palito-et-le-secret-de-la-cabosse
// Params : l'??l??ment <audio>, l'URL simple SoundCloud et l'objet player pour ajout des eventListeners sur l'UI
function URLToResolve(elem, url, player){
    console.log('URLToResolve()', elem);
    const streamableUrl = "https://cf-media.sndcdn.com/UNiKAPqgeTHO.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vVU5pS0FQcWdlVEhPLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjMzNjM2ODEyfX19XX0_&Signature=P3ixvWliJo6IIJ8OdX7ePHcqqRQXqPSmt-9Oa6LHn6OMhpGLQBfJCkVaE7vhgCwHYA9jwUj8scIcQGNfN1JneX5cIwMQb8M3CWF0fFMqzJ2Ohcws1wV5ctayXXKcfzsOLLe-ISdlyG15jVo46oAwQC3bqzm9x7fMCCwf6EnuHwQOQ7xr3SZhVI7DtrLYb793M~5ywVPvCQecHO9J4PHszvXS7S-ESMf0nW0b6xvDLF4RC6NcEW0cOuHXT0TN0wgyBWM35oc3DBIICHdaP9InPjFSgD5cleECfSceJTYqlY8MGje5G7OPhTK6tzHl0xd6JyhgSijkxJEF5xaJ0v1IQA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ";
    elem.src = streamableUrl;
    initPlayer(elem, player);
}

// Fonction qui initialise le player Plyr
// Params : l'??l??ment <audio> les options de configuration de Plyr et l'objet player pour ajout des eventListeners sur l'UI
function initPlayer(elem, player) {
    // On bind les boutons 
    player.btnPlayPause.addEventListener('click', function(){
        console.log('click btn play/pause');
        if(elem.paused) {
            elem.play();
            launcher.innerHTML = player_ui.svg.btnPause;
            player.btnPlayPause.innerHTML = player_ui.svg.btnPause;
        } else {
            elem.pause();
            launcher.innerHTML = player_ui.svg.btnPlay;
            player.btnPlayPause.innerHTML = player_ui.svg.btnPlay;
        }
    });

    player.btnBackward.addEventListener('click', function(){
        const cur = elem.currentTime;
        let nextTimer = 0;
        (cur - 15 < 0) ? nextTimer = 0 : nextTimer = (cur - 15);
        elem.currentTime = nextTimer;
    });

    player.btnForward.addEventListener('click', function(){
        const cur = elem.currentTime;
        const dur = elem.duration;
        let nextTimer = 0;
        (cur + 15 > dur) ? nextTimer = 0 : nextTimer = (cur + 15);
        elem.currentTime = nextTimer;
        if(nextTimer == 0) {
            elem.pause();
        }
    });

    player.btnVolume.addEventListener('click', function(){
        if(elem.volume > 0) {
            elem.volume = 0;
            player.btnVolume.innerHTML = player_ui.svg.btnVolume.muted;
        } else {
            elem.volume = player.currentVolume;
            player.btnVolume.innerHTML = player_ui.svg.btnVolume.medium;
        }
    });

    player.progressBarInput.addEventListener('input', function(e){
        console.log('input');
        let percent = e.target.value;
        changeCurrentTime(elem, percent);
    });

    player.btnClose.addEventListener('click', function(){
        deletePlayer();

        // On remet le focus sur le launcher
        launcher.focus();
    });

    // On met en place le  pi??ge au clavier pour l'accessibilit??
    document.addEventListener('keydown', function(e){

        if (e.keyCode == 9 && e.target == player.firstElem) {
			if(e.shiftKey) {
				e.preventDefault();
				player.lastElem.focus();
			}
		}

		if (e.keyCode == 9 && e.target == player.lastElem) {
			e.preventDefault();
			player.firstElem.focus();
		}
    });

    // player.progressBar_innerContainer.addEventListener('click', function(e){
    //     var containerPgBarWidth = this.offsetWidth,
    //         containerPgBarPosX = getElementPosition(this, 'x'), 
    //         mouseX = getMousePosition(e, 'x'),
    //         posX = mouseX - containerPgBarPosX;
    //     var percent = (posX * 100) / containerPgBarWidth;

    //     changeCurrentTime(elem, percent);
    // });

    // On bind des events li??s au player
    elem.addEventListener('play', function(){
        console.log('event play');

        // Mise ?? jours de l'??tat de l'UI des boutons play/pause
        launcher.innerHTML = player_ui.svg.btnPause;
        player.btnPlayPause.innerHTML = player_ui.svg.btnPause;
    });

    elem.addEventListener('playing', function(){
        console.log('event playing');

        // Mise ?? jours de l'??tat de l'UI des boutons play/pause
        launcher.innerHTML = player_ui.svg.btnPause;
        player.btnPlayPause.innerHTML = player_ui.svg.btnPause;
    });

    elem.addEventListener('pause', function(){
        console.log('event pause');
        
        // Mise ?? jours de l'??tat de l'UI des boutons play/pause
        launcher.innerHTML = player_ui.svg.btnPlay;
        player.btnPlayPause.innerHTML = player_ui.svg.btnPlay;
    });

	elem.addEventListener('error', function() {
		var errorStatus = "initPlayer JS : Player ERORR";
		console.error(errorStatus);
	});

    elem.addEventListener('timeupdate', function() {
        // Mise ?? jour de la progressBar
        var duration = elem.duration,
            currTime = elem.currentTime,
            frac = currTime / duration,
            progress = Math.round(frac * 100), //% du temps pass??
            buffered = elem.buffered.end(elem.buffered),
            fracBuff = buffered / duration,
            progressBuffer = Math.round(fracBuff * 100);

        player.progressBarInput.setAttribute('value', progress);
        player.progressBarInput.style.setProperty('--value', progress+'%');

        //updateProgress(player.progressBar, progress, player.currentTime, currTime, duration);
        updateBuffer(player.progressBar_buffer, progressBuffer);

        // Mise ?? jour du currentTime
        if(elem.currentTime) {
            player.currentTime.innerHTML = formatTime(elem.currentTime);
        } else {
            player.currentTime.innerHTML = formatTime(0);
        }
    });

	elem.addEventListener('canplay', function() {
        player.totalTime.innerHTML = formatTime(elem.duration);
	});

    elem.addEventListener('ended', function(){
        // Reset du currentTime ?? 0 ?? la fin de la lecture
        elem.currentTime = 0;
    });

    // On lance la lecture de l'audio
    elem.play();

    // On focus le bouton play du player
    setTimeout(function(){
        player.btnPlayPause.focus();
    }, 750);
}

// Fonction de mise ?? jours de la bar de progression pour l'avanc??e
// Params : la progressBar, la progression, le currentTime, le currentTime % et la dur??e totale
function updateProgress(bar, prog, timer, curr, duration) {
    bar.style.width = prog+'%';
    timer.innerHTML = formatTime(curr) + ' / ' + formatTime(duration);
}

// Fonction de mise ?? jours de la bar de loaded
// Params : la progressBar et la progression
function updateBuffer(bar, prog) {
    bar.style.width = prog+'%';
}

// Fonction qui g??re le changement de currenttime au click sur la pgBar
// Params : l'??l??ment <audio> et le pourcentage actuel dans l'audio
function changeCurrentTime(elem, percent) {
    elem.currentTime = Math.round((percent * elem.duration) / 100);
}

// Fonction de formattage de l'affichage de la date
// Params : time en secondes
function formatTime(time) {
    let hours = Math.floor(time / 3600),
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

// Fonnction qui retourne la position x et / ou y d'un ??l??ment
// Tant qu'un ??l??ment parent existe, on accumule sa valeur de son positionnement en X
// Params : l'??l??ment ?? ??valuer et l'axe ?? retourner
function getElementPosition(elem, axis) {
    let x = 0,
        y = 0;

    do {
        x += elem.offsetLeft;
        y += elem.offsetTop;
    } while (elem = elem.offsetParent);

    if(axis) {
        if(axis == 'x') {
            return x;
        } else if(axis == 'y') {
            return y;
        } else { return {x: x, y: y}; }
    }
}

// Fonction qui retourn la position x et / ou y du curseur de la souris
// pageX et pageY correspondent ?? la position dans la page
// screenX et screenY correspondent ?? la position dans l'??cran du p??riph??rique
// Params : l'event click et l'axe ?? retourner
function getMousePosition(e, axis) {
    if(axis) {
        if(axis == 'x') {
            return e.pageX;
        } else if(axis == 'y') {
            return e.pageY;
        } else { return {x: e.pageX, y: e.pageY}; }
    }
}

// Lorsque le DOM a fini de se charger on le parcourt ?? la recherche de tous les players
// On ex??cute pour chacun la fonction URLToResolve() qui va chercher l'URL streamable du m??dia SoundCloud
document.addEventListener("DOMContentLoaded", function() {
    //URLToResolve(elAudio, elAudio.src);
});