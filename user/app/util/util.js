
export  function serialize (obj, prefix) {
	var str = [];
	for(var p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
			str.push(typeof v === 'object' ?
serialize(v, k) :
encodeURIComponent(k) + '=' + encodeURIComponent(v));
		}
	}
	return str.join('&');
}


export function kfetch (url, optionsInit) {

	let init = Object.assign ({}, {credentials:'include'}, optionsInit);
	return fetch(url, init);
}