export default {

    template: `

    <section class="audioPlayer">
        <h2 class="title">Bohemian Rhapsodi</h2>
        <img class="cover" src="images/bohemian_rapsodi.jpg" alt="Bohemian Rapsodi Cover Album">

        <audio ref="audio" @timeupdate="showTime" >
            <source src="audio/Bohemian_Rhapsodi.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
    
        <div class="audioControls">
            <div class="progress">
                <span class="time">{{ time }}</span>
                <input class="progressBar" ref="progressBar" @change="updateProgress" type="range" min="0" max="100" v-model.number="progress"> 
            </div>

            <div class="buttonsCon">
                <button @click.prevent="play" class="playpause">{{playPause}}</button>
                <button @click.prevent="stop" class="stop">Stop</button>
                <button @click.prevent="rewind" class="rewind">Rewind</button>
                <button @click.prevent="forward"class="forward">Forward</button>
                <button @click.prevent="showLyrics">Lyrics</button>
            </div>

            <div class="volumeButtons">
                <h3 class="volume">Volume:</h3> <span class="volume">{{ volume }}</span>
                <input class="volumeBar" type="range" min="0" max="100" v-model.number="volume"> 
                <button @click.prevent="decreaseVolume">-</button>
                <button @click.prevent="increaseVolume">+</button>
            </div>
        </div>

        <p class="lyrics" v-if="lyricsOn">
        Is this the real life?<br>
        Is this just fantasy?<br>
        Caught in a landslide,<br>
        No escape from reality.<br>
        <br>

        Open your eyes,<br>
        Look up to the skies and see,<br>
        I'm just a poor boy, I need no sympathy,<br>
        Because I'm easy come, easy go,<br>
        Little high, little low,<br>
        Any way the wind blows doesn't really matter to me, to me.<br>
        <br>

        Mama, just killed a man,<br>
        Put a gun against his head,<br>
        Pulled my trigger, now he's dead.<br>
        Mama, life had just begun,<br>
        But now I've gone and thrown it all away.<br>
        <br>

        Mama, ooh,<br>
        Didn't mean to make you cry,<br>
        If I'm not back again this time tomorrow,<br>
        Carry on, carry on as if nothing really matters.<br>
        <br>

        Too late, my time has come,<br>
        Sends shivers down my spine,<br>
        Body's aching all the time.<br>
        Goodbye, everybody, I've got to go,<br>
        Gotta leave you all behind and face the truth.<br>
        <br>

        Mama, ooh (any way the wind blows),<br>
        I don't wanna die,<br>
        I sometimes wish I'd never been born at all.<br>
        <br>

        I see a little silhouetto of a man,<br>
        Scaramouche, Scaramouche, will you do the Fandango?<br>
        Thunderbolt and lightning,<br>
        Very, very frightening me.<br>
        (Galileo) Galileo.<br>
        (Galileo) Galileo,<br>
        Galileo Figaro<br>
        Magnifico-o-o-o-o.<br>
        <br>

        I'm just a poor boy, nobody loves me.<br>
        He's just a poor boy from a poor family,<br>
        Spare him his life from this monstrosity.<br>
        <br>

        Easy come, easy go, will you let me go?<br>
        Bismillah! No, we will not let you go. (Let him go!)<br>
        Bismillah! We will not let you go. (Let him go!)<br>
        Bismillah! We will not let you go. (Let me go!)<br>
        Will not let you go. (Let me go!)<br>
        Never let you go (Never, never, never, never let me go)<br>
        Oh oh oh oh<br>
        No, no, no, no, no, no, no<br>
        Oh, mama mia, mama mia (Mama mia, let me go.)<br>
        Beelzebub has a devil put aside for me, for me, for me.<br>
        <br>

        So you think you can stone me and spit in my eye?<br>
        So you think you can love me and leave me to die?<br>
        Oh, baby, can't do this to me, baby,<br>
        Just gotta get out, just gotta get right outta here.<br>
        <br>
        (Ooooh, ooh yeah, ooh yeah)<br>
        <br>
        Nothing really matters,<br>
        Anyone can see,<br>
        Nothing really matters,<br>
        Nothing really matters to me.<br>
        <br>
        Any way the wind blows.</p>
    </section>
    `,

    data() { 
        return{
            playPause: "Play",
            time: "0:00",
            volume: 50,
            progress: 0,
            lyricsOn: false
        }
        
    },

    watch: {
        volume(value){
            let audio = this.$refs.audio;
            this.volume = value;
            audio.volume = value / 100;
        }
    },


    methods: {

        play(){
            let audio = this.$refs.audio;

            if (audio.paused){
                audio.play();
                this.playPause = "Pause";

            }else{
                audio.pause();
                this.playPause = "Play";
            }

        },

        stop(){
            let audio = this.$refs.audio;

            audio.pause();
            audio.currentTime = 0;
            this.playPause = "Play";
        },

        rewind(){
            let audio = this.$refs.audio;
            
            audio.currentTime -= 5;
        },

        forward(){
            let audio = this.$refs.audio;

            audio.currentTime += 5;
            if(audio.currentTime >= audio.duration) {
                audio.pause();
                audio.currentTime = 0;
                this.playPause = "Play";

            //   playPauseBtn.textContent = 'Play';
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
            let audio = this.$refs.audio;

            let minutes = Math.floor(audio.currentTime / 60);
            let seconds = Math.floor(audio.currentTime - minutes * 60);

            let progress = Math.floor((audio.currentTime / audio.duration) * 100);

            this.progress = progress;

            if(seconds < 10){
                seconds = "0" + seconds;
            }

            this.time = minutes + ":" + seconds;

        },

        updateProgress(){
            let audio = this.$refs.audio;
            let progressBar = this.$refs.progressBar;

            // console.log(progressBar.value);
            audio.currentTime = audio.duration * progressBar.value / 100;

        },

        showLyrics(){
            let lyrics = this.lyricsOn;

            if(lyrics){
                this.lyricsOn = false
            } else{
                this.lyricsOn = true
            }
        }
    }
}