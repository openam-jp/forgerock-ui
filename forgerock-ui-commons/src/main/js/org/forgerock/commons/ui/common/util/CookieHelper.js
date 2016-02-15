/*
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2011-2016 ForgeRock AS.
 */

/*global define, _, unescape*/

define("org/forgerock/commons/ui/common/util/CookieHelper", [
], function () {
    var obj = {};
    
    /**
     * Create a cookie in the browser with given parameters. Only name parameter is mandatory. 
     */
    obj.createCookie = function(cookieName, cookieValue, expirationDate, cookiePath, cookieDomain, secureCookie) {
        var expirationDatePart, nameValuePart, pathPart, domainPart, securePart; 
        expirationDatePart = (expirationDate) ? ";expires=" + expirationDate.toGMTString() : "";
        nameValuePart = cookieName + "=" + cookieValue;
        pathPart = (cookiePath) ? ";path=" + cookiePath : "";
        domainPart = (cookieDomain) ? ";domain=" + cookieDomain : "";
        securePart = (secureCookie) ? ";secure" : "";
    
        return nameValuePart + expirationDatePart + pathPart + domainPart + securePart;
    };

    /**
     * Sets a cookie with given parameters in the browser.
     * @param {String} name - cookie name.
     * @param {String} [value] - cookie value.
     * @param {Date} [expirationDate] - cookie expiration date.
     * @param {String} [path] - cookie path.
     * @param {String|String[]} [domain] - cookie domain(s). Use empty array for creating host-only cookies.
     * @param {Boolean} [secure] - is cookie secure.
     */
    obj.setCookie = function (name, value, expirationDate, path, domains, secure) {
        if (!_.isArray(domains)) {
            domains = [domains];
        }

        if (domains.length === 0) {
            document.cookie = obj.createCookie(name, value, expirationDate, path, undefined, secure);
        } else {
            _.each(domains, function(domain) {
                document.cookie = obj.createCookie(name, value, expirationDate, path, domain, secure);
            });
        }
    };
    
    obj.getCookie = function(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i=0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if ( x === c_name) {
                return unescape(y);
            }
        }
    };

    /**
     * Deletes cookie with given parameters.
     * @param {String} name - cookie name.
     * @param {String} [path] - cookie path.
     * @param {String|String[]} [domain] - cookie domain(s). Use empty array for creating host-only cookies.
     */
    obj.deleteCookie = function(name, path, domains) {
        var date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        obj.setCookie(name, "", date, path, domains);
    };
    
    obj.cookiesEnabled = function(){
        this.setCookie("cookieTest","test");
        if(!this.getCookie("cookieTest")){
            return false;
        }
        this.deleteCookie("cookieTest");
        return true;
    };
    
    return obj;
});