const song = document.getElementById("song");
const playBtn=document.querySelector(".play-inner");
const back =document.querySelector(".back")
const  next = document.querySelector(".next")
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImg = document.querySelector(".music-tumb img"); 
const musicthumb = document.querySelector(".music-tumb"); 
const playRepeat = document.querySelector(".repeat");

displayTimer();
let timer = setInterval(displayTimer,500);
let repeatCount = 0;
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;

playRepeat.addEventListener("click",function(){
    if(isRepeat){
        isRepeat=false;
        playRepeat.removeAttribute("style");

    } 
    else {
        repeatCount=0;
        isRepeat=true;
        playRepeat.style.color="#ffb86c";
    }
});



// const music = [
//     "5cu.mp3","bautroi.mp3","buon.mp3"
// ];
const music =[
    {
        id:1,
        title: "5cu",
        file: "5cu.mp3",
        img:"https://vcdn1-giaitri.vnecdn.net/2022/07/25/jack-1-1658727136-7539-1658727427.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=0bEmdbTmx5G6RTkx7N5rNw"
    },
    {
        id:2,
        title: "bau troi",
        file: "bautroi.mp3",
        img:"https://static2.yan.vn/YanNews/202207/202207200711518069-c2d805d8-40e0-4ff7-bb9d-406b92f1913a.jpeg"
    },
    {
        id:3,
        title: "buon",
        file: "buon.mp3",
        img:"buon.webp"
    }
]

/**
 * Music
 * id:1
 * title:5cu
 * file:5cu.mp3
 * img:jack
 */

song.setAttribute("src",`./mp3/${music[indexSong].file}`);

next.addEventListener("click",function(){
    changeSong(1);
})

back.addEventListener("click", function(){
    changeSong(-1);
});

song.addEventListener("ended",handleEndedSong);

function handleEndedSong(){
    repeatCount++
    if(isRepeat && repeatCount===1){
        //handleRepeat Song
        isPlaying=true;
        playPause();
    }else{
        changeSong(1);
    }
}

function changeSong(dir){
    if(dir===1){
        //next song
        indexSong++;
        if(indexSong >= music.length){
            indexSong=0;
        }
        isPlaying=true; 
    }else if(dir===-1){
        indexSong--
        if(indexSong<0){
            indexSong = music.length - 1;
        }
        isPlaying=true;
    }
    init(indexSong);
    // song.setAttribute("src",`./mp3/${music[indexSong].file}`);
    playPause();
}


playBtn.addEventListener("click", playPause);

function playPause(){
    if(isPlaying){
        musicthumb.classList.add("isPlaying");
        song.play();
        playBtn.innerHTML=`<ion-icon name="pause-circle" class="play"></ion-icon>`
        isPlaying = false;
        timer = setInterval(displayTimer,500);
    }else{
        musicthumb.classList.remove("isPlaying")
        song.pause();
        playBtn.innerHTML=` <ion-icon name="play-circle" class="play"></ion-icon>`
        isPlaying=true;
        clearInterval(timer);
    }
}


function displayTimer(){
    const {duration,currentTime}=song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent=formatTime(currentTime);
    if(!duration){
        durationTime.textContent = "00:00";
    }else{
        durationTime.textContent = formatTime(duration);
    }
}

function formatTime(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes *60);
    return `${minutes<10?'0'+ minutes:minutes}:${seconds<10 ? '0'+seconds:seconds}`;
}


range.addEventListener("change",handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}

function init(){
    displayTimer();
    song.setAttribute("src",`./mp3/${music[indexSong].file}`);
    musicImg.setAttribute("src",music[indexSong].img);
    musicName.textContent = music[indexSong].title;
}
init(indexSong);