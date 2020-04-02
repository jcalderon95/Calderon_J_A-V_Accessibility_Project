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
            <span class="time">{{ time }}</span>
            <input ref="progressBar" @change="updateProgress" type="range" min="0" max="100" v-model.number="progress"> 
            <button @click.prevent="play" class="playpause">{{playPause}}</button>
            <button @click.prevent="stop" class="stop">Stop</button>
            <button @click.prevent="rewind" class="rewind">Rewind</button>
            <button @click.prevent="forward"class="forward">Forward</button>
            <h3>Volume</h3><span>{{ volume }}</span>
            <input type="range" min="0" max="100" v-model.number="volume"> 
            <button @click.prevent="decreaseVolume">-</button>
            <button @click.prevent="increaseVolume">+</button>
            <button @click.prevent="showLyrics">Lyrics</button>
        </div>

        <p v-if="lyricsOn">Is this the real life?
        Is this just fantasy?
        Caught in a landslide,
        No escape from reality.
        
        Open your eyes,
        Look up to the skies and see,
        I'm just a poor boy, I need no sympathy,
        Because I'm easy come, easy go,
        Little high, little low,
        Any way the wind blows doesn't really matter to me, to me.
        
        Mama, just killed a man,
        Put a gun against his head,
        Pulled my trigger, now he's dead.
        Mama, life had just begun,
        But now I've gone and thrown it all away.
        
        Mama, ooh,
        Didn't mean to make you cry,
        If I'm not back again this time tomorrow,
        Carry on, carry on as if nothing really matters.
        
        Too late, my time has come,
        Sends shivers down my spine,
        Body's aching all the time.
        Goodbye, everybody, I've got to go,
        Gotta leave you all behind and face the truth.
        
        Mama, ooh (any way the wind blows),
        I don't wanna die,
        I sometimes wish I'd never been born at all.
        
        I see a little silhouetto of a man,
        Scaramouche, Scaramouche, will you do the Fandango?
        Thunderbolt and lightning,
        Very, very frightening me.
        (Galileo) Galileo.
        (Galileo) Galileo,
        Galileo Figaro
        Magnifico-o-o-o-o.
        
        I'm just a poor boy, nobody loves me.
        He's just a poor boy from a poor family,
        Spare him his life from this monstrosity.
        
        Easy come, easy go, will you let me go?
        Bismillah! No, we will not let you go. (Let him go!)
        Bismillah! We will not let you go. (Let him go!)
        Bismillah! We will not let you go. (Let me go!)
        Will not let you go. (Let me go!)
        Never let you go (Never, never, never, never let me go)
        Oh oh oh oh
        No, no, no, no, no, no, no
        Oh, mama mia, mama mia (Mama mia, let me go.)
        Beelzebub has a devil put aside for me, for me, for me.
        
        So you think you can stone me and spit in my eye?
        So you think you can love me and leave me to die?
        Oh, baby, can't do this to me, baby,
        Just gotta get out, just gotta get right outta here.
        
        (Ooooh, ooh yeah, ooh yeah)
        
        Nothing really matters,
        Anyone can see,
        Nothing really matters,
        Nothing really matters to me.
        
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
            
            audio.currentTime -= 3;
        },

        forward(){
            let audio = this.$refs.audio;

            audio.currentTime += 3;
            if(audio.currentTime >= audio.duration || audio.paused) {
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

            console.log(lyrics);
        }
    }
}