// 观察者
function Observer(data) {
	this.data = data
	this.walk(data)
}

function observe(value, vue) {
	if (!value || typeof value !== 'object') {
		return
	}

	return new Observer(value)
}

Observer.prototype = {
	walk: function(data) {
		var me = this
		Object.keys(data).forEach(function(key) {
			me.convert(key, data[key])
		})
	},
	convert: function(key, val) {
		this.defineReactive(this.data, key, val)
	},
	defineReactive: function(data, key, val) {
		var dep = new Dep();
		// 监听子对象属性值
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
	}
}

var uid = 0;

// 订阅器
function Dep() {
	this.id = uid++
	this.subs = []
}

Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub)
	},
	// 通知订阅者
	notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}