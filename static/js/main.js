function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var clock_amounts = 0;
var stapel_clock_amounts = 0;
function add_clock(){
    var diam = document.getElementById("klocka_diameter");
    var weight = document.getElementById("klocka_vikt");
    if(diam.value == null || weight == null || diam.value == "" || weight.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("klock_break");
    var clock = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    cl.value = "klocka";
    del.value = "delete_this(this)"
    clock.setAttributeNode(cl);
    clock.setAttributeNode(del);
    clock_amounts += 1;
    clock.innerHTML = "Klocka ".concat(clock_amounts, ": Diameter : ", diam.value, " Vikt: ", weight.value)
    insertAfter(div, clock);
}
function add_stapel_clock(){
    var diam = document.getElementById("stapel_klocka_diameter");
    var weight = document.getElementById("stapel_klocka_vikt");
    if(diam.value == null || weight == null || diam.value == "" || weight.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("stapel_klock_break");
    var clock = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    cl.value = "stapel_klocka";
    del.value = "delete_this(this)"
    clock.setAttributeNode(cl);
    clock.setAttributeNode(del);
    stapel_clock_amounts += 1;
    clock.innerHTML = "Klocka ".concat(stapel_clock_amounts, ": Diameter : ", diam.value, " Vikt: ", weight.value, "     ✖")
    insertAfter(div, clock);
}
function add_own(){
    var name = document.getElementById("namn_eget");
    var price = document.getElementById("pris_eget");
    var amount = document.getElementById("antal_eget");
    if(name.value == null || price == null || name.value == "" || price.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("eget_break");
    var eget = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var choice = amount.options[amount.selectedIndex].value;
    cl.value = "eget";
    del.value = "delete_this(this)"
    eget.setAttributeNode(cl);
    eget.setAttributeNode(del);
    eget.innerHTML = "Namn: ".concat(name.value, " Pris: ", price.value, " Antal: ", choice, "     ✖")
    insertAfter(div, eget);
}

function add_stapel(){
    var name = document.getElementById("stapel_typ");
    var choice = name.options[name.selectedIndex].value;
    var height = document.getElementById("stapel_höjd");
    if(choice == null || height.value == null || choice == "" || height.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("stapel_break");
    var stapel = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    cl.value = "stapel";
    del.value = "delete_this(this)"
    stapel.setAttributeNode(cl);
    stapel.setAttributeNode(del);
    stapel.innerHTML = "".concat(choice, " Höjd: ", height.value, "m     ✖")
    insertAfter(div, stapel);
}

function add_window(){
    var name = document.getElementById("fönster_typ");
    var choice = name.options[name.selectedIndex].value;
    var height = document.getElementById("fönster_storlek");
    if(choice == null || height.value == null || choice == "" || height.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("fönster_break");
    var window = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    cl.value = "fönster";
    del.value = "delete_this(this)"
    window.setAttributeNode(cl);
    window.setAttributeNode(del);
    window.innerHTML = "".concat(choice, "  ", height.value, "kvm     ✖")
    insertAfter(div, window);
}

function delete_this(el){
    var element = el;
    element.remove();
}
function hide_sum(){
    var x = document.getElementById("sam_form");
    var arrow = document.getElementById("arrow");
    if (x.style.display === "none") {
        x.style.display = "block";
        arrow.src = "/static/content/up.png";
      }
    else {
        x.style.display = "none";
        arrow.src = "/static/content/down.png";
      }
}

function submit(){

}
