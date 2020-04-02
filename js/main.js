import Movie from "./components/Movie.js";

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
        movie: Movie
    }

}).$mount("#app");