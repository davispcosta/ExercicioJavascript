var budgetController = (function () {

    var Expense = function (value, description) {
        this.value = value;
        this.description = description;
        this.porcentage = (value * 100) / expense;
    }

    var Income = function (value, description) {
        this.value = value;
        this.description = description;
    }

    var allData = {
        exp: {
            list: [],
            total: 0,
            porcentage: 0
        },
        inc: {
            list: [],
            total: 0
        }
    }

    function getBudget() {
        return allData.inc.total - allData.exp.total;
    }

    return {
        newInput: function (inputs) {

            if (inputs.type === "inc") {
                var object = new Income(inputs.value, inputs.description);
            } else {
                var object = new Expense(inputs.value, inputs.description);
            }

            allData[inputs.type].total += parseFloat(inputs.value);
            allData[inputs.type].list.push(object);
            var index = allData[inputs.type].list.length - 1;

            return {
                income: allData.inc.total,
                expense: allData.exp.total,
                budget: getBudget(),
                index: index,
                type: inputs.type,
                value: inputs.value,
                description: inputs.description
            }
        },
        removeFromList: function (infos) {
            allData[infos.type].total -= infos.value;
            allData[infos.type][infos.index] = null;
        },
        getUpdateData: function () {
            return {
                income: allData.inc.total,
                expense: allData.exp.total,
                budget: getBudget()
            }
        }
    }

})();

var UiController = (function () {

    uiStrings = {
        inc: {
            divIndex: "income-",
            btnClass: ".income-btn-"
        },
        exp: {
            divIndex: "expense-",
            btnClass: ".expense-btn-"
        }
    }

    function addIncomeOnList(infos) {
        var list = document.querySelector(".income__list");

        var entry = '<div class="item clearfix" id="income-' + infos.index + '">'
            + '<div class="item__description">' + infos.description + '</div>'
            + '<div class="right clearfix">'
            + '<div class="item__value">+ ' + infos.value + '</div>'
            + '<div class="item__delete">'
            + '<button class="item__delete--btn income-btn-' + infos.index + '"><i class="ion-ios-close-outline"></i></button>'
            + '</div>'
            + '</div>'
            + '</div>'
        list.insertAdjacentHTML('beforeend', entry);
    }

    function addExpenseOnList(infos) {
        var list = document.querySelector(".expenses__list");

        var entry = '<div class="item clearfix" id="expense-' + infos.index + '">'
            + '<div class="item__description">' + infos.description + '</div>'
            + '<div class="right clearfix">'
            + '<div class="item__value">- ' + infos.value + '</div>'
            + '<div class="item__percentage">21%</div>'
            + '<div class="item__delete">'
            + '<button class="item__delete--btn expense-btn-' + infos.index + '"><i class="ion-ios-close-outline"></i></button>'
            + '</div>'
            + '</div>'
            + '</div>'
        list.insertAdjacentHTML('beforeend', entry);
    }

    return {
        getInputs: function () {
            return {
                type: document.querySelector(".add__type").value,
                description: document.querySelector(".add__description").value,
                value: parseFloat(document.querySelector(".add__value").value)
            }
        },
        updateHeaderInfo: function (values) {
            document.querySelector(".budget__income--value").innerHTML = values.income;
            document.querySelector(".budget__expenses--value").innerHTML = values.expense;
            document.querySelector(".budget__value").innerHTML = values.budget;
        },
        newOnList: function (infos) {
            if (infos.type === "inc") {
                addIncomeOnList(infos);
            } else {
                addExpenseOnList(infos);
            }
        },
        removeFromList: function (index) {
            var elem = document.getElementById(index);
            elem.parentNode.removeChild(elem);
        },
        getStrings: function () {
            return uiStrings;
        }
    }

})();

var controller = (function (budgetCtrl, uiCtrl) {

    document.querySelector(".add__btn").addEventListener("click", function () {
        var inputs = uiCtrl.getInputs();
        var infos = budgetCtrl.newInput(inputs);

        uiCtrl.newOnList(infos);
        uiCtrl.updateHeaderInfo(infos);
        uiStrings = uiCtrl.getStrings();

        document.querySelector(uiStrings[inputs.type].btnClass + infos.index).addEventListener("click", function () {
            uiCtrl.removeFromList(uiStrings[inputs.type].divIndex + infos.index);
            budgetCtrl.removeFromList(infos);
            uiCtrl.updateHeaderInfo(budgetCtrl.getUpdateData());
        });
    });

})(budgetController, UiController);