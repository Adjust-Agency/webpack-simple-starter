require('../stylus/main.styl')

var template = require('../pug/section.pug')

console.log(template({
	label: "Google",
	url: "https://www.google.com"
}))