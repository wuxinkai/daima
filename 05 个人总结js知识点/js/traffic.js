var T, baidu = T = baidu || {version: "1.5.2.1"};
baidu.guid = "$BAIDU$";
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {global: {}};
baidu.lang = baidu.lang || {};
baidu.lang.isString = function (a) {
    return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.lang.inherits = function (i, f, d) {
    var c, g, a = i.prototype, b = new Function();
    b.prototype = f.prototype;
    g = i.prototype = new b();
    for (c in a) {
        g[c] = a[c]
    }
    i.prototype.constructor = i;
    i.superClass = f.prototype;
    typeof d == "string" && (g.__type = d);
    i.extend = function (k) {
        for (var j in k) {
            g[j] = k[j]
        }
        return i
    };
    return i
};
baidu.inherits = baidu.lang.inherits;
baidu.dom = baidu.dom || {};
baidu.dom.g = function (a) {
    if (!a) {
        return null
    }
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.event = baidu.event || {};
baidu.event._listeners = baidu.event._listeners || [];
baidu.dom._g = function (a) {
    if (baidu.lang.isString(a)) {
        return document.getElementById(a)
    }
    return a
};
baidu._g = baidu.dom._g;
baidu.event.on = function (b, f, i) {
    f = f.replace(/^on/i, "");
    b = baidu.dom._g(b);
    var g = function (k) {
        i.call(b, k)
    }, a = baidu.event._listeners, d = baidu.event._eventFilter, j, c = f;
    f = f.toLowerCase();
    if (d && d[f]) {
        j = d[f](b, f, g);
        c = j.type;
        g = j.listener
    }
    if (b.addEventListener) {
        b.addEventListener(c, g, false)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, g)
        }
    }
    a[a.length] = [b, f, i, g, c];
    return b
};
baidu.on = baidu.event.on;
baidu.event.un = function (c, g, b) {
    c = baidu.dom._g(c);
    g = g.replace(/^on/i, "").toLowerCase();
    var k = baidu.event._listeners, d = k.length, f = !b, j, i, a;
    while (d--) {
        j = k[d];
        if (j[1] === g && j[0] === c && (f || j[2] === b)) {
            i = j[4];
            a = j[3];
            if (c.removeEventListener) {
                c.removeEventListener(i, a, false)
            } else {
                if (c.detachEvent) {
                    c.detachEvent("on" + i, a)
                }
            }
            k.splice(d, 1)
        }
    }
    return c
};
baidu.un = baidu.event.un;
baidu.sio = baidu.sio || {};
baidu.sio._createScriptTag = function (b, a, c) {
    b.setAttribute("type", "text/javascript");
    c && b.setAttribute("charset", c);
    b.setAttribute("src", a);
    document.getElementsByTagName("head")[0].appendChild(b)
};
baidu.sio._removeScriptTag = function (b) {
    if (b.clearAttributes) {
        b.clearAttributes()
    } else {
        for (var a in b) {
            if (b.hasOwnProperty(a)) {
                delete b[a]
            }
        }
    }
    if (b && b.parentNode) {
        b.parentNode.removeChild(b)
    }
    b = null
};
baidu.sio.callByBrowser = function (a, i, k) {
    var d = document.createElement("SCRIPT"), f = 0, l = k || {}, c = l.charset, j = i || function () {
    }, g = l.timeOut || 0, b;
    d.onload = d.onreadystatechange = function () {
        if (f) {
            return
        }
        var m = d.readyState;
        if ("undefined" == typeof m || m == "loaded" || m == "complete") {
            f = 1;
            try {
                j();
                clearTimeout(b)
            } finally {
                d.onload = d.onreadystatechange = null;
                baidu.sio._removeScriptTag(d)
            }
        }
    };
    if (g) {
        b = setTimeout(function () {
            d.onload = d.onreadystatechange = null;
            baidu.sio._removeScriptTag(d);
            l.onfailure && l.onfailure()
        }, g)
    }
    baidu.sio._createScriptTag(d, a, c)
};
baidu.object = baidu.object || {};
baidu.extend = baidu.object.extend = function (c, a) {
    for (var b in a) {
        if (a.hasOwnProperty(b)) {
            c[b] = a[b]
        }
    }
    return c
};
baidu.browser = baidu.browser || {};
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"]) : undefined;
baidu.array = baidu.array || {};
baidu.array.remove = function (c, b) {
    var a = c.length;
    while (a--) {
        if (a in c && c[a] === b) {
            c.splice(a, 1)
        }
    }
    return c
};
baidu.lang = baidu.lang || {};
baidu.lang.isArray = function (a) {
    return "[object Array]" == Object.prototype.toString.call(a)
};
baidu.lang.isFunction = function (a) {
    return "[object Function]" == Object.prototype.toString.call(a)
};
baidu.lang.toArray = function (b) {
    if (b === null || b === undefined) {
        return []
    }
    if (baidu.lang.isArray(b)) {
        return b
    }
    if (typeof b.length !== "number" || typeof b === "string" || baidu.lang.isFunction(b)) {
        return [b]
    }
    if (b.item) {
        var a = b.length, c = new Array(a);
        while (a--) {
            c[a] = b[a]
        }
        return c
    }
    return [].slice.call(b)
};
var Fe = Fe || {
    version: "20080809", emptyFn: function () {
    }
};
Fe.Ajax = function (b) {
    this.url = "";
    this.data = "";
    this.async = true;
    this.duration = -1;
    this.overtime = false;
    this.username = "";
    this.password = "";
    this.method = "GET";
    if (typeof b == "object" && b) {
        for (var a in b) {
            this[a] = b[a]
        }
    }
};
(function () {
    Fe.Ajax.prototype.request = function (d, l) {
        var j = this, g = b(), m = g.xhr;
        g.active = true;
        j.url = d;
        if (typeof l == "string" && l) {
            j.data = l
        }
        if (typeof j.onexecute == "function") {
            j.onexecute(m)
        }
        try {
            if (!j.username) {
                m.open(j.method, j.url, j.async)
            } else {
                m.open(j.method, j.url, j.async, j.username, j.password)
            }
            if (j.async) {
                m.onreadystatechange = i
            }
            if (j.method.toUpperCase() == "POST") {
                m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            }
            j.beginTime = new Date().getTime();
            if (j.duration > 0) {
                k()
            }
            m.send(j.data)
        } catch (f) {
            if (typeof j.onerror == "function") {
                j.onerror(f)
            }
        }
        if (!j.async) {
            i()
        }

        function i() {
            if (m.readyState == 4) {
                try {
                    m.status
                } catch (n) {
                    if (typeof j.ondisconnect == "function") {
                        j.ondisconnect(m)
                    }
                    g.active = false;
                    return
                }
                j.duration = -1;
                if (!j.overtime) {
                    if (typeof j["on" + m.status] == "function") {
                        j["on" + m.status](m)
                    }
                    if (m.status == 200 && m.statusText.toLowerCase() == "ok") {
                        if (typeof j.onsuccess == "function") {
                            j.onsuccess(m)
                        }
                    } else {
                        if (typeof j.onfailure == "function") {
                            j.onfailure(m)
                        }
                    }
                }
                g.active = false;
                m.onreadystatechange = function () {
                }
            }
        }

        function k() {
            if (j.duration == -1) {
                return
            }
            if (new Date().getTime() - j.beginTime > j.duration) {
                j.duration = -1;
                try {
                    m.abort()
                } catch (n) {
                }
                j.overtime = true;
                g.active = false;
                if (typeof j.ontimeout == "function") {
                    j.ontimeout(m)
                }
            }
            setTimeout(function () {
                k()
            }, 10)
        }
    };
    var c = [];

    function b() {
        var g = c;
        for (var f = null, d = 0; d < g.length; d++) {
            f = g[d];
            if (!f.active) {
                break
            }
        }
        if (d >= g.length) {
            f = {active: false, xhr: a()};
            g[g.length] = f
        }
        return f
    }

    function a() {
        if (window.XMLHttpRequest) {
            var g = new XMLHttpRequest();
            Fe.on(window, "onunload", function () {
                g.abort()
            });
            return g
        } else {
            if (window.ActiveXObject) {
                var j = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "Msxml2.XMLHTTP", "MSXML.XMLHttp", "Microsoft.XMLHTTP"];
                for (var f = 0; j[f]; f++) {
                    try {
                        var g = new ActiveXObject(j[f]);
                        Fe.on(window, "onunload", function () {
                            g.abort()
                        });
                        return g
                    } catch (d) {
                    }
                }
                throw new Error("Your browser do not support XMLHttp")
            }
        }
    }
})();
Fe.Ajax.get = function (a, b) {
    return this.request(a, b)
};
Fe.Ajax.request = function (b, c, a) {
    if (typeof c == "object" && c) {
        a = c;
        c = null
    } else {
        if (typeof c == "function") {
            a = a || {};
            a.onsuccess = c;
            c = null
        }
    }
    var d = new Fe.Ajax(a);
    d.request(b, c);
    return d
};
(function () {
    Fe._log = [];
    var a = 0;
    var b = {};
    Fe.BaseClass = function (c) {
        b[(this.hashCode = (c || Fe.BaseClass.guid()))] = this
    };
    Fe.BaseClass.guid = function () {
        return "mz_" + (a++).toString(36)
    };
    Fe.BaseClass.create = function () {
        var d = new Fe.BaseClass();
        d.decontrol();
        return d
    };
    window.Instance = Fe.instance = Fe.I = function (c) {
        return b[c]
    };
    Fe.BaseClass.prototype.dispose = function () {
        if (this.hashCode) {
            delete b[this.hashCode]
        }
        for (var c in this) {
            if (typeof this[c] != "function") {
                delete this[c]
            }
        }
    };
    Fe.BaseClass.prototype.getHashCode = function () {
        if (!this.hashCode) {
            b[(this.hashCode = Fe.BaseClass.guid())] = this
        }
        return this.hashCode
    };
    Fe.BaseClass.prototype.decontrol = function () {
        delete b[this.hashCode]
    };
    Fe.BaseClass.prototype.toString = function () {
        return "[object " + (this._className || "Object") + "]"
    };
    Fe.BaseClass.prototype._wlog = function (d, f) {
        var c = Fe._log;
        if (c.length > 100) {
            c.reverse().length = 50;
            c.reverse()
        }
        c[c.length] = "[" + d + "][" + (this._className || "Object") + " " + this.hashCode + "] " + f
    }
})();
Function.prototype.inherits = function (c, b) {
    var a, d, g = this.prototype, f = function () {
    };
    f.prototype = c.prototype;
    d = this.prototype = new f();
    if (typeof(b) == "string") {
        d._className = b
    }
    for (a in g) {
        d[a] = g[a]
    }
    this.prototype.constructor = g.constructor;
    g = f = null;
    return d
};
Fe.Browser = (function () {
    var c = navigator.userAgent;
    var i = 0, a = 0, g = 0, f = 0;
    var d = 0, j = 0, b = 0;
    if (typeof(window.opera) == "object" && /Opera(\s|\/)(\d+(\.\d+)?)/.test(c)) {
        a = parseFloat(RegExp.$2)
    } else {
        if (/MSIE (\d+(\.\d+)?)/.test(c)) {
            i = parseFloat(RegExp.$1)
        } else {
            if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(c)) {
                f = parseFloat(RegExp.$2)
            } else {
                if (navigator.vendor == "Netscape" && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(c)) {
                    b = parseFloat(RegExp.$2)
                } else {
                    if (c.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(c)) {
                        g = parseFloat(RegExp.$1)
                    }
                }
            }
        }
    }
    if (c.indexOf("Gecko") > -1 && c.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(c)) {
        j = parseFloat(RegExp.$1)
    }
    return {ie: i, firefox: f, gecko: j, netscape: b, opera: a, safari: g}
})();
window.FeBrowser = Fe.Browser;
Fe.copy = function (b) {
    var a = Fe.copy._node;
    if (!a) {
        a = Fe.copy._node = document.createElement("DIV");
        a.style.position = "absolute";
        a.style.top = "-1000px";
        a.style.left = "-1000px";
        document.body.appendChild(a)
    }
    a.innerHTML = ["<embed ", 'src="img/clipboard.swf" ', 'FlashVars="clipboard=', encodeURIComponent(String(b)), '" ', 'width="0" ', 'height="0" ', 'type="application/x-shockwave-flash"></embed>'].join("")
};
Fe.G = function () {
    for (var b = [], c = arguments.length - 1; c > -1; c--) {
        var d = arguments[c];
        b[c] = null;
        if (typeof d == "object" && d && d.dom) {
            b[c] = d.dom
        } else {
            if ((typeof d == "object" && d && d.tagName) || d == window || d == document) {
                b[c] = d
            } else {
                if (typeof d == "string" && (d = document.getElementById(d))) {
                    b[c] = d
                }
            }
        }
    }
    return b.length < 2 ? b[0] : b
};
try {
    if (typeof(HTMLElement) != "undefined" && !window.opera) {
        HTMLElement.prototype.__defineGetter__("children", function () {
            for (var c = [], d = 0, g, f = 0, b = this.childNodes.length; f < b; f++) {
                g = this.childNodes[f];
                if (g.nodeType == 1) {
                    c[d++] = g;
                    if (g.name) {
                        if (!c[g.name]) {
                            c[g.name] = []
                        }
                        c[g.name][c[g.name].length] = g
                    }
                    if (g.id) {
                        c[g.id] = g
                    }
                }
            }
            return c
        })
    }
} catch (e) {
}
Fe.ac = function (a, b) {
    if (!(a = this.G(a))) {
        return
    }
    b = this.trim(b);
    if (!new RegExp("(^| )" + b.replace(/(\W)/g, "\\$1") + "( |$)").test(a.className)) {
        a.className = a.className.split(/\s+/).concat(b).join(" ")
    }
};
Fe.addClassName = Fe.ac;
Fe.extend = function (g, d) {
    if (g && d && typeof(d) == "object") {
        for (var f in d) {
            g[f] = d[f]
        }
        var c = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
        for (var a = 0, b; a < c.length; a++) {
            b = c[a];
            if (Object.prototype.hasOwnProperty.call(d, b)) {
                g[b] = d[b]
            }
        }
    }
    return g
};
Fe.on = function (c, b, a) {
    if (!(c = Fe.G(c))) {
        return c
    }
    b = b.replace(/^on/, "").toLowerCase();
    if (c.attachEvent) {
        c[b + a] = function () {
            a.call(c, window.event)
        };
        c.attachEvent("on" + b, c[b + a])
    } else {
        c.addEventListener(b, a, false)
    }
    return c
};
Fe.un = function (c, b, a) {
    if (!(c = Fe.G(c))) {
        return c
    }
    b = b.replace(/^on/, "").toLowerCase();
    if (c.attachEvent) {
        c.detachEvent("on" + b, c[b + a]);
        c[b + a] = null
    } else {
        c.removeEventListener(b, a, false)
    }
    return c
};
Fe.rc = function (a, b) {
    if (!(a = this.G(a))) {
        return
    }
    b = this.trim(b);
    var d = a.className.replace(new RegExp("(^| +)" + b.replace(/(\W)/g, "\\$1") + "( +|$)", "g"), "$2");
    if (a.className != d) {
        a.className = d
    }
};
Fe.removeClassName = Fe.rc;
Fe.trim = function (a) {
    return a.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
Fe.copy = function (b) {
    var a = Fe.copy._node;
    if (!a) {
        a = Fe.copy._node = document.createElement("DIV");
        a.style.position = "absolute";
        a.style.top = "-1000px";
        a.style.left = "-1000px";
        document.body.appendChild(a)
    }
    a.innerHTML = ["<embed ", 'src="img/clipboard.swf" ', 'FlashVars="clipboard=', encodeURIComponent(String(b)), '" ', 'width="0" ', 'height="0" ', 'type="application/x-shockwave-flash"></embed>'].join("")
};
Fe.Array = {};
Fe.Array.indexOf = function (d, a, b) {
    var c = d.length, f = Number(b) || 0;
    f = (f < 0) ? Math.ceil(f) : Math.floor(f);
    if (f < 0) {
        f += c
    }
    for (; f < c; f++) {
        if (f in d && d[f] === a) {
            return f
        }
    }
    return -1
};
Fe.Array.contains = function (a, b) {
    return Fe.Array.indexOf(a, b) >= 0
};
Fe.Array.unique = function (b) {
    var c = [];
    for (var a = 0; a < b.length; a++) {
        if (!Fe.Array.contains(c, b[a])) {
            c.push(b[a])
        }
    }
    return c
};
Fe.Cookie = function (b) {
    var a = "";
    b = b || {};
    if (/https?:\/\/[^\/]+([^\?]+)/i.test(location.href)) {
        a = RegExp.$1
    }
    this.path = (b.path || a || "/").replace(/(\/)[^\/]*$/, "$1");
    this.expires = b.expires || "";
    this.domain = b.domain || document.domain || "";
    this.secure = b.secure || ""
};
Fe.Cookie.set = function (c, d, a) {
    if (/;=/g.test(c)) {
        throw new Error('Invalid cookie name "' + c + '"')
    }
    if (/;/g.test(d)) {
        throw new Error('Invalid cookie value "' + d + '"')
    }
    var b = new Fe.Cookie(a);
    b.set(c, d);
    return b
};
Fe.Cookie.prototype.set = function (b, c) {
    var a = new Date();
    if (typeof(this.expires) == "number") {
        a.setTime(a.getTime() + this.expires)
    }
    document.cookie = b + "=" + escape(c) + ";expires=" + a.toGMTString() + ";path=" + this.path + (this.domain == "" ? "" : ("; domain=" + this.domain)) + (this.secure ? "; secure" : "")
};
Fe.Cookie.add = function (a, b, c) {
    return Fe.Cookie.set(a, b, c)
};
Fe.Cookie.remove = function (a) {
    return Fe.Cookie.set(a, "", {expires: -1 * 57005 * 57005})
};
Fe.Cookie.get = function (b) {
    var c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
    var a = document.cookie.match(c);
    if (a) {
        return unescape(a[2])
    }
    return null
};
Fe.getByteLength = function (a) {
    return a.replace(/[^\x00-\xff]/g, "mm").length
};
Fe.subByte = function (m, c, j) {
    if (Fe.getByteLength(m) <= c) {
        return m
    }
    var o, n, k, d;
    for (var g = Math.floor(c / 2) - 1, f = m.length; g < f; g++) {
        o = m.substr(0, g);
        k = Fe.getByteLength(o);
        if (k == c) {
            if (j) {
                o += j
            }
            return o
        } else {
            n = m.substr(0, g + 1);
            d = Fe.getByteLength(n);
            if (k < c && d > c) {
                if (j) {
                    o += j
                }
                return o
            }
        }
    }
    return m
};
var POPUP_ANCHOR_MAP_CENTER = 1;

function Popup(a) {
    Fe.BaseClass.call(this);
    this.visible = false;
    this.config = a;
    if (!this.config) {
        return
    }
    this.config.addDom = this.config.addDom ? T.g(this.config.addDom) : document.body;
    if (a.clickClose != null && a.clickClose == false) {
        this.config.clickClose = false
    } else {
        this.config.clickClose = true
    }
    this.connectDom = new Array()
}

Fe.extend(Popup.prototype, {
    render: function () {
        var b = this.config;
        this.main = beforeEndHTML(b.addDom, '<div class="map_popup" style="width:390px;display:none"></div>');
        var a = this.popBox = beforeEndHTML(this.main, '<div class="popup_main"></div>');
        if (b.isTitle != false) {
            this.title = beforeEndHTML(a, '<div class="title">系统信息</div>')
        }
        this.content = beforeEndHTML(a, '<div class="content"></div>');
        if (!!this.config.closeButton) {
            this.button = beforeEndHTML(a, this.config.closeButton)
        } else {
            this.button = beforeEndHTML(a, '<button id="popup_close" title="关闭"></button>')
        }
        this.shadow = beforeEndHTML(this.main, '<div class="poput_shadow"></div>');
        this.addConnectDom(this.main);
        this.initialize()
    }, initialize: function () {
        var b = this.config;
        this.setTitle(b.title);
        this.setContent(b.content);
        this.setWidth(b.width);
        this.setHeight(b.height);
        this.show();
        var c = this;
        var a = function (g) {
            var d = g.srcElement || g.target;
            while (d) {
                var j = c.connectDom;
                for (var f = 0; f < j.length; f++) {
                    if (d == j[f]) {
                        return
                    }
                }
                if (d == document.body) {
                    c.close();
                    return
                }
                d = d.parentNode
            }
        };
        if (this.config.clickClose) {
            T.on(document.body, "mousedown", a)
        }
        T.on(this.button, "click", function (d) {
            if (c.config.clickClose) {
                T.un(document.body, "mousedown", a)
            }
            if (c.config.closeEffect && typeof(c.config.closeEffect) == "function") {
                c.config.closeEffect()
            } else {
                c.main.parentNode.removeChild(c.main)
            }
            c.visible = false;
            if (c.config.close && typeof(c.config.close) == "function") {
                c.config.close()
            }
            if (this.resizeTimer) {
                window.clearInterval(this.resizeTimer);
                this.resizeTimer = null
            }
            if (T.g("imgLogo")) {
                T.g("imgLogo").style.display = "";
                T.g("imgLogo").style.display = "inline"
            }
        });
        if (b.open && typeof(b.open) == "function") {
            b.open()
        }
        this.setPosition()
    }, setPosition: function () {
        switch (this.config.defaultAnchor) {
            case POPUP_ANCHOR_MAP_CENTER:
                this.updatePos();
                break
        }
    }, setTitle: function (a) {
        if (a && this.title) {
            this.title.innerHTML = a;
            this.config.title = a
        }
    }, setContent: function (a) {
        if (a) {
            if (typeof(a) == "string") {
                this.content.innerHTML = a
            } else {
                this.content.innerHTML = "";
                this.content.appendChild(a)
            }
            this.config.content = a
        }
    }, setWidth: function (a) {
        if (a) {
            this.main.style.width = (a - 8) + "px";
            this.config.width = a
        }
    }, setHeight: function (a) {
        if (this.resizeTimer) {
            window.clearInterval(this.resizeTimer);
            this.resizeTimer = null
        }
        if (a) {
            this.main.style.height = this.shadow.style.height = (a - 9) + "px";
            this.config.height = a;
            if (this.config.isTitle == false) {
                this.content.style.height = (a - 2) + "px"
            } else {
                this.content.style.height = (a - 24 - 9) + "px"
            }
            this.content.style.overflowY = "auto"
        } else {
            this.content.style.height = "auto";
            this.resize()
        }
    }, hide: function () {
        this.main.style.display = "none";
        this.visible = false
    }, show: function () {
        this.main.style.display = "block";
        this.popBox.scrollTop = 0;
        this.visible = true
    }, getDom: function () {
        return this.main
    }, resize: function () {
        var a = this;
        var b = function () {
            if (a.config.isAddBottomHeight == false) {
                var c = a.content.offsetHeight
            } else {
                var c = a.content.offsetHeight + 24
            }
            if (a.mainHeight) {
                if (a.mainHeight != c) {
                    a.mainHeight = c
                }
            }
            a.popBox.style.height = a.shadow.style.height = a.main.style.height = c + "px";
            a.popBox.scrollTop = 0
        };
        if (this.resizeTimer) {
            window.clearInterval(this.resizeTimer);
            this.resizeTimer = null
        }
        this.resizeTimer = window.setInterval(b, 50)
    }, updatePos: function () {
        var b = this.main, d = this.config, g = map.getSize(), i = d.offset || [], f = i[0] || 0, c = i[1] || 0,
            a = g.width <= d.width ? 0 : g.width / 2 - d.width / 2,
            j = g.height <= d.height ? 0 : g.height / 2 - d.height / 2;
        if (d && typeof d.right != "undefined") {
            b.style.right = d.right + f + "px"
        } else {
            if (d && typeof d.left != "undefined") {
                b.style.left = d.left + f + "px"
            } else {
                b.style.left = a + f + "px"
            }
        }
        if (d && typeof d.top != "undefined") {
            b.style.top = d.top + c + "px"
        } else {
            if (d && typeof d.bottom != "undefined") {
                b.style.top = d.bottom + c + "px"
            } else {
                b.style.top = j + c + "px"
            }
        }
    }, close: function () {
        this.button.click()
    }, addConnectDom: function (a) {
        this.connectDom.push(a)
    }
});
window.FeBrowser = Fe.Browser;

function scriptRequest(url, echo, id, charset) {
    var isIe = /msie/i.test(window.navigator.userAgent);
    if (isIe && Fe.G("_script_" + id)) {
        var script = Fe.G("_script_" + id)
    } else {
        if (Fe.G("_script_" + id)) {
            Fe.G("_script_" + id).parentNode.removeChild(Fe.G("_script_" + id))
        }
        var script = document.createElement("script");
        if (charset != null) {
            script.charset = charset
        }
        if (id != null && id != "") {
            script.setAttribute("id", "_script_" + id)
        }
        script.setAttribute("type", "text/javascript");
        document.body.appendChild(script)
    }
    var t = new Date();
    if (url.indexOf("?") > -1) {
        url += "&t=" + t.getTime()
    } else {
        url += "?t=" + t.getTime()
    }
    var _complete = function () {
        if (script.readyState == "loaded" || !script.readyState) {
            if (typeof(echo) == "function") {
                echo()
            } else {
                eval(echo)
            }
        }
    };
    if (isIe) {
        script.onreadystatechange = _complete
    } else {
        script.onload = _complete
    }
    script.setAttribute("src", url)
}

Component = function (a) {
    a = a || {};
    for (var b in a) {
        this[b] = a[b]
    }
    this.renderTo.innerHTML = this.render();
    this.initialize()
};

function beforeEndHTML(b, a) {
    b.insertAdjacentHTML("beforeEnd", a);
    return b.lastChild
}

function jsonToQuery(a, c) {
    var b = [];
    c = c || function (g) {
        return g
    };
    for (var f in a) {
        var d = a[f];
        if (d != "" && d != null && typeof(d) != "undefined") {
            b.push(f + "=" + c(d))
        }
    }
    return b.join("&")
}

function getClientSize() {
    var b = h = 0;
    if (window.innerHeight) {
        b = window.innerWidth;
        h = window.innerHeight
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            b = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight
        } else {
            b = document.body.clientWidth;
            h = document.body.clientHeight
        }
    }
    return {width: b, height: h}
}

