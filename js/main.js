import Movie from "./components/Movie.js";
import TvShow from "./components/TvShow.js";
import Audio from "./components/Audio.js";



const vm = new Vue({

    data: {
        
        

    },

    mounted: function() {
        console.log('app is running');
        // console.log(this.$refs.video);

        // this.removeDefaulControls();
    },

    methods: {


    },

    components: {
        movie: Movie,
        tvshow: TvShow,
        audioplayer: Audio
    }

}).$mount("#app");