function isAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1;
}

function getFileName() {
    var url = document.location.href;
    return url = url.substring(0, -1 == url.indexOf("#") ? url.length : url.indexOf("#")), 
    url = url.substring(0, -1 == url.indexOf("?") ? url.length : url.indexOf("?")), 
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
}

function getQueryVariable(variable) {
    for (var query = window.location.search.substring(1), vars = query.split("&"), i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) return pair[1];
    }
}

var anyroutes = function() {
    var _beforeCallback, _routes = [];
    this.parseRoute = function(path) {
        return this.parseGroups = function(loc) {
            for (var nameRegexp = new RegExp(":([^/.\\\\]+)", "g"), newRegexp = "" + loc, groups = {}, matches = null, i = 0; matches = nameRegexp.exec(loc); ) groups[matches[1]] = i++, 
            newRegexp = newRegexp.replace(matches[0], "([^/.\\\\]+)");
            return newRegexp += "$", {
                groups: groups,
                regexp: new RegExp(newRegexp)
            };
        }, this.parseGroups(path);
    };
    var matchRoute = function(url, e, before) {
        before && _beforeCallback && _beforeCallback({
            url: url,
            params: params,
            values: values,
            e: e
        });
        for (var route = null, i = 0; route = _routes[i]; i++) {
            var routeMatch = route.regex.regexp.exec(url);
            if (!routeMatch == !1) {
                var params = {};
                for (var g in route.regex.groups) {
                    var group = route.regex.groups[g];
                    params[g] = routeMatch[group + 1];
                }
                var values = {};
                return route.callback({
                    url: url,
                    params: params,
                    values: values,
                    e: e
                }), !0;
            }
        }
        return !1;
    };
    this.before = function(callback) {
        return _beforeCallback = callback, this;
    }, this.any = function(route, callback) {
        return _routes.push({
            regex: this.parseRoute(route),
            callback: callback
        }), this;
    }, this.test = function(url) {
        matchRoute(url);
    }, this.getRoutes = function() {
        return _routes;
    }, this.loadCurrent = function(before) {
        before = "undefined" != typeof before ? before : !0, matchRoute(document.location.pathname, null, before);
    };
    !function() {
        window.addEventListener ? window.addEventListener("load", function() {
            matchRoute(document.location.pathname, null, !0);
        }, !1) : window.attachEvent("onload", function() {
            matchRoute(document.location.pathname, null, !0);
        });
    }();
};

