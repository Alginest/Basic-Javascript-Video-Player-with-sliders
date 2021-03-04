/*Get our elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build our functions */
// play button or pause
function togglePlay(){
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
    if(video.paused){
        video.play();
    }else {
        video.pause();
    }
};
// update the play pause button
function updateButton(){
    const icon = this.paused ?  '►' : '❚ ❚';
    toggle.textContent = icon;
}
// skip button function 
function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

// range slider function
function handleRangeUpdate(){
    video[this.name] = this.value;
   /* console.log(this.name);
    console.log(this.value);*/
};

// progres bar range and skip to the minute
function handleProgress () {
  const precent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${precent}%`;
};

// scrub the video progres to a certain point per width to procentege

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

/*add event liseners */
// play and pause
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// skip buttons
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
// range sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
// progres bar liseners
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub); // scrubing by click
// scrubing by drag
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);