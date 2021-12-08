//THINGS TO LOAD
var pillar_prices = {"Typ 1" : 37879, "Typ 2": 89531, "Typ 3": 261706};
var BPI = 42870;
var platform_price = 5165;
var win_values = {"Typ 1" : 18078, "Typ 2" : 49931, "Typ 3": 86088};
var decoration = {"Enkel": 0.30, "Någon påkostad": 0.50, "Påkostad": 0.70}
//var win_types = ["Typ 1", "Typ 2", "Typ 3"];
var moms = 1.25;
var klock_kg = 400;
var mount_clock = 25826;
var pris_klock = 43044;
var pris_torn = 43044;
var benches = {"Enkla" : 3000, "Påkostade" : 4800};
var chairs = {"Enkla" : 1400, "Påkostade" : 3000};
var pianos = {"Kororgel" : 190000, "Läktarorgel" : 235000};
var spec_prices = {"altargrund": 172175, "altare": 430438, "altaruppstas_enkel": 1205225, "altaruppstas_påkostad": 1205225, "altaruppstas_mycket": 1205225, "dopfunt": 258263,
                    "predikstol_enkel": 1033050, "predikstol_påkostad": 1033050, "predikstol_mycket": 1033050, "ljuskronor_under": 137740, "ljuskronor_över": 137740};
var bases = {"Sten" : 12, "Trä" : 8};
var building_parts = {"Klockor" : 500000, "Orgel" : 100000, "Stämmor" : 100000, "Mosaikfönster" : 500000};
var restoration = {"Budget" : 0.8, "Standard" : 1.0, "Exklusivt" : 2.0};
var roof_riders = {"Höjd 0-3 m": 111914, "Höjd 3-6 m": 223828, "Höjd >6m": 568178};
var categories = {};
var fials = {"0-3m": 111914, ">3m": 223828};
var bpi_risk = 33592;
var raze = 250000;
var factor = 2.0;

//THINGS THAT INCREMENT
var clock_amounts = 0;
var stapel_clock_amounts = 0;

var selected = "none";

function switch_tab(new_tab){
    pages = document.getElementsByClassName("pages");
    document.getElementById("legend").style.display ="none";
    for(var i = 0; i < pages.length; i++){
        pages[i].style.display = 'none';
    }
    document.getElementById(new_tab).style.display = 'flex';
    if(new_tab == "form"){
        document.getElementById("legend").style.display ="flex";
    }
}

function loadJSON(name){
    var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "static/data/".concat(name, ".json"),
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
}

function send_json(json, name){
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(json),
        dataType: 'json',
        url: '/import_json/'.concat(name),
        success: function (e) {
            console.log(e);
        },
        error: function(error) {
            console.log(error);
        }
     });
}

function load_values(){
    json = loadJSON("misc");
    pillar_prices = JSON.parse(json["pillar_prices"]);
    BPI = JSON.parse(json["BPI"]);
    platform_price = JSON.parse(json["platform_price"]);
    win_values = JSON.parse(json["win_values"]);
    moms = JSON.parse(json["moms"]);
    klock_kg = JSON.parse(json["klock_kg"]);
    mount_clock = JSON.parse(json["mount_clock"]);
    pris_klock = JSON.parse(json["pris_klock"]);
    pris_torn = JSON.parse(json["pris_torn"]);
    benches = JSON.parse(json["benches"]);
    chairs = JSON.parse(json["chairs"]);
    pianos = JSON.parse(json["pianos"]);
    spec_prices = JSON.parse(json["spec_prices"]);
    decoration = JSON.parse(json["decoration"]);
    categories = JSON.parse(json["categories"]);
}

function get_bra(id, selector){
    var bra = document.getElementById(id);
    var choice = get_value(selector);
    var json = loadJSON("churches");
    //if (test_reg(choice) == true){
        //REMEMBER TO REMOVE
    //    location.href = 'https://jesperls.github.io';
    //}
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if(choice == json[key]["Enhetsnamn"].concat(" ", json[key]["Byggnadsverksnamn"])){
                bra.value = json[key]["Bruksarea(m²)"];
                alert("Dubbelkolla så att BRA värdet är rimligt!");
                update();
                return;
            }
        }
    }
}

//function test_reg(input) {
//    let regex = /^I\sL[a-zA-Z][a-zA-Z]E\sS[a-zA-Z][a-zA-Z]AN\s6+$/i;
//    return regex.test(input);
//}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function add_clock(do_update = 1){
    var weight = document.getElementById("klocka_vikt").value;
    if(document.getElementById("only_weight").checked){
        var x = document.getElementById("klocka_diam").value;
        weight = Math.round(8.02127 * Math.pow(10,-7) * Math.pow(x, 2.9643694));
        if (weight <= 1){
            alert("Värdet du angivit är väldigt lågt!");
            return;
        }
    }
    if(weight == null || weight.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("klock_break");
    var clock = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var att_value = document.createAttribute("value");
    att_value.value = weight;
    clock.setAttributeNode(att_value);
    cl.value = "klocka";
    del.value = "delete_this(this)"
    clock.setAttributeNode(cl);
    clock.setAttributeNode(del);
    clock_amounts += 1;
    clock.innerHTML = "<b>Klocka</b> ".concat(clock_amounts, " <b>Vikt:</b> ", weight, "     ✖")
    insertAfter(div, clock);
    if (do_update == 1){
        update();
    }
}

function add_stapel_clock(do_update = 1){
    var weight = document.getElementById("stapel_klocka_vikt").value;
    if(document.getElementById("only_weight_stapel").checked){
        var x = document.getElementById("stapel_klocka_diam").value;
        weight = Math.round(8.0212675425928 * Math.pow(10,-7) * Math.pow(x, 2.96436941116879));
        if (weight <= 1){
            alert("Värdet du angivit är väldigt för lågt!");
            return;
        }
    }
    if(weight == null || weight.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("stapel_klock_break");
    var clock = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var att_value = document.createAttribute("value");
    att_value.value = weight;
    clock.setAttributeNode(att_value);
    cl.value = "stapel_klocka";
    del.value = "delete_this(this)"
    clock.setAttributeNode(cl);
    clock.setAttributeNode(del);
    stapel_clock_amounts += 1;
    clock.innerHTML = "<b>Klocka</b> ".concat(stapel_clock_amounts," <b>Vikt:</b> ", weight, "     ✖")
    insertAfter(div, clock);
    if (do_update == 1){
        update();
    }
}

function add_own(do_update = 1){
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
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    var att_type = document.createAttribute("type");
    att_value.value = price.value;
    att_name.value = amount.value;
    att_type.value = get_value("namn_eget");
    eget.setAttributeNode(att_name);
    eget.setAttributeNode(att_value);
    eget.setAttributeNode(att_type);
    var choice = amount.options[amount.selectedIndex].value;
    cl.value = "eget";
    del.value = "delete_this(this)"
    eget.setAttributeNode(cl);
    eget.setAttributeNode(del);
    eget.innerHTML = "<b>Namn:</b> ".concat(name.value, " <b>Pris:</b> ", price.value, " <b>Antal:</b> ", choice, "     ✖")
    insertAfter(div, eget);
    if (do_update == 1){
        update();
    }
}

function add_window(do_update = 1){
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
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = height.value;
    att_name.value = choice;
    cl.value = "fönster";
    del.value = "delete_this(this)"
    window.setAttributeNode(cl);
    window.setAttributeNode(del);
    window.setAttributeNode(att_name);
    window.setAttributeNode(att_value);
    window.innerHTML = "".concat(choice, "  ", height.value, "kvm     ✖")
    insertAfter(div, window);
    if (do_update == 1){
        update();
    }
}

function add_window_2(do_update = 1){
    var name = document.getElementById("fönster_typ_2");
    var choice = name.options[name.selectedIndex].value;
    var height = document.getElementById("fönster_storlek_2");
    if(choice == null || height.value == null || choice == "" || height.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("fönster_break_2");
    var window = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = height.value;
    att_name.value = choice;
    cl.value = "fönster_2";
    del.value = "delete_this(this)"
    window.setAttributeNode(cl);
    window.setAttributeNode(del);
    window.setAttributeNode(att_name);
    window.setAttributeNode(att_value);
    window.innerHTML = "".concat(choice, "  ", height.value, "kvm     ✖")
    insertAfter(div, window);
    if (do_update == 1){
        update();
    }
}

function add_rider(do_update = 1){
    var name = document.getElementById("takryttare");
    var choice = name.options[name.selectedIndex].value;
    var amount = document.getElementById("takryttare_antal");
    if(choice == null || amount.value == null || choice == "" || amount.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("takryttare_break");
    var rider = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = amount.value;
    att_name.value = choice;
    cl.value = "ryttare";
    del.value = "delete_this(this)"
    rider.setAttributeNode(cl);
    rider.setAttributeNode(del);
    rider.setAttributeNode(att_name);
    rider.setAttributeNode(att_value);
    rider.innerHTML = "".concat(choice, "  ", "Antal: ", amount.value, "     ✖")
    insertAfter(div, rider);
    if (do_update == 1){
        update();
    }
}

function add_fial(do_update = 1){
    var name = document.getElementById("fial");
    var choice = name.options[name.selectedIndex].value;
    var amount = document.getElementById("fial_antal");
    if(choice == null || amount.value == null || choice == "" || amount.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("fial_break");
    var fial = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = amount.value;
    att_name.value = choice;
    cl.value = "fial";
    del.value = "delete_this(this)"
    fial.setAttributeNode(cl);
    fial.setAttributeNode(del);
    fial.setAttributeNode(att_name);
    fial.setAttributeNode(att_value);
    fial.innerHTML = "".concat(choice, "  ", "Antal: ", amount.value, "     ✖")
    insertAfter(div, fial);
    if (do_update == 1){
        update();
    }
    //
}

function clock_weigth(checkbox, stapel){
    if(checkbox.checked == true){
        document.getElementById("has_weight".concat(stapel)).style.display = "none";
        document.getElementById("no_weigth".concat(stapel)).style.display = "inline";
    }
    else{
        document.getElementById("has_weight".concat(stapel)).style.display = "inline";
        document.getElementById("no_weigth".concat(stapel)).style.display = "none";
    }
}

function delete_this(el, do_update = 1){
    var element = el;
    element.remove();
    if (do_update == 1){
        update();
    }
}

function hide_sum(form_name, arrow_name){
    var x = document.getElementById(form_name);
    var arrow = document.getElementById(arrow_name);
    if (x.style.display === "none") {
        x.style.display = "block";
        arrow.src = "/static/content/up.png";
    }
    else {
        x.style.display = "none";
        arrow.src = "/static/content/down.png";
    }
}

function get_factor(id, json_name, second_id=null){
    var selected = document.getElementById(id);
    var choice = selected.options[selected.selectedIndex].value;
    var json = loadJSON(json_name)
    if (second_id != null){
        var selected_two = document.getElementById(second_id);
        var choice_two = selected_two.options[selected_two.selectedIndex].value;
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key]["Beskrivning"] == choice){
                    return json[key][choice_two.concat("_faktor")]
                }
            }
        }
    }
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (json[key]["Beskrivning"] == choice){
                return json[key].Faktor
            }
        }
    }
}

function get_tower(id, json_name, height){
    var choice = get_choice(id);
    var json = loadJSON(json_name)
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (json[key]["Beskrivning"] == choice){
                if(height < 4){
                    return json[key]["Pris2_4"]
                }
                else if(height <= 12){
                    return json[key]["Pris2_4_12"]
                }
                else if (height <= 20){
                    return json[key]["Pris2_12_20"]
                }
                else{
                    return json[key]["Pris2_20"]
                }
            }
        }
    }
}

function get_choice(id){
    var element = document.getElementById(id);
    return(element.options[element.selectedIndex].value);
}

function get_value(id){
    return document.getElementById(id).value;
}

function show_pictures(id){
    var boxes = document.getElementsByClassName("picture_box"); 
    for(var i = 0; i < boxes.length; i++){
        boxes[i].style.display = "none";
    }
    if(id != null){
        document.getElementById(id).style.display = "flex";
    }
}

function checkFileExist(urlToFile){
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

//Converts the current values to a JSON file
function export_church(){
    if (get_value("church_choice") == "" || get_value("church_choice") == null){
        return;
    }
    if (checkFileExist("/static/saved/".concat(get_value("church_choice"), ".json")) == true){ 
        if (confirm("Det finns redan en sparad kyrka vid samma namn, är du säker på att du vill spara över den?") == false){
            return;
        }
    }
    var export_data = {}
    if (selected == "raze"){
        export_data["Type"] = "raze";
    }
    else if (selected == "modify"){
        export_data["Type"] = "modify";
    }
    else if (selected == "own"){
        export_data["Type"] = "own";
    }
    else{
        export_data["Type"] = "none";
    }
    export_data["Namn"] = get_value("church_choice");
    export_data["BRA"] = get_value("BRA");
    export_data["Utsmyckning"] = get_choice("utsmyckning");
    var building = {};
    building["Vägg"] = get_choice("vägg");
    building["Golv"] = get_choice("golv");
    building["Innertak"] = {"Namn": get_choice("innertak"), "Typ": get_choice("innertak_andra")};
    building["Yttertak"] = {"Namn": get_choice("yttertak"), "Typ": get_choice("yttertak_andra")};
    building["Läktare"] = get_value("läktare");
    building["Byggnadstyp"] = get_choice("kategori");
    var windows = document.getElementsByClassName("fönster");
    var windows_json = {"Mängd": windows.length};
    for (var i = 0; i < windows.length; i++) {
        windows_json[i] = {"Typ" : windows[i].attributes["name"].value, "Area": windows[i].attributes["value"].value};
    }
    building["Fönster"] = windows_json;
    //building["Takryttare"] = {"Pris": get_value("takryttare"), "Antal": get_choice("takryttare_antal")};
    var roof_riders = document.getElementsByClassName("ryttare");
    var roof_riders_json = {"Mängd": roof_riders.length};
    for (var i = 0; i < roof_riders.length; i++) {
        roof_riders_json[i] = {"Typ" : roof_riders[i].attributes["name"].value, "Antal": roof_riders[i].attributes["value"].value};
    }
    building["Takryttare"] = roof_riders_json;

    export_data["Byggnad"] = building;

    var tower = {};
    tower["Mått Tornbyggnad"] = {"Bredd": get_value("torn_bredd"), "Längd": get_value("torn_längd")};
    tower["Vägg"] = get_choice("torn_vägg");
    tower["Golv"] = get_choice("torn_golv");
    tower["Torntak"] = {"Typ": get_choice("torn_tak"), "Höjd": get_value("tak_höjd"), "Bredd": get_value("tak_bredd"), "Längd": get_value("tak_längd"), "Antal": get_choice("tak_antal")};
    var windows = document.getElementsByClassName("fönster_2");
    var windows_json = {"Mängd": windows.length};
    for (var i = 0; i < windows.length; i++) {
        windows_json[i] = {"Typ" : windows[i].attributes["name"].value, "Area": windows[i].attributes["value"].value};
    }
    tower["Fönster"] = windows_json;
    //tower["Fial"] = {"Pris": get_value("fial_pris"), "Antal": get_choice("fial_antal")};
    var fials = document.getElementsByClassName("fial");
    var fials_json = {"Mängd": fials.length};
    for (var i = 0; i < fials.length; i++) {
        fials_json[i] = {"Typ" : fials[i].attributes["name"].value, "Antal": fials[i].attributes["value"].value};
    }
    tower["Fialer"] = fials_json;
    export_data["Torn"] = tower;

    var accessories = {};
    var clocks = document.getElementsByClassName("klocka");
    var clocks_json = {"Mängd": clocks.length};
    for (var i = 0; i < clocks.length; i++) {
        clocks_json[i] = {"Vikt": clocks[i].attributes["value"].value};
    }
    accessories["Klockor"] = clocks_json;
    accessories["Tornur"] = get_choice("tornur");
    accessories["Bänkar"] = {"Enkla": get_value("bänkar_enkla"), "Påkostade": get_value("bänkar_påkostade")};
    accessories["Stolar"] = {"Enkla": get_value("stolar_enkla"), "Påkostade": get_value("stolar_påkostade")};
    accessories["Orgel"] = {"Kororgel": get_value("kororgel"), "Läktarorgel": get_value("läktarorgel")};
    export_data["Tillbehör"] = accessories;

    var special = {};
    special["Altargrund"] = get_choice("altargrund");
    special["Altare"] = get_choice("altare");
    special["Altaruppstas enkel"] = get_choice("altaruppstas_enkel");
    special["Altaruppstas påkostad"] = get_choice("altaruppstas_påkostad");
    special["Altaruppstas mycket"] = get_choice("altaruppstas_mycket");
    special["Dopfunt"] = get_choice("dopfunt");
    special["Predikstol enkel"] = get_choice("predikstol_enkel");
    special["Predikstol påkostad"] = get_choice("predikstol_påkostad");
    special["Predikstol mycket"] = get_choice("predikstol_mycket");
    special["Ljuskronor över"] = get_choice("ljuskronor_över");
    special["Ljuskronor under"] = get_choice("ljuskronor_under");
    var own = document.getElementsByClassName("eget");
    var own_json = {"Mängd": own.length};
    for (var i = 0; i < own.length; i++) {
        own_json[i] = {"Namn" : own[i].attributes["type"].value, "Pris": own[i].attributes["value"].value, "Antal" : own[i].attributes["name"].value};
    }
    special["Egna tillägg"] = own_json;
    export_data["Särskilt värderade"] = special;
    
    var pillar = {};
    pillar["Klockstapel"] = {"Typ": get_choice("stapel_typ"), "Höjd": get_value("stapel_höjd")};
    var clocks = document.getElementsByClassName("stapel_klocka");
    var clocks_json = {"Mängd": clocks.length};
    for (var i = 0; i < clocks.length; i++) {
        clocks_json[i] = {"Vikt": clocks[i].attributes["value"].value};
    }
    pillar["Klockor"] = clocks_json;
    export_data["Klockstapel"] = pillar;

    var sums = {};
    sums["Byggnad"] = parseInt(document.getElementById("sam_byggnad").innerHTML);
    sums["Utsmyckning"] = parseInt(document.getElementById("sam_decoration").innerHTML);
    sums["Byggnadstillbehör"] = parseInt(document.getElementById("sam_btillbehör").innerHTML);
    sums["Särskilt värderade"] = parseInt(document.getElementById("sam_särskilt").innerHTML);
    sums["Klockstapel"] = parseInt(document.getElementById("sam_stapel").innerHTML);
    sums["Kalkylerat värde"] = parseInt(document.getElementById("sum").innerHTML);
    export_data["Summor"] = sums;
    
    var risk = {};
    risk["Rivning"] = document.getElementById("rivning").checked;
    risk["Dyra tillbehör"] = document.getElementById("expensive_inventory").checked;
    risk["Ny kvm"] = get_value("other_kvm");
    risk["Återställningsgrad"] = get_choice("material_risk");
    //risk["Annat belopp"] = get_value("own_value");
    export_data["Risk"] = risk;

    send_json(export_data, "export");
}

//Loads in a previously saved church by name
function load_previous(){
    var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "static/saved/".concat(get_value("church_choice"), ".json"),
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
    var objects = [document.getElementsByClassName("fönster"), document.getElementsByClassName("ryttare"), document.getElementsByClassName("fönster_2"),
                    document.getElementsByClassName("fial"), document.getElementsByClassName("eget"),
                    document.getElementsByClassName("stapel_klocka"), document.getElementsByClassName("klocka")];
    var obj_lens = [objects[0].length, objects[1].length, objects[2].length, objects[3].length, objects[4].length, objects[5].length, objects[6].length];
    for (var i = 0; i < objects.length; i++){
        for(var j = 0; j < obj_lens[i]; j++){
            delete_this(objects[i][0], 0);
        }
    }
    clock_amounts = 0;
    stapel_clock_amounts = 0;
    document.getElementById("BRA").value = json["BRA"];
    document.getElementById("utsmyckning").value = json["Utsmyckning"];

    document.getElementById("kategori").value = json["Byggnad"]["Byggnadstyp"]
    document.getElementById("vägg").value = json["Byggnad"]["Vägg"];
    document.getElementById("golv").value = json["Byggnad"]["Golv"];
    document.getElementById("innertak").value = json["Byggnad"]["Innertak"]["Namn"];
    document.getElementById("innertak_andra").value = json["Byggnad"]["Innertak"]["Typ"];
    document.getElementById("yttertak").value = json["Byggnad"]["Yttertak"]["Namn"];
    document.getElementById("yttertak_andra").value = json["Byggnad"]["Yttertak"]["Typ"];
    document.getElementById("läktare").value = json["Byggnad"]["Läktare"];
    for(var i = 0; i < json["Byggnad"]["Fönster"]["Mängd"]; i++){
        document.getElementById("fönster_typ").value = json["Byggnad"]["Fönster"][i]["Typ"];
        document.getElementById("fönster_storlek").value = json["Byggnad"]["Fönster"][i]["Area"];
        add_window(0);
    }
    //document.getElementById("takryttare").value = json["Byggnad"]["Takryttare"]["Pris"];
    //document.getElementById("takryttare_antal").value = json["Byggnad"]["Takryttare"]["Antal"];
    for(var i = 0; i < json["Byggnad"]["Takryttare"]["Mängd"]; i++){
        document.getElementById("takryttare").value = json["Byggnad"]["Takryttare"][i]["Typ"];
        document.getElementById("takryttare_antal").value = json["Byggnad"]["Takryttare"][i]["Antal"];
        add_rider(0);
    }
    document.getElementById("torn_bredd").value = json["Torn"]["Mått Tornbyggnad"]["Bredd"];
    document.getElementById("torn_längd").value = json["Torn"]["Mått Tornbyggnad"]["Längd"];
    document.getElementById("torn_vägg").value = json["Torn"]["Vägg"];
    document.getElementById("torn_golv").value = json["Torn"]["Golv"];
    document.getElementById("torn_tak").value = json["Torn"]["Torntak"]["Typ"];
    document.getElementById("tak_höjd").value = json["Torn"]["Torntak"]["Höjd"];
    document.getElementById("tak_bredd").value = json["Torn"]["Torntak"]["Bredd"];
    document.getElementById("tak_längd").value = json["Torn"]["Torntak"]["Längd"];
    document.getElementById("tak_antal").value = json["Torn"]["Torntak"]["Antal"];
    for(var i = 0; i < json["Torn"]["Fönster"]["Mängd"]; i++){
        document.getElementById("fönster_typ_2").value = json["Torn"]["Fönster"][i]["Typ"];
        document.getElementById("fönster_storlek_2").value = json["Torn"]["Fönster"][i]["Area"];
        add_window_2(0);
    }
    //document.getElementById("fial_pris").value = json["Torn"]["Fial"]["Pris"];
    //document.getElementById("fial_antal").value = json["Torn"]["Fial"]["Antal"];
    for(var i = 0; i < json["Torn"]["Fialer"]["Mängd"]; i++){
        document.getElementById("fial").value = json["Torn"]["Fialer"][i]["Typ"];
        document.getElementById("fial_antal").value = json["Torn"]["Fialer"][i]["Antal"];
        add_fial(0);
    }

    for(var i = 0; i < json["Tillbehör"]["Klockor"]["Mängd"]; i++){
        document.getElementById("klocka_vikt").value = json["Tillbehör"]["Klockor"][i]["Vikt"];
        add_clock(0);
    }
    document.getElementById("tornur").value = json["Tillbehör"]["Tornur"];
    document.getElementById("bänkar_enkla").value = json["Tillbehör"]["Bänkar"]["Enkla"];
    document.getElementById("bänkar_påkostade").value = json["Tillbehör"]["Bänkar"]["Påkostade"];
    document.getElementById("stolar_enkla").value = json["Tillbehör"]["Stolar"]["Enkla"];
    document.getElementById("stolar_påkostade").value = json["Tillbehör"]["Stolar"]["Påkostade"];
    document.getElementById("kororgel").value = json["Tillbehör"]["Orgel"]["Kororgel"];
    document.getElementById("läktarorgel").value = json["Tillbehör"]["Orgel"]["Läktarorgel"];

    document.getElementById("altargrund").value = json["Särskilt värderade"]["Altargrund"];
    document.getElementById("altare").value = json["Särskilt värderade"]["Altare"];
    document.getElementById("altaruppstas_enkel").value = json["Särskilt värderade"]["Altaruppstas enkel"];
    document.getElementById("altaruppstas_påkostad").value = json["Särskilt värderade"]["Altaruppstas påkostad"];
    document.getElementById("altaruppstas_mycket").value = json["Särskilt värderade"]["Altaruppstas mycket"];
    document.getElementById("dopfunt").value = json["Särskilt värderade"]["Dopfunt"];
    document.getElementById("predikstol_enkel").value = json["Särskilt värderade"]["Predikstol enkel"];
    document.getElementById("predikstol_påkostad").value = json["Särskilt värderade"]["Predikstol påkostad"];
    document.getElementById("predikstol_mycket").value = json["Särskilt värderade"]["Predikstol mycket"];
    document.getElementById("ljuskronor_under").value = json["Särskilt värderade"]["Ljuskronor under"];
    document.getElementById("ljuskronor_över").value = json["Särskilt värderade"]["Ljuskronor över"];
    for(var i = 0; i < json["Särskilt värderade"]["Egna tillägg"]["Mängd"]; i++){
        document.getElementById("namn_eget").value = json["Särskilt värderade"]["Egna tillägg"][i]["Namn"];
        document.getElementById("pris_eget").value = json["Särskilt värderade"]["Egna tillägg"][i]["Pris"];
        document.getElementById("antal_eget").value = json["Särskilt värderade"]["Egna tillägg"][i]["Antal"];
        add_own(0);
    }

    document.getElementById("stapel_typ").value = json["Klockstapel"]["Klockstapel"]["Typ"];
    document.getElementById("stapel_höjd").value = json["Klockstapel"]["Klockstapel"]["Höjd"];
    for(var i = 0; i < json["Klockstapel"]["Klockor"]["Mängd"]; i++){
        document.getElementById("stapel_klocka_vikt").value = json["Klockstapel"]["Klockor"][i]["Vikt"];
        add_stapel_clock(0);
    }
    document.getElementById("rivning").checked = json["Risk"]["Rivning"];
    document.getElementById("other_kvm").value = json["Risk"]["Ny kvm"];
    document.getElementById("material_risk").value = json["Risk"]["Återställningsgrad"];
    //document.getElementById("own_value").value = json["Risk"]["Annat belopp"];
    document.getElementById("expensive_inventory").checked = json["Risk"]["Dyra tillbehör"];

    selected = "none";
    if(json["Type"] != "none"){
        risk_menu(json["Type"]);
    }
    else{
        update();
    }
}

//Updates the "Sammanställning" box
function update(){
    var total = 0;
    var building = update_building();
    total += building;
    var tower = update_tower();
    total += tower;
    document.getElementById("sam_byggnad").innerHTML = building + tower;

    var decor = update_decoration(building + tower);
    total += decor;

    total += update_accessories();
    var special = update_special();
    total += special;
    total += update_pillar();
    if (document.getElementById("rivning").checked){
        if (selected == "raze"){
            document.getElementById("sum").innerHTML = 250000;
            document.getElementById("sam_type").innerHTML = "Rivning"
            document.getElementById("all_but_sum").style.display = "none";
            return;
        }
    }

    if (selected == "modify"){
        var bra = get_value("other_kvm");
        if (bra != ""){
            document.getElementById("sam_type").innerHTML = "Justering"
            document.getElementById("all_but_sum").style.display = "none";
            var rest_value = restoration[get_choice("material_risk")];
            var new_bra = bra * rest_value * bpi_risk * factor;
            if (document.getElementById("expensive_inventory").checked){
                new_bra = new_bra * 1.15;
            }
            document.getElementById("sum").innerHTML = Math.round(new_bra);
            return;
        }
    }
    if (selected == "own"){
        var own = get_value("own_value");
        if(own != ""){
            document.getElementById("all_but_sum").style.display = "none";
            document.getElementById("sam_type").innerHTML = "Eget"
            document.getElementById("sum").innerHTML = own;
            return;
        }
    }
    document.getElementById("all_but_sum").style.display = "block";
    document.getElementById("sam_type").innerHTML = "Vanlig"
    document.getElementById("sum").innerHTML = total;
}

function update_decoration(building_value){
    var decor = decoration[get_choice("utsmyckning")];
    var decor_value = Math.round(building_value * decor);
    document.getElementById("sam_decoration").innerHTML = decor_value;
    return(decor_value);
}

function update_building(){
    var wall_factor = get_factor("vägg", "walls");
    var floor_factor = get_factor("golv", "floors");
    var inner_factor = get_factor("innertak", "inner_roofs", "innertak_andra");
    var outer_factor = get_factor("yttertak", "outer_roofs", "yttertak_andra");
    var prod_factor = (wall_factor + floor_factor + inner_factor + outer_factor) / 4;

    var category = get_choice("kategori");
    var category_factor = categories[category];

    var bra = get_value("BRA");
    var tower_width = get_value("torn_bredd");
    var tower_length = get_value("torn_längd");

    var value_building = (bra - (tower_width*tower_length)) * BPI * prod_factor;

    var value_platform = get_value("läktare") * platform_price;

    var value_windows = 0;
    var windows = document.getElementsByClassName("fönster");
    for(var i = 0; i < windows.length; i++){
        for(var key in win_values){
            if(windows[i].attributes["name"].value == key){
                value_windows += win_values[key] * windows[i].attributes["value"].value;
            }
        }
    }

    //var value_roof_rider = get_value("takryttare") * get_choice("takryttare_antal");
    var value_roof_rider = 0;
    var riders = document.getElementsByClassName("ryttare");
    for(var i = 0; i < riders.length; i++){
        for(var key in roof_riders){
            if(riders[i].attributes["name"].value == key){
                value_roof_rider += roof_riders[key] * riders[i].attributes["value"].value;
            }
        }
    }

    var result_building = Math.round(value_building + value_platform + value_windows + value_roof_rider + BPI*category_factor);
    document.getElementById("del_byggnad").innerHTML = result_building;
    //document.getElementById("sam_byggnad").innerHTML = result_building;
    return(result_building);
}

function update_tower(){
    var wall_factor = get_factor("torn_vägg", "walls");
    var floor_factor = get_factor("torn_golv", "floors");
    var prod_factor = wall_factor*floor_factor;
    var tower_width = get_value("torn_bredd");
    var tower_length = get_value("torn_längd");

    var value_tower = tower_length * tower_width * prod_factor * BPI;

    var roof_height = get_value("tak_höjd");
    var roof_width = get_value("tak_bredd");
    var roof_length = get_value("tak_längd");
    var roof_amount = get_value("tak_antal");
    
    var price_tower = get_tower("torn_tak", "tower_roofs", roof_height);

    var value_roof = roof_height * roof_width * roof_amount * roof_length * price_tower;

    var value_windows = 0;
    var windows = document.getElementsByClassName("fönster_2");

    for(var i = 0; i < windows.length; i++){
        for(var key in win_values){
            if(windows[i].attributes["name"].value == key){
                value_windows += win_values[key] * windows[i].attributes["value"].value;
            }
        }
    }
    
    //var value_top = get_value("fial_pris") * get_choice("fial_antal");
    var value_top = 0;
    var fial_items = document.getElementsByClassName("fial");
    for(var i = 0; i < fial_items.length; i++){
        for(var key in fials){
            if(fial_items[i].attributes["name"].value == key){
                value_top += fials[key] * fial_items[i].attributes["value"].value;
            }
        }
    }


    var result_tower = Math.round(value_tower + value_windows + value_roof + value_top);
    document.getElementById("del_torn").innerHTML = result_tower;
    //document.getElementById("sam_torn").innerHTML = result_tower;
    return(result_tower);

}


function update_accessories(){
    var value_clocks = 0;
    var clocks = document.getElementsByClassName("klocka");
    for(var i = 0; i < clocks.length; i++){
        value_clocks += moms * 1.3 * parseInt(clocks[i].attributes["value"].value) * parseInt(klock_kg) + parseInt(mount_clock);
    }
    //var elektrisk = document.getElementById("elektrisk");
    //var elek_choice = elektrisk.options[elektrisk.selectedIndex].value;
    //var value_elek = elek_choice * pris_klock;

    var value_elek = clocks.length * pris_klock;

    var value_tower = get_choice("tornur") * pris_torn;

    var value_misc = 0;

    value_misc += get_value("bänkar_enkla") * benches["Enkla"];
    value_misc += get_value("bänkar_påkostade") * benches["Påkostade"];
    value_misc += get_value("stolar_enkla") * chairs["Enkla"];
    value_misc += get_value("stolar_påkostade") * chairs["Påkostade"];
    value_misc += get_value("kororgel") * pianos["Kororgel"];
    value_misc += get_value("läktarorgel") * pianos["Läktarorgel"];

    var result_accessories = Math.round(value_clocks + value_elek + value_tower + value_misc);
    document.getElementById("del_tillbehör").innerHTML = result_accessories;
    document.getElementById("sam_btillbehör").innerHTML = result_accessories;
    return(result_accessories);

}

function update_special(){
    var value_spec = 0
    for (var key in spec_prices){
        value_spec += get_choice(key) * spec_prices[key];
    }
    
    var value_own = 0;
    var own = document.getElementsByClassName("eget");
    for(var i = 0; i < own.length; i++){
        value_own += own[i].attributes["value"].value * own[i].attributes["name"].value;
    }
    
    var result_special = Math.round(value_spec + value_own);
    document.getElementById("del_särskilt").innerHTML = result_special;
    document.getElementById("sam_särskilt").innerHTML = result_special;
    return(result_special);
}

function update_pillar(){
    var pillar_height = get_value("stapel_höjd");
    var value_pillar = pillar_prices[get_choice("stapel_typ")] * pillar_height;
    
    var value_clocks = 0;
    var clocks = document.getElementsByClassName("stapel_klocka");
    for(var i = 0; i < clocks.length; i++){
        value_clocks += parseInt(moms) * 1.3 * parseInt(clocks[i].attributes["value"].value) * parseInt(klock_kg) + parseInt(mount_clock);
    }

    var value_elek = clocks.length * pris_klock;

    var result_pillar = Math.round(value_pillar + value_clocks + value_elek);
    document.getElementById("del_stapel").innerHTML = result_pillar;
    document.getElementById("sam_stapel").innerHTML = result_pillar;
    return(result_pillar);

}

function risk_menu(option){
    var clicked = document.getElementById(option.concat("_option")); 
    if(selected == option){
        clicked.style.backgroundColor = "#fed831";
        document.getElementById(option).style.display = "none";
        selected = "none";
        update();
        return;
    }
    selected = option;
    var options = document.getElementsByClassName("risk_option");
    for(var i = 0; i < options.length; i++){
        options[i].style.backgroundColor = "#fed831";
    }
    clicked.style.backgroundColor = "#a88e1d";

    var selections = document.getElementsByClassName("risk_selections");
    for(var i = 0; i < selections.length; i++){
        selections[i].style.display = "none";
    }
    document.getElementById(option).style.display = "flex";
    update();
}

function init_auto(){
    var arr = []
    json = loadJSON("churches");
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            arr.push(json[key]["Enhetsnamn"].concat(" ", json[key]["Byggnadsverksnamn"]))
        }
    }
    autocomplete(document.getElementById("church_choice"), arr);
    autocomplete(document.getElementById("church_choice_2"), arr);
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }