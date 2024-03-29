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
    "jquery",
    "qunit",
    "form2js",
    "js2form"
], function ($, QUnit, form2js, js2form) {
    QUnit.module('form2js usage');

    QUnit.test("boolean fields", function (assert) {
        var form = $('<form><input type="checkbox" value="true" name="testBool"></form>')

        $("#qunit-fixture").append(form);

        js2form(form[0], {testBool: true});
        assert.equal(form.find("[name=testBool]").prop("checked"), true);
        assert.equal(form2js(form[0]).testBool, true);

        js2form(form[0], {testBool: false});
        assert.equal(form.find("[name=testBool]").prop("checked"), false);
        assert.equal(form2js(form[0]).testBool, false);
    });

});
