window.addEventListener('load', function () {
    var TRACKING_CODE = "UA-124501862-2"; // AB - Shop - UserID aktiviert

    var isBlockerNotChecked = function (name) {
        var isNotBlocked = true;
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                isNotBlocked = false;
                break;
            } else {
                isNotBlocked = true;
            }
        }
        return isNotBlocked;
    };

    if (isBlockerNotChecked("adbc_")) {

        var gaIsNotBlocked = function () {
            var ca = document.cookie.split(';');
            var isNotBlocked = true;

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf("ga-disable") == 0) isNotBlocked = false;
            }
            return isNotBlocked;
        };


        var getClientId = function () {

            var localStorageSupported = function () {
                var mod = 'works';
                try {
                    localStorage.setItem(mod, mod);
                    localStorage.removeItem(mod);
                    return true;
                } catch (e) {
                    return false;
                }
            };

            /**
             * Checks wheather LocalStorage is supported
             * If yes, load or set and load client id via LocalStorage
             * If no, load or set and load  client id via Cookie
             **/
            if (!localStorageSupported()) {
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf("cid_") == 0) var cid = c.substring(name.length, c.length)
                }
                if (!cid) var cid = "" + (new Date).getTime() + Math.floor(1e6 * Math.random());
                var g = new Date;
                g.setTime(g.getTime() + 63072e6);
                var expDate = 'expires=' + g.toUTCString();
                document.cookie = 'cid_=' + cid + '; ' + expDate;
                return cid;
            } else {
                var cid = localStorage.getItem('cid');
                if (!cid) {
                    localStorage.setItem("cid", "" + (new Date).getTime() + Math.floor(1e6 * Math.random()));
                }
                cid = localStorage.getItem('cid');
                return cid;
            }
        };

        var cid = getClientId();
        var getUrl = function (blocked, ea, cid) {
            var ec = "Geladen";
            if (blocked) {
                if (gaIsNotBlocked()) {
                    ec = "Blockiert";
                } else {
                    ec = "Manuell blockiert";
                }
            }
            var ea = ea;
            var cid = cid;
            var ua = window.navigator.userAgent;
            var dp = document.location.pathname;
            return '/collect.php?' + "tid=" + encodeURIComponent(TRACKING_CODE) + "&ec=" + encodeURIComponent(ec) + "&ea=" + encodeURIComponent(ea) + "&cid=" + encodeURIComponent(cid) + "&ua=" + encodeURIComponent(ua) + "&dp=" + encodeURIComponent(dp);
        };

        if (window.ga && ga.create && gaIsNotBlocked()) {
            console.log('Google Analytics is loaded');
            var img = document.createElement('img');
            img.setAttribute('style', 'display:none;');
            img.src = getUrl(false, "Google Analytics", cid);
            document.body.appendChild(img);
        } else {
            console.log('Google Analytics is not loaded');
            var img = document.createElement('img');
            img.setAttribute('style', 'display:none;');
            img.src = getUrl(true, "Google Analytics", cid);
            document.body.appendChild(img);
        }

        if (window.google_tag_manager && gaIsNotBlocked()) {
            console.log('Google Tag Manager is loaded');
            var img = document.createElement('img');
            img.setAttribute('style', 'display:none;');
            img.src = getUrl(false, "Google Tag Manager", cid);
            document.body.appendChild(img);
        } else {
            console.log('Google Tag Manager is not loaded');
            var img = document.createElement('img');
            img.setAttribute('style', 'display:none;');
            img.src = getUrl(true, "Google Tag Manager", cid);
            document.body.appendChild(img);
        }
        date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); //30 Days
        expires = "; expires=" + date.toGMTString();
        document.cookie = "adbc_" + "=" + "adbc" + expires + "; path=/"; //AdBlockChecked
    } else {
        console.log("Blocker already checked");
    }
}, false);