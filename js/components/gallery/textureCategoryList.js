/* global Vue */

Vue.component('texture-category-list', {
  props: {
    base_url: {
      type: String,
      required: true
    },
    category_name: {
      type: String,
      required: true
    },
    category_files: {
      type: Array,
      required: true
    },
    on_item_click: {
      type: Function,
      required: true
    },
    category_opened: {
      type: Boolean,
      default: false
    }
  },
  template:
  `<div id="texture-list">
    <div v-on:click="this.$props.category_opened = !this.$props.category_opened">
      <h5 class="d-inline-block">{{ this.$props.category_name }} </h5> <span v-html="categoryChevron"></span>
    </div>
    <ul v-show="this.$props.category_opened">
      <texture-item v-for="file in this.$props.category_files" :key="file" :file="filePath(file)" v-on:click="on_item_click"></texture-item>
    </ul>
  </div>`,
  computed: {
    categoryChevron: function () {
      return this.categoryOpened ? '<i class="fas fa-chevron-up"></i>' : '<i class="fas fa-chevron-down"></i>'
    }
  },
  methods: {
    filePath: function (file) {
      return this.$props.base_url + file
    }
  }
})