!function(root, factory) {
    "function" == typeof define && define.amd ? define(factory) : "object" == typeof exports ? module.exports = factory(require, exports, module) : root.ouibounce = factory();
}(this, function() {
    return function(el, config) {
        function setDefault(_property, _default) {
            return "undefined" == typeof _property ? _default : _property;
        }
        function setDefaultCookieExpire(days) {
            var ms = 24 * days * 60 * 60 * 1e3, date = new Date();
            return date.setTime(date.getTime() + ms), "; expires=" + date.toGMTString();
        }
        function attachOuiBounce() {
            _html.addEventListener("mouseleave", handleMouseleave), _html.addEventListener("keydown", handleKeydown);
        }
        function handleMouseleave(e) {
            e.clientY > sensitivity || checkCookieValue("viewedOuibounceModal", "true") && !aggressive || (fire(), 
            callback());
        }
        function handleKeydown(e) {
            disableKeydown || checkCookieValue("viewedOuibounceModal", "true") && !aggressive || e.metaKey && 76 == e.keyCode && (disableKeydown = !0, 
            fire(), callback());
        }
        function checkCookieValue(cookieName, value) {
            var cookies = document.cookie.split("; ").reduce(function(prev, curr) {
                var el = curr.split("=");
                return prev[el[0]] = el[1], prev;
            }, {});
            return cookies[cookieName] === value;
        }
        function fire() {
            el && (el.style.display = "block"), disable();
        }
        function disable(options) {
            var options = options || {};
            "undefined" != typeof options.cookieExpire && (cookieExpire = setDefaultCookieExpire(options.cookieExpire)), 
            options.sitewide === !0 && (sitewide = ";path=/"), "undefined" != typeof options.cookieDomain && (cookieDomain = ";domain=" + options.cookieDomain), 
            document.cookie = "viewedOuibounceModal=true" + cookieExpire + cookieDomain + sitewide, 
            _html.removeEventListener("mouseleave", handleMouseleave), _html.removeEventListener("keydown", handleKeydown);
        }
        var config = config || {}, aggressive = config.aggressive || !1, sensitivity = setDefault(config.sensitivity, 20), timer = setDefault(config.timer, 1e3), callback = config.callback || function() {}, cookieExpire = setDefaultCookieExpire(config.cookieExpire) || "", cookieDomain = config.cookieDomain ? ";domain=" + config.cookieDomain : "", sitewide = config.sitewide === !0 ? ";path=/" : "", _html = document.getElementsByTagName("html")[0];
        setTimeout(attachOuiBounce, timer);
        var disableKeydown = !1;
        return {
            fire: fire,
            disable: disable
        };
    };
}), function(root, factory) {
    "use strict";
    "object" == typeof exports ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : root.PubSub = factory();
}("object" == typeof window && window || this, function() {
    "use strict";
    function throwException(ex) {
        return function() {
            throw ex;
        };
    }
    function callSubscriberWithDelayedExceptions(subscriber, message, data) {
        try {
            subscriber(message, data);
        } catch (ex) {
            setTimeout(throwException(ex), 0);
        }
    }
    function callSubscriberWithImmediateExceptions(subscriber, message, data) {
        subscriber(message, data);
    }
    function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
        var i, j, subscribers = messages[matchedMessage], callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions;
        if (messages.hasOwnProperty(matchedMessage)) for (i = 0, j = subscribers.length; j > i; i++) callSubscriber(subscribers[i].func, originalMessage, data);
    }
    function createDeliveryFunction(message, data, immediateExceptions) {
        return function() {
            var topic = String(message), position = topic.lastIndexOf(".");
            for (deliverMessage(message, message, data, immediateExceptions); -1 !== position; ) topic = topic.substr(0, position), 
            position = topic.lastIndexOf("."), deliverMessage(message, topic, data);
        };
    }
    function messageHasSubscribers(message) {
        for (var topic = String(message), found = messages.hasOwnProperty(topic), position = topic.lastIndexOf("."); !found && -1 !== position; ) topic = topic.substr(0, position), 
        position = topic.lastIndexOf("."), found = messages.hasOwnProperty(topic);
        return found;
    }
    function publish(message, data, sync, immediateExceptions) {
        var deliver = createDeliveryFunction(message, data, immediateExceptions), hasSubscribers = messageHasSubscribers(message);
        return hasSubscribers ? (sync === !0 ? deliver() : setTimeout(deliver, 0), !0) : !1;
    }
    var PubSub = {
        name: "PubSubJS",
        version: "1.3.5"
    }, messages = {}, lastUid = -1;
    return PubSub.publish = function(message, data) {
        return publish(message, data, !1, PubSub.immediateExceptions);
    }, PubSub.publishSync = function(message, data) {
        return publish(message, data, !0, PubSub.immediateExceptions);
    }, PubSub.subscribe = function(message, func) {
        messages.hasOwnProperty(message) || (messages[message] = []);
        var token = String(++lastUid);
        return messages[message].push({
            token: token,
            func: func
        }), token;
    }, PubSub.unsubscribe = function(tokenOrFunction) {
        var m, i, isToken = "string" == typeof tokenOrFunction, key = isToken ? "token" : "func", succesfulReturnValue = isToken ? tokenOrFunction : !0, result = !1;
        for (m in messages) if (messages.hasOwnProperty(m)) for (i = messages[m].length - 1; i >= 0; i--) if (messages[m][i][key] === tokenOrFunction && (messages[m].splice(i, 1), 
        result = succesfulReturnValue, isToken)) return result;
        return result;
    }, PubSub;
}), function(ctx) {
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }
    function str_repeat(input, multiplier) {
        for (var output = []; multiplier > 0; output[--multiplier] = input) ;
        return output.join("");
    }
    var sprintf = function() {
        return sprintf.cache.hasOwnProperty(arguments[0]) || (sprintf.cache[arguments[0]] = sprintf.parse(arguments[0])), 
        sprintf.format.call(null, sprintf.cache[arguments[0]], arguments);
    };
    sprintf.format = function(parse_tree, argv) {
        var arg, i, k, match, pad, pad_character, pad_length, cursor = 1, tree_length = parse_tree.length, node_type = "", output = [];
        for (i = 0; tree_length > i; i++) if (node_type = get_type(parse_tree[i]), "string" === node_type) output.push(parse_tree[i]); else if ("array" === node_type) {
            if (match = parse_tree[i], match[2]) for (arg = argv[cursor], k = 0; k < match[2].length; k++) {
                if (!arg.hasOwnProperty(match[2][k])) throw sprintf('[sprintf] property "%s" does not exist', match[2][k]);
                arg = arg[match[2][k]];
            } else arg = match[1] ? argv[match[1]] : argv[cursor++];
            if (/[^s]/.test(match[8]) && "number" != get_type(arg)) throw sprintf("[sprintf] expecting number but found %s", get_type(arg));
            switch (match[8]) {
              case "b":
                arg = arg.toString(2);
                break;

              case "c":
                arg = String.fromCharCode(arg);
                break;

              case "d":
                arg = parseInt(arg, 10);
                break;

              case "e":
                arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                break;

              case "f":
                arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                break;

              case "o":
                arg = arg.toString(8);
                break;

              case "s":
                arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
                break;

              case "u":
                arg >>>= 0;
                break;

              case "x":
                arg = arg.toString(16);
                break;

              case "X":
                arg = arg.toString(16).toUpperCase();
            }
            arg = /[def]/.test(match[8]) && match[3] && arg >= 0 ? "+" + arg : arg, pad_character = match[4] ? "0" == match[4] ? "0" : match[4].charAt(1) : " ", 
            pad_length = match[6] - String(arg).length, pad = match[6] ? str_repeat(pad_character, pad_length) : "", 
            output.push(match[5] ? arg + pad : pad + arg);
        }
        return output.join("");
    }, sprintf.cache = {}, sprintf.parse = function(fmt) {
        for (var _fmt = fmt, match = [], parse_tree = [], arg_names = 0; _fmt; ) {
            if (null !== (match = /^[^\x25]+/.exec(_fmt))) parse_tree.push(match[0]); else if (null !== (match = /^\x25{2}/.exec(_fmt))) parse_tree.push("%"); else {
                if (null === (match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt))) throw "[sprintf] huh?";
                if (match[2]) {
                    arg_names |= 1;
                    var field_list = [], replacement_field = match[2], field_match = [];
                    if (null === (field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field))) throw "[sprintf] huh?";
                    for (field_list.push(field_match[1]); "" !== (replacement_field = replacement_field.substring(field_match[0].length)); ) if (null !== (field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field))) field_list.push(field_match[1]); else {
                        if (null === (field_match = /^\[(\d+)\]/.exec(replacement_field))) throw "[sprintf] huh?";
                        field_list.push(field_match[1]);
                    }
                    match[2] = field_list;
                } else arg_names |= 2;
                if (3 === arg_names) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                parse_tree.push(match);
            }
            _fmt = _fmt.substring(match[0].length);
        }
        return parse_tree;
    };
    var vsprintf = function(fmt, argv, _argv) {
        return _argv = argv.slice(0), _argv.splice(0, 0, fmt), sprintf.apply(null, _argv);
    };
    ctx.sprintf = sprintf, ctx.vsprintf = vsprintf;
}("undefined" != typeof exports ? exports : window), function($) {
    function process() {
        check_lock = !1;
        for (var index = 0; index < selectors.length; index++) {
            var $appeared = $(selectors[index]).filter(function() {
                return $(this).is(":appeared");
            });
            if ($appeared.trigger("appear", [ $appeared ]), $prior_appeared) {
                var $disappeared = $prior_appeared.not($appeared);
                $disappeared.trigger("disappear", [ $disappeared ]);
            }
            $prior_appeared = $appeared;
        }
    }
    var $prior_appeared, selectors = [], check_binded = !1, check_lock = !1, defaults = {
        interval: 250,
        force_process: !1
    }, $window = $(window);
    $.expr[":"].appeared = function(element) {
        var $element = $(element);
        if (!$element.is(":visible")) return !1;
        var window_left = $window.scrollLeft(), window_top = $window.scrollTop(), offset = $element.offset(), left = offset.left, top = offset.top;
        return top + $element.height() >= window_top && top - ($element.data("appear-top-offset") || 0) <= window_top + $window.height() && left + $element.width() >= window_left && left - ($element.data("appear-left-offset") || 0) <= window_left + $window.width() ? !0 : !1;
    }, $.fn.extend({
        appear: function(options) {
            var opts = $.extend({}, defaults, options || {}), selector = this.selector || this;
            if (!check_binded) {
                var on_check = function() {
                    check_lock || (check_lock = !0, setTimeout(process, opts.interval));
                };
                $(window).scroll(on_check).resize(on_check), check_binded = !0;
            }
            return opts.force_process && setTimeout(process, opts.interval), selectors.push(selector), 
            $(selector);
        }
    }), $.extend({
        force_appear: function() {
            return check_binded ? (process(), !0) : !1;
        }
    });
}(jQuery), function($) {
    $.i18n = {
        dict: null,
        setDictionary: function(i18n_dict) {
            this.dict = i18n_dict;
        },
        _: function(str, params) {
            var result = str;
            return this.dict && this.dict[str] && (result = this.dict[str]), this.printf(result, params);
        },
        printf: function(str, args) {
            if (!args) return str;
            for (var result = "", search = /%(\d+)\$s/g, matches = search.exec(str); matches; ) {
                var index = parseInt(matches[1], 10) - 1;
                str = str.replace("%" + matches[1] + "$s", args[index]), matches = search.exec(str);
            }
            var parts = str.split("%s");
            if (parts.length > 1) for (var i = 0; i < args.length; i++) parts[i].length > 0 && parts[i].lastIndexOf("%") == parts[i].length - 1 && (parts[i] += "s" + parts.splice(i + 1, 1)[0]), 
            result += parts[i] + args[i];
            return result + parts[parts.length - 1];
        }
    }, $.fn._t = function(str, params) {
        return $(this).text($.i18n._(str, params));
    };
}(jQuery);