function getParam(a) {
    if (a.indexOf("?") > -1) {
        var d = a.slice(a.indexOf("?") + 1)
    } else {
        if (a.indexOf("#") > -1) {
            var d = a.slice(a.indexOf("#") + 1)
        } else {
            return
        }
    }
    if (d == "") {
        return
    }
    var g = {};
    var f = d.split("&");
    for (var b = 0; b < f.length; b++) {
        var c = f[b].split("=");
        g[c[0]] = c[1]
    }
    return g
}

(function () {
    var b = "/fwmap/zt/traffic/天气预报.html?city=";
    var a = {
        beijing: {
            point: {x: 116.389645, y: 39.915986},
            fullPt: {x: 116.39737, y: 39.946316},
            level: 12,
            cityName: "beijing",
            titleName: "北京",
            shareUrl: b + "beijing",
            pre: 1
        },
        shanghai: {
            point: {x: 121.487899, y: 31.249162},
            fullPt: {x: 121.541018, y: 31.292355},
            level: 12,
            cityName: "shanghai",
            titleName: "上海",
            shareUrl: b + "shanghai",
            pre: 1
        },
        guangzhou: {
            point: {x: 113.30765, y: 23.120049},
            fullPt: {x: 113.329497, y: 23.215408},
            level: 12,
            cityName: "guangzhou",
            titleName: "广州",
            shareUrl: b + "guangzhou",
            pre: 1
        },
        hangzhou: {
            point: {x: 120.162027, y: 30.279019},
            level: 12,
            cityName: "hangzhou",
            titleName: "杭州",
            shareUrl: b + "hangzhou",
            pre: 1
        },
        changchun: {
            point: {x: 125.331177, y: 43.892609},
            level: 12,
            cityName: "changchun",
            titleName: "长春",
            shareUrl: b + "changchun",
            pre: 0
        },
        shenyang: {
            point: {x: 123.43978, y: 41.808954},
            level: 12,
            cityName: "shenyang",
            titleName: "沈阳",
            shareUrl: b + "shenyang",
            pre: 0
        },
        dalian: {
            point: {x: 121.650404, y: 38.927423},
            level: 12,
            cityName: "dalian",
            titleName: "大连",
            shareUrl: b + "dalian",
            pre: 1
        },
        tianjin: {
            point: {x: 117.218395, y: 39.144154},
            level: 12,
            cityName: "tianjin",
            titleName: "天津",
            shareUrl: b + "tianjin",
            pre: 1
        },
        qingdao: {
            point: {x: 120.383458, y: 36.093433},
            level: 12,
            cityName: "qingdao",
            titleName: "青岛",
            shareUrl: b + "qingdao",
            pre: 0
        },
        wulumuqi: {
            point: {x: 87.614107, y: 43.809825},
            level: 12,
            cityName: "wulumuqi",
            titleName: "乌鲁木齐",
            shareUrl: b + "wulumuqi",
            pre: 0
        },
        chengdu: {
            point: {x: 104.072217, y: 30.663449},
            level: 12,
            cityName: "chengdu",
            titleName: "成都",
            shareUrl: b + "chengdu",
            pre: 1
        },
        chongqing: {
            point: {x: 106.554925, y: 29.55931},
            level: 12,
            cityName: "chongqing",
            titleName: "重庆",
            shareUrl: b + "chongqing",
            pre: 1
        },
        shijiazhuang: {
            point: {x: 114.520501, y: 38.048731},
            level: 12,
            cityName: "shijiazhuang",
            titleName: "石家庄",
            shareUrl: b + "shijiazhuang",
            pre: 1
        },
        nanjing: {
            point: {x: 118.790614, y: 32.04799},
            level: 12,
            cityName: "nanjing",
            titleName: "南京",
            shareUrl: b + "nanjing",
            pre: 1
        },
        nanchang: {
            point: {x: 115.915734, y: 28.681022},
            level: 12,
            cityName: "nanchang",
            titleName: "南昌",
            shareUrl: b + "nanchang",
            pre: 1
        },
        wenzhou: {
            point: {x: 120.669615, y: 28.025799},
            level: 12,
            cityName: "wenzhou",
            titleName: "温州",
            shareUrl: b + "wenzhou",
            pre: 0
        },
        wuxi: {
            point: {x: 120.311313, y: 31.587203},
            level: 12,
            cityName: "wuxi",
            titleName: "无锡",
            shareUrl: b + "wuxi",
            pre: 0
        },
        jinhua: {
            point: {x: 119.650276, y: 29.094693},
            level: 12,
            cityName: "jinhua",
            titleName: "金华",
            shareUrl: b + "jinhua",
            pre: 0
        },
        taizhou: {
            point: {x: 121.427183, y: 28.662337},
            level: 12,
            cityName: "taizhou",
            titleName: "台州",
            shareUrl: b + "taizhou",
            pre: 0
        },
        changzhou: {
            point: {x: 119.980999, y: 31.816083},
            level: 12,
            cityName: "changzhou",
            titleName: "常州",
            shareUrl: b + "changzhou",
            pre: 1
        },
        wuhan: {
            point: {x: 114.343796, y: 30.550983},
            level: 12,
            cityName: "wuhan",
            titleName: "武汉",
            shareUrl: b + "wuhan",
            pre: 1
        },
        changsha: {
            point: {x: 113.019956, y: 28.200681},
            level: 12,
            cityName: "changsha",
            titleName: "长沙",
            shareUrl: b + "changsha",
            pre: 1
        },
        ningbo: {
            point: {x: 121.56528, y: 29.878307},
            level: 12,
            cityName: "ningbo",
            titleName: "宁波",
            shareUrl: b + "ningbo",
            pre: 1
        },
        fuzhou: {
            point: {x: 119.303362, y: 26.080652},
            level: 12,
            cityName: "fuzhou",
            titleName: "福州",
            shareUrl: b + "fuzhou",
            pre: 1
        },
        xiamen: {
            point: {x: 118.140465, y: 24.508302},
            level: 12,
            cityName: "xiamen",
            titleName: "厦门",
            shareUrl: b + "xiamen",
            pre: 0
        },
        quanzhou: {
            point: {x: 118.61283, y: 24.908305},
            level: 12,
            cityName: "quanzhou",
            titleName: "泉州",
            shareUrl: b + "quanzhou",
            pre: 0
        },
        dongguan: {
            point: {x: 113.75826, y: 23.026728},
            level: 12,
            cityName: "dongguan",
            titleName: "东莞",
            shareUrl: b + "dongguan",
            pre: 0
        },
        foshan: {
            point: {x: 113.128448, y: 23.027703},
            level: 12,
            cityName: "foshan",
            titleName: "佛山",
            shareUrl: b + "foshan",
            pre: 0
        },
        zhuhai: {
            point: {x: 113.5558, y: 22.262334},
            level: 12,
            cityName: "zhuhai",
            titleName: "珠海",
            shareUrl: b + "zhuhai",
            pre: 0
        },
        zhongshan: {
            point: {x: 113.39892, y: 22.522612},
            level: 12,
            cityName: "zhongshan",
            titleName: "中山",
            shareUrl: b + "zhongshan",
            pre: 0
        },
        shenzhen: {
            point: {x: 114.065967, y: 22.574123},
            fullPt: {x: 113.994354, y: 22.613329},
            level: 12,
            cityName: "shenzhen",
            titleName: "深圳",
            shareUrl: b + "shenzhen",
            pre: 1
        }
    };
    window.trafficCfg = a
})();

