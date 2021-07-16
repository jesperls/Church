//THINGS TO LOAD
var pillar_prices = {"Typ 1" : 37879, "Typ 2": 89531, "Typ 3": 261706};
var BPI = 42870;
var platform_price = 5165;
var win_values = {"Typ 1" : 18078, "Typ 2" : 49931, "Typ 3": 86088};
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

//THINGS THAT INCREMENT
var clock_amounts = 0;
var stapel_clock_amounts = 0;

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

function make_json(){
    var json = {"pillar_prices" : JSON.stringify(pillar_prices), "BPI": JSON.stringify(BPI), "platform_price": JSON.stringify(platform_price), "win_values": JSON.stringify(win_values), 
                "moms": JSON.stringify(moms), "klock_kg": JSON.stringify(klock_kg), "mount_clock": JSON.stringify(mount_clock), "pris_klock": JSON.stringify(pris_klock), 
                "pris_torn": JSON.stringify(pris_torn), "benches": JSON.stringify(benches), "chairs": JSON.stringify(chairs), "pianos": JSON.stringify(pianos),
                "spec_prices": JSON.stringify(spec_prices)}
    send_json(json)
    //download(JSON.stringify(json), 'json.json', 'text/plain');
}

function send_json(json){
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(json),
        dataType: 'json',
        url: '/import_json',
        success: function (e) {
            console.log(e);
            //window.location = "http://192.168.57.223:5000/preview";
        },
        error: function(error) {
            console.log(error);
        }
     });
}