var Mailcheck = {
    domainThreshold: 4,
    topLevelThreshold: 3,
    defaultDomains: [ "yahoo.com", "google.com", "hotmail.com", "gmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.net", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "sbcglobal.net", "att.net", "gmx.com", "mail.com", "outlook.com", "icloud.com" ],
    defaultTopLevelDomains: [ "co.jp", "co.uk", "com", "net", "org", "info", "edu", "gov", "mil", "ca" ],
    run: function(opts) {
        opts.domains = opts.domains || Mailcheck.defaultDomains, opts.topLevelDomains = opts.topLevelDomains || Mailcheck.defaultTopLevelDomains, 
        opts.distanceFunction = opts.distanceFunction || Mailcheck.sift3Distance;
        var defaultCallback = function(result) {
            return result;
        }, suggestedCallback = opts.suggested || defaultCallback, emptyCallback = opts.empty || defaultCallback, result = Mailcheck.suggest(Mailcheck.encodeEmail(opts.email), opts.domains, opts.topLevelDomains, opts.distanceFunction);
        return result ? suggestedCallback(result) : emptyCallback();
    },
    suggest: function(email, domains, topLevelDomains, distanceFunction) {
        email = email.toLowerCase();
        var emailParts = this.splitEmail(email), closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction, this.domainThreshold);
        if (closestDomain) {
            if (closestDomain != emailParts.domain) return {
                address: emailParts.address,
                domain: closestDomain,
                full: emailParts.address + "@" + closestDomain
            };
        } else {
            var closestTopLevelDomain = this.findClosestDomain(emailParts.topLevelDomain, topLevelDomains, distanceFunction, this.topLevelThreshold);
            if (emailParts.domain && closestTopLevelDomain && closestTopLevelDomain != emailParts.topLevelDomain) {
                var domain = emailParts.domain;
                return closestDomain = domain.substring(0, domain.lastIndexOf(emailParts.topLevelDomain)) + closestTopLevelDomain, 
                {
                    address: emailParts.address,
                    domain: closestDomain,
                    full: emailParts.address + "@" + closestDomain
                };
            }
        }
        return !1;
    },
    findClosestDomain: function(domain, domains, distanceFunction, threshold) {
        threshold = threshold || this.topLevelThreshold;
        var dist, minDist = 99, closestDomain = null;
        if (!domain || !domains) return !1;
        distanceFunction || (distanceFunction = this.sift3Distance);
        for (var i = 0; i < domains.length; i++) {
            if (domain === domains[i]) return domain;
            dist = distanceFunction(domain, domains[i]), minDist > dist && (minDist = dist, 
            closestDomain = domains[i]);
        }
        return threshold >= minDist && null !== closestDomain ? closestDomain : !1;
    },
    sift3Distance: function(s1, s2) {
        if (null == s1 || 0 === s1.length) return null == s2 || 0 === s2.length ? 0 : s2.length;
        if (null == s2 || 0 === s2.length) return s1.length;
        for (var c = 0, offset1 = 0, offset2 = 0, lcs = 0, maxOffset = 5; c + offset1 < s1.length && c + offset2 < s2.length; ) {
            if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) lcs++; else {
                offset1 = 0, offset2 = 0;
                for (var i = 0; maxOffset > i; i++) {
                    if (c + i < s1.length && s1.charAt(c + i) == s2.charAt(c)) {
                        offset1 = i;
                        break;
                    }
                    if (c + i < s2.length && s1.charAt(c) == s2.charAt(c + i)) {
                        offset2 = i;
                        break;
                    }
                }
            }
            c++;
        }
        return (s1.length + s2.length) / 2 - lcs;
    },
    splitEmail: function(email) {
        var parts = email.trim().split("@");
        if (parts.length < 2) return !1;
        for (var i = 0; i < parts.length; i++) if ("" === parts[i]) return !1;
        var domain = parts.pop(), domainParts = domain.split("."), tld = "";
        if (0 == domainParts.length) return !1;
        if (1 == domainParts.length) tld = domainParts[0]; else {
            for (var i = 1; i < domainParts.length; i++) tld += domainParts[i] + ".";
            domainParts.length >= 2 && (tld = tld.substring(0, tld.length - 1));
        }
        return {
            topLevelDomain: tld,
            domain: domain,
            address: parts.join("@")
        };
    },
    encodeEmail: function(email) {
        var result = encodeURI(email);
        return result = result.replace("%20", " ").replace("%25", "%").replace("%5E", "^").replace("%60", "`").replace("%7B", "{").replace("%7C", "|").replace("%7D", "}");
    }
};

