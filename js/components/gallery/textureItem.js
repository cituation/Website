/* global Vue */

Vue.component('texture-item', {
  props: {
    file: {
      type: String,
      required: true
    }
  },
  template:
  `<template v-if="this.$props.display_as_list">
    <li class="texture-item" v-text="fileName"></div>
  </template><template v-else>
    <li class="texture-card">
      <img :src="this.$props.file" :alt="fileName" />
      <div class="texture-title" v-text="fileName"></div>
  </template>`,
  computed: {
    fileName: function () {
      const arr = this.$props.file.split('/')
      arr.reverse()
      return arr.pop()
    }
  }
})