function SelectCity(a) {
    Component.apply(this, arguments)
}

T.lang.inherits(SelectCity, Component, "SelectCity");
T.object.extend(SelectCity.prototype, {
    cityData: [{cname: "北京", name: "beijing"}, {
        cname: "上海",
        name: "shanghai"
    }, {cname: "广州", name: "guangzhou"}, {cname: "杭州", name: "hangzhou"}, {cname: "长春", name: "changchun"}, {
        cname: "沈阳",
        name: "shenyang"
    }, {cname: "大连", name: "dalian"}, {cname: "天津", name: "tianjin"}, {cname: "青岛", name: "qingdao"}, {
        cname: "成都",
        name: "chengdu"
    }, {cname: "重庆", name: "chongqing"}, {cname: "南京", name: "nanjing"}, {cname: "南昌", name: "nanchang"}, {
        cname: "温州",
        name: "wenzhou"
    }, {cname: "无锡", name: "wuxi"}, {cname: "金华", name: "jinhua"}, {cname: "台州", name: "taizhou"}, {
        cname: "常州",
        name: "changzhou"
    }, {cname: "武汉", name: "wuhan"}, {cname: "长沙", name: "changsha"}, {cname: "宁波", name: "ningbo"}, {
        cname: "福州",
        name: "fuzhou"
    }, {cname: "厦门", name: "xiamen"}, {cname: "泉州", name: "quanzhou"}, {cname: "东莞", name: "dongguan"}, {
        cname: "佛山",
        name: "foshan"
    }, {cname: "珠海", name: "zhuhai"}, {cname: "中山", name: "zhongshan"}, {cname: "深圳", name: "shenzhen"}, {
        cname: "石家庄",
        name: "shijiazhuang"
    }, {cname: "乌鲁木齐", name: "wulumuqi"}], render: function (d, c) {
        var a = window.cityConfig.titleName || "北京";
        var b = '<div id="curCity">当前城市：' + a + "</div>";
        var f = this.getCityList();
        d = b + f + "</div>";
        return d
    }, initialize: function () {
    }, getCityList: function () {
        var b = ['<div class="city_cont">'], d = null, c = "";
        for (var a = 0, f = this.cityData.length; a < f; a++) {
            d = this.cityData[a];
            c = '<a href="javascript:void(0)" cname="' + d.cname + '" name="' + d.name + '" onclick="window.selectCity.selCity(\'' + d.name + "');return false;\">" + d.cname + "</a>";
            b.push(c)
        }
        b.push("</div>");
        return b.join("")
    }, selCity: function (b) {
        var a = window.trafficCfg;
        if (!b || !a[b]) {
            return
        }
        cityConfig = a[b] || cityConfig;
        window.location.search = "?city=" + b;
        setPrecBtnStatus()
    }, switchCity: function (b) {
        var d = {qt: "cur", wd: encodeURIComponent(b), cb: "getCurCityCallback", url: "http://map.baidu.com"};
        var c = "http://map.baidu.com/maps/services/get_proxy?";
        var a = c + jsonToQuery(d);
        T.sio.callByBrowser(a)
    }
});

