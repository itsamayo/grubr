// const url = 'https://api.edamam.com/search?app_id=2f6579bd&app_key=a01862e10cc6f118c485f8302de7c5b8&from=0&to=50&q=';
axios.defaults.baseURL = 'https://api.edamam.com/search?app_id=2f6579bd&app_key=a01862e10cc6f118c485f8302de7c5b8&from=0&to=50&q=';

var app = new Vue({
  el: '#app-main',
  data: {
    defaults: ['Avo'],
    recipes: [],
    searched: false,
    query: '',
    currentResults: '',
    isSearching: true,
    showRecipeModal: false,
    showSupportModal: false,
    selectedRecipe: {}
  },
  mounted() {
      this.getRecipes(true);
  },
  methods: {
      search() {
          if (this.query === '') {
              swal({
                text: "We can't find any recipes if you don't type anything in. Why not try searching for something like avocado ice cream?",
                button: "👍",
              });
          } else {
              this.getRecipes(false);
          }
      },
      getRecipes(isInitial) {
          this.recipes = [];
          const _query =  isInitial ? this.initialQuery : this.query;
          if (!isInitial) {
              this.currentResults = this.query;
          }
          this.isSearching = true;
          axios.get(_query)
            .then(res => {
              const hits = res.data.hits.map((x) => x.recipe);
              this.recipes = hits;
              this.isSearching = false;
            });
      },
      submit() {
          this.search();
          return false;
      },
      popRecipeModal(card) {
        this.showRecipeModal = true;
        this.selectedRecipe = card;
      },
      popSupportModal(card) {
        this.showSupportModal = true;
      }
  },
  computed: {
      initialQuery: function() {
          return this.defaults[Math.floor(Math.random()* this.defaults.length)];
      }
  }
});