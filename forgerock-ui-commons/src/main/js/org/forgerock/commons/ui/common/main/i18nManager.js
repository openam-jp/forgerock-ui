/**
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2014-2015 ForgeRock AS. All rights reserved.
 *
 * The contents of this file are subject to the terms
 * of the Common Development and Distribution License
 * (the License). You may not use this file except in
 * compliance with the License.
 *
 * You can obtain a copy of the License at
 * http://forgerock.org/license/CDDLv1.0.html
 * See the License for the specific language governing
 * permission and limitations under the License.
 *
 * When distributing Covered Code, include this CDDL
 * Header Notice in each file and include the License file
 * at http://forgerock.org/license/CDDLv1.0.html
 * If applicable, add the following below the CDDL Header,
 * with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 */

/*global require, define */

/**
 * @author jkigwana
 */

define( "org/forgerock/commons/ui/common/main/i18nManager", [
    "jquery",
    "org/forgerock/commons/ui/common/util/Constants",
    "org/forgerock/commons/ui/common/main/Router",
    "module"
], function($, Constants, Router, Module) {

    /*
     * i18nManger with i18next try to detect the user language and load the corresponding translation in the following
     * order:
     * 1) The query string parameter (&locale=fr)
     * 2) lang, a 2-5 character long language or locale code passed in from server. The value can be "en" or "en-US" for
     * example.
     * 3) The default language set inside Constants.DEFAULT_LANGUAGE
     *
     * Note that the "load" field controls how the localization files are resolved:
     * 1) current: always use the value that was passed in as "lang" (may be just "en", or "en-US")
     * 2) unspecific: always use the non country-specific locale (so "en" in case lang was "en-US")
     * 3) not set/other value: country-specific first, then non-country specific
     *
     * If the localization was not found, i18next will use "fallbackLng".
     */

    var obj = {};

    obj.init = function(lang) {

        var locales = [], opts = { }, params = Router.convertCurrentUrlToJSON().params, loadMode;

        if (params && params.locale) {
            lang = params.locale;
        }

        // return if the stored lang matches the new one.
        if (obj.lang !== undefined && obj.lang === lang) {
           return;
        }
        obj.lang = lang;

        loadMode = Module.config().i18nLoad || 'unspecific';

        opts = {
            fallbackLng: Constants.DEFAULT_LANGUAGE,
            detectLngQS: 'locale',
            useCookie:false,
            getAsync: false,
            lng:lang,
            load: loadMode,
            resGetPath: require.toUrl('locales/__lng__/__ns__.json')
        };

        $.i18n.init(opts);

    };

    return obj;

});