"undefined" != typeof module && module.exports && (module.exports = Mailcheck), 
"undefined" != typeof window && window.jQuery && !function($) {
    $.fn.mailcheck = function(opts) {
        var self = this;
        if (opts.suggested) {
            var oldSuggested = opts.suggested;
            opts.suggested = function(result) {
                oldSuggested(self, result);
            };
        }
        if (opts.empty) {
            var oldEmpty = opts.empty;
            opts.empty = function() {
                oldEmpty.call(null, self);
            };
        }
        opts.email = this.val(), Mailcheck.run(opts);
    };
}(jQuery);

var unflr = unflr || {};

unflr.init = function() {
    var my = {};
    return my.ready = function() {
        $(".textInputSelectable").on("click", function() {
            this.select();
        }), $("#removeModal").on("click", function() {
            $(".modal").modal("hide").removeClass("show"), $(".modal-backdrop").remove();
        });
    }, {
        ready: my.ready
    };
}();

var unflr = unflr || {};

unflr.root = function() {
    var my = {};
    return my.ready = function() {
        setTimeout(function() {
            ouibounce(!1, {
                aggressive: app.config.debug,
                callback: function() {
                    $("#unbounceModal").modal("show");
                }
            });
        }, 2e3), $("footer").appear().on("appear", function() {
            $(".email:visible", ".step4").focus();
        }), $("form").each(function() {
            $(this).bootstrapValidator({
                live: "disabled"
            }).on("error.field.bv", function() {
                $("p.help-block").remove();
            });
        }), $(".email").on("blur", function() {
            $this = $(this), $this.mailcheck({
                suggested: function(element, suggestion) {
                    $this.parent().find(".help-block").remove(), $this.after(sprintf('<p class="help-block">Did you mean<b><i> %s </b></i>?</p>', suggestion.full));
                },
                empty: function() {
                    $this.parent().find(".help-block").remove();
                }
            });
        });
    }, {
        ready: my.ready
    };
}();

var routes = new anyroutes();

routes.before(unflr.init.ready).any("/", unflr.root.ready), function(i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r, i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date(), a = s.createElement(o), m = s.getElementsByTagName(o)[0], 
    a.async = 1, a.src = g, m.parentNode.insertBefore(a, m);
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), 
ga("create", app.config.analytics.google), ga("send", "pageview");