function getCurCityCallback(a) {
}

var fullScrollMap = fullScrollMap || 0;

function setCfgInfoByUrl() {
    var a = getParam(location.href);
    if (a && a.city && window.trafficCfg) {
        cityConfig = window.trafficCfg[a.city] || cityConfig
    }
    document.title = "百度地图-" + cityConfig.titleName + "地区实时路况"
}

var cityConfig = {
    point: {x: 113.1002, y: 41.0392},
    level: 12,
    cityName: "beijing",
    titleName: "集宁",
    shareUrl: "/fwmap/zt/traffic/天气预报.html?city=wulanchabu",
    pre: 1
};
var temp = {};
setCfgInfoByUrl();

function init() {
    createInitMap();
    if (fullScrollMap) {
        setMapContentStyle();
        setMapContentClient()
    }
    initControl();
    initEvent();
    if (!fullScrollMap) {
        getTrafficTime()
    }
    setCurCityName();
    setPrecBtnStatus()
}

function setMapContentClient() {
    var d = T.g("mapContenter");
    var f = getClientSize().width;
    var g = getClientSize().height - 97;
    d.style.width = f + "px";
    d.style.height = g + "px"
}

function setMapContentStyle() {
    var b = T.g("mapContenter");
    b.style.marginTop = "0px";
    b.style.border = "0"
}

