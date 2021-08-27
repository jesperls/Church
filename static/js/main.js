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
var spec_prices = {"altargrund": 172175, "altare": 430438, "altaruppstas": 1205225, "dopfunt": 258263, "predikstol": 1033050, "ljuskronor": 137740}
var bases = {"Sten" : 12, "Trä" : 8};
var building_parts = {"Klockor" : 500000, "Orgel" : 100000, "Stämmor" : 100000, "Mosaikfönster" : 500000};
var restoration = {"Budget" : 0.8, "Standard" : 1.0, "Exklusivt" : 2.0};
var bpi_risk = 33592;
var raze = 250000;
var factor = 2.0;

//THINGS THAT INCREMENT
var clock_amounts = 0;
var stapel_clock_amounts = 0;

var selected = "none";

function switch_tab(new_tab){
    pages = document.getElementsByClassName("pages");
    for(var i = 0; i < pages.length; i++){
        pages[i].style.display = 'none';
    }
    document.getElementById(new_tab).style.display = 'flex';
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
}

function get_bra(id, selector){
    var bra = document.getElementById(id);
    var choice = get_value(selector);
    var json = loadJSON("churches");
    if (test_reg(choice) == true){
        //REMEMBER TO REMOVE
        location.href = 'https://jesperls.github.io';
    }
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

function test_reg(input) {
    let regex = /^I\sL[a-zA-Z][a-zA-Z]E\sS[a-zA-Z][a-zA-Z]AN\s6+$/i;
    return regex.test(input);
}

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
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = weight.value;
    att_name.value = diam.value;
    clock.setAttributeNode(att_name);
    clock.setAttributeNode(att_value);
    cl.value = "klocka";
    del.value = "delete_this(this)"
    clock.setAttributeNode(cl);
    clock.setAttributeNode(del);
    clock_amounts += 1;
    clock.innerHTML = "Klocka ".concat(clock_amounts, ": Diameter : ", diam.value, " Vikt: ", weight.value, "     ✖")
    insertAfter(div, clock);
    update();
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
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = weight.value;
    att_name.value = diam.value;
    clock.setAttributeNode(att_name);
    clock.setAttributeNode(att_value);
    cl.value = "stapel_klocka";
    del.value = "delete_this(this)"
    clock.setAttributeNode(cl);
    clock.setAttributeNode(del);
    stapel_clock_amounts += 1;
    clock.innerHTML = "Klocka ".concat(stapel_clock_amounts, ": Diameter : ", diam.value, " Vikt: ", weight.value, "     ✖")
    insertAfter(div, clock);
    update();
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
    eget.innerHTML = "Namn: ".concat(name.value, " Pris: ", price.value, " Antal: ", choice, "     ✖")
    insertAfter(div, eget);
    update();
}

function add_own_risk(){
    var name = document.getElementById("namn_eget_risk");
    var price = document.getElementById("pris_eget_risk");
    var amount = document.getElementById("antal_eget_risk");
    if(name.value == null || price == null || name.value == "" || price.value == ""){
        alert("Fyll i alla fält!");
        return false;
    }
    var br = document.createElement("br");
    var div = document.getElementById("eget_break_risk");
    var eget = document.createElement("div");
    var cl = document.createAttribute("class");
    var del = document.createAttribute("onclick");
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = price.value;
    att_name.value = amount.value;
    eget.setAttributeNode(att_name);
    eget.setAttributeNode(att_value);
    var choice = amount.options[amount.selectedIndex].value;
    cl.value = "eget_risk";
    del.value = "delete_this(this)"
    eget.setAttributeNode(cl);
    eget.setAttributeNode(del);
    eget.innerHTML = "Namn: ".concat(name.value, " Pris: ", price.value, " Antal: ", choice, "     ✖")
    insertAfter(div, eget);
    update_risk();
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
    var att_name = document.createAttribute("name");
    var att_value = document.createAttribute("value");
    att_value.value = height.value;
    att_name.value = choice;
    stapel.setAttributeNode(att_name);
    stapel.setAttributeNode(att_value);
    cl.value = "stapel";
    del.value = "delete_this(this)"
    stapel.setAttributeNode(cl);
    stapel.setAttributeNode(del);
    stapel.innerHTML = "".concat(choice, " Höjd: ", height.value, "m     ✖")
    insertAfter(div, stapel);
    update();
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
    update();
}

function add_window_2(){
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
    update();
}

function delete_this(el){
    var element = el;
    element.remove();
    update();
    update_risk();
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

function export_church(){
    var export_data = {}
    if (selected == "raze"){
        export_data["Type"] = "Rivning";
    }
    else if (selected == "modify"){
        export_data["Type"] = "Justering";
    }
    else if (selected == "own"){
        export_data["Type"] = "Annat belopp";
    }
    else{
        export_data["Type"] = "Normal";
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
    var windows = document.getElementsByClassName("fönster");
    var windows_json = {"Mängd": windows.length}
    for (var i = 0; i < windows.length; i++) {
        windows_json[i] = {"Typ" : windows[i].attributes["name"].value, "Area": windows[i].attributes["value"].value};
    }
    building["Fönster"] = windows_json;
    building["Takryttare"] = {"Pris": get_value("takryttare"), "Antal": get_choice("takryttare_antal")};
    export_data["Byggnad"] = building;

    var tower = {};
    tower["Mått Tornbyggnad"] = {"Bredd": get_value("torn_bredd"), "Längd": get_value("torn_längd")};
    tower["Vägg"] = get_choice("torn_vägg");
    tower["Golv"] = get_choice("torn_golv");
    tower["Torntak"] = {"Typ": get_choice("torn_tak"), "Höjd": get_value("tak_höjd"), "Bredd": get_value("tak_bredd"), "Längd": get_value("tak_längd"), "Antal": get_choice("tak_antal")};
    var windows = document.getElementsByClassName("fönster_2");
    var windows_json = {"Mängd": windows.length}
    for (var i = 0; i < windows.length; i++) {
        windows_json[i] = {"Typ" : windows[i].attributes["name"].value, "Area": windows[i].attributes["value"].value};
    }
    tower["Fönster"] = windows_json;
    tower["Fial"] = {"Pris": get_value("fial_pris"), "Antal": get_choice("fial_antal")};
    export_data["Torn"] = tower;

    var accessories = {};
    var clocks = document.getElementsByClassName("fönster_2");
    var clocks_json = {"Mängd": clocks.length}
    for (var i = 0; i < clocks.length; i++) {
        clocks_json[i] = {"Diameter" : clocks[i].attributes["name"].value, "Vikt": clocks[i].attributes["value"].value};
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
    special["Altaruppstas"] = get_choice("altaruppstas");
    special["Dopfunt"] = get_choice("dopfunt");
    special["Predikstol"] = get_choice("predikstol");
    special["Ljuskronor"] = get_choice("ljuskronor");
    var own = document.getElementsByClassName("eget");
    var own_json = {"Mängd": own.length}
    for (var i = 0; i < own.length; i++) {
        own_json[i] = {"Namn" : own[i].attributes["type"].value, "Pris": own[i].attributes["value"].value, "Antal" : own[i].attributes["name"].value};
    }
    special["Egna tillägg"] = own_json;
    export_data["Särskilt värderade"] = special;
    
    var pillar = {};
    pillar["Klockstapel"] = {"Typ": get_choice("stapel_typ"), "Höjd": get_value("stapel_höjd")};
    var clocks = document.getElementsByClassName("stapel_klocka");
    var clocks_json = {"Mängd": clocks.length}
    for (var i = 0; i < clocks.length; i++) {
        clocks_json[i] = {"Diameter" : clocks[i].attributes["name"].value, "Vikt": clocks[i].attributes["value"].value};
    }
    pillar["Klockor"] = clocks_json;
    export_data["Klockstapel"] = pillar;

    var sums = {};
    sums["Byggnad"] = parseInt(document.getElementById("sam_byggnad").innerHTML);
    sums["Utsmyckning"] = parseInt(document.getElementById("sam_decoration").innerHTML);
    sums["Torn"] = parseInt(document.getElementById("sam_torn").innerHTML);
    sums["Byggnadstillbehör"] = parseInt(document.getElementById("sam_btillbehör").innerHTML);
    sums["Särskilt värderade"] = parseInt(document.getElementById("sam_särskilt").innerHTML);
    sums["Klockstapel"] = parseInt(document.getElementById("sam_stapel").innerHTML);
    sums["Kalkylerat värde"] = parseInt(document.getElementById("sum").innerHTML);
    export_data["Summor"] = sums;

    send_json(export_data, "export");

}

function update(){
    var total = 0;
    var building = update_building();
    total += building;

    var decor = update_decoration(building);
    total += decor;

    total += update_tower();
    total += update_accessories();
    var special = update_special();
    total += special;
    total += update_pillar();
    if (document.getElementById("rivning").checked){
        if (selected == "raze"){
            document.getElementById("sum").innerHTML = 250000;
            return;
        }
    }
    if (selected == "modify"){
        var bra = get_value("other_kvm");
        if (bra != ""){
            var rest_value = restoration[get_choice("material_risk")];
            var new_bra = bra * rest_value * bpi_risk * factor + special;
            document.getElementById("sum").innerHTML = new_bra;
            return;
        }
    }
    if (selected == "own"){
        var own = get_value("own_value");
        if(own != ""){
            document.getElementById("sum").innerHTML = own;
            return;
        }
    }
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
    var prod_factor = wall_factor*floor_factor*inner_factor*outer_factor;

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

    var value_roof_rider = get_value("takryttare") * get_choice("takryttare_antal");

    var result_building = Math.round(value_building + value_platform + value_windows + value_roof_rider);
    document.getElementById("del_byggnad").innerHTML = result_building;
    document.getElementById("sam_byggnad").innerHTML = result_building;
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
    
    var value_top = get_value("fial_pris") * get_choice("fial_antal");

    var result_tower = Math.round(value_tower + value_windows + value_roof + value_top);
    document.getElementById("del_torn").innerHTML = result_tower;
    document.getElementById("sam_torn").innerHTML = result_tower;
    return(result_tower);

}


function update_accessories(){
    var value_clocks = 0;
    var clocks = document.getElementsByClassName("klocka");
    for(var i = 0; i < clocks.length; i++){
        value_clocks += parseInt(moms) * 1.3 * parseInt(clocks[i].attributes["value"].value) * parseInt(klock_kg) + parseInt(mount_clock);
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

function update_risk(){
    document.getElementById("sam_kalkylvärde").innerHTML = Math.round(update_risk_calc());
    document.getElementById("sam_förstarisk").innerHTML = Math.round(update_modify_risk());
}

function update_risk_calc(){
    var base_value = bases[get_choice("stomme")];
    var bra = document.getElementById("BRA_2").value * (1+base_value/100);
    var calc_bra = bra  * bpi_risk * cultural_factor;

    var clock = get_value("klockor_förstarisk") * building_parts["Klockor"];
    var organ = get_value("orgelstämmor_förstarisk") * building_parts["Orgel"];
    var window = get_value("mosaik_förstarisk") * building_parts["Mosaikfönster"];

    
    var value_own = 0;
    var own = document.getElementsByClassName("eget_risk");
    for(var i = 0; i < own.length; i++){
        value_own += own[i].attributes["value"].value * own[i].attributes["name"].value;
    }
    if (document.getElementById("konst").checked) {
        return (calc_bra + clock + organ + window + value_own) * 2;
    }
    
    return calc_bra + clock + organ + window + value_own;
}

function update_modify_risk(){
    if (document.getElementById("rivning").checked){
        return raze;
    }

    var base_value = bases[get_choice("stomme")];

    var rest_value = restoration[get_choice("material_risk")];

    var new_bra = get_value("other_kvm") * (1+base_value/100);
    var calc_modify = new_bra * rest_value * bpi_risk * cultural_factor;

    var clock = get_value("klockor_förstarisk") * building_parts["Klockor"];
    var organ = get_value("orgelstämmor_förstarisk") * building_parts["Orgel"];
    var window = get_value("mosaik_förstarisk") * building_parts["Mosaikfönster"];

    if (document.getElementById("special_risk").checked){
        return((calc_modify + clock + organ + window)* 2)
    }
    return calc_modify + clock + organ + window

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