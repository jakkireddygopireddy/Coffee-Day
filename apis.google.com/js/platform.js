var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var n, aa = function(a) {
            var b = 0;
            return function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            }
        },
        ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a
        },
        ca = function(a) {
            a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                if (c && c.Math == Math) return c
            }
            throw Error("Cannot find global object");
        },
        da = ca(this),
        ha = function(a, b) {
            if (b) a: {
                var c = da;a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c)) break a;
                    c = c[e]
                }
                a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
        };
    ha("Symbol", function(a) {
        if (a) return a;
        var b = function(f, g) {
            this.ca = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        };
        b.prototype.toString = function() {
            return this.ca
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            d = 0,
            e = function(f) {
                if (this instanceof e) throw new TypeError("Symbol is not a constructor");
                return new b(c + (f || "") + "_" + d++, f)
            };
        return e
    });
    ha("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = da[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ia(aa(this))
                }
            })
        }
        return a
    });
    var ia = function(a) {
            a = {
                next: a
            };
            a[Symbol.iterator] = function() {
                return this
            };
            return a
        },
        ja = function(a, b) {
            a instanceof String && (a += "");
            var c = 0,
                d = !1,
                e = {
                    next: function() {
                        if (!d && c < a.length) {
                            var f = c++;
                            return {
                                value: b(f, a[f]),
                                done: !1
                            }
                        }
                        d = !0;
                        return {
                            done: !0,
                            value: void 0
                        }
                    }
                };
            e[Symbol.iterator] = function() {
                return e
            };
            return e
        };
    ha("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ja(this, function(b) {
                return b
            })
        }
    });
    var q = this || self,
        ka = function(a) {
            var b = typeof a;
            return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
        },
        la = function(a) {
            var b = ka(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        ma = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        na = "closure_uid_" + (1E9 * Math.random() >>> 0),
        oa = 0,
        pa = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        qa = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(e, d);
                    return a.apply(b, e)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        ra = function(a, b, c) {
            ra = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? pa : qa;
            return ra.apply(null, arguments)
        },
        sa = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.pa = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.B = function(d, e, f) {
                for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
                return b.prototype[e].apply(d,
                    g)
            }
        },
        ta = function(a) {
            return a
        },
        ua = function(a) {
            var b = null,
                c = q.trustedTypes;
            if (!c || !c.createPolicy) return b;
            try {
                b = c.createPolicy(a, {
                    createHTML: ta,
                    createScript: ta,
                    createScriptURL: ta
                })
            } catch (d) {
                q.console && q.console.error(d.message)
            }
            return b
        };

    function r(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, r);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    }
    sa(r, Error);
    r.prototype.name = "CustomError";
    var va;
    var wa = function(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        r.call(this, c + a[d])
    };
    sa(wa, r);
    wa.prototype.name = "AssertionError";
    var xa = function(a, b, c, d) {
            var e = "Assertion failed";
            if (c) {
                e += ": " + c;
                var f = d
            } else a && (e += ": " + a, f = b);
            throw new wa("" + e, f || []);
        },
        w = function(a, b, c) {
            a || xa("", null, b, Array.prototype.slice.call(arguments, 2));
            return a
        },
        ya = function(a, b) {
            throw new wa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
        },
        za = function(a, b, c) {
            "string" !== typeof a && xa("Expected string but got %s: %s.", [ka(a), a], b, Array.prototype.slice.call(arguments, 2))
        };
    var Aa = Array.prototype.forEach ? function(a, b) {
        w(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    };

    function Ba(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    function Da(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    };
    var Ea;
    var x = function(a, b) {
        this.S = a === Fa && b || "";
        this.da = Ga
    };
    x.prototype.F = !0;
    x.prototype.D = function() {
        return this.S
    };
    x.prototype.toString = function() {
        return "Const{" + this.S + "}"
    };
    var Ha = function(a) {
            if (a instanceof x && a.constructor === x && a.da === Ga) return a.S;
            ya("expected object of type Const, got '" + a + "'");
            return "type_error:Const"
        },
        Ga = {},
        Fa = {};
    var z = function(a, b) {
        this.P = b === Ia ? a : ""
    };
    z.prototype.F = !0;
    z.prototype.D = function() {
        return this.P.toString()
    };
    z.prototype.toString = function() {
        return this.P.toString()
    };
    var Ja = function(a) {
            if (a instanceof z && a.constructor === z) return a.P;
            ya("expected object of type SafeUrl, got '" + a + "' of type " + ka(a));
            return "type_error:SafeUrl"
        },
        Ka = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        La = function(a) {
            if (a instanceof z) return a;
            a = "object" == typeof a && a.F ? a.D() : String(a);
            w(Ka.test(a), "%s does not match the safe URL pattern", a) || (a = "about:invalid#zClosurez");
            return new z(a, Ia)
        },
        Ia = {};
    var Ma = {},
        Na = function(a, b, c) {
            this.O = c === Ma ? a : "";
            this.F = !0
        };
    Na.prototype.D = function() {
        return this.O.toString()
    };
    Na.prototype.toString = function() {
        return this.O.toString()
    };
    var Oa = function(a, b) {
        a: {
            try {
                var c = a && a.ownerDocument,
                    d = c && (c.defaultView || c.parentWindow);
                d = d || q;
                if (d.Element && d.Location) {
                    var e = d;
                    break a
                }
            } catch (g) {}
            e = null
        }
        if (e && "undefined" != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element))) {
            if (ma(a)) try {
                var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
            } catch (g) {
                f = "<object could not be stringified>"
            } else f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
            ya("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
                b, f)
        }
        return a
    };
    var Qa = function(a, b) {
            Da(b, function(c, d) {
                c && "object" == typeof c && c.F && (c = c.D());
                "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Pa.hasOwnProperty(d) ? a.setAttribute(Pa[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
            })
        },
        Pa = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        },
        Ra = function(a, b, c, d) {
            function e(h) {
                h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
            }
            for (; d < c.length; d++) {
                var f = c[d];
                if (!la(f) || ma(f) && 0 < f.nodeType) e(f);
                else {
                    a: {
                        if (f && "number" == typeof f.length) {
                            if (ma(f)) {
                                var g = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" === typeof f) {
                                g = "function" == typeof f.item;
                                break a
                            }
                        }
                        g = !1
                    }
                    Aa(g ? Ba(f) : f, e)
                }
            }
        },
        Sa = function(a, b) {
            b = String(b);
            "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
            return a.createElement(b)
        },
        Ta =
        function(a) {
            w(a, "Node cannot be null or undefined.");
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Ua = function(a) {
            this.C = a || q.document || document
        };
    n = Ua.prototype;
    n.getElementsByTagName = function(a, b) {
        return (b || this.C).getElementsByTagName(String(a))
    };
    n.ga = function(a, b, c) {
        var d = this.C,
            e = arguments,
            f = e[1],
            g = Sa(d, String(e[0]));
        f && ("string" === typeof f ? g.className = f : Array.isArray(f) ? g.className = f.join(" ") : Qa(g, f));
        2 < e.length && Ra(d, g, e, 2);
        return g
    };
    n.createElement = function(a) {
        return Sa(this.C, a)
    };
    n.createTextNode = function(a) {
        return this.C.createTextNode(String(a))
    };
    n.appendChild = function(a, b) {
        w(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
        a.appendChild(b)
    };
    n.append = function(a, b) {
        Ra(Ta(a), a, arguments, 1)
    };
    n.canHaveChildren = function(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    n.removeNode = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    n.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    var A = window,
        B = document,
        Va = A.location,
        Wa = function() {},
        Xa = /\[native code\]/,
        C = function(a, b, c) {
            return a[b] = a[b] || c
        },
        Ya = function(a) {
            for (var b = 0; b < this.length; b++)
                if (this[b] === a) return b;
            return -1
        },
        $a = function(a) {
            a = a.sort();
            for (var b = [], c = void 0, d = 0; d < a.length; d++) {
                var e = a[d];
                e != c && b.push(e);
                c = e
            }
            return b
        },
        ab = /&/g,
        bb = /</g,
        cb = />/g,
        db = /"/g,
        eb = /'/g,
        fb = function(a) {
            return String(a).replace(ab, "&amp;").replace(bb, "&lt;").replace(cb, "&gt;").replace(db, "&quot;").replace(eb, "&#39;")
        },
        D = function() {
            var a;
            if ((a = Object.create) &&
                Xa.test(a)) a = a(null);
            else {
                a = {};
                for (var b in a) a[b] = void 0
            }
            return a
        },
        E = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        gb = function(a) {
            if (Xa.test(Object.keys)) return Object.keys(a);
            var b = [],
                c;
            for (c in a) E(a, c) && b.push(c);
            return b
        },
        F = function(a, b) {
            a = a || {};
            for (var c in a) E(a, c) && (b[c] = a[c])
        },
        hb = function(a) {
            return function() {
                A.setTimeout(a, 0)
            }
        },
        G = function(a, b) {
            if (!a) throw Error(b || "");
        },
        H = C(A, "gapi", {});
    var J = function(a, b, c) {
            var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
            b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
            if (a = a && (d.exec(a) || b.exec(a))) try {
                c = decodeURIComponent(a[2])
            } catch (e) {}
            return c
        },
        ib = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source),
        jb = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
        kb = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
            "g"),
        lb = /%([a-f]|[0-9a-fA-F][a-f])/g,
        mb = /^(https?|ftp|file|chrome-extension):$/i,
        nb = function(a) {
            a = String(a);
            a = a.replace(jb, function(e) {
                try {
                    return encodeURIComponent(e)
                } catch (f) {
                    return encodeURIComponent(e.replace(/^[^%]+$/g, "\ufffd"))
                }
            }).replace(kb, function(e) {
                return e.replace(/%/g, "%25")
            }).replace(lb, function(e) {
                return e.toUpperCase()
            });
            a = a.match(ib) || [];
            var b = D(),
                c = function(e) {
                    return e.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g,
                        "%7D")
                },
                d = !!(a[1] || "").match(mb);
            b.B = c((a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : "")));
            d = function(e) {
                return c(e.replace(/\?/g, "%3F").replace(/#/g, "%23"))
            };
            b.query = a[5] ? [d(a[5])] : [];
            b.j = a[7] ? [d(a[7])] : [];
            return b
        },
        ob = function(a) {
            return a.B + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.j.length ? "#" + a.j.join("&") : "")
        },
        pb = function(a, b) {
            var c = [];
            if (a)
                for (var d in a)
                    if (E(a, d) && null != a[d]) {
                        var e = b ? b(a[d]) : a[d];
                        c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
                    }
            return c
        },
        qb = function(a, b, c, d) {
            a = nb(a);
            a.query.push.apply(a.query, pb(b, d));
            a.j.push.apply(a.j, pb(c, d));
            return ob(a)
        },
        rb = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i"),
        sb = function(a, b) {
            var c = nb(b);
            b = c.B;
            c.query.length && (b += "?" + c.query.join(""));
            c.j.length && (b += "#" + c.j.join(""));
            var d = "";
            2E3 < b.length && (d = b, b = b.substr(0, 2E3), b = b.replace(rb, ""), d = d.substr(b.length));
            var e = a.createElement("div");
            a = a.createElement("a");
            c = nb(b);
            b = c.B;
            c.query.length && (b += "?" + c.query.join(""));
            c.j.length && (b += "#" + c.j.join(""));
            b = new z(b, Ia);
            Oa(a, "HTMLAnchorElement");
            b = b instanceof z ? b : La(b);
            a.href = Ja(b);
            e.appendChild(a);
            b = e.innerHTML;
            c = new x(Fa, "Assignment to self.");
            za(Ha(c), "must provide justification");
            w(!/^[\s\xa0]*$/.test(Ha(c)), "must provide non-empty justification");
            void 0 === Ea && (Ea = ua("gapi#html"));
            b = (c = Ea) ? c.createHTML(b) : b;
            b = new Na(b, null, Ma);
            if (null !== e && void 0 !== e.tagName) {
                if ("script" === e.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeScript.");
                if ("style" === e.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeStyleSheet.");
            }
            b instanceof Na && b.constructor === Na ? b = b.O : (ya("expected object of type SafeHtml, got '" + b + "' of type " + ka(b)), b = "type_error:SafeHtml");
            e.innerHTML = b;
            b = String(e.firstChild.href);
            e.parentNode && e.parentNode.removeChild(e);
            c = nb(b + d);
            d = c.B;
            c.query.length && (d += "?" + c.query.join(""));
            c.j.length && (d += "#" + c.j.join(""));
            return d
        },
        tb = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    var ub;
    var vb = function(a, b, c, d) {
            if (A[c + "EventListener"]) A[c + "EventListener"](a, b, !1);
            else if (A[d + "tachEvent"]) A[d + "tachEvent"]("on" + a, b)
        },
        wb = function() {
            var a = B.readyState;
            return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
        },
        zb = function(a) {
            var b = xb;
            if (!wb()) try {
                b()
            } catch (c) {}
            yb(a)
        },
        yb = function(a) {
            if (wb()) a();
            else {
                var b = !1,
                    c = function() {
                        if (!b) return b = !0, a.apply(this, arguments)
                    };
                A.addEventListener ? (A.addEventListener("load", c, !1), A.addEventListener("DOMContentLoaded", c, !1)) : A.attachEvent &&
                    (A.attachEvent("onreadystatechange", function() {
                        wb() && c.apply(this, arguments)
                    }), A.attachEvent("onload", c))
            }
        },
        Ab = function(a) {
            for (; a.firstChild;) a.removeChild(a.firstChild)
        },
        Bb = {
            button: !0,
            div: !0,
            span: !0
        };
    var L;
    L = C(A, "___jsl", D());
    C(L, "I", 0);
    C(L, "hel", 10);
    var Cb = function(a) {
            return L.dpo ? L.h : J(a, "jsh", L.h)
        },
        Db = function(a) {
            var b = C(L, "sws", []);
            b.push.apply(b, a)
        },
        Eb = function(a) {
            return C(L, "watt", D())[a]
        },
        Fb = function(a) {
            var b = C(L, "PQ", []);
            L.PQ = [];
            var c = b.length;
            if (0 === c) a();
            else
                for (var d = 0, e = function() {
                        ++d === c && a()
                    }, f = 0; f < c; f++) b[f](e)
        },
        Gb = function(a) {
            return C(C(L, "H", D()), a, D())
        };
    var Hb = C(L, "perf", D()),
        Ib = C(Hb, "g", D()),
        Jb = C(Hb, "i", D());
    C(Hb, "r", []);
    D();
    D();
    var Kb = function(a, b, c) {
            var d = Hb.r;
            "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
        },
        M = function(a, b, c) {
            Ib[a] = !b && Ib[a] || c || (new Date).getTime();
            Kb(a)
        },
        Mb = function(a, b, c) {
            b && 0 < b.length && (b = Lb(b), c && 0 < c.length && (b += "___" + Lb(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = C(Jb, "_p", D()), C(b, c, D())[a] = (new Date).getTime(), Kb(a, "_p", c))
        },
        Lb = function(a) {
            return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/,/g, "_")
        };
    var Nb = D(),
        Ob = [],
        N = function(a) {
            throw Error("Bad hint" + (a ? ": " + a : ""));
        };
    Ob.push(["jsl", function(a) {
        for (var b in a)
            if (E(a, b)) {
                var c = a[b];
                "object" == typeof c ? L[b] = C(L, b, []).concat(c) : C(L, b, c)
            }
        if (b = a.u) a = C(L, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
    }]);
    var Pb = /^(\/[a-zA-Z0-9_\-]+)+$/,
        Qb = [/\/amp\//, /\/amp$/, /^\/amp$/],
        Rb = /^[a-zA-Z0-9\-_\.,!]+$/,
        Sb = /^gapi\.loaded_[0-9]+$/,
        Tb = /^[a-zA-Z0-9,._-]+$/,
        Xb = function(a, b, c, d, e) {
            var f = a.split(";"),
                g = f.shift(),
                h = Nb[g],
                k = null;
            h ? k = h(f, b, c, d) : N("no hint processor for: " + g);
            k || N("failed to generate load url");
            b = k;
            c = b.match(Ub);
            (d = b.match(Vb)) && 1 === d.length && Wb.test(b) && c && 1 === c.length || N("failed sanity: " + a);
            try {
                if (e && 0 < e.length) {
                    b = a = 0;
                    for (c = {}; b < e.length;) {
                        var l = e[b++];
                        d = void 0;
                        d = ma(l) ? "o" + (Object.prototype.hasOwnProperty.call(l,
                            na) && l[na] || (l[na] = ++oa)) : (typeof l).charAt(0) + l;
                        Object.prototype.hasOwnProperty.call(c, d) || (c[d] = !0, e[a++] = l)
                    }
                    e.length = a;
                    k = k + "?le=" + e.join(",")
                }
            } catch (m) {}
            return k
        },
        $b = function(a, b, c, d) {
            a = Yb(a);
            Sb.test(c) || N("invalid_callback");
            b = Zb(b);
            d = d && d.length ? Zb(d) : null;
            var e = function(f) {
                return encodeURIComponent(f).replace(/%2C/g, ",")
            };
            return [encodeURIComponent(a.pathPrefix).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.U ? "/am=" + e(a.U) : "",
                a.$ ? "/rs=" + e(a.$) : "", a.ba ? "/t=" + e(a.ba) : "", "/cb=", e(c)
            ].join("")
        },
        Yb = function(a) {
            "/" !== a.charAt(0) && N("relative path");
            for (var b = a.substring(1).split("/"), c = []; b.length;) {
                a = b.shift();
                if (!a.length || 0 == a.indexOf(".")) N("empty/relative directory");
                else if (0 < a.indexOf("=")) {
                    b.unshift(a);
                    break
                }
                c.push(a)
            }
            a = {};
            for (var d = 0, e = b.length; d < e; ++d) {
                var f = b[d].split("="),
                    g = decodeURIComponent(f[0]),
                    h = decodeURIComponent(f[1]);
                2 == f.length && g && h && (a[g] = a[g] || h)
            }
            b = "/" + c.join("/");
            Pb.test(b) || N("invalid_prefix");
            c = 0;
            for (d = Qb.length; c < d; ++c) Qb[c].test(b) && N("invalid_prefix");
            c = ac(a, "k", !0);
            d = ac(a, "am");
            e = ac(a, "rs");
            a = ac(a, "t");
            return {
                pathPrefix: b,
                version: c,
                U: d,
                $: e,
                ba: a
            }
        },
        Zb = function(a) {
            for (var b = [], c = 0, d = a.length; c < d; ++c) {
                var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
                Tb.test(e) && b.push(e)
            }
            return b.join(",")
        },
        ac = function(a, b, c) {
            a = a[b];
            !a && c && N("missing: " + b);
            if (a) {
                if (Rb.test(a)) return a;
                N("invalid: " + b)
            }
            return null
        },
        Wb = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
        Vb = /\/cb=/g,
        Ub =
        /\/\//g,
        bc = function() {
            var a = Cb(Va.href);
            if (!a) throw Error("Bad hint");
            return a
        };
    Nb.m = function(a, b, c, d) {
        (a = a[0]) || N("missing_hint");
        return "https://apis.google.com" + $b(a, b, c, d)
    };
    var cc = decodeURI("%73cript"),
        dc = /^[-+_0-9\/A-Za-z]+={0,2}$/,
        ec = function(a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var e = a[d];
                e && 0 > Ya.call(b, e) && c.push(e)
            }
            return c
        },
        fc = function() {
            var a = L.nonce;
            return void 0 !== a ? a && a === String(a) && a.match(dc) ? a : L.nonce = null : B.querySelector ? (a = B.querySelector("script[nonce]")) ? (a = a.nonce || a.getAttribute("nonce") || "", a && a === String(a) && a.match(dc) ? L.nonce = a : L.nonce = null) : null : null
        },
        ic = function(a) {
            if ("loading" != B.readyState) gc(a);
            else {
                var b = fc(),
                    c = "";
                null !== b && (c = ' nonce="' +
                    b + '"');
                a = "<" + cc + ' src="' + encodeURI(a) + '"' + c + "></" + cc + ">";
                B.write(hc ? hc.createHTML(a) : a)
            }
        },
        gc = function(a) {
            var b = B.createElement(cc);
            b.setAttribute("src", hc ? hc.createScriptURL(a) : a);
            a = fc();
            null !== a && b.setAttribute("nonce", a);
            b.async = "true";
            (a = B.getElementsByTagName(cc)[0]) ? a.parentNode.insertBefore(b, a): (B.head || B.body || B.documentElement).appendChild(b)
        },
        jc = function(a, b) {
            var c = b && b._c;
            if (c)
                for (var d = 0; d < Ob.length; d++) {
                    var e = Ob[d][0],
                        f = Ob[d][1];
                    f && E(c, e) && f(c[e], a, b)
                }
        },
        lc = function(a, b, c) {
            kc(function() {
                var d =
                    b === Cb(Va.href) ? C(H, "_", D()) : D();
                d = C(Gb(b), "_", d);
                a(d)
            }, c)
        },
        nc = function(a, b) {
            var c = b || {};
            "function" == typeof b && (c = {}, c.callback = b);
            jc(a, c);
            b = [];
            a ? b = a.split(":") : c.features && (b = c.features);
            var d = c.h || bc(),
                e = C(L, "ah", D());
            if (e["::"] && b.length) {
                a = [];
                for (var f = null; f = b.shift();) {
                    var g = f.split(".");
                    g = e[f] || e[g[1] && "ns:" + g[0] || ""] || d;
                    var h = a.length && a[a.length - 1] || null,
                        k = h;
                    h && h.hint == g || (k = {
                        hint: g,
                        features: []
                    }, a.push(k));
                    k.features.push(f)
                }
                var l = a.length;
                if (1 < l) {
                    var m = c.callback;
                    m && (c.callback = function() {
                        0 ==
                            --l && m()
                    })
                }
                for (; b = a.shift();) mc(b.features, c, b.hint)
            } else mc(b || [], c, d)
        },
        mc = function(a, b, c) {
            a = $a(a) || [];
            var d = b.callback,
                e = b.config,
                f = b.timeout,
                g = b.ontimeout,
                h = b.onerror,
                k = void 0;
            "function" == typeof h && (k = h);
            var l = null,
                m = !1;
            if (f && !g || !f && g) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            h = C(Gb(c), "r", []).sort();
            var t = C(Gb(c), "L", []).sort(),
                u = L.le,
                p = [].concat(h),
                I = function(O, ea) {
                    if (m) return 0;
                    A.clearTimeout(l);
                    t.push.apply(t, y);
                    var fa = ((H || {}).config || {}).update;
                    fa ? fa(e) : e && C(L, "cu", []).push(e);
                    if (ea) {
                        Mb("me0", O, p);
                        try {
                            lc(ea, c, k)
                        } finally {
                            Mb("me1", O, p)
                        }
                    }
                    return 1
                };
            0 < f && (l = A.setTimeout(function() {
                m = !0;
                g()
            }, f));
            var y = ec(a, t);
            if (y.length) {
                y = ec(a, h);
                var v = C(L, "CP", []),
                    K = v.length;
                v[K] = function(O) {
                    if (!O) return 0;
                    Mb("ml1", y, p);
                    var ea = function(Ca) {
                            v[K] = null;
                            I(y, O) && Fb(function() {
                                d && d();
                                Ca()
                            })
                        },
                        fa = function() {
                            var Ca = v[K + 1];
                            Ca && Ca()
                        };
                    0 < K && v[K - 1] ? v[K] = function() {
                        ea(fa)
                    } : ea(fa)
                };
                if (y.length) {
                    var Za = "loaded_" + L.I++;
                    H[Za] = function(O) {
                        v[K](O);
                        H[Za] = null
                    };
                    a = Xb(c, y, "gapi." +
                        Za, h, u);
                    h.push.apply(h, y);
                    Mb("ml0", y, p);
                    b.sync || A.___gapisync ? ic(a) : gc(a)
                } else v[K](Wa)
            } else I(y) && d && d()
        },
        hc = ua("gapi#gapi");
    var kc = function(a, b) {
        if (L.hee && 0 < L.hel) try {
            return a()
        } catch (c) {
            b && b(c), L.hel--, nc("debug_error", function() {
                try {
                    window.___jsl.hefn(c)
                } catch (d) {
                    throw c;
                }
            })
        } else try {
            return a()
        } catch (c) {
            throw b && b(c), c;
        }
    };
    H.load = function(a, b) {
        return kc(function() {
            return nc(a, b)
        })
    };
    var oc = function(a) {
            var b = window.___jsl = window.___jsl || {};
            b[a] = b[a] || [];
            return b[a]
        },
        pc = function(a) {
            var b = window.___jsl = window.___jsl || {};
            b.cfg = !a && b.cfg || {};
            return b.cfg
        },
        qc = function(a) {
            return "object" === typeof a && /\[native code\]/.test(a.push)
        },
        P = function(a, b, c) {
            if (b && "object" === typeof b)
                for (var d in b) !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !qc(a[d]) && !qc(b[d]) ? P(a[d], b[d]) : b[d] && "object" ===
                    typeof b[d] ? (a[d] = qc(b[d]) ? [] : {}, P(a[d], b[d])) : a[d] = b[d])
        },
        rc = function(a) {
            if (a && !/^\s+$/.test(a)) {
                for (; 0 == a.charCodeAt(a.length - 1);) a = a.substring(0, a.length - 1);
                try {
                    var b = window.JSON.parse(a)
                } catch (c) {}
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return (" + a + "\n)"))()
                } catch (c) {}
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return ({" + a + "\n})"))()
                } catch (c) {}
                return "object" === typeof b ? b : {}
            }
        },
        sc = function(a, b) {
            var c = {
                ___goc: void 0
            };
            a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length -
                1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
            P(c, b);
            a.push(c)
        },
        tc = function(a) {
            pc(!0);
            var b = window.___gcfg,
                c = oc("cu"),
                d = window.___gu;
            b && b !== d && (sc(c, b), window.___gu = b);
            b = oc("cu");
            var e = document.scripts || document.getElementsByTagName("script") || [];
            d = [];
            var f = [];
            f.push.apply(f, oc("us"));
            for (var g = 0; g < e.length; ++g)
                for (var h = e[g], k = 0; k < f.length; ++k) h.src && 0 == h.src.indexOf(f[k]) && d.push(h);
            0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
            for (e = 0; e < d.length; ++e) d[e].getAttribute("gapi_processed") ||
                (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (g = f.nodeType, f = 3 == g || 4 == g ? f.nodeValue : f.textContent || "") : f = void 0, (f = rc(f)) && b.push(f));
            a && sc(c, a);
            d = oc("cd");
            a = 0;
            for (b = d.length; a < b; ++a) P(pc(), d[a], !0);
            d = oc("ci");
            a = 0;
            for (b = d.length; a < b; ++a) P(pc(), d[a], !0);
            a = 0;
            for (b = c.length; a < b; ++a) P(pc(), c[a], !0)
        },
        Q = function(a) {
            var b = pc();
            if (!a) return b;
            a = a.split("/");
            for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c) b = b[a[c]];
            return c === a.length && void 0 !== b ? b : void 0
        },
        uc = function(a, b) {
            var c;
            if ("string" === typeof a) {
                var d =
                    c = {};
                a = a.split("/");
                for (var e = 0, f = a.length; e < f - 1; ++e) {
                    var g = {};
                    d = d[a[e]] = g
                }
                d[a[e]] = b
            } else c = a;
            tc(c)
        };
    var vc = function() {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), C(L, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    var wc = {
            callback: 1,
            clientid: 1,
            cookiepolicy: 1,
            openidrealm: -1,
            includegrantedscopes: -1,
            requestvisibleactions: 1,
            scope: 1
        },
        xc = !1,
        yc = D(),
        zc = function() {
            if (!xc) {
                for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                    var c = a[b].name.toLowerCase();
                    if (0 == c.lastIndexOf("google-signin-", 0)) {
                        c = c.substring(14);
                        var d = a[b].content;
                        wc[c] && d && (yc[c] = d)
                    }
                }
                if (window.self !== window.top) {
                    a = document.location.toString();
                    for (var e in wc) 0 < wc[e] && (b = J(a, e, "")) && (yc[e] = b)
                }
                xc = !0
            }
            e = D();
            F(yc, e);
            return e
        },
        Ac = function(a) {
            return !!(a.clientid &&
                a.scope && a.callback)
        };
    var Bc = function() {
        this.i = window.console
    };
    Bc.prototype.log = function(a) {
        this.i && this.i.log && this.i.log(a)
    };
    Bc.prototype.error = function(a) {
        this.i && (this.i.error ? this.i.error(a) : this.i.log && this.i.log(a))
    };
    Bc.prototype.warn = function(a) {
        this.i && (this.i.warn ? this.i.warn(a) : this.i.log && this.i.log(a))
    };
    Bc.prototype.debug = function() {};
    var Cc = new Bc;
    var Dc = function() {
            return !!L.oa
        },
        Ec = function() {};
    var R = C(L, "rw", D()),
        Fc = function(a) {
            for (var b in R) a(R[b])
        },
        Gc = function(a, b) {
            (a = R[a]) && a.state < b && (a.state = b)
        };
    var S = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = b.cfg || {};
        b = b.cfg;
        if (!a) return b;
        a = a.split("/");
        for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c) b = b[a[c]];
        return c === a.length && void 0 !== b ? b : void 0
    };
    var Hc = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,
        Ic = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,
        Jc = function(a) {
            var b = S("googleapis.config/sessionIndex");
            "string" === typeof b && 254 < b.length && (b = null);
            null == b && (b = window.__X_GOOG_AUTHUSER);
            "string" === typeof b && 254 < b.length && (b = null);
            if (null == b) {
                var c = window.google;
                c && (b = c.authuser)
            }
            "string" === typeof b && 254 < b.length && (b = null);
            null == b && (a = a || window.location.href, b = J(a, "authuser") ||
                null, null == b && (b = (b = a.match(Hc)) ? b[1] : null));
            if (null == b) return null;
            b = String(b);
            254 < b.length && (b = null);
            return b
        },
        Kc = function(a) {
            var b = S("googleapis.config/sessionDelegate");
            "string" === typeof b && 21 < b.length && (b = null);
            null == b && (b = (a = (a || window.location.href).match(Ic)) ? a[1] : null);
            if (null == b) return null;
            b = String(b);
            21 < b.length && (b = null);
            return b
        };
    var Lc, T, U = void 0,
        V = function(a) {
            try {
                return q.JSON.parse.call(q.JSON, a)
            } catch (b) {
                return !1
            }
        },
        W = function(a) {
            return Object.prototype.toString.call(a)
        },
        Mc = W(0),
        Nc = W(new Date(0)),
        Oc = W(!0),
        Pc = W(""),
        Qc = W({}),
        Rc = W([]),
        X = function(a, b) {
            if (b)
                for (var c = 0, d = b.length; c < d; ++c)
                    if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
            d = typeof a;
            if ("undefined" !== d) {
                c = Array.prototype.slice.call(b || [], 0);
                c[c.length] = a;
                b = [];
                var e = W(a);
                if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a,
                        "toJSON") || (e !== Rc || a.constructor !== Array && a.constructor !== Object) && (e !== Qc || a.constructor !== Array && a.constructor !== Object) && e !== Pc && e !== Mc && e !== Oc && e !== Nc)) return X(a.toJSON.call(a), c);
                if (null == a) b[b.length] = "null";
                else if (e === Mc) a = Number(a), isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"), b[b.length] = String(a);
                else if (e === Oc) b[b.length] = String(!!Number(a));
                else {
                    if (e === Nc) return X(a.toISOString.call(a), c);
                    if (e === Rc && W(a.length) === Mc) {
                        b[b.length] = "[";
                        var f = 0;
                        for (d = Number(a.length) >> 0; f < d; ++f) f &&
                            (b[b.length] = ","), b[b.length] = X(a[f], c) || "null";
                        b[b.length] = "]"
                    } else if (e == Pc && W(a.length) === Mc) {
                        b[b.length] = '"';
                        f = 0;
                        for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f), e = String.prototype.charCodeAt.call(a, f), b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                        b[b.length] = '"'
                    } else if ("object" === d) {
                        b[b.length] = "{";
                        d = 0;
                        for (f in a) Object.prototype.hasOwnProperty.call(a,
                            f) && (e = X(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = X(f), b[b.length] = ":", b[b.length] = e));
                        b[b.length] = "}"
                    } else return
                }
                return b.join("")
            }
        },
        Sc = /[\0-\x07\x0b\x0e-\x1f]/,
        Tc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
        Uc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
        Vc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
        Wc = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
        Xc = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
        Yc = /[ \t\n\r]+/g,
        Zc = /[^"]:/,
        $c = /""/g,
        ad = /true|false|null/g,
        bd = /00/,
        cd = /[\{]([^0\}]|0[^:])/,
        dd = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
        ed = /[^\[,:][\[\{]/,
        fd = /^(\{|\}|\[|\]|,|:|0)+/,
        gd = /\u2028/g,
        hd = /\u2029/g,
        id = function(a) {
            a = String(a);
            if (Sc.test(a) || Tc.test(a) || Uc.test(a) || Vc.test(a)) return !1;
            var b = a.replace(Wc, '""');
            b = b.replace(Xc, "0");
            b = b.replace(Yc, "");
            if (Zc.test(b)) return !1;
            b = b.replace($c, "0");
            b = b.replace(ad, "0");
            if (bd.test(b) || cd.test(b) || dd.test(b) || ed.test(b) || !b || (b = b.replace(fd, ""))) return !1;
            a = a.replace(gd, "\\u2028").replace(hd,
                "\\u2029");
            b = void 0;
            try {
                b = U ? [V(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
            } catch (c) {
                return !1
            }
            return b && 1 === b.length ? b[0] : !1
        },
        jd = function() {
            var a = ((q.document || {}).scripts || []).length;
            if ((void 0 === Lc || void 0 === U || T !== a) && -1 !== T) {
                Lc = U = !1;
                T = -1;
                try {
                    try {
                        U = !!q.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === q.JSON.stringify.call(q.JSON, {
                            a: [3, !0, new Date(0)],
                            c: function() {}
                        }) && !0 === V("true") && 3 === V('[{"a":3}]')[0].a
                    } catch (b) {}
                    Lc = U && !V("[00]") &&
                        !V('"\u0007"') && !V('"\\0"') && !V('"\\v"')
                } finally {
                    T = a
                }
            }
        },
        kd = function(a) {
            if (-1 === T) return !1;
            jd();
            return (Lc ? V : id)(a)
        },
        ld = function(a) {
            if (-1 !== T) return jd(), U ? q.JSON.stringify.call(q.JSON, a) : X(a)
        },
        md = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString(),
        nd = function() {
            var a = Date.prototype.getUTCFullYear.call(this);
            return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 +
                Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T", String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1), "Z"].join("")
        };
    Date.prototype.toISOString = md ? nd : Date.prototype.toISOString;
    var od = function() {
        this.blockSize = -1
    };
    var pd = function() {
        this.blockSize = -1;
        this.blockSize = 64;
        this.g = [];
        this.L = [];
        this.ea = [];
        this.H = [];
        this.H[0] = 128;
        for (var a = 1; a < this.blockSize; ++a) this.H[a] = 0;
        this.J = this.v = 0;
        this.reset()
    };
    sa(pd, od);
    pd.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.g[4] = 3285377520;
        this.J = this.v = 0
    };
    var qd = function(a, b, c) {
        c || (c = 0);
        var d = a.ea;
        if ("string" === typeof b)
            for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.g[0];
        c = a.g[1];
        var g = a.g[2],
            h = a.g[3],
            k = a.g[4];
        for (e = 0; 80 > e; e++) {
            if (40 > e)
                if (20 > e) {
                    f = h ^ c & (g ^ h);
                    var l = 1518500249
                } else f = c ^ g ^ h, l = 1859775393;
            else 60 > e ? (f = c & g | h & (c | g), l = 2400959708) :
                (f = c ^ g ^ h, l = 3395469782);
            f = (b << 5 | b >>> 27) + f + k + l + d[e] & 4294967295;
            k = h;
            h = g;
            g = (c << 30 | c >>> 2) & 4294967295;
            c = b;
            b = f
        }
        a.g[0] = a.g[0] + b & 4294967295;
        a.g[1] = a.g[1] + c & 4294967295;
        a.g[2] = a.g[2] + g & 4294967295;
        a.g[3] = a.g[3] + h & 4294967295;
        a.g[4] = a.g[4] + k & 4294967295
    };
    pd.prototype.update = function(a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.blockSize, d = 0, e = this.L, f = this.v; d < b;) {
                if (0 == f)
                    for (; d <= c;) qd(this, a, d), d += this.blockSize;
                if ("string" === typeof a)
                    for (; d < b;) {
                        if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.blockSize) {
                            qd(this, e);
                            f = 0;
                            break
                        }
                    } else
                        for (; d < b;)
                            if (e[f] = a[d], ++f, ++d, f == this.blockSize) {
                                qd(this, e);
                                f = 0;
                                break
                            }
            }
            this.v = f;
            this.J += b
        }
    };
    pd.prototype.digest = function() {
        var a = [],
            b = 8 * this.J;
        56 > this.v ? this.update(this.H, 56 - this.v) : this.update(this.H, this.blockSize - (this.v - 56));
        for (var c = this.blockSize - 1; 56 <= c; c--) this.L[c] = b & 255, b /= 256;
        qd(this, this.L);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8) a[b] = this.g[c] >> d & 255, ++b;
        return a
    };
    var rd = function() {
        this.R = new pd
    };
    rd.prototype.reset = function() {
        this.R.reset()
    };
    var sd = A.crypto,
        td = !1,
        ud = 0,
        vd = 0,
        wd = 1,
        xd = 0,
        yd = "",
        zd = function(a) {
            a = a || A.event;
            var b = a.screenX + a.clientX << 16;
            b += a.screenY + a.clientY;
            b *= (new Date).getTime() % 1E6;
            wd = wd * b % xd;
            0 < ud && ++vd == ud && vb("mousemove", zd, "remove", "de")
        },
        Ad = function(a) {
            var b = new rd;
            a = unescape(encodeURIComponent(a));
            for (var c = [], d = 0, e = a.length; d < e; ++d) c.push(a.charCodeAt(d));
            b.R.update(c);
            b = b.R.digest();
            a = "";
            for (c = 0; c < b.length; c++) a += "0123456789ABCDEF".charAt(Math.floor(b[c] / 16)) + "0123456789ABCDEF".charAt(b[c] % 16);
            return a
        };
    td = !!sd && "function" == typeof sd.getRandomValues;
    td || (xd = 1E6 * (screen.width * screen.width + screen.height), yd = Ad(B.cookie + "|" + B.location + "|" + (new Date).getTime() + "|" + Math.random()), ud = S("random/maxObserveMousemove") || 0, 0 != ud && vb("mousemove", zd, "add", "at"));
    var Bd = function() {
            var a = L.onl;
            if (!a) {
                a = D();
                L.onl = a;
                var b = D();
                a.e = function(c) {
                    var d = b[c];
                    d && (delete b[c], d())
                };
                a.a = function(c, d) {
                    b[c] = d
                };
                a.r = function(c) {
                    delete b[c]
                }
            }
            return a
        },
        Cd = function(a, b) {
            b = b.onload;
            return "function" === typeof b ? (Bd().a(a, b), b) : null
        },
        Dd = function(a) {
            G(/^\w+$/.test(a), "Unsupported id - " + a);
            return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
        },
        Ed = function(a) {
            Bd().r(a)
        };
    var Fd = {
            allowtransparency: "true",
            frameborder: "0",
            hspace: "0",
            marginheight: "0",
            marginwidth: "0",
            scrolling: "no",
            style: "",
            tabindex: "0",
            vspace: "0",
            width: "100%"
        },
        Gd = {
            allowtransparency: !0,
            onload: !0
        },
        Hd = 0,
        Id = function(a) {
            G(!a || tb.test(a), "Illegal url for new iframe - " + a)
        },
        Jd = function(a, b, c, d, e) {
            Id(c.src);
            var f, g = Cd(d, c),
                h = g ? Dd(d) : "";
            try {
                document.all && (f = a.createElement('<iframe frameborder="' + fb(String(c.frameborder)) + '" scrolling="' + fb(String(c.scrolling)) + '" ' + h + ' name="' + fb(String(c.name)) + '"/>'))
            } catch (l) {} finally {
                f ||
                    (f = (a ? new Ua(Ta(a)) : va || (va = new Ua)).ga("IFRAME"), g && (f.onload = function() {
                        f.onload = null;
                        g.call(this)
                    }, Ed(d)))
            }
            f.setAttribute("ng-non-bindable", "");
            for (var k in c) a = c[k], "style" === k && "object" === typeof a ? F(a, f.style) : Gd[k] || f.setAttribute(k, String(a));
            (k = e && e.beforeNode || null) || e && e.dontclear || Ab(b);
            b.insertBefore(f, k);
            f = k ? k.previousSibling : b.lastChild;
            c.allowtransparency && (f.allowTransparency = !0);
            return f
        };
    var Kd = /^:[\w]+$/,
        Ld = /:([a-zA-Z_]+):/g,
        Md = function() {
            var a = Jc() || "0",
                b = Kc();
            var c = Jc(void 0) || a;
            var d = Kc(void 0),
                e = "";
            c && (e += "u/" + encodeURIComponent(String(c)) + "/");
            d && (e += "b/" + encodeURIComponent(String(d)) + "/");
            c = e || null;
            (e = (d = !1 === S("isLoggedIn")) ? "_/im/" : "") && (c = "");
            var f = S("iframes/:socialhost:"),
                g = S("iframes/:im_socialhost:");
            return ub = {
                socialhost: f,
                ctx_socialhost: d ? g : f,
                session_index: a,
                session_delegate: b,
                session_prefix: c,
                im_prefix: e
            }
        },
        Nd = function(a, b) {
            return Md()[b] || ""
        },
        Od = function(a) {
            return function(b,
                c) {
                return a ? Md()[c] || a[c] || "" : Md()[c] || ""
            }
        };
    var Pd = function(a) {
            var b;
            a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
            return sb(document, b ? b : a)
        },
        Qd = function(a) {
            a = a || "canonical";
            for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
                var e = b[c],
                    f = e.getAttribute("rel");
                if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = Pd(e)) && null != e.match(/^https?:\/\/[\w\-_\.]+/i)) return e
            }
            return window.location.href
        };
    var Rd = {
            se: "0"
        },
        Sd = {
            post: !0
        },
        Td = {
            style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"
        },
        Ud = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),
        Vd = C(L, "WI", D()),
        Wd = function(a, b, c) {
            var d;
            var e = {};
            var f = d = a;
            "plus" == a && b.action && (d = a + "_" + b.action, f = a + "/" + b.action);
            (d = Q("iframes/" + d + "/url")) || (d = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + f + "?usegapi=1");
            for (var g in Rd) e[g] = g + "/" + (b[g] || Rd[g]) + "/";
            e = sb(B, d.replace(Ld,
                Od(e)));
            g = "iframes/" + a + "/params/";
            f = {};
            F(b, f);
            (d = Q("lang") || Q("gwidget/lang")) && (f.hl = d);
            Sd[a] || (f.origin = window.location.origin || window.location.protocol + "//" + window.location.host);
            f.exp = Q(g + "exp");
            if (g = Q(g + "location"))
                for (d = 0; d < g.length; d++) {
                    var h = g[d];
                    f[h] = A.location[h]
                }
            switch (a) {
                case "plus":
                case "follow":
                    g = f.href;
                    d = b.action ? void 0 : "publisher";
                    g = (g = "string" == typeof g ? g : void 0) ? Pd(g) : Qd(d);
                    f.url = g;
                    delete f.href;
                    break;
                case "plusone":
                    g = (g = b.href) ? Pd(g) : Qd();
                    f.url = g;
                    g = b.db;
                    d = Q();
                    null == g && d && (g = d.db,
                        null == g && (g = d.gwidget && d.gwidget.db));
                    f.db = g || void 0;
                    g = b.ecp;
                    d = Q();
                    null == g && d && (g = d.ecp, null == g && (g = d.gwidget && d.gwidget.ecp));
                    f.ecp = g || void 0;
                    delete f.href;
                    break;
                case "signin":
                    f.url = Qd()
            }
            L.ILI && (f.iloader = "1");
            delete f["data-onload"];
            delete f.rd;
            for (var k in Rd) f[k] && delete f[k];
            f.gsrc = Q("iframes/:source:");
            k = Q("inline/css");
            "undefined" !== typeof k && 0 < c && k >= c && (f.ic = "1");
            k = /^#|^fr-/;
            c = {};
            for (var l in f) E(f, l) && k.test(l) && (c[l.replace(k, "")] = f[l], delete f[l]);
            l = "q" == Q("iframes/" + a + "/params/si") ? f :
                c;
            k = zc();
            for (var m in k) !E(k, m) || E(f, m) || E(c, m) || (l[m] = k[m]);
            m = [].concat(Ud);
            (l = Q("iframes/" + a + "/methods")) && "object" === typeof l && Xa.test(l.push) && (m = m.concat(l));
            for (var t in b) E(b, t) && /^on/.test(t) && ("plus" != a || "onconnect" != t) && (m.push(t), delete f[t]);
            delete f.callback;
            c._methods = m.join(",");
            return qb(e, f, c)
        },
        Xd = ["style", "data-gapiscan"],
        Zd = function(a) {
            for (var b = D(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = 0, e = a.attributes.length; d < e; d++) {
                var f = a.attributes[d],
                    g = f.name,
                    h = f.value;
                0 <= Ya.call(Xd,
                    g) || c && 0 != g.indexOf("data-") || "null" === h || "specified" in f && !f.specified || (c && (g = g.substr(5)), b[g.toLowerCase()] = h)
            }
            a = a.style;
            (c = Yd(a && a.height)) && (b.height = String(c));
            (a = Yd(a && a.width)) && (b.width = String(a));
            return b
        },
        Yd = function(a) {
            var b = void 0;
            "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
            return b
        },
        be = function() {
            var a = L.drw;
            Fc(function(b) {
                if (a !== b.id && 4 != b.state && "share" != b.type) {
                    var c = b.id,
                        d = b.type,
                        e = b.url;
                    b = b.userParams;
                    var f = B.getElementById(c);
                    if (f) {
                        var g = Wd(d, b, 0);
                        g ? (f = f.parentNode,
                            $d(e) !== $d(g) && (b.dontclear = !0, b.rd = !0, b.ri = !0, b.type = d, ae(f, b), (d = R[f.lastChild.id]) && (d.oid = c), Gc(c, 4))) : delete R[c]
                    } else delete R[c]
                }
            })
        },
        $d = function(a) {
            var b = RegExp("(\\?|&)ic=1");
            return a.replace(/#.*/, "").replace(b, "")
        };
    var ce, de, Y, ee, fe, ge = /(?:^|\s)g-((\S)*)(?:$|\s)/,
        he = {
            plusone: !0,
            autocomplete: !0,
            profile: !0,
            signin: !0,
            signin2: !0
        };
    ce = C(L, "SW", D());
    de = C(L, "SA", D());
    Y = C(L, "SM", D());
    ee = C(L, "FW", []);
    fe = null;
    var je = function(a, b) {
            ie(void 0, !1, a, b)
        },
        ie = function(a, b, c, d) {
            M("ps0", !0);
            c = ("string" === typeof c ? document.getElementById(c) : c) || B;
            var e = B.documentMode;
            if (c.querySelectorAll && (!e || 8 < e)) {
                e = d ? [d] : gb(ce).concat(gb(de)).concat(gb(Y));
                for (var f = [], g = 0; g < e.length; g++) {
                    var h = e[g];
                    f.push(".g-" + h, "g\\:" + h)
                }
                e = c.querySelectorAll(f.join(","))
            } else e = c.getElementsByTagName("*");
            c = D();
            for (f = 0; f < e.length; f++) {
                g = e[f];
                var k = g;
                h = d;
                var l = k.nodeName.toLowerCase(),
                    m = void 0;
                if (k.getAttribute("data-gapiscan")) h = null;
                else {
                    var t =
                        l.indexOf("g:");
                    0 == t ? m = l.substr(2) : (t = (t = String(k.className || k.getAttribute("class"))) && ge.exec(t)) && (m = t[1]);
                    h = !m || !(ce[m] || de[m] || Y[m]) || h && m !== h ? null : m
                }
                h && (he[h] || 0 == g.nodeName.toLowerCase().indexOf("g:") || 0 != gb(Zd(g)).length) && (g.setAttribute("data-gapiscan", !0), C(c, h, []).push(g))
            }
            if (b)
                for (var u in c)
                    for (b = c[u], d = 0; d < b.length; d++) b[d].setAttribute("data-onload", !0);
            for (var p in c) ee.push(p);
            M("ps1", !0);
            if ((u = ee.join(":")) || a) try {
                H.load(u, a)
            } catch (y) {
                Cc.log(y);
                return
            }
            if (ke(fe || {}))
                for (var I in c) {
                    a =
                        c[I];
                    p = 0;
                    for (b = a.length; p < b; p++) a[p].removeAttribute("data-gapiscan");
                    le(I)
                } else {
                    d = [];
                    for (I in c)
                        for (a = c[I], p = 0, b = a.length; p < b; p++) e = a[p], me(I, e, Zd(e), d, b);
                    ne(u, d)
                }
        },
        oe = function(a) {
            var b = C(H, a, {});
            b.go || (b.go = function(c) {
                return je(c, a)
            }, b.render = function(c, d) {
                d = d || {};
                d.type = a;
                return ae(c, d)
            })
        },
        pe = function(a) {
            ce[a] = !0
        },
        qe = function(a) {
            de[a] = !0
        },
        re = function(a) {
            Y[a] = !0
        };
    var le = function(a, b) {
            var c = Eb(a);
            b && c ? (c(b), (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : H.load(a, function() {
                var d = Eb(a),
                    e = b && b.iframeNode,
                    f = b && b.userParams;
                e && d ? (d(b), e.setAttribute("data-gapiattached", !0)) : (d = H[a].go, "signin2" == a ? d(e, f) : d(e && e.parentNode, f))
            })
        },
        ke = function() {
            return !1
        },
        ne = function() {},
        me = function(a, b, c, d, e, f, g) {
            switch (se(b, a, f)) {
                case 0:
                    a = Y[a] ? a + "_annotation" : a;
                    d = {};
                    d.iframeNode = b;
                    d.userParams = c;
                    le(a, d);
                    break;
                case 1:
                    if (b.parentNode) {
                        for (var h in c) {
                            if (f = E(c, h)) f = c[h],
                                f = !!f && "object" === typeof f && (!f.toString || f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                            if (f) try {
                                c[h] = ld(c[h])
                            } catch (K) {
                                delete c[h]
                            }
                        }
                        f = !0;
                        c.dontclear && (f = !1);
                        delete c.dontclear;
                        Ec();
                        h = Wd(a, c, e);
                        e = g || {};
                        e.allowPost = 1;
                        e.attributes = Td;
                        e.dontclear = !f;
                        g = {};
                        g.userParams = c;
                        g.url = h;
                        g.type = a;
                        if (c.rd) var k = b;
                        else k = document.createElement("div"), b.setAttribute("data-gapistub", !0), k.style.cssText = "position:absolute;width:450px;left:-10000px;", b.parentNode.insertBefore(k, b);
                        g.siteElement =
                            k;
                        k.id || (b = k, C(Vd, a, 0), f = "___" + a + "_" + Vd[a]++, b.id = f);
                        b = D();
                        b[">type"] = a;
                        F(c, b);
                        f = h;
                        c = k;
                        h = e || {};
                        b = h.attributes || {};
                        G(!(h.allowPost || h.forcePost) || !b.onload, "onload is not supported by post iframe (allowPost or forcePost)");
                        e = b = f;
                        Kd.test(b) && (e = S("iframes/" + e.substring(1) + "/url"), G(!!e, "Unknown iframe url config for - " + b));
                        f = sb(B, e.replace(Ld, Nd));
                        b = c.ownerDocument || B;
                        e = h;
                        var l = 0;
                        do k = e.id || ["I", Hd++, "_", (new Date).getTime()].join(""); while (b.getElementById(k) && 5 > ++l);
                        G(5 > l, "Error creating iframe id");
                        e = k;
                        k = h;
                        l = {};
                        var m = {};
                        b.documentMode && 9 > b.documentMode && (l.hostiemode = b.documentMode);
                        F(k.queryParams || {}, l);
                        F(k.fragmentParams || {}, m);
                        var t = k.pfname;
                        var u = D();
                        S("iframes/dropLegacyIdParam") || (u.id = e);
                        u._gfid = e;
                        u.parent = b.location.protocol + "//" + b.location.host;
                        var p = J(b.location.href, "parent");
                        t = t || "";
                        !t && p && (p = J(b.location.href, "_gfid", "") || J(b.location.href, "id", ""), t = J(b.location.href, "pfname", ""), t = p ? t + "/" + p : "");
                        t || (p = kd(J(b.location.href, "jcp", ""))) && "object" == typeof p && (t = (t = p.id) ? p.pfname +
                            "/" + t : "");
                        u.pfname = t;
                        k.connectWithJsonParam && (p = {}, p.jcp = ld(u), u = p);
                        p = J(f, "rpctoken") || l.rpctoken || m.rpctoken;
                        if (!p) {
                            if (!(p = k.rpctoken)) {
                                p = String;
                                t = Math;
                                var I = t.round;
                                if (td) {
                                    var y = new A.Uint32Array(1);
                                    sd.getRandomValues(y);
                                    y = Number("0." + y[0])
                                } else y = wd, y += parseInt(yd.substr(0, 20), 16), yd = Ad(yd), y /= xd + Math.pow(16, 20);
                                p = p(I.call(t, 1E8 * y))
                            }
                            u.rpctoken = p
                        }
                        k.rpctoken = p;
                        F(u, k.connectWithQueryParams ? l : m);
                        p = b.location.href;
                        u = D();
                        (t = J(p, "_bsh", L.bsh)) && (u._bsh = t);
                        (p = Cb(p)) && (u.jsh = p);
                        k.hintInFragment ? F(u, m) :
                            F(u, l);
                        l = qb(f, l, m, k.paramsSerializer);
                        f = h;
                        m = D();
                        F(Fd, m);
                        F(f.attributes, m);
                        m.name = m.id = e;
                        m.src = l;
                        h.eurl = l;
                        h = (k = h) || {};
                        f = !!h.allowPost;
                        if (h.forcePost || f && 2E3 < l.length) {
                            f = nb(l);
                            m.src = "";
                            k.dropDataPostorigin || (m["data-postorigin"] = l);
                            h = Jd(b, c, m, e);
                            if (-1 != navigator.userAgent.indexOf("WebKit")) {
                                var v = h.contentWindow.document;
                                v.open();
                                l = v.createElement("div");
                                m = {};
                                u = e + "_inner";
                                m.name = u;
                                m.src = "";
                                m.style = "display:none";
                                Jd(b, l, m, u, k)
                            }
                            l = (k = f.query[0]) ? k.split("&") : [];
                            k = [];
                            for (m = 0; m < l.length; m++) u = l[m].split("=",
                                2), k.push([decodeURIComponent(u[0]), decodeURIComponent(u[1])]);
                            f.query = [];
                            l = ob(f);
                            G(tb.test(l), "Invalid URL: " + l);
                            f = b.createElement("form");
                            f.method = "POST";
                            f.target = e;
                            f.style.display = "none";
                            e = l instanceof z ? l : La(l);
                            Oa(f, "HTMLFormElement").action = Ja(e);
                            for (e = 0; e < k.length; e++) l = b.createElement("input"), l.type = "hidden", l.name = k[e][0], l.value = k[e][1], f.appendChild(l);
                            c.appendChild(f);
                            f.submit();
                            f.parentNode.removeChild(f);
                            v && v.close();
                            v = h
                        } else v = Jd(b, c, m, e, k);
                        g.iframeNode = v;
                        g.id = v.getAttribute("id");
                        v = g.id;
                        c = D();
                        c.id = v;
                        c.userParams = g.userParams;
                        c.url = g.url;
                        c.type = g.type;
                        c.state = 1;
                        R[v] = c;
                        v = g
                    } else v = null;
                    v && ((g = v.id) && d.push(g), le(a, v))
            }
        },
        se = function(a, b, c) {
            if (a && 1 === a.nodeType && b) {
                if (c) return 1;
                if (Y[b]) {
                    if (Bb[a.nodeName.toLowerCase()]) return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
                } else {
                    if (de[b]) return 0;
                    if (ce[b]) return 1
                }
            }
            return null
        },
        ae = function(a, b) {
            var c = b.type;
            delete b.type;
            var d = ("string" === typeof a ? document.getElementById(a) : a) || void 0;
            if (d) {
                a = {};
                for (var e in b) E(b, e) &&
                    (a[e.toLowerCase()] = b[e]);
                a.rd = 1;
                (b = !!a.ri) && delete a.ri;
                e = [];
                me(c, d, a, e, 0, b, void 0);
                ne(c, e)
            } else Cc.log("string" === "gapi." + c + ".render: missing element " + typeof a ? a : "")
        };
    C(H, "platform", {}).go = je;
    ke = function(a) {
        for (var b = ["_c", "jsl", "h"], c = 0; c < b.length && a; c++) a = a[b[c]];
        b = Cb(Va.href);
        return !a || 0 != a.indexOf("n;") && 0 != b.indexOf("n;") && a !== b
    };
    ne = function(a, b) {
        te(a, b)
    };
    var xb = function(a) {
            ie(a, !0)
        },
        ue = function(a, b) {
            b = b || [];
            for (var c = 0; c < b.length; ++c) a(b[c]);
            for (a = 0; a < b.length; a++) oe(b[a])
        };
    Ob.push(["platform", function(a, b, c) {
        fe = c;
        b && ee.push(b);
        ue(pe, a);
        ue(qe, c._c.annotation);
        ue(re, c._c.bimodal);
        vc();
        tc();
        if ("explicit" != Q("parsetags")) {
            Db(a);
            Ac(zc()) && !Q("disableRealtimeCallback") && Ec();
            if (c && (a = c.callback)) {
                var d = hb(a);
                delete c.callback
            }
            zb(function() {
                xb(d)
            })
        }
    }]);
    H._pl = !0;
    var ve = function(a) {
        a = (a = R[a]) ? a.oid : void 0;
        if (a) {
            var b = B.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete R[a];
            ve(a)
        }
    };
    var we = /^\{h:'/,
        xe = /^!_/,
        ye = "",
        te = function(a, b) {
            function c() {
                vb("message", d, "remove", "de")
            }

            function d(f) {
                var g = f.data,
                    h = f.origin;
                if (ze(g, b)) {
                    var k = e;
                    e = !1;
                    k && M("rqe");
                    Ae(a, function() {
                        k && M("rqd");
                        c();
                        for (var l = C(L, "RPMQ", []), m = 0; m < l.length; m++) l[m]({
                            data: g,
                            origin: h
                        })
                    })
                }
            }
            if (0 !== b.length) {
                ye = J(Va.href, "pfname", "");
                var e = !0;
                vb("message", d, "add", "at");
                nc(a, c)
            }
        },
        ze = function(a, b) {
            a = String(a);
            if (we.test(a)) return !0;
            var c = !1;
            xe.test(a) && (c = !0, a = a.substr(2));
            if (!/^\{/.test(a)) return !1;
            var d = kd(a);
            if (!d) return !1;
            a = d.f;
            if (d.s && a && -1 != Ya.call(b, a)) {
                if ("_renderstart" === d.s || d.s === ye + "/" + a + "::_renderstart")
                    if (d = d.a && d.a[c ? 0 : 1], b = B.getElementById(a), Gc(a, 2), d && b && d.width && d.height) {
                        a: {
                            c = b.parentNode;a = d || {};
                            if (Dc()) {
                                var e = b.id;
                                if (e) {
                                    d = (d = R[e]) ? d.state : void 0;
                                    if (1 === d || 4 === d) break a;
                                    ve(e)
                                }
                            }(d = c.nextSibling) && d.getAttribute && d.getAttribute("data-gapistub") && (c.parentNode.removeChild(d), c.style.cssText = "");d = a.width;
                            var f = a.height,
                                g = c.style;g.textIndent = "0";g.margin = "0";g.padding = "0";g.background = "transparent";g.borderStyle =
                            "none";g.cssFloat = "none";g.styleFloat = "none";g.lineHeight = "normal";g.fontSize = "1px";g.verticalAlign = "baseline";c = c.style;c.display = "inline-block";g = b.style;g.position = "static";g.left = "0";g.top = "0";g.visibility = "visible";d && (c.width = g.width = d + "px");f && (c.height = g.height = f + "px");a.verticalAlign && (c.verticalAlign = a.verticalAlign);e && Gc(e, 3)
                        }
                        b["data-csi-wdt"] = (new Date).getTime()
                    }
                return !0
            }
            return !1
        },
        Ae = function(a, b) {
            nc(a, b)
        };
    var Be = function(a, b) {
        this.N = a;
        a = b || {};
        this.ha = Number(a.maxAge) || 0;
        this.W = a.domain;
        this.Y = a.path;
        this.ia = !!a.secure
    };
    Be.prototype.read = function() {
        for (var a = this.N + "=", b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c];
            if (0 == d.indexOf(a)) return d.substr(a.length)
        }
    };
    Be.prototype.write = function(a, b) {
        if (!Ce.test(this.N)) throw "Invalid cookie name";
        if (!De.test(a)) throw "Invalid cookie value";
        a = this.N + "=" + a;
        this.W && (a += ";domain=" + this.W);
        this.Y && (a += ";path=" + this.Y);
        b = "number" === typeof b ? b : this.ha;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.ia && (a += ";secure");
        document.cookie = a;
        return !0
    };
    Be.prototype.clear = function() {
        this.write("", 0)
    };
    var De = /^[-+/_=.:|%&a-zA-Z0-9@]*$/,
        Ce = /^[A-Z_][A-Z0-9_]{0,63}$/;
    Be.iterate = function(a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("="),
                e = d.shift();
            a(e, d.join("="))
        }
    };
    var Ee = function(a) {
        this.G = a
    };
    Ee.prototype.read = function() {
        if (Z.hasOwnProperty(this.G)) return Z[this.G]
    };
    Ee.prototype.write = function(a) {
        Z[this.G] = a;
        return !0
    };
    Ee.prototype.clear = function() {
        delete Z[this.G]
    };
    var Z = {};
    Ee.iterate = function(a) {
        for (var b in Z) Z.hasOwnProperty(b) && a(b, Z[b])
    };
    var Fe = "https:" === window.location.protocol,
        Ge = Fe || "http:" === window.location.protocol ? Be : Ee,
        He = function(a) {
            var b = a.substr(1),
                c = "",
                d = window.location.hostname;
            if ("" !== b) {
                c = parseInt(b, 10);
                if (isNaN(c)) return null;
                b = d.split(".");
                if (b.length < c - 1) return null;
                b.length == c - 1 && (d = "." + d)
            } else d = "";
            return {
                l: "S" == a.charAt(0),
                domain: d,
                o: c
            }
        },
        Ie = function() {
            var a, b = null;
            Ge.iterate(function(c, d) {
                0 === c.indexOf("G_AUTHUSER_") && (c = He(c.substring(11)), !a || c.l && !a.l || c.l == a.l && c.o > a.o) && (a = c, b = d)
            });
            return {
                fa: a,
                K: b
            }
        };

    function Je(a) {
        if (0 !== a.indexOf("GCSC")) return null;
        var b = {
            X: !1
        };
        a = a.substr(4);
        if (!a) return b;
        var c = a.charAt(0);
        a = a.substr(1);
        var d = a.lastIndexOf("_");
        if (-1 == d) return b;
        var e = He(a.substr(d + 1));
        if (null == e) return b;
        a = a.substring(0, d);
        if ("_" !== a.charAt(0)) return b;
        d = "E" === c && e.l;
        return !d && ("U" !== c || e.l) || d && !Fe ? b : {
            X: !0,
            l: d,
            la: a.substr(1),
            domain: e.domain,
            o: e.o
        }
    }
    var Ke = function(a) {
            if (!a) return [];
            a = a.split("=");
            return a[1] ? a[1].split("|") : []
        },
        Le = function(a) {
            a = a.split(":");
            return {
                clientId: a[0].split("=")[1],
                ka: Ke(a[1]),
                na: Ke(a[2]),
                ma: Ke(a[3])
            }
        },
        Me = function() {
            var a = Ie(),
                b = a.fa;
            a = a.K;
            if (null !== a) {
                var c;
                Ge.iterate(function(f, g) {
                    (f = Je(f)) && f.X && f.l == b.l && f.o == b.o && (c = g)
                });
                if (c) {
                    var d = Le(c),
                        e = d && d.ka[Number(a)];
                    d = d && d.clientId;
                    if (e) return {
                        K: a,
                        ja: e,
                        clientId: d
                    }
                }
            }
            return null
        };
    var Oe = function() {
        this.V = Ne
    };
    n = Oe.prototype;
    n.aa = function() {
        this.M || (this.A = 0, this.M = !0, this.Z())
    };
    n.Z = function() {
        this.M && (this.V() ? this.A = this.T : this.A = Math.min(2 * (this.A || this.T), 120), window.setTimeout(ra(this.Z, this), 1E3 * this.A))
    };
    n.A = 0;
    n.T = 2;
    n.V = null;
    n.M = !1;
    for (var Pe = 0; 64 > Pe; ++Pe);
    var Qe = null;
    Dc = function() {
        return L.oa = !0
    };
    Ec = function() {
        L.oa = !0;
        var a = Me();
        (a = a && a.K) && uc("googleapis.config/sessionIndex", a);
        Qe || (Qe = C(L, "ss", new Oe));
        a = Qe;
        a.aa && a.aa()
    };
    var Ne = function() {
        var a = Me(),
            b = a && a.ja || null,
            c = a && a.clientId;
        nc("auth", {
            callback: function() {
                var d = A.gapi.auth,
                    e = {
                        client_id: c,
                        session_state: b
                    };
                d.checkSessionState(e, function(f) {
                    var g = e.session_state,
                        h = !!Q("isLoggedIn");
                    f = Q("debug/forceIm") ? !1 : g && f || !g && !f;
                    if (h = h !== f) uc("isLoggedIn", f), Ec(), be(), f || ((f = d.signOut) ? f() : (f = d.setToken) && f(null));
                    f = zc();
                    var k = Q("savedUserState");
                    g = d._guss(f.cookiepolicy);
                    k = k != g && "undefined" != typeof k;
                    uc("savedUserState", g);
                    (h || k) && Ac(f) && !Q("disableRealtimeCallback") && d._pimf(f, !0)
                })
            }
        });
        return !0
    };
    M("bs0", !0, window.gapi._bs);
    M("bs1", !0);
    delete window.gapi._bs;
}).call(this);
gapi.load("", {
    callback: window["renderButton"],
    _c: {
        "jsl": {
            "ci": {
                "deviceType": "desktop",
                "oauth-flow": {
                    "authUrl": "https://accounts.google.com/o/oauth2/auth",
                    "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                    "disableOpt": true,
                    "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
                    "usegapi": false
                },
                "debug": {
                    "reportExceptionRate": 0.05,
                    "forceIm": false,
                    "rethrowException": false,
                    "host": "https://apis.google.com"
                },
                "enableMultilogin": true,
                "googleapis.config": {
                    "auth": {
                        "useFirstPartyAuthV2": true
                    }
                },
                "inline": {
                    "css": 1
                },
                "disableRealtimeCallback": false,
                "drive_share": {
                    "skipInitCommand": true
                },
                "csi": {
                    "rate": 0.01
                },
                "client": {
                    "cors": false
                },
                "signInDeprecation": {
                    "rate": 0.0
                },
                "include_granted_scopes": true,
                "llang": "en",
                "iframes": {
                    "youtube": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "ytsubscribe": {
                        "url": "https://www.youtube.com/subscribe_embed?usegapi\u003d1"
                    },
                    "plus_circle": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"
                    },
                    "plus_share": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"
                    },
                    "rbr_s": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                    },
                    ":source:": "3p",
                    "playemm": {
                        "url": "https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "savetoandroidpay": {
                        "url": "https://pay.google.com/gp/v/widget/save"
                    },
                    "blogger": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "evwidget": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"
                    },
                    "partnersbadge": {
                        "url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"
                    },
                    "dataconnector": {
                        "url": "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"
                    },
                    "surveyoptin": {
                        "url": "https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"
                    },
                    ":socialhost:": "https://apis.google.com",
                    "shortlists": {
                        "url": ""
                    },
                    "hangout": {
                        "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
                    },
                    "plus_followers": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"
                    },
                    "post": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"
                    },
                    ":gplus_url:": "https://plus.google.com",
                    "signin": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
                        "methods": ["onauth"]
                    },
                    "rbr_i": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                    },
                    "share": {
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"
                    },
                    "plusone": {
                        "params": {
                            "count": "",
                            "size": "",
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"
                    },
                    "comments": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    ":im_socialhost:": "https://plus.googleapis.com",
                    "backdrop": {
                        "url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"
                    },
                    "visibility": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"
                    },
                    "autocomplete": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                    },
                    "additnow": {
                        "url": "https://apis.google.com/marketplace/button?usegapi\u003d1",
                        "methods": ["launchurl"]
                    },
                    ":signuphost:": "https://plus.google.com",
                    "ratingbadge": {
                        "url": "https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"
                    },
                    "appcirclepicker": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
                    },
                    "follow": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"
                    },
                    "community": {
                        "url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"
                    },
                    "sharetoclassroom": {
                        "url": "https://classroom.google.com/sharewidget?usegapi\u003d1"
                    },
                    "ytshare": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"
                    },
                    "plus": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"
                    },
                    "family_creation": {
                        "params": {
                            "url": ""
                        },
                        "url": "https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "commentcount": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"
                    },
                    "configurator": {
                        "url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"
                    },
                    "zoomableimage": {
                        "url": "https://ssl.gstatic.com/microscope/embed/"
                    },
                    "appfinder": {
                        "url": "https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"
                    },
                    "savetowallet": {
                        "url": "https://pay.google.com/gp/v/widget/save"
                    },
                    "person": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"
                    },
                    "savetodrive": {
                        "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1",
                        "methods": ["save"]
                    },
                    "page": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"
                    },
                    "card": {
                        "url": ":socialhost:/:session_prefix:_/hovercard/card"
                    }
                }
            },
            "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.ILxaxn5iF9E.O/am\u003dAQ/d\u003d1/rs\u003dAGLTcCP4GH4pdEaIiZe1k-cWfBRo9KTiAQ/m\u003d__features__",
            "u": "https://apis.google.com/js/platform.js?onload\u003drenderButton",
            "hee": true,
            "dpo": false,
            "le": []
        },
        "platform": ["additnow", "backdrop", "blogger", "comments", "commentcount", "community", "donation", "family_creation", "follow", "hangout", "health", "page", "partnersbadge", "person", "playemm", "playreview", "plus", "plusone", "post", "ratingbadge", "savetoandroidpay", "savetodrive", "savetowallet", "sharetoclassroom", "shortlists", "signin2", "surveyoptin", "visibility", "youtube", "ytsubscribe", "zoomableimage"],
        "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"]
    }
});