function createInitMap() {
    var b = new BMap.Map("mapContenter");
    var c = cityConfig.point;
    var a = new BMap.Point(c.x, c.y);
    b.setCenter(a);
    b.enableScrollWheelZoom();
    b.centerAndZoom(cityConfig.titleName, cityConfig.level);
    window.map = b
}

function initControl() {
    var c = new BMapLib.TrafficControl();
    temp.traffic = c;
    c.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
    c.setOffset(new BMap.Size(-100, -100));
    map.addControl(c);
    c.show();
    temp.traffic.popDom = T.g("tcWrap");
    T.g("tcViewPrediction").onclick = function () {
        T.g("tcUpdate").style.display != "none" ? T.g("tcUpdate").style.display = "none" : null;
        setTimeout(function () {
            T.g("tcUpdate").style.display != "none" ? T.g("tcUpdate").style.display = "none" : null
        }, 1)
    };
    changeTrafficCtrl();
    if (!fullScrollMap) {
        hideTrafficCtrl()
    }
    if (!fullScrollMap) {
        var b = new fullScreenCtrl();
        map.addControl(b)
    }
    var a = BMAP_NAVIGATION_CONTROL_ZOOM;
    if (fullScrollMap) {
        a = BMAP_NAVIGATION_CONTROL_LARGE
    }
    var d = new BMap.NavigationControl({type: a});
    map.addControl(d);
    temp.navCtl = d
}

