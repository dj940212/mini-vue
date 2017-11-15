function Vue(options) {
	this.$options = options || {}
	var data = this._data = this.$options.data
	var me = this

    // 实现 vm.xxx -> vm._data.xxx
	Object.keys(data).forEach(function(key) {
		me._proxyData(key)
	})

	observe(data, this)
}

Vue.prototype = {
	// 数据代理
	_proxyData: function(key, setter, getter) {
		var me = this;
		setter = setter || 
		Object.defineProperty(me, key, {
			configurable: false,
			enumerable: true,
			get: function proxyGetter() {
				return me._data[key]
			},
			set: function proxySetter(newVal) {
				me._data[key] = newVal
			}
		})
	}
}

var vue = new Vue({data: {a:1,b:2,c:3}})

console.log(vue)