define(function () {

    return function (document) {

        var cookies = [],
            getKey = function (cookie) {
                return cookie.split(/=|;/)[0];
            },
            getPath = function (cookie) {
                var path = cookie.match(/;\s*path=([^;]+)/);
                return path ? path[1] : null;
            },
            setPath = function (cookie) {
                if (!getPath(cookie)) {
                    cookie += '; path=' + document.location.pathname;
                }
                return cookie;
            },
            getDomain = function (cookie) {
                var domain = cookie.match(/;\s*domain=([^;]+)/);
                return domain ? domain[1] : null;
            },
            setDomain = function (cookie) {
                if (!getDomain(cookie)) {
                    cookie += '; domain=' + document.location.hostname;
                }
                return cookie;
            };

        this.__defineGetter__('cookie', function () {
            return cookies.join('; ');
        });

        this.__defineSetter__('cookie', function (cookie) {
            cookie = setPath(cookie);
            cookie = setDomain(cookie);
            var key = getKey(cookie),
                path = getPath(cookie),
                domain = getDomain(cookie);
            cookies = cookies.filter(function (c) {
                return getKey(c) !== key || getPath(c) !== path || getDomain(c) !== domain;
            });
            cookies.push(cookie);
        });

    };

});