function initEvent() {
    if (!fullScrollMap) {
        map.addEventListener("load", hideTrafficCtrl);
        map.addEventListener("zoomstart", hideTrafficCtrl);
        map.addEventListener("zoomend", hideTrafficCtrl)
    } else {
        map.addEventListener("load", changeTrafficCtrl);
        map.addEventListener("zoomstart", changeTrafficCtrl);
        map.addEventListener("zoomend", changeTrafficCtrl);
        window.onresize = setMapContentClient
    }
}

function hideTrafficCtrl() {
    var b = null;
    var a = function () {
        temp.traffic.popDom.style.display = "none"
    };
    if (temp.traffic.popDom && T.g("tcClose")) {
        a()
    } else {
        b = setInterval(a, 1)
    }
}

function changeTrafficCtrl() {
    var b = null;
    var a = function () {
        if (b) {
            clearInterval(b)
        }
        temp.traffic.popDom.style.top = "10px";
        temp.traffic.popDom.style.right = "10px";
        T.g("tcUpdate").style.display = "none";
        T.g("tcClose").style.display = "none";
        T.g("tcTitle").style.backgroundPosition = "155px -85px"
    };
    if (temp.traffic.popDom && T.g("tcClose")) {
        a()
    } else {
        b = setInterval(a, 1)
    }
}

function fullScreenCtrl() {
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(10, 10)
}

fullScreenCtrl.prototype = new BMap.Control();
fullScreenCtrl.prototype.initialize = function () {
    var a = "http://" + window.location.host + cityConfig.shareUrl;
    var b = document.createElement("div");
    var c = '<div style="width:51px;height:20px;background:url(img/bgs.gif)"><a href="' + a + '" target="_blank" style="display:block;width:100%;height:20px;" onclick ="this.blur()"></a></div>';
    b.innerHTML = c;
    map.getContainer().appendChild(b);
    return b
};

function getTrafficTime() {
    scriptRequest("http://its.map.baidu.com:8002/traffic/GetCurrentTime?callback=setTrafficTime", null, "traffic", "utf-8");
    setTimeout(getTrafficTime, 3000 * 60)
}

function setTrafficTime(b) {
    var a = new Date(b) || new Date();
    var c = T.g("trafficTime");
    if (c) {
        c.innerHTML = (a.getHours() < 10 ? ("0" + a.getHours()) : a.getHours()) + ":" + (a.getMinutes() < 10 ? ("0" + a.getMinutes()) : a.getMinutes())
    }
}

function getCurrentCityName() {
    var a = map.getZoom();
    var c;
    var j = 10000;
    if (a <= 7) {
        c = a;
        setCurrentMapInfo("全国");
        return
    }
    var k = function () {
        var m = map.getBounds();
        var n = m.getSouthWest();
        var l = m.getNorthEast();
        console.log(n);
        var o = function (q) {
            return parseInt(q / 1000) * 1000
        };
        return o(n.lng) + "," + o(n.lat) + ";" + o(l.lng) + "," + o(l.lat)
    };
    var f = getCurrentCityName.eP || map.getCenter();
    var d = getCurrentCityName.eP = map.getCenter();
    var g = Math.sqrt((f.lng - d.lng) * (f.lng - d.lng) + (f.lat - d.lat) * (f.lat - d.lat));
    if (g > j || a != c) {
        c = a;
        var b = "http://map.baidu.com/?newmap=1&qt=cen&b=" + k() + "&l=" + a;
        scriptRequest(b, i, "_MAP_CENTER_", "gbk")
    }

    function i() {
        if (typeof _mapCenter == "undefined") {
            return
        }
        var l = _mapCenter;
        var m = l.content;
        if (!m) {
            return
        }
        console.log(m)
    }
}

function selectSubCity(f, d) {
    var b = {
        title: "城市列表",
        content: "",
        height: 195,
        width: 340,
        left: "50px",
        top: "95px",
        clickClose: true,
        close: function () {
            if (window.cityPop) {
                window.cityPop = null
            }
        }
    };
    var a = window.cityPop = new Popup(b);
    a.render();
    a.hide();
    var c = a.getDom();
    c.style.left = "50px";
    c.style.top = "95px";
    window.selectCity = new SelectCity({renderTo: a.content});
    a.show();
    setCurCityName()
}

function setCurCityName() {
    var b = window.cityConfig.titleName, a = T.g("toolCurCity"), c = T.g("curCity");
    if (c) {
        c.innerHTML = "当前城市：" + b
    }
    if (a) {
        a.innerHTML = b + "市"
    }
}

function setPrecBtnStatus() {
    var b = window.cityConfig.pre || 0, a = T.g("tcViewPrediction");
    if (a) {
        a.style.display = (b == 1 ? "block" : "none")
    }
};