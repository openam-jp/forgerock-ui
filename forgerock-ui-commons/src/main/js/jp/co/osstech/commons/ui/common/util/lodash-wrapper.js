/**
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
 * Copyright 2026 OSSTech Corporation
 */

/**
 * Lodash wrapper that restores window._ to Underscore.js.
 *
 * Load order:
 *   1. underscore.js  — AMD module (underscore 1.13+ does NOT set window._ in AMD mode)
 *   2. lodash.js      — sets window._ = lodash (saves previous window._ internally)
 *   3. this module    — calls lodash.noConflict() then explicitly sets window._ = underscore
 *
 * Problem without explicit window._ assignment:
 *   underscore 1.13+ in AMD mode does not set window._.
 *   So lodash saves window._ = undefined as the "previous value".
 *   noConflict() would then restore window._ = undefined.
 *   Non-AMD libraries (backgrid, backbone-relational, etc.) read window._ directly
 *   and would crash with "Cannot read properties of undefined (reading 'extend')".
 *
 * Libraries that depend on Underscore.js (Backbone, Backgrid, backbone-relational)
 * receive the real Underscore via window._ or the "underscore" AMD module.
 * Project code receives lodash v4 by requiring "lodash" (mapped to this wrapper).
 */
define(["lodash-original", "underscore"], function (lodash, underscore) {
    var result = lodash.noConflict();
    // Explicitly set window._ = underscore for non-AMD libraries (backgrid, etc.)
    // that rely on window._ being available.
    window._ = underscore;
    return result;
});
