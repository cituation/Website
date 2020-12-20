/* global Vue, location */

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#main',
  data: {
    git_base_urls: {
      java: 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/master/Jappa/1.16.2%20-%201.16.4/assets',
      bedrock: 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/master/Jappa/1.16.2%20-%201.16.4/assets',
      dungeons: 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/master/Jappa/1.16.2%20-%201.16.4/assets'
    }
  }
})
