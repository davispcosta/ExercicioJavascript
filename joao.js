document.getElementById("add_btn").addEventListener("click", function() {
    var type = document.querySelector(".add__type").value;
    var description = document.querySelector(".add__description").value;
    var value = parseFloat(document.querySelector(".add__value").value);
    
    var budget = parseFloat(document.querySelector(".budget__value").innerHTML);
    if(type === "inc") {
        var income = parseFloat(document.querySelector(".budget__income--value").innerHTML);
        
        income = income + value;
        budget = budget + value;
        document.querySelector(".budget__income--value").innerHTML = income;
    } else {
        var expense = parseFloat(document.querySelector(".budget__expenses--value").innerHTML);
        expense = expense + value;
        budget = budget - value;
        document.querySelector(".budget__expenses--value").innerHTML = expense;
    }

    document.querySelector(".budget__value").innerHTML = budget;
});