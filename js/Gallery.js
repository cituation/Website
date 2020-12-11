Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({
	el: '#main',
	textures: [
		{ img: '<img src="" alt="404">' }
	],
	type: {
		java: 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/master/Jappa/1.17/assets'
	},
	methods: {
		loadTextures: function(path, textureType) {

			var githubURL = type.textureType

			getJSON(path, (err, json) => {
        if (err) {
          console.error(err)
          return
        }

        for (var i in json) {
        	main.textures.push(githubURL + json[i])
        }
      });
			
		}
	}
})