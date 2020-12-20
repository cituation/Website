/* global Vue, $, addDotButtonLabel, getJSON */
/* eslint no-multi-str: 0 */

Vue.component('edition-gallery', {
  props: ['edition', 'base_url', 'category_files', 'category_images'],
  template: '<div>\
      <h2 class="display-4 m-4 text-center" v-text="titleText"></h2>\
      <div :id="editionSelectorId" class="owl-carousel owl-theme gallery-selector card">\
        <div v-for="(categoryName, index) in categoryNames" :key="index" class="item card clickable" v-on:click="selectCategory(index)">\
          <div class="image-square-container">\
            <img class="fill-image" :src="category_images[categoryName]|| \'\'" :alt="categoryName"/>\
            <img src="/image/gallery/bedrock/colormap.png" style="opacity: 0;" alt="square_bg">\
          </div>\
          <h5 class="card-title text-center" v-text="categoryName"></h5>\
        </div>\
      </div>\
    </div>',
  data () {
    return {
      categoryChosen: 0,
      categories: {},
      categoriesLoaded: false // made to launch update on category images
    }
  },
  computed: {
    categoryNames: function () {
      return this.$props.category_files.map(el => this.toCategoryName(el))
    },
    titleText: function () {
      const nameCapitalized = this.$props.edition.charAt(0).toUpperCase() + this.$props.edition.slice(1)
      return nameCapitalized + ' Edition'
    },
    editionSelectorId: function () {
      return this.$props.edition + '-selector'
    }
  },
  methods: {
    toCategoryName: function (path) {
      const c = path.split('/').pop().replace('.json', '').replace(/_/g, ' ')

      return c.charAt(0).toUpperCase() + c.slice(1)
    },
    loadOneCategory: function (categoryName, categoryPath) {
      getJSON(categoryPath, (err, json) => {
        if (err) {
          console.error(err)
          return
        }

        this.categories[categoryName] = json
      })
    },
    loadCategories: function () {
      // load categories json
      this.categories = {}
      for (let i = 0; i < this.$props.category_files.length; ++i) {
        this.loadOneCategory(this.categoryNames[i], this.$props.category_files[i])
      }
    },
    selectCategory: function (categoryIndex) {
      this.categoryChosen = categoryIndex
    },
    loadAll: function () {
      const carouselElement = $('#' + this.editionSelectorId)

      if (carouselElement.length === 0) {
        setTimeout(this.loadAll, 100)
        return
      }

      carouselElement.owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        responsiveClass: true,
        autoHeight: false,
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          600: {
            items: 3
          },
          1000: {
            items: 6
          }
        },
        onInitialized: addDotButtonLabel
      })

      this.loadCategories()
    }
  },
  updated: function () {
    if (this.carouselLoaded) return
    this.carouselLoaded = true
  },
  mounted: function () {
    setTimeout(this.loadAll, 0)
  }
})