function read_json(){
    json = loadJSON("misc");
    pillar_prices = JSON.parse(json["pillar_prices"]);
    BPI = json["BPI"];
    platform_price = json["platform_price"];
    win_values = JSON.parse(json["win_values"]);
    moms = json["moms"];
    klock_kg = json["klock_kg"];
    mount_clock = json["mount_clock"];
    pris_klock = json["pris_klock"];
    pris_torn = json["pris_torn"];
    benches = JSON.parse(json["benches"]);
    chairs = JSON.parse(json["chairs"]);
    pianos = JSON.parse(json["pianos"]);
    spec_prices = JSON.parse(json["spec_prices"]);

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
    clock.innerHTML = "Klocka ".concat(clock_amounts, ": Diameter : ", diam.value, " Vikt: ", weight.value)
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
    att_value.value = price.value;
    att_name.value = amount.value;
    eget.setAttributeNode(att_name);
    eget.setAttributeNode(att_value);
    var choice = amount.options[amount.selectedIndex].value;
    cl.value = "eget";
    del.value = "delete_this(this)"
    eget.setAttributeNode(cl);
    eget.setAttributeNode(del);
    eget.innerHTML = "Namn: ".concat(name.value, " Pris: ", price.value, " Antal: ", choice, "     ✖")
    insertAfter(div, eget);
    update();
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
    var selected = document.getElementById(id);
    var choice = selected.options[selected.selectedIndex].value;
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

function update(){
    var total = 0;
    total += update_building();
    total += update_tower();
    total += update_accessories();
    total += update_special();
    total += update_pillar();
    document.getElementById("sum").innerHTML = total;
}

function update_building(){
    var wall_factor = get_factor("vägg", "walls");
    var floor_factor = get_factor("golv", "floors");
    var inner_factor = get_factor("innertak", "inner_roofs", "innertak_andra");
    var outer_factor = get_factor("yttertak", "outer_roofs", "yttertak_andra");
    var prod_factor = wall_factor*floor_factor*inner_factor*outer_factor;

    var bra = document.getElementById("BRA").value;
    var tower_width = document.getElementById("torn_bredd").value;
    var tower_length = document.getElementById("torn_längd").value;

    var value_building = (bra - (tower_width*tower_length)) * BPI * prod_factor;

    var value_platform = document.getElementById("läktare").value * platform_price;

    var value_windows = 0;
    var windows = document.getElementsByClassName("fönster");
    //for(var i = 0; i < windows.length; i++){
    //    for(var j = 0; j < win_types.length; j++){
    //        if(windows[i].attributes["name"].value == win_types[j]){
    //            value_windows = value_windows + win_values[windows[i].attributes["name"].value] * windows[i].attributes["value"].value;
    //        }
    //    }
    //}

    for(var i = 0; i < windows.length; i++){
        for(var key in win_values){
            if(windows[i].attributes["name"].value == key){
                value_windows += win_values[key] * windows[i].attributes["value"].value;
            }
        }
    }

    var rider_amount = document.getElementById("takryttare_antal");
    var choice = rider_amount.options[rider_amount.selectedIndex].value;

    var value_roof_rider = document.getElementById("takryttare").value * choice;

    var result_building = Math.round(value_building + value_platform + value_windows + value_roof_rider);
    document.getElementById("del_byggnad").innerHTML = result_building;
    document.getElementById("sam_byggnad").innerHTML = result_building;
    return(result_building);
}

function update_tower(){
    var wall_factor = get_factor("torn_vägg", "walls");
    var floor_factor = get_factor("torn_golv", "floors");
    var prod_factor = wall_factor*floor_factor;
    var tower_width = document.getElementById("torn_bredd").value;
    var tower_length = document.getElementById("torn_längd").value;

    var value_tower = tower_length * tower_width * prod_factor * BPI;

    var roof_height = document.getElementById("tak_höjd").value;
    var roof_width = document.getElementById("tak_bredd").value;
    var roof_length = document.getElementById("tak_längd").value;
    var roof_amount = document.getElementById("tak_antal").value;
    
    var price_tower = get_tower("torn_tak", "tower_roofs", roof_height);

    var value_roof = roof_height * roof_width * roof_amount * roof_length * price_tower;

    var value_windows = 0;
    var windows = document.getElementsByClassName("fönster_2");

    //for(var i = 0; i < windows.length; i++){
    //    for(var j = 0; j < win_types.length; j++){
    //        if(windows[i].attributes["name"].value == win_types[j]){
    //            value_windows = value_windows + win_values[windows[i].attributes["name"].value] * windows[i].attributes["value"].value;
    //        }
    //    }
    //}

    for(var i = 0; i < windows.length; i++){
        for(var key in win_values){
            if(windows[i].attributes["name"].value == key){
                value_windows += win_values[key] * windows[i].attributes["value"].value;
            }
        }
    }

    var top_amount = document.getElementById("fial_antal");
    var choice = top_amount.options[top_amount.selectedIndex].value;

    var value_top = document.getElementById("fial_pris").value * choice;

    var result_tower = Math.round(value_tower + value_windows + value_roof + value_top);
    document.getElementById("del_torn").innerHTML = result_tower;
    document.getElementById("sam_torn").innerHTML = result_tower;
    return(result_tower);

}


function update_accessories(){
    var value_clocks = 0;
    var clocks = document.getElementsByClassName("klocka");
    for(var i = 0; i < clocks.length; i++){
        value_clocks += moms * 1.3 * clocks[i].attributes["value"].value * klock_kg + mount_clock;
    }
    var elektrisk = document.getElementById("elektrisk");
    var elek_choice = elektrisk.options[elektrisk.selectedIndex].value;
    var value_elek = elek_choice * pris_klock;

    var tower_clock = document.getElementById("tornur");
    var t_choice = tower_clock.options[tower_clock.selectedIndex].value;
    var value_tower = t_choice * pris_torn;

    var value_misc = 0;

    value_misc += document.getElementById("bänkar_enkla").value * benches["Enkla"];
    value_misc += document.getElementById("bänkar_påkostade").value * benches["Påkostade"];
    value_misc += document.getElementById("stolar_enkla").value * chairs["Enkla"];
    value_misc += document.getElementById("stolar_påkostade").value * chairs["Påkostade"];
    value_misc += document.getElementById("kororgel").value * pianos["Kororgel"];
    value_misc += document.getElementById("läktarorgel").value * pianos["Läktarorgel"];

    var result_accessories = Math.round(value_clocks + value_elek + value_tower + value_misc);
    document.getElementById("del_tillbehör").innerHTML = result_accessories;
    document.getElementById("sam_btillbehör").innerHTML = result_accessories;
    return(result_accessories);

}

function update_special(){
    var value_spec = 0
    for (var key in spec_prices){
        var obj = document.getElementById(key);
        var val = obj.options[obj.selectedIndex].value;
        value_spec += val * spec_prices[key];
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
    var pillar = document.getElementById("stapel_typ");
    var pillar_choice = pillar.options[pillar.selectedIndex].value;
    var pillar_height = document.getElementById("stapel_höjd").value;
    var value_pillar = pillar_prices[pillar_choice] * pillar_height;
    
    var value_clocks = 0;
    var clocks = document.getElementsByClassName("stapel_klocka");
    for(var i = 0; i < clocks.length; i++){
        value_clocks += moms * 1.3 * clocks[i].attributes["value"].value * klock_kg + mount_clock;
    }

    var elektrisk = document.getElementById("stapel_elektrisk");
    var elek_choice = elektrisk.options[elektrisk.selectedIndex].value;
    var value_elek = elek_choice * pris_klock;

    var result_pillar = Math.round(value_pillar + value_clocks + value_elek);
    document.getElementById("del_stapel").innerHTML = result_pillar;
    document.getElementById("sam_stapel").innerHTML = result_pillar;
    return(result_pillar);

}

function submit(){

}
