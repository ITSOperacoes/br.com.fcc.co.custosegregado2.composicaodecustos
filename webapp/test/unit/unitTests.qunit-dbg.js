/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"brcom.fcc.co.custosegregado2./composicaodecustos/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
