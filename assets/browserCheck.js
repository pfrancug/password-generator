const ua = window.navigator.userAgent

function detectIE() {
	const msie = ua.indexOf('MSIE ')
	if (msie > 0) {
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
	}
	const trident = ua.indexOf('Trident/')
	if (trident > 0) {
		const rv = ua.indexOf('rv:')
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
	}
	const edge = ua.indexOf('Edge/')
	if (edge > 0) {
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
	}
	return false
}

const version = detectIE()

const pushAlert = function (version) {
	document.querySelector('#main').innerHTML =
		'<div class="jumbotron col-12 my-4 text-center">' +
		'<p class="h3 brand">Twoja przęglądarka "' + version + '" nie jest wspierana :(</p>' +
		'<samp class="">Sugerowane przeglądarki: Chrome / Firefox</samp></div>'
}

if (version >= 12) {
	pushAlert('Edge ' + version)
} else if (version > 0) {
	pushAlert('IE ' + version)
}