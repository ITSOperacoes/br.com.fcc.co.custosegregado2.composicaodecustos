sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("br.com.fcc.co.custosegregado2.composicaodecustos.controller.Main", {

			onInit : function () {
				var oDataModel = this.getView().getModel("oDataModel");
				var oContext = this;
				oDataModel.callFunction("/getCurrentUser", {
					method: "GET",
					urlParameters: {},
					success	: function(oData, res){
						var jsonModel = {
							"Timestamp" : new Date(),
							"Username" : oData.Username,
							"Name" : oData.Name
						}
						var oModel = new JSONModel(jsonModel);
						oContext.getView().setModel(oModel);
					}
				})
			},

			composicaoDeCustos: function(oEvent){

				var poper = this.getView().byId("periodo").getDateValue().getMonth() + 1;
				var bdatj = this.getView().byId("periodo").getDateValue().getFullYear();
				var matnr = this.getView().byId("materialInput").getValue();

				var oDataModel = this.getView().getModel("oDataModel");

				var that = this;
				
				oDataModel.callFunction("/composicaoDeCustos",{
					method: "POST",
					urlParameters: { "poper": poper,"matnr": matnr, "bdatj": bdatj },
					success: function (oData, res) {
						sap.m.MessageToast.show(that.getView().getModel("i18n").getProperty("messageSuccess"));
					},
					error: function(err){
						sap.m.MessageToast.show(that.getView().getModel("i18n").getProperty("messageError"));
					}
				});
			},
		});
	});
