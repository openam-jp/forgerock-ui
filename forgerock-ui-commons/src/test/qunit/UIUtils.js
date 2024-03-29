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
 * Portions copyright 2022 OSSTech Corporation
 */

define([
    "lodash",
    "handlebars",
    "qunit",
    "org/forgerock/commons/ui/common/util/UIUtils"
], function (_, Handlebars, QUnit, UIUtils) {
    QUnit.module('UIUtils Functions');

    QUnit.test("Static Select", function (assert) {
        var template = Handlebars.compile("<select>" +
            "{{#staticSelect testVal}}" +
            "<option value='1'>1</option>" +
            "<option value='2'>2</option>" +
            "<option value='text/html'>text/html</option>" +
            "<option value=\"tick'test\">tick'test</option>" +
            "<option value='less<test'>less&lt;test</option>" +
            "<option value='and&test'>and&amp;test</option>" +
            "{{/staticSelect}}" +
        "</select>");

        var testHTML = template({"testVal": "2"});
        assert.equal($(testHTML).val(), "2", "2 option selected");

        testHTML = template({"testVal": "text/html"});
        assert.equal($(testHTML).val(), "text/html", "text/html option selected");

        testHTML = template({"testVal": "tick'test"});
        assert.equal($(testHTML).val(), "tick'test", "tick'test option selected");

        testHTML = template({"testVal": "less<test"});
        assert.equal($(testHTML).val(), "less<test", "less<test option selected");

        testHTML = template({"testVal": "and&test"});
        assert.equal($(testHTML).val(), "and&test", "and&test option selected");
    });
});
