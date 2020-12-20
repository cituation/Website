/* global Vue */

Vue.component('texture-viewer', {
  props: {
    base_url: {
      type: String,
      required: true
    },
    initial_category_opened: {
      type: Number,
      required: true
    },
    categories: {
      type: Object,
      required: true
    },
    modal_opened: {
      type: Boolean,
      required: true
    },
    close_on_click: {
      type: Function,
      required: true
    }
  },
  template:
  `<custom-modal :modalOpened="this.$props.modal_opened" :closeOnClick="this.$props.close_on_click" contentId="texture-viewer">
    <div id="textures-layout" class="d-flex justify-content-center row">
      <div id="preview-area" class="col-sm-12 col-md-5">
        <span class="height"></span><div>
          <img src="theImage" alt="theImage" />
        </div>
      </div><div id="categories" class="col-sm-2 col-md-7 d-flex flex-column align-items-stretch">
        <h4>Categories</h4>
        <div id="texture-categories" style="flex: 1 1 auto">
          <texture-category-list
            v-for="(categoryFiles, categoryName, index) in this.$props.categories"
            :base_url="baseURL"
            :key="categoryName"
            :category_name="categoryName"
            :category_files="categoryFiles"
            :category_opened="categoryIsOpened(index)" >
          </texture-category-list>
        </div>
      </div>
    </div>
  </custom-modal>`,
  computed: {
    baseURL: function () {
      return this.$props.base_url
    }
  },
  methods: {
    categoryIsOpened: function (index) {
      return this.$props.initial_category_opened === index
    }
  }
})
