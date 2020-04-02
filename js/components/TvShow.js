export default {

    template: `

    <section class="videoPlayer tvshowPlayer">
        <video ref="tvShow" @timeupdate="showTime">
            <source src="video/ozark.mp4" type="video/mp4">
            <track kind="subtitles" src="subtitles/subtitles_tvshow.vtt" srclang="en" default>
            <p>Your browser doesn't support HTML5 video. Here is a <a href="video/avengers.mp4">link to the video</a> instead.</p>
        </video>
    
        <div class="videoControls">
            <span class="time">{{ time }}</span>
            <input ref="progressBar" @change="updateProgress" type="range" min="0" max="100" v-model.number="progress"> 
            <button @click.prevent="play" class="playpause">{{playPause}}</button>
            <button @click.prevent="stop" class="stop">Stop</button>
            <button @click.prevent="rewind" class="rewind">Rewind</button>
            <button @click.prevent="forward"class="forward">Forward</button>
            <h3>Volume</h3><span>{{ volume }}</span>
            <input type="range" min="0" max="100" v-model.number="volume"> 
            <button @click.prevent="increaseVolume">+</button>
            <button @click.prevent="decreaseVolume">-</button>
            <button @click.prevent="toggleFullScreen">full screen</button>
            <button @click.prevent="toggleSubtitles">CC</button>
        </div>
    </section>
    `,

    data() { 
        return{
            playPause: "Play",
            time: "0:00",
            volume: 50,
            progress: 0
        }
        
    },

    mounted: function() {
        this.hideSubtitles();
    },

    watch: {
        volume(value){
            let tvShow = this.$refs.tvShow;
            this.volume = value;
            tvShow.volume = value / 100;
        }
    },


    methods: {

        play(){
            let tvShow = this.$refs.tvShow;

            if (tvShow.paused){
                tvShow.play();
                this.playPause = "Pause";

            }else{
                tvShow.pause();
                this.playPause = "Play";
            }

        },

        stop(){
            let tvShow = this.$refs.tvShow;

            tvShow.pause();
            tvShow.currentTime = 0;
            this.playPause = "Play";
        },

        rewind(){
            let tvShow = this.$refs.tvShow;
            
            tvShow.currentTime -= 3;
        },

        forward(){
            let tvShow = this.$refs.tvShow;

            tvShow.currentTime += 3;
            if(tvShow.currentTime >= tvShow.duration || tvShow.paused) {
                tvShow.pause();
                tvShow.currentTime = 0;
                this.playPause = "Play";

            }
        },

        increaseVolume(){
            if(this.volume < 100){
                let currentVolume = this.volume;
                let result = currentVolume += 1;

                if(this.volume <= 100 ){
                    if(result <= 100){
                        this.volume += 1;
                    }
                }
            }else{
                return;
            }
            
        },

        decreaseVolume(){
            if(this.volume >= 1){
                this.volume -= 1;
            }
        },

        showTime(){
            let tvShow = this.$refs.tvShow;

            let minutes = Math.floor(tvShow.currentTime / 60);
            let seconds = Math.floor(tvShow.currentTime - minutes * 60);

            let progress = Math.floor((tvShow.currentTime / tvShow.duration) * 100);

            this.progress = progress;

            if(seconds < 10){
                seconds = "0" + seconds;
            }

            this.time = minutes + ":" + seconds;

        },

        updateProgress(){
            let tvShow = this.$refs.tvShow;
            let progressBar = this.$refs.progressBar;

            // console.log(progressBar.value);
            tvShow.currentTime = tvShow.duration * progressBar.value / 100;

        },


        toggleFullScreen(){
            console.log("fired");
                let tvShow = this.$refs.tvShow;

                if (!document.mozFullScreen && !document.webkitFullScreen) {
                    if (tvShow.mozRequestFullScreen) {
                      tvShow.mozRequestFullScreen();
                    } else {
                      tvShow.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                  } else {
                    if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                    } else {
                      document.webkitCancelFullScreen();
                    }
                  }
 
        },

        hideSubtitles(){
            let subtitle = this.$refs.tvShow.textTracks[0];
            subtitle.mode = 'hidden';
        },

        toggleSubtitles(){
            let subtitle = this.$refs.tvShow.textTracks[0];

            if(subtitle.mode === 'hidden'){
                subtitle.mode = 'showing';
            }else{
                subtitle.mode = 'hidden';
            }
        }
    }
}