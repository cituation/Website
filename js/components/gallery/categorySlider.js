/* global Vue, $, addDotButtonLabel */
/* eslint no-multi-str: 0 */

Vue.component('category-slider', {
  props: ['edition', 'category_file_names', 'category_names', 'on_item_click'],
  template: '<div :id="editionSelectorId" class="owl-carousel owl-theme gallery-selector card">\
    <div v-for="(categoryName, index) in category_names" :key="index" class="item card clickable" v-on:click.prevent="on_item_click(index)">\
      <div class="image-square-container">\
        <img class="fill-image" :src="\'/image/gallery/\' + edition + \'/\' + category_file_names[index] + \'.png\'" :alt="categoryName"/>\
        <img src="/image/gallery/bedrock/colormap.png" style="opacity: 0;" alt="square_bg">\
      </div>\
      <h5 class="card-title text-center" v-text="categoryName"></h5>\
    </div>',
  computed: {
    editionSelectorId: function () {
      return this.$props.edition + '-selector'
    }
  },
  methods: {
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
    }
  },
  created: function () {
    this.loadAll()
  }
})
