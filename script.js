document.addEventListener('DOMContentLoaded', () => {

  //My Tracklist
  const tracksList = [
    {
      audioSrc:
        './tracks/01-Wiz Khalifa - Amber Ice [Prod. By I.D. Labs Productions] [www.SongsLover.com].mp3',
      coverSrc: './images/wizKhalifa.jpg',
      name: 'Wiz Khalifa',
      desc: 'Wiz Khalifa - Amber Ice',
      id: 0,
    },
    {
      audioSrc:
        './tracks/Martin Garrix & Tiësto - The Only Way Is Up (Official Music Video).mp3',
      coverSrc: './images/martinG.jpg',
      name: 'Martin Garrix',
      desc: 'Ft. Tiesto Only Way Is Up',
      id: 1,
    },
    {
      audioSrc: './tracks/Space Buddha - Self Therapy.mp3',
      coverSrc: './images/spaceBuddha.jpg',
      name: 'Space Buddha',
      desc: 'Self Therapy',
      id: 2,
    },
    {
      audioSrc: "./tracks/Drake - God's Plan.mp3",
      coverSrc: './images/godsplan.jpg',
      name: 'Drake',
      desc: "God's plan",
      id: 3,
    },
    {
      audioSrc: './tracks/Joyner Lucas & Lil Baby - Ramen & OJ.mp3',
      coverSrc: './images/ramenlucas.png',
      name: 'Joyner Lucas & Lil Baby',
      desc: 'Ramen & OJ',
      id: 4,
    },
    {
      audioSrc:
        './tracks/Pop Smoke - For The Night (Audio) ft. Lil Baby, DaBaby.mp3',
      coverSrc: './images/popsmoke.jpg',
      name: 'Pop Smoke ft. Lil Baby, DaBaby',
      desc: 'For The Night',
      id: 5,
    },
  ];


  // variables
  const currentTrackName = document.querySelector('header h3');
  const currentTrackDesc = document.querySelector('header p');
  const currentTrackCover = document.querySelector('header img');
  const currentTrackAudio = document.querySelector('audio');
  const playPauseBtn = document.querySelector('.event-playPause');
  const muteUnmuteBtn = document.querySelector('.event-muteUnmute');
  const playNextBtn = document.querySelector('.event-next');
  const playPrevBtn = document.querySelector('.event-prev');
  const progress = document.querySelector('.slider-progress');
  const currentTrackTime = document.querySelector('.count-current');
  const finalTrackTime = document.querySelector('.count-final');

  // Add Tracks to my page
  (function addMyTrackList() {
    for (let track of tracksList) {
      let li = document.createElement('li');
      li.id = track.id;
      li.innerHTML = `
          <span class="track-number">0${track.id}</span>
          <img
            class="track-img"
            src=${track.coverSrc}
            alt="track image"
          />
          <div class="track-detail">
            <p class="track-detail-name">${track.name}</p>
            <p class="track-detail-desc"><small>${track.desc}</small></p>
          </div>`;
      document.querySelector('ul').appendChild(li);

      (function (id) {
        li.addEventListener('click', () => {
          playSelectedTrack(id);
        })
      })(track.id);

    }
  })();

  let trackId = 0;

  const loadTrack = songId => {
    const song = tracksList.find(track => track.id === songId);

    const { audioSrc, coverSrc, name, desc } = song;
    currentTrackName.innerText = name;
    currentTrackDesc.innerText = desc;
    currentTrackAudio.src = audioSrc;
    currentTrackCover.src = coverSrc;
  };

  const playSelectedTrack = songId => {
    trackId = songId;
    loadTrack(songId);
    playTrack();
  }
  loadTrack(trackId);

  const playTrack = () => {
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');

    currentTrackAudio.play();
  };

  const pauseTrack = () => {
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');

    currentTrackAudio.pause();
  };

  const playPrevTrack = () => {
    trackId--;
    if (trackId < 0) {
      trackId = tracksList.length - 1;
    }
    loadTrack(trackId);
    playTrack();
  };

  const playNextTrack = () => {
    trackId++;
    if (trackId > tracksList.length - 1) {
      trackId = 0;
    }
    loadTrack(trackId);
    playTrack();
  };

  const muteUnmutedAudio = () => {
    if (currentTrackAudio.muted) {
      currentTrackAudio.muted = false;
      muteUnmuteBtn.classList.remove('fa-volume-mute');
      muteUnmuteBtn.classList.add('fa-volume-up');
    } else {
      currentTrackAudio.muted = true;
      muteUnmuteBtn.classList.remove('fa-volume-up');
      muteUnmuteBtn.classList.add('fa-volume-mute');
    }
  };

  const updateProgress = () => {
    const currentTime = currentTrackAudio.currentTime;
    const trackDuration = currentTrackAudio.duration;
    const percent = (currentTime / trackDuration) * 100;
    progress.style.width = percent + '%';
    let curMins = Math.floor(currentTime / 60);
    let curSecs = Math.floor(currentTime - curMins * 60);
    let durMins = Math.floor(trackDuration / 60) || '--';
    let durSecs = Math.floor(trackDuration - durMins * 60) || '--';

    if (curMins < 10) {
      curMins = `0${curMins}`;
    }
    if (curSecs < 10) {
      curSecs = `0${curSecs}`;
    }
    if (durMins < 10) {
      durMins = `0${durMins}`;
    }
    if (durSecs < 10) {
      durSecs = `0${durSecs}`;
    }

    currentTrackTime.innerText = `${curMins}:${curSecs}`;
    finalTrackTime.innerText = `${durMins}:${durSecs}`;
  };

  playPauseBtn.addEventListener('click', () => {
    const currentPlaying = playPauseBtn.classList.contains('fa-pause');
    if (currentPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  });


  //Event Listeners
  muteUnmuteBtn.addEventListener('click', () => muteUnmutedAudio());

  playNextBtn.addEventListener('click', () => playNextTrack());

  playPrevBtn.addEventListener('click', () => playPrevTrack());

  currentTrackAudio.addEventListener('timeupdate', () => updateProgress());

});