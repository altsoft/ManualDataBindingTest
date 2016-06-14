/**
 * 
 * @author jskonst
 */
define(['orm', 'forms', 'ui', 'environment', 'forms/label', 'invoke', 'logger', 'Widgets', 'Data',
    'forms/service-grid-column', 'forms/model-grid-column', 'forms/model-date', 'forms/model-check-box',
    'forms/model-formatted-field', 'forms/model-spin'],
        function (Orm, Forms, Ui, Env, Label, Invoke, Logger, Widgets, Data,
                ServiceGridColumn, ModelGridColumn, ModelDate,
                ModelCheckBox, ModelFormattedField, ModelSpin, ModuleName) {
            function module_constructor() {
                var self = this
                        , model = Orm.loadModel(ModuleName)
                        , form = Forms.loadForm(ModuleName, model);
                var lbLoad = new Label();
                lbLoad.width = 200;
                lbLoad.height = 200;
                var hMargin = 10;
                var vMargin = 10;
                var tabTitleHeight = 50;
                Ui.Icon.load('icons/loading5.gif', function (data) {
                    lbLoad.icon = data;
                    lbLoad.text = null;
                });
                form.grdWidgets.data = Widgets;
                form.grdWidgets.column.field = "name";
                form.grdWidgets.headerVisible = false;
                form.grdWidgets.showHorizontalLines = false;
                form.grdWidgets.showVerticalLines = false;
                form.grdWidgets.showOddRowsInOtherColor = false;
                var grid = form.modelGrid;
                grid.data = Data;
                grid.addColumnNode(new ServiceGridColumn());
                var colFirstName = new ModelGridColumn();
                colFirstName.title = "First Name";
                colFirstName.minWidth = 100;
                colFirstName.sortable = true;
                colFirstName.field = 'firstName';
                colFirstName.editor = new ModelFormattedField();
                var colLastName = new ModelGridColumn();
                colLastName.title = "Last Name";
                colLastName.minWidth = 100;
                colLastName.sortable = true;
                colLastName.field = 'lastName';
                colLastName.editor = new ModelFormattedField();
                var colEMail = new ModelGridColumn();
                colEMail.title = "E-mail";
                colEMail.minWidth = 100;
                colEMail.sortable = true;
                colEMail.field = 'eMail';
                colEMail.editor = new ModelFormattedField();
                var colDateFrom = new ModelGridColumn();
                colDateFrom.title = "Date From";
                colDateFrom.minWidth = 100;
                colDateFrom.sortable = true;
                colDateFrom.field = 'dateFrom';
                colDateFrom.editor = new ModelDate();
                var colDateTo = new ModelGridColumn();
                colDateTo.title = "Date To";
                colDateTo.minWidth = 100;
                colDateTo.sortable = true;
                colDateTo.field = 'dateTo';
                colDateTo.editor = new ModelDate();
                var colCost = new ModelGridColumn();
                colCost.title = "Cost";
                colCost.minWidth = 100;
                colCost.sortable = true;
                colCost.field = 'cost';
                colCost.editor = new ModelSpin();
                var colPaid = new ModelGridColumn();
                colPaid.title = "Is Paid";
                colPaid.minWidth = 30;
                colPaid.sortable = true;
                colPaid.field = 'isPaid';
                colPaid.editor = new ModelCheckBox();
                grid.addColumnNode(colFirstName);
                grid.addColumnNode(colLastName);
                grid.addColumnNode(colEMail);
                grid.addColumnNode(colDateFrom);
                grid.addColumnNode(colDateTo);
                grid.addColumnNode(colCost);
                grid.addColumnNode(colPaid);
                form.grdWidgets.column.onRender = function (event) {
                    if (event.object.icon) {
                        if (event.object.loadedIcon)
                            event.cell.icon = event.object.loadedIcon;
                        else {
                            Ui.Icon.load(event.object.icon, function (aLoaded) {
                                event.cell.icon = aLoaded;
                                event.object.loadedIcon = aLoaded;
                            });
                        }
                    }
                };
                form.grdWidgets.onMouseClicked = function (event) {
                    if (event.clickCount === 1) {
                        form.grdWidgets.toggle(form.grdWidgets.selected[0]);
                    }
                };

                form.grdWidgets.onItemSelected = function (event) {
                    var w = Math.round(form.pnlWidget.width / 2 - 100);
                    form.pnlWidget.clear(); //Clean demo components place
                    form.pnlWidget.height = lbLoad.height + 2 * hMargin;
                    form.pnlWidget.add(lbLoad, {left: w,
                        width: 200,
                        right: w,
                        top: hMargin,
                        height: 200,
                        bottom: hMargin});
                    lbLoad.visible = true;

                    require(form.grdWidgets.selected[0].module, function (modelWidget) {
                        if (!form.grdWidgets.selected[0].widget) {
                            form.grdWidgets.selected[0].widget = new modelWidget();
                        }

                        form.mcField.displayList = form.grdWidgets.selected[0].bindFields;
                        form.mcField.displayField = 'field';
                        form.mcField.value = form.grdWidgets.selected[0].bindFields[0];
                        form.grdWidgets.selected[0].widget.data = grid.data;
                        form.pnlWidget.clear();
                        form.pnlWidget.add(form.grdWidgets.selected[0].widget, {left: 10,
                            width: form.grdWidgets.selected[0].width,
                            right: 10,
                            top: 10,
                            height: form.grdWidgets.selected[0].height,
                            bottom: 10});

                    });
                };

                form.mcField.onValueChange = function () {
                    if (form.mcField.value) {
                        form.grdWidgets.selected[0].field = form.mcField.value.field;
                    }
                };

                form.btnAdd.onActionPerformed = function () {
                    grid.data.push({});
                };

                form.btnDelete.onActionPerformed = function (event) {
                    if (confirm("Delete?")) {
                        for (var i in form.modelGrid.selected) {
                            grid.data.splice(grid.data.indexOf(grid.selected[i]), 1);
                        }
                    }
                };

                self.show = function () {
                    if (Env.agent === Env.HTML5) {
                        form.view.showOn(document.getElementById('Main'));
                        Invoke.later(function () {
                            form.grdWidgets.select(Widgets[0]);
                            var loadingProgress = document.getElementById('LoadingProgress');
                            loadingProgress.parentNode.removeChild(loadingProgress);
                        });
                    } else {
                        form.show();
                        Invoke.later(function () {
                            form.maximize();
                        });
                    }
                };
            }
            return module_constructor;
        });