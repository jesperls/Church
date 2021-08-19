//THINGS TO LOAD
var pillar_prices = {"Typ 1" : 37879, "Typ 2": 89531, "Typ 3": 261706};
var BPI = 42870;
var platform_price = 5165;
var win_values = {"Typ 1" : 18078, "Typ 2" : 49931, "Typ 3": 86088};
var decoration = {"Enkel": 0.30, "Något påkostad": 0.50, "Påkostad": 0.70};
var moms = 1.25;
var klock_kg = 400;
var mount_clock = 25826;
var pris_klock = 43044;
var pris_torn = 43044;
var benches = {"Enkla" : 3000, "Påkostade" : 4800};
var chairs = {"Enkla" : 1400, "Påkostade" : 3000};
var pianos = {"Kororgel" : 190000, "Läktarorgel" : 235000};
var spec_prices = {"altargrund": 172175, "altare": 430438, "altaruppstas": 1205225, "dopfunt": 258263, "predikstol": 1033050, "ljuskronor": 137740};
var bases = {"Sten" : 12, "Trä" : 8};
var building_parts = {"Klockor" : 500000, "Orgel" : 100000, "Stämmor" : 100000, "Mosaikfönster" : 500000};
var restoration = {"Budget" : 0.8, "Standard" : 1.0, "Exklusivt" : 2.0};
var bpi_risk = 33592;
var raze = 250000;
var factor = 2.0;

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
                "spec_prices": JSON.stringify(spec_prices), "decoration" : JSON.stringify(decoration)};
    send_json(json, 'misc');
    //download(JSON.stringify(json), 'json.json', 'text/plain');
}

function make_risk_json(){
    var json = {"bases" : JSON.stringify(bases), "building_parts" : JSON.stringify(building_parts), "restoration" : JSON.stringify(restoration), "bpi_risk" : JSON.stringify(bpi_risk), 
                "raze" : JSON.stringify(raze), "factor" : JSON.stringify(factor)};
    send_json(json, 'misc_risk');
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

    json = loadJSON("misc_risk");
    bases = JSON.parse(json["bases"]);
    building_parts = JSON.parse(json["building_parts"]);
    restoration = JSON.parse(json["restoration"]);
    bpi_risk = JSON.parse(json["bpi_risk"]);
    raze = JSON.parse(json["raze"]);
    factor = JSON.parse(json["factor"]);
}

function submit_misc(){
    pillar_prices["Typ 1"] = document.getElementById("pillar_one").value;
    pillar_prices["Typ 2"] = document.getElementById("pillar_two").value;
    pillar_prices["Typ 3"] = document.getElementById("pillar_three").value;
    BPI = document.getElementById("BPI").value;
    platform_price = document.getElementById("läktare").value;
    win_values["Typ 1"] = document.getElementById("window_one").value;
    win_values["Typ 2"] = document.getElementById("window_two").value;
    win_values["Typ 3"] = document.getElementById("window_three").value;
    moms = document.getElementById("moms").value;
    klock_kg = document.getElementById("klock_kg").value;
    mount_clock = document.getElementById("mount_clock").value;
    pris_klock = document.getElementById("pris_klock").value;
    pris_torn = document.getElementById("pris_torn").value;
    benches["Enkla"] = document.getElementById("bänkar_enkla").value;
    benches["Påkostade"] = document.getElementById("bänkar_påkostade").value;
    chairs["Enkla"] = document.getElementById("stolar_enkla").value;
    chairs["Påkostade"] = document.getElementById("stolar_påkostade").value;
    pianos["Kororgel"] = document.getElementById("kororgel").value;
    pianos["Läktarorgel"]= document.getElementById("läktarorgel").value;
    decoration["Enkel"] = document.getElementById("simple").value;
    decoration["Något påkostad"] = document.getElementById("somewhat").value;
    decoration["Påkostad"] = document.getElementById("expensive").value;
    make_json();
    alert("Nya värden inlästa");
}

function submit_misc_risk(){
}

function load_boxes(){
    document.getElementById("pillar_one").value = pillar_prices["Typ 1"];
    document.getElementById("pillar_two").value = pillar_prices["Typ 2"];
    document.getElementById("pillar_three").value = pillar_prices["Typ 3"];
    document.getElementById("BPI").value = BPI;
    document.getElementById("läktare").value = platform_price;
    document.getElementById("window_one").value = win_values["Typ 1"];
    document.getElementById("window_two").value = win_values["Typ 2"];
    document.getElementById("window_three").value = win_values["Typ 3"];
    document.getElementById("moms").value = moms;
    document.getElementById("klock_kg").value = klock_kg;
    document.getElementById("mount_clock").value = mount_clock;
    document.getElementById("pris_klock").value = pris_klock;
    document.getElementById("pris_torn").value = pris_torn;
    document.getElementById("bänkar_enkla").value = benches["Enkla"];
    document.getElementById("bänkar_påkostade").value = benches["Påkostade"];
    document.getElementById("stolar_enkla").value = chairs["Enkla"];
    document.getElementById("stolar_påkostade").value = chairs["Påkostade"];
    document.getElementById("kororgel").value = pianos["Kororgel"];
    document.getElementById("läktarorgel").value = pianos["Läktarorgel"];
    document.getElementById("simple").value = decoration["Enkel"];
    document.getElementById("somewhat").value = decoration["Något påkostad"];
    document.getElementById("expensive").value = decoration["Påkostad"];
}