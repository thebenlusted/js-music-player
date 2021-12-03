
const _audio = document.getElementById('song');
const _cover = document.getElementById('cover');

const title = document.getElementById('title');
const artistName = document.getElementById('artist-name');

const playPauseIcon = document.getElementById('play-pause-icon');
const playButton = document.getElementById('play');

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-cont');

const time_stamp = document.getElementById('time-stamp');

const artist_prof = document.getElementById('artist-prof');
const song_link = document.getElementById('song-link');

const volume_control = document.getElementById('volume-control');

let song_index = 2;
const songs = [
    'Grimes_Go (Shadient Remix)',
    'Madeon_All My Friends (1788-L Remix)',
    'Inzo_Multiverse'
];
const artist_profiles = [
    'https://open.spotify.com/artist/6ADRET3UXTOmGBjjO67fNd?si=4Hvm8VcoTMabVM8GA_0keg',
    'https://open.spotify.com/artist/7oB4pCSzvvRtZka6DxXUfN?si=-k4FgnH3QaSqTdIsyUjGTQ',
    'https://open.spotify.com/artist/18Eu7uJEMPWwwt1QUdCglQ?si=1QurdrITQx27wI_TvVY0hA'
];
const song_links = [
    'https://soundcloud.com/shadient/go-rps?si=e306d8af10a84f648799126003551635',
    'https://soundcloud.com/1788-l/madeon-all-my-friends-1-7-8-8-l-r-e-m-i-x?si=34d44e06933d4b94a5923d7a21f205f3',
    'https://open.spotify.com/track/6ovXUEUiOirA5SHICrI9Yu?si=771da96780194771'
];

window.onload = () => {
    time_stamp.innerText = '0:00:0:00';
}

function loadSong(song) {
    let asstr = songs[song_index].split('_');
    let sn = asstr[1];
    let an = asstr[0];

    artist_prof.setAttribute('href', artist_profiles[song_index]);
    song_link.setAttribute('href', song_links[song_index]);

    title.innerText = sn;
    artistName.innerText = an;
    _audio.src = `music/${song}.mp3`;
    _cover.src = `images/${song}.jpg`;
}
loadSong(songs[song_index]);

function playSong() {
    playPauseIcon.classList.replace('fa-play', 'fa-pause');

    _audio.playing = true;
    _audio.play();
}
function pauseSong() {
    playPauseIcon.classList.replace('fa-pause', 'fa-play');

    _audio.playing = false;
    _audio.pause();
}

play.addEventListener('click', () => {
    const isPlaying = _audio.playing;

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let m = Math.floor(currentTime / 60);
    let s = Math.floor(currentTime % 60);
    if(s < 10) {
        s = '0' + String(s);
    }
    let dm = Math.floor(duration / 60);
    let ds = Math.floor(duration % 60);
    if(ds < 10) {
        ds = '0' + String(ds);
    }
    time_stamp.innerText = m + ':' + s + '/' + dm + ':' + ds;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = _audio.duration;

    _audio.currentTime = (clickX / width) * duration;
}

function prevSong() {
    song_index--;

    if(song_index < 0) {
        song_index = songs.length - 1;
    }

    loadSong(songs[song_index]);

    playSong();
}
function nextSong() {
    song_index++;

    if(song_index > songs.length - 1) {
        song_index = 0;
    }

    loadSong(songs[song_index]);

    playSong();
}

progressContainer.addEventListener('click', setProgress);

_audio.addEventListener('ended', nextSong);
_audio.addEventListener('timeupdate', updateProgress);

volume_control.addEventListener('input', function(e) {
    _audio.volume = e.currentTarget.value / 100;
})

function toggleDropdown() {
    if(document.getElementById('dropdown-content').style.display === 'flex') {
        document.getElementById('dropdown-content').style.display = 'none';
    } else {
        document.getElementById('dropdown-content').style.display = 'flex';
    }
}