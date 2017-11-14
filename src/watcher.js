// 订阅者
function Watcher(vue, expOrFn, cb) {
    this.cb = cb;
    this.vue = vue;
    this.expOrFn = expOrFn;
    this.depIds = {};

    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        this.getter = this.parseGetter(expOrFn);
    }

    this.value = this.get();
}

Watcher.prototype = {
	get: function() {
        Dep.target = this;
        var value = this.getter.call(this.vue, this.vue);
        Dep.target = null;
        return value;
    },	
	parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 

        var exps = exp.split('.');

        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
}