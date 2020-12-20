/* global Vue, getJSON */
/* eslint no-multi-str: 0 */

Vue.component('edition-gallery', {
  props: ['edition', 'base_url', 'category_files'],
  template: '<div>\
      <h2 class="display-4 m-4 text-center" v-text="titleText"></h2>\
      <category-slider \
        :edition="this.$props.edition" \
        :category_file_names="categoryFileNames" \
        :category_names="categoryNames" \
        :on_item_click="selectCategory">\
        </category-slider>\
        <texture-viewer \
          :base_url="base_url"\
          :initial_category_opened="categoryChosen" \
          :categories="categories" \
          :modal_opened="textureViewerOpened" \
          :close_on_click="triggerModal">\
        </texture-viewer>\
      </div>\
    </div>',
  data () {
    return {
      categoryChosen: 0,
      categories: {},
      textureViewerOpened: false
    }
  },
  computed: {
    categoryFileNames: function () {
      return this.$props.category_files.map(el => this.toCategoryFileName(el))
    },
    categoryNames: function () {
      return this.categoryFileNames.map(el => el.replace(/_/g, ' '))
    },
    titleText: function () {
      const nameCapitalized = this.$props.edition.charAt(0).toUpperCase() + this.$props.edition.slice(1)
      return nameCapitalized + ' Edition'
    }
  },
  methods: {
    toCategoryFileName: function (path) {
      const c = path.split('/').pop().replace('.json', '')

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
      this.textureViewerOpened = true
    },
    triggerModal: function () {
      this.textureViewerOpened = !this.textureViewerOpened
    }
  },
  created: function () {
    this.loadCategories()
  }
})
