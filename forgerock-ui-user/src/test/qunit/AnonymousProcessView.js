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
 * Copyright 2016 ForgeRock AS.
 * Portions copyright 2020 Open Source Solution Technology Corporation
 */

define([
    "jquery-migrate",
    "qunit",
    "org/forgerock/commons/ui/user/anonymousProcess/AnonymousProcessView",
    "org/forgerock/commons/ui/common/util/UIUtils"
], function ($, QUnit, AnonymousProcessView, UIUtils) {
    QUnit.module('AnonymousProcessView Functions');

    QUnit.test("buildQueryFilter", function (assert) {
        var el = $("#qunit-fixture #wrapper"),
            done = assert.async();

        UIUtils.renderTemplate(
            "templates/user/process/reset/userQuery-initial.html",
            el,
            {},
            function () {
                el.find(":input[name=userName]").val("bjensen");

                assert.equal(
                    AnonymousProcessView.prototype.walkTreeForFilterStrings(el.find("#filterContainer")),
                    'userName eq "bjensen"',
                    "Simple query filter generated from template matches expected input"
                );

                el.find(":input[name=userName]").val("bjensen");
                el.find(":input[name=mail]").val("bjensen@example.com");
                el.find(":input[name=givenName]").val("Barbara");
                el.find(":input[name=sn]").val("Jensen");

                assert.equal(
                    AnonymousProcessView.prototype.walkTreeForFilterStrings(el.find("#filterContainer")),
                    '(userName eq "bjensen" OR mail eq "bjensen@example.com" OR (givenName eq "Barbara" AND sn eq "Jensen"))',
                    "Complex query filter generated from template matches expected input"
                );

                done();
            }
        );
    });
});
