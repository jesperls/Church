<?php
if ($_COOKIE['login_status'] == true) {
}
else {
  header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Försäkringsvärdering</title>
        <script type=text/javascript src="static/js/main.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link rel= "stylesheet" type= "text/css" href= "static/css/style.css">
        <link rel="icon" href="static/content/logo.png">
    </head>
    <body onload="init_auto()">
    <script>
      load_values();
    </script>
        <div id="header">
            <img id="title_image" src="static/content/Logo_main.png" alt="logo">
            <h1 id="title">Beräkningsverktyg byggnadsvärde kyrkor</h1>
            <div id="menubar">
              <div class="menuitem" onclick="switch_tab('form')">Försäkringsvärdering</div>
              <!--
              <div class="menuitem" onclick="switch_tab('första_risk')">Förstarisk</div>
              <div class="menuitem" onclick="switch_tab('bildexempel')">Bildexempel</div>
              -->
              <div class="menuitem" onclick="switch_tab('information')">Information</div>
            </div>
        </div>
        <div class ="category_items">
          <div id="legend">Klicka på texter som är understrukna med ”.....” för bilder och beskrivningar.
          <br>Håll muspekaren över ikonen &nbsp <span class="info"> <span class="infotext">Exempel text</span> </span> &nbsp för förklaring om respektive parameter. </div>
        </div>
          <div id="form" class = "pages">
            <!--
            <datalist id="churches">
              FOR LOOP HERE
            </datalist>
            <label for="churches">Kyrka:</label>
            <input list="churches" name="church" id="church">
            -->
            <form onchange="update()" class="categories">
              <div class="category_title">
                <h2>Byggnad</h2>
              </div>
              <div class="category_items">
                <form autocomplete="off">
                  <div class="autocomplete">
                    <input id="church_choice" type="text" name="church_choice" placeholder="Kyrka">
                  </div>
                  <span class="info"> <span class="infotext">Vilken församling kyrkan tillhör samt populärnamn på kyrkan</span> </span>
              </div>
              <div class="category_items">
                <button type="button" onclick="load_previous()" id="previous">Ladda in tidigare sparade värden för kyrka</button>
              </div>
              <div class="category_items">
                <label for="BRA">BRA-yta (kvm):</label>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="BRA" name="BRA" class="value" value="0">
                <button type="button" onclick="get_bra('BRA', 'church_choice')">Ladda in data</button>
                <div class="info">  <span class="infotext">Storleken av hela kyrkan i kvadratmeter</span> </div>
              </div>


              <div class="category_items">
                <label for="kategori">Byggnadstyp:</label>
                <select id="kategori" name="kategori" class="value">
                  <script type="text/javascript">
                    for (var category in categories) {
                      document.write('<option value="' + category + '">' + category + '</option>');
                    }
                  </script>
                </select>
              </div>


              <div class="category_items">
                <label for="utsmyckning" onclick="show_pictures('decoration_pictures')" class="clickable">Utsmyckning:</label>
                <select id="utsmyckning" name="utsmyckning" class="value">
                    <script type="text/javascript">
                      for (var decor in decoration) {
                        document.write('<option value="' + decor + '">' + decor + '</option>');
                      }
                    </script>
                </select>
              </div>
            </form>
            <form onchange="update()" class="categories">
              <div class="category_title">
                <h2>Kalkylvärde kyrkobyggnad</h2>
              </div>
              <div class="category_items">
                <label for="vägg" onclick="show_pictures('wall_pictures')" class="clickable">Vägg:</label>
                <select id="vägg" name="vägg">
                  <script type="text/javascript">
                    load_options("walls").forEach(function(wall, index) {
                      document.write('<option value="' + wall + '">' + wall + '</option>');
                    });
                  </script>
                </select>
                <div class="info">  <span class="infotext">Materialet huvudbyggnadens vägg är byggt av</span> </div>
              </div>
              <div class="category_items">
                <label for="golv" onclick="show_pictures('floor_pictures')" class="clickable">Golv:</label>
                <select id="golv" name="golv">
                  
                  <script type="text/javascript">
                    load_options("floors").forEach(function(floor, index) {
                      document.write('<option value="' + floor + '">' + floor + '</option>');
                    });
                  </script>
                </select>
                <div class="info">  <span class="infotext">Materialet huvudbyggnadens golv är byggt av</span> </div>
              </div>
              <div class="category_items">
                <label for="innertak" onclick="show_pictures('inner_pictures')" class="clickable">Innertak:</label>
                <br class="mobile_break">
                <select id="innertak" name="innertak">
                  <script type="text/javascript">
                    load_options("inner_roofs").forEach(function(roof, index) {
                      document.write('<option value="' + roof + '">' + roof + '</option>');
                    });
                  </script>
                </select>
                <select id="innertak_andra" name="innertak_andra">
                    <option value="Tunnavalv">Tunnavalv</option>
                    <option value="Kryssvalv">Kryssvalv</option>
                </select>
                <div class="info">  <span class="infotext">Materialet huvudbyggnadens inre tak är byggt av samt formen på innertaket</span> </div>
              </div>
              <div class="category_items">
                <label for="yttertak" onclick="show_pictures('outer_pictures')" class="clickable">Yttertak:</label>
                <br class="mobile_break">
                <select id="yttertak" name="yttertak">
                  <script type="text/javascript">
                    load_options("outer_roofs").forEach(function(roof, index) {
                      document.write('<option value="' + roof + '">' + roof + '</option>');
                    });
                  </script>
                </select>
                <select id="yttertak_andra" name="yttertak_andra">
                    <option value="Brant">Brant</option>
                    <option value="Flackt">Flackt</option>
                </select>
                <div class="info">  <span class="infotext">Materialet huvudbyggnadens yttre tak är byggt av samt formen på yttertaket</span> </div>
              </div>
              <div class="category_items">
                <label for="läktare">Läktare (kvm):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="läktare" name="läktare" value="0">
                <div class="info">  <span class="infotext">Storleken på läktarplattformen i kvadratmeter</span> </div>
              </div>
              <div class="category_items">
                <label onclick="show_pictures('window_pictures')" class="clickable">Dekorerade Fönster</label>
                <div class="info">  <span class="infotext">Här lägger du till varje fönster i kyrkobyggnaden var för sig genom att välja typ och skriva in storleken i kvadratmeter, du kan ta bort ett värde genom att klicka på det</span> </div><br>
                <label for="fönster_typ">Typ</span>
                <select id="fönster_typ" name="fönster_typ" class="fönster_typ">
                  <script type="text/javascript">
                    for (var win in win_values) {
                      document.write('<option value="' + win + '">' + win + '</option>');
                    }
                  </script>
                </select>
                <br class="mobile_break">
                <label for="fönster_storlek">Area (kvm):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fönster_storlek" name="fönster_storlek" value="0">
                <br class="mobile_break">
                <button onclick="add_window()" id="fönster_knapp" type='button'>Lägg till</button><br id="fönster_break">
              </div>
              <div class="category_items">
                <label>Takryttare</label>
                <div class="info">  <span class="infotext">Storleken av kyrkobyggnadens takryttare samt antalet takryttare kyrkan har</span> </div><br>

                <label onclick="show_pictures('takryttare_pictures')" class="clickable">Takryttare:</label>
                <select id="takryttare" name="takryttare">
                  <script type="text/javascript">
                    load_options("roof_riders").forEach(function(roof, index) {
                      document.write('<option value="' + roof + '">' + roof + '</option>');
                    });
                  </script>
                </select>
                <label for="takryttare_antal">Antal:</label>
                <select id="takryttare_antal" name="takryttare_antal">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
                <button onclick="add_rider()" id="takryttare_knapp" type='button'>Lägg till</button><br id="takryttare_break">


              </div>
              <div class="category_items">
                <label for="del_byggnad">Delsumma: </label>
                <span id="del_byggnad">0</span>
              </div>
            </form>
            <form onchange="update()" class="categories">
              <div class="category_title">
                <h2>Kalkylvärde tornbyggnad och torntak</h2>
                </div>
              <div class="category_items">
                <label>Mått tornbyggnad</label>
                <div class="info">  <span class="infotext">Måtten på kyrkans torn i meter</span> </div><br>
                <label for="torn_bredd">Bredd (m):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="torn_bredd" name="torn_bredd"  value="0">
                <br class="mobile_break">
                <label for="torn_längd">Längd (m):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="torn_längd" name="torn_längd"  value="0">
              </div>
              <div class="category_items">
                <label for="torn_vägg" onclick="show_pictures('wall_pictures')" class="clickable">Vägg:</label>
                <select id="torn_vägg" name="torn_vägg">
                  <script type="text/javascript">
                    load_options("walls").forEach(function(wall, index) {
                      document.write('<option value="' + wall + '">' + wall + '</option>');
                    });
                  </script>
                </select>
                <div class="info">  <span class="infotext">Materialet kyrkotornets vägg är byggt av</span> </div><br>
              </div>
              <div class="category_items">
                <label for="torn_golv" onclick="show_pictures('floor_pictures')" class="clickable">Golv:</label>
                <select id="torn_golv" name="torn_golv">
                  <script type="text/javascript">
                    load_options("floors").forEach(function(floor, index) {
                      document.write('<option value="' + floor + '">' + floor + '</option>');
                    });
                  </script>
                </select>
                <div class="info">  <span class="infotext">Materialet kyrkotornets golv är byggt av</span> </div><br>
              </div>
              <div class="category_items">
                <label>Torntak</label>
                <div class="info">  <span class="infotext">Diverse mått på kyrktornets tak, allting mäts i meter</span> </div><br>
                <div>
                  <label for="torn_tak" onclick="show_pictures('tower_pictures')" class="clickable">Typ:</label>
                  <select id="torn_tak" name="torn_tak">
                    <script type="text/javascript">
                      load_options("tower_roofs").forEach(function(roof, index) {
                        document.write('<option value="' + roof + '">' + roof + '</option>');
                      });
                    </script>
                  </select>
                </div>
                
                <div>
                  <label for="tak_höjd" onclick="show_pictures('tower_pictures')" class="clickable">Höjd (m):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="tak_höjd" name="tak_höjd"  value="0">
                </div>
                
                <div>
                  <label for="tak_bredd">Bredd (m):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="tak_bredd" name="tak_bredd"  value="0">
                </div>
                
                <div>
                  <label for="tak_längd">Längd (m):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="tak_längd" name="tak_längd"  value="0">
                </div>
                
                <div>
                  <label for="tak_antal">Antal:</label>
                  <select id="tak_antal" name="tak_antal">
                    <script type="text/javascript">
                      for (var i = 0; i < 10; i++) {
                        document.write('<option value="' + i + '">' + i + '</option>');
                      }
                    </script>
                  </select>
                </div>
              </div>
                <!--<label for="fönster_ett">Typ 1 (kvm):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fönster_ett" name="fönster_ett"><br>
                <label for="fönster_två">Typ 2 (kvm):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fönster_två" name="fönster_två"><br>
                <label for="fönster_tre">Typ 3 (kvm):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fönster_tre" name="fönster_tre"><br><br>-->


              <div class="category_items">
                <label onclick="show_pictures('window_pictures')" class="clickable">Dekorerade Fönster</label>
                <div class="info">  <span class="infotext">Här lägger du till varje fönster i kyrktornets var för sig genom att välja typ och skriva in storleken i kvadratmeter, du kan ta bort ett värde genom att klicka på det</span> </div><br>
                <label for="fönster_typ_2">Typ</span>
                <select id="fönster_typ_2" name="fönster_typ_2" class="fönster_typ_2">
                  <script type="text/javascript">
                    for (var win in win_values) {
                      document.write('<option value="' + win + '">' + win + '</option>');
                    }
                  </script>
                </select>
                <br class="mobile_break">
                <label for="fönster_storlek_2">Area (kvm):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fönster_storlek_2" name="fönster_storlek_2"  value="0">
                <button onclick="add_window_2()" id="fönster_knapp_2" type='button'>Lägg till</button><br id="fönster_break_2">
              </div>
              <div class="category_items">
                <label for="fial" onclick="show_pictures('fial_pictures')" class="clickable">Fial:</label>
                <select id="fial" name="fial">    
                  <script type="text/javascript">
                    for (var fial in fials) {
                      document.write('<option value="' + fial + '">' + fial + '</option>');
                    }
                  </script>
                </select>
                <label for="fial_antal">Antal:</label>
                <select id="fial_antal" name="fial_antal">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
                <button onclick="add_fial()" id="fial_knapp" type='button'>Lägg till</button><br id="fial_break">




              </div>
              <div class="category_items">
                <label for="del_torn">Delsumma: </label>
                <span id="del_torn">0</span>
              </div>
            </form>
            <form onchange="update()" class="categories">
              <div class="category_title">
                <h2>Byggnadens tillbehör</h2>
              </div>
              <div class="category_items">
                <label>Klockor</label>
                <div class="info">  <span class="infotext">Här lägger du till varje klocka i kyrkobyggnaden var för sig genom att skriva in vikten i kg, du kan ta bort ett värde genom att klicka på det</span> </div><br>
                <label for="only_weight">Klicka här om du enbart har diametern: </label>
                <input type="checkbox" id="only_weight" onclick="clock_weigth(this, '')" class="checkbox">
                <div class="info">  <span class="infotext">Har du inte vikten så kan vi försöka beräkna den med relativt hög precision enbart med diametern, OBS måste minst vara 150cm</span></div><br>
                <span id="has_weight">
                  <label for="klocka_vikt">Vikt (kg):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="klocka_vikt" name="klocka_vikt"  value="0">
                </span>
                <span id="no_weigth" style="display:none;">
                  <label for="klocka_diam">Diameter (mm):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="klocka_diam" name="klocka_diam"  value="0">
                </span>
                <br class="mobile_break">
                <button onclick="add_clock()" id="klocka_knapp" type='button'>Lägg till</button><br id="klock_break">



              </div>
                <!--<label for="elektrisk">Elektrisk ringanordning (Antal klockor):</label>
                <select id="elektrisk" name="elektrisk">
                      FOR LOOP
                </select><br><br>
                -->
              <div class="category_items">
                <label for="tornur">Tornur (Antal):</label>
                <select id="tornur" name="tornur">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
                <div class="info">  <span class="infotext">Hur många tornur som finns i kyrkan</span> </div><br>
              </div>
              <div class="category_items">
                <label onclick="show_pictures('bench_pictures')" class="clickable">Bänkar</label>
                <div class="info">  <span class="infotext">Hur många av varje typ av bänk som finns i kyrkan</span> </div><br>
                <div>
                  <label for="bänkar_enkla">Enkla:</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="bänkar_enkla" name="bänkar_enkla"  value="0">                
                </div>
                <div>
                  <label for="bänkar_påkostade">Påkostade:</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="bänkar_påkostade" name="bänkar_påkostade"  value="0">
                </div>
                </div>
              <div class="category_items">
                <label onclick="show_pictures('chair_pictures')" class="clickable">Stolar</label>
                <div class="info">  <span class="infotext">Hur många av varje typ av stol som finns i kyrkan</span> </div><br>
                <div>
                  <label for="stolar_enkla">Enkla:</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stolar_enkla" name="stolar_enkla"  value="0">             
                </div>
                <div>
                  <label for="stolar_påkostade">Påkostade:</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stolar_påkostade" name="stolar_påkostade"  value="0">             
                </div>
              </div>
              <div class="category_items">
                <label>Orgel</label>
                <div class="info">  <span class="infotext">Priset på en orgel mäts i stämmor så hur många stämmor varje typ av orgel har</span> </div><br>
                <div>
                  <label for="kororgel">Kororgel(stämmor):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="kororgel" name="kororgel"  value="0">
                </div>
                <div>
                  <label for="läktarorgel">Läktarorgel(stämmor):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="läktarorgel" name="läktarorgel"  value="0">
                </div>
              </div>
              <div class="category_items">
                <label for="del_tillbehör">Delsumma: </label>
                <span id="del_tillbehör">0</span>
              </div>
            </form>
            <form onchange="update()" class="categories">
              <div class="category_title">
                <h2>Särskilt värderade tillbehör</h2>
              </div>
              <div class="category_items">
                <label for="altargrund">Altargrund (Antal):</label>
                <select id="altargrund" name="altargrund">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label for="altare">Altare (Antal):</label>
                <select id="altare" name="altare">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label>Altaruppstas (Antal):</label><br>
                <label for="altaruppstas_enkel">Enkel:</label>
                <select id="altaruppstas_enkel" name="altaruppstas_enkel">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select><br class="mobile_break">
                <label for="altaruppstas_påkostad">Påkostad:</label>
                <select id="altaruppstas_påkostad" name="altaruppstas_påkostad">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select><br class="mobile_break">
                <label for="altaruppstas_mycket">Mycket påkostad:</label>
                <select id="altaruppstas_mycket" name="altaruppstas_mycket">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label for="dopfunt">Dopfunt (Antal):</label>
                <select id="dopfunt" name="dopfunt">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label>Predikstol (Antal):</label><br>
                <label for="predikstol_enkel">Enkel:</label>
                <select id="predikstol_enkel" name="predikstol_enkel">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select><br class="mobile_break">
                <label for="predikstol_påkostad">Påkostad:</label>
                <select id="predikstol_påkostad" name="predikstol_påkostad">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select><br class="mobile_break">
                <label for="predikstol_mycket">Mycket påkostad:</label>
                <select id="predikstol_mycket" name="predikstol_mycket">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label for="ljuskronor_under" onclick="show_pictures('light1_pictures')" class="clickable">Mindre ljuskrona (Antal):</label>
                <select id="ljuskronor_under" name="ljuskronor_under">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label for="ljuskronor_över" onclick="show_pictures('light2_pictures')" class="clickable">Stor ljuskrona (Antal):</label>
                <select id="ljuskronor_över" name="ljuskronor_över">
                  <script type="text/javascript">
                    for (var i = 0; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
              </div>
              <div class="category_items">
                <label>Annat</label>
                <div class="info">  <span class="infotext">Om kyrkan har någonting dyrt som ej finns med i listan så lägger du till det här, du kan ta bort ett värde genom att klicka på det </span> </div><br>
                <label for="namn_eget">Namn:</label>
                <input id="namn_eget" name="namn_eget">
                <br class="mobile_break">
                <label for="pris_eget">Pris (kr):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pris_eget" name="pris_eget"  value="0">
                <br class="mobile_break">
                <label for="antal_eget">Antal:</label>
                <select id="antal_eget" name="antal_eget">
                  <script type="text/javascript">
                    for (var i = 1; i < 10; i++) {
                      document.write('<option value="' + i + '">' + i + '</option>');
                    }
                  </script>
                </select>
                <br class="mobile_break">
                <button onclick="add_own()" id="eget_knapp" type='button'>Lägg till</button><br id="eget_break">
              </div>
              <div class="category_items">
                <label for="del_särskilt">Delsumma: </label>
                <span id="del_särskilt">0</span>
              </div>
            </form>
            <form onchange="update()" class="categories">
              <div class="category_title">
                <h2>Klockstapel</h2>
              </div>
                <!--<label for="stapel_ett">Typ 1 (höjd, m):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stapel_ett" name="stapel_ett"><br>
                <label for="stapel_två">Typ 2 (höjd, m):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stapel_två" name="stapel_två"><br>
                <label for="stapel_tre">Typ 3 (höjd, m):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stapel_tre" name="stapel_tre"><br><br>-->

              <div class="category_items">
                <label>Klockstapel</label>
                <div class="info">  <span class="infotext">Vilken typ av klockstapel kyrkan har samt hur hög den är</span> </div><br>
                <label for="stapel_typ" onclick="show_pictures('clock_pictures')" class="clickable">Typ</label>
                <select id="stapel_typ" name="stapel_typ"><script type="text/javascript">
                  for (var pillar in pillar_prices) {
                    document.write('<option value="' + pillar + '">' + pillar + '</option>');
                  }
              </script>
                </select>
                <br class="mobile_break">
                <label for="stapel_höjd">Höjd (m):</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stapel_höjd" name="stapel_höjd"  value="0">
              </div>
              <div class="category_items">
                <label>Klockor</label>
                <div class="info">  <span class="infotext">Här lägger du till varje klocka i kyrkostapeln var för sig genom att skriva in vikten i kg, du kan ta bort ett värde genom att klicka på det</span> </div><br>
                <label for="only_weight_stapel">Klicka här om du enbart har diametern: </label>
                <input type="checkbox" id="only_weight_stapel" onclick="clock_weigth(this, '_stapel')" class="checkbox">
                <div class="info">  <span class="infotext">Har du inte vikten så kan vi försöka beräkna den med relativt hög precision enbart med diametern</span></div><br>
                <span id="has_weight_stapel">
                  <label for="stapel_klocka_vikt">Vikt (kg):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stapel_klocka_vikt" name="stapel_klocka_vikt"  value="0">
                </span>
                <span id="no_weigth_stapel" style="display:none;">
                  <label for="stapel_klocka_diam">Diameter (cm):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stapel_klocka_diam" name="stapel_klocka_diam"  value="0">
                </span>
                <br class="mobile_break">
                <button onclick="add_stapel_clock()" id="stapel_klocka_knapp" type='button'>Lägg till</button><br id="stapel_klock_break">
              </div>
                
                <!--<label for="stapel_elektrisk">Elektrisk ringanordning (Antal klockor):</label>
                <select id="stapel_elektrisk" name="stapel_elektrisk">
                    FOR LOOP
                </select><br><br>
                -->
              <div class="category_items">
                <label for="del_stapel">Delsumma: </label>
                <span id="del_stapel">0</span>
              </div>
            </form>


            <form class="categories" onchange="update()" onkeydown="return event.key != 'Enter';">
              <div class="category_title">
                <h2>Justering av kalkylerat värde</h2>
              </div>
              
              <ul id="choices_risk">
                <li id="raze_option" class="risk_option" onclick="risk_menu('raze')">Rivning/Sanering</li>
                <li id="modify_option" class="risk_option" onclick="risk_menu('modify')">Annan storlek på byggnad                </li>
                <!--<li id="own_option" class="risk_option" onclick="risk_menu('own')">Annat belopp</li>-->
              </ul>

              <div id=raze class="risk_selections">
                <p>Man kan välja att bara försäkra in en kostnad för rivning och återställning av området vid en totalskada/stor skada, i stället för att återställa kyrkan.</p>
                    
                <div class="category_items">
                  <label for="rivning">Enbart rivning/sanering vid totalskada: </label>
                  <input type="checkbox" id="rivning" name="rivning" class="checkbox">
                </div>
              </div>

              <div id="modify" class="risk_selections">
                <p>Om ni önskar kalkylera på en mindre byggnad som ersättning vid totalskada istället för befintlig enligt ovan. </p>
                <div class="category_items">
                  <label for="other_kvm">Uppbyggnad till ny (kvm):</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="other_kvm" name="other_kvm"  value="0">
                  <div class="info">  <span class="infotext">Hur stor den nybyggda kyrkan ska vara</span> </div>
                </div>
                <div class="category_items">
                  <label for="material_risk">Återställningsgrad materialval: </label>
                  <select id="material_risk" name="material_risk" class="value_grund">
                    <script type="text/javascript">
                        for (var material in restoration) {
                          document.write('<option value="' + material + '">' + material + '</option>');
                        }
                    </script>
                  </select>
                  <div class="info">  <span class="infotext">Kvaliteen på materialet nya kyrkan ska byggas upp av</span> </div>
                </div>
                <div class="category_items">
                  <label for="expensive_inventory">Dyra tillbehör: </label>
                  <input type="checkbox" id="expensive_inventory" name="expensive_inventory"  class="checkbox">
                  <div class="info">  <span class="infotext">Om det bör finnas dyra tillbehör inuti kyrkan</span> </div>
                </div>
              </div>
              <!--
              <div id="own" class="risk_selections">
                <p>Hur mycket ni har mätt upp att kyrkan ska försäkras för om ni inte vill använda er av verktygets beräknade värde.</p>
                <div class="category_items">
                  <label for="own_value">Annat belopp:</label>
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="own_value" name="own_value">
                </div>
              </div>
            -->
            </form>
            <br>

            <br><br><br>


            <div id="sammanställning">
              <h1 id="sam_title">Sammanställning</h1>
              <form id="sam_form">
                <div class="category_items">
                  <label for="sam_type">Försäkrings typ: </label>
                  <span id="sam_type">Vanlig</span>
                </div>
                <div id="all_but_sum">
                  <div class="category_items">
                    <label for="sam_byggnad">Byggnad: </label>
                    <span id="sam_byggnad">0</span>
                  </div>
                  <div class="category_items">
                    <label for="sam_decoration">Byggnadens utsmyckning: </label>
                    <span id="sam_decoration">0</span>
                  </div>
                  <!--<div class="category_items">
                    <label for="sam_torn">Torn: </label>
                    <span id="sam_torn">0</span>
                  </div> -->
                  <div class="category_items">
                    <label for="sam_btillbehör">Byggnadstillbehör: </label>
                    <span id="sam_btillbehör">0</span>
                  </div>
                  <div class="category_items">
                    <label for="sam_särskilt">Särskilt värderade tillbehör: </label>
                    <span id="sam_särskilt">0</span>
                  </div>
                  <div class="category_items">
                    <!-- <label for="sam_utsmyckning">Byggnadens utsmyckning: </label>
                    <span id="sam_byggnad">0</span><br><br> -->
                    <label for="sam_stapel">Klockstapel: </label>
                    <span id="sam_stapel">0</span>
                  </div>
                </div>
                <div class="category_items" id="fin_sum">
                  <label for="sum">Kalkylerat Värde: </label>
                  <span id="sum">0</span>
                </div>
                <div class="category_items" id="mod_sum" style="display: none;">
                  <label for="modified_sum">Annat värde: </label>
                  <span id="modified_sum">0</span>
                </div>
                <button type="button" onclick="export_church()">Spara kyrka</button>
              </form>
              <img src="static/content/up.png" alt="logo" id="arrow" onclick="hide_sum('sam_form', 'arrow')">
            </div>



            <!-- <button id="submit">Submit</button> -->
        </div>
          <div class="picture_box" id="bench_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="bench1">Bänk enkel</label>
                <img src="static/content/Bilder/bänk_enkel.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Bänk påkostad</label>
                <img src="static/content/Bilder/bänk_påkostad.jpg" class="images">
              </div>
            </div>
          </div>
          <div class="picture_box" id="chair_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="bench1">Stol enkel</label>
                <img src="static/content/Bilder/stol_enkel.jpg" class="images">
              </div>
              <div class="image_items"><br>
                <label for="bench1">Stol påkostad</label>
                <img src="static/content/Bilder/stol_påkostad.jpg" class="images">
              </div>
            </div>
          </div>
          <div class="picture_box" id="window_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="bench1">Fönster typ 1</label>
                <img src="static/content/Bilder/Fönster_typ1.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Fönster typ 2</label>
                <img src="static/content/Bilder/Fönster_typ2a.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Fönster typ 2</label>
                <img src="static/content/Bilder/Fönster_typ2b.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Fönster typ 3</label>
                <img src="static/content/Bilder/Fönster_typ3a.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Fönster typ 3</label>
                <img src="static/content/Bilder/Fönster_typ3b.jpg" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="floor_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="floorp"></label>
                <img src="static/content/Bilder/golv.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="inner_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="innerp"></label>
                <img src="static/content/Bilder/innertak.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="clock_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="clockp"></label>
                <img src="static/content/Bilder/klockstapel.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="tower_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="towerp"></label>
                <img src="static/content/Bilder/torntak.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="wall_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="wallp"></label>
                <img src="static/content/Bilder/väggar.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="outer_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="outerp"></label>
                <img src="static/content/Bilder/yttertak.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="light1_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="light1"></label>
                <img src="static/content/Bilder/Ljuskrona_mindre.jpg" class="images">
              </div>
            </div>
          </div>

          <div class="picture_box" id="takryttare_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <img src="static/content/Bilder/Takryttare.png" class="images">
              </div>
            </div>
          </div>

          <div class="picture_box" id="höjd_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <img src="static/content/Bilder/Höjd.png" class="images">
              </div>
            </div>
          </div>

          <div class="picture_box" id="fial_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <img src="static/content/Bilder/Fial.png" class="images">
              </div>
            </div>
          </div>
          
          <div class="picture_box" id="light2_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="light2"></label>
                <img src="static/content/Bilder/Ljuskrona_stor.jpg" class="images">
              </div>
            </div>
          </div>

          <div class="picture_box" id="decoration_pictures" onclick="show_pictures()">
            <div class="child_picture">
              <div class="image_items">
                <label for="bench1">Utsmyckning enkel a</label>
                <img src="static/content/Bilder/Utsmyckning_enkel_a.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning enkel b</label>
                <img src="static/content/Bilder/Utsmyckning_enkel_b.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning enkel c</label>
                <img src="static/content/Bilder/Utsmyckning_enkel_c.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning något påkostad a</label>
                <img src="static/content/Bilder/Utsmyckning_något_påkostad_a.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning något påkostad b</label>
                <img src="static/content/Bilder/Utsmyckning_något_påkostad_b.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning påkostad a</label>
                <img src="static/content/Bilder/Utsmyckning_påkostad_a.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning påkostad b</label>
                <img src="static/content/Bilder/Utsmyckning_påkostad_b.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning påkostad c</label>
                <img src="static/content/Bilder/Utsmyckning_påkostad_c.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning påkostad d</label>
                <img src="static/content/Bilder/Utsmyckning_påkostad_d.jpg" class="images">
              </div>
              <div class="image_items">
                <label for="bench1">Utsmyckning påkostad e</label>
                <img src="static/content/Bilder/Utsmyckning_påkostad_e.jpg" class="images">
              </div>
            </div>
          </div>

        <!--
        <div id="första_risk" class = "pages" hidden="true" onchange="update_risk()" >
          <form class="categories">
            <div class="category_title">
              <h2>Byggnad</h2>
            </div>
            <div class="category_items">
              <form autocomplete="off">
                <div class="autocomplete">
                  <input id="church_choice_2" type="text" name="church_choice" placeholder="Kyrka">
                  <div class="info"> ? <span class="infotext">Vilken församling kyrkan tillhör samt populärnamn på kyrkan</span> </div>
                </div>
            </div>
            <div class="category_items">
              <label for="BRA">BRA-yta (kvm):</label>
              <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="BRA_2" name="BRA" class="value">
              <button type="button" onclick="get_bra('BRA_2', 'church_choice_2')">Ladda in data</button>
              <div class="info"> ? <span class="infotext">Storleken av hela kyrkoan i kvadratmeter</span> </div>
            </div>
            </form>
          </form>
          <form class="categories">
            <div class="category_title">
              <h2>Grunduppgifter</h2>
            </div>
            <div class="category_items">
              <label for="stomme">Stomme:</label>
              <select id="stomme" name="stomme" class="value_grund">
              </select>
              <div class="info"> ? <span class="infotext">Materialet kyrkogrunder är uppbyggd av</span> </div><br>
            </div>
            <div class="category_items">
              <label>Byggnadsdelar</label>
              <div class="info"> ? <span class="infotext">Vilka föremål kyrkan innehåller</span> </div><br>
              <label for="klockor_förstarisk">Antal klockor:</label>
              <input id="klockor_förstarisk" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace()"><br>
              <label for="orgelstämmor_förstarisk">Antal orgelstämmor:</label>
              <input id="orgelstämmor_förstarisk" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace()"><br>
              <label for="mosaik_förstarisk">Antal mosaikfönster:</label>
              <input id="mosaik_förstarisk" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace()">
            </div>
            <div class="category_items">
              <label>Egna tillägg</label>
              <div class="info"> ? <span class="infotext">Om det finns någonting mer än vad som är listat över lägg till det här</span> </div><br>
              <label for="namn_eget_risk">Namn:</label>
              <input id="namn_eget_risk" name="namn_eget_risk">
              <br class="mobile_break">
              <label for="pris_eget_risk">Pris (kr):</label>
              <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pris_eget_risk" name="pris_eget_risk">
              <br class="mobile_break">
              <label for="antal_eget_risk">Antal:</label>
              <select id="antal_eget_risk" name="antal_eget_risk">
              </select>
              <br class="mobile_break">
              <button onclick="add_own_risk()" id="eget_knapp_risk" type='button'>Lägg till</button><br id="eget_break_risk">
            </div>
            <div class="category_items">
              <label for="konst">Konstnärlig utsmyckning, vägg- tak- och glasmålningar: </label>
              <input type="checkbox" id="konst" name="konst">
            </div>
          </form>
          
          
          <div id="sammanställning_2">
            <h1 id="sam_title_2">Sammanställning</h1>
            <form id="sam_form_2">
              <div class="category_items">
                <label for="sam_kalkylvärde">Kalkylvärde: </label>
                <span id="sam_kalkylvärde">0</span>
              </div>
              <div class="category_items">
                <label for="sam_förstarisk">Förstarisk belopp: </label>
                <span id="sam_förstarisk">0</span>
              </div>
            </form>
            <img src="static/content/up.png " alt="logo" id="arrow_2" onclick="hide_sum('sam_form_2', 'arrow_2');">

          </div>
        </div>
        -->
        <div id="information" class = "pages" hidden="true">


          <form class="categories" onchange="update()">
            <div class="category_title">
            </div>
            
            <ul id="choices_risk">
              <li id="why_option" class="info_option" onclick="info_menu('why')">Varför värderingsmetod för kyrkor?</li>
              <li id="how_option" class="info_option" onclick="info_menu('how')">Så har metoden tagits fram?</li>
              <li id="what_option" class="info_option" onclick="info_menu('what')">Vad värde står för?</li>
              <li id="additional_option" class="info_option" onclick="info_menu('additional')">Så beräknas värdet</li>
            </ul>

            <div id="why" class="info_selections">
              <p>Vanligt är att en förvärdering av olika typer av byggnader görs innan en försäkring tecknas. För olika byggnader finns det olika typer av värderingsmetoder. Värdering sker vanligtvis enligt så kallade schablonmetoder vilka ska vara enkla och billiga att utföra, samtidigt som de är tillräckligt noggranna för att ge ett tillfredställande försäkringsbelopp att ta ställning till. Värdet är också ett underlag för premieberäkning.
              <p>Tidigare fanns en branschgemensam kommitté, Försäkringsbolagens Förvärderingskommitté (FFK) som skapade och underhöll ett antal värderingsmetoder, däribland en gammal kyrkometod ”Beräkning av försäkringsbelopp för kyrkobyggnader, FFK 801:2”. Denna metod syftade till att beräkna ett tänkt första riskvärde för en ny kyrkobyggnad, med samma profil, yta och volym som den befintliga, men byggd med rationella metoder och modernt material. Under början av 1990-talet upphörde dock samarbetet i kommittén och i stället startade Sveriges Försäkringsförbund ett arbete som innebar att FKB-metoden kom till och ersatte alla andra tidigare kalkylmetoder avseende försäkringsbelopp för byggnader. Avsikten med denna metod är att den ska passa för normala hustyper och för avvikande objekt måste egna justeringar eller andra kalkyler göras. I samband med detta hamnade kyrkometoden i malpåse och har inte uppdaterats sedan år 1980.
              <p>Enligt anvisningarna till gamla kyrkometoden är den inte heller tillämpbar för mycket exklusiva kyrkor, exempelvis vissa domkyrkor. Svårigheten ligger i att äldre kyrkor är uppförda med en gammal byggnadsteknik och gammalt material som gör att byggnads- och det kulturhistoriska värdet är svårt att beräkna. Dessutom är ofta inredning och konstverk integrerade med kyrkobyggnaden som sådan, exempelvis vägg-, glas- och takmålningar, tornprydnader, etc.
              <p>Värden på kyrkor är satta på olika antaganden och gamla beräkningsmetoder. Kyrkor av samma storlek, konstruktionsmetod och ålder kan ha olika värderingar. Och i förlängningen ojämn fördelning av premien. Mot bakgrund av detta gjordes bedömningen att det behöver tas fram en ny gemensam värderingsmetod för kyrkobyggnader som kan anses generera ett tillfredställande och rättvist försäkringsbelopp. 
                
            </div>

            <div id="how" class="info_selections">
              <p>För att ta en ny metod bildades en referens/styrgrupp inom Svenska kyrkan med företrädare från 4 olika stift inom fastighetsförvaltning och antikvarier tillsammans med Kyrkans Försäkring AB.
                <p>Referensgruppen utförde:
                <ul>
                  <li>Studier och jämförelser av försäkringsbelopp för kyrkor som liknar varandra till byggnadsyta, konstruktion och utsmyckning.</li>
                  <li>Olika befintliga metoder har testats och utvärderas, såsom gamla kyrkovärderingsmetoden men även utländska metoder från norska KNIF (motsvarande Kyrkans Försäkring AB i Norge) och brittiska Ecclesiastical.</li>
                  <li>Dessutom har prisuppgifter av verkliga kostnader från olika tjänste- och produktleverantörer gjorts.</li>
                  <li>Samt undersökningar av faktiska kyrkoprojekt på nybyggnationer och renoveringar från olika delar av landet inom Svenska kyrkan.</li>
                </ul>
                <p>Avstämningar har även skett mot andra instanser och myndigheter som relaterar till kulturhistoriska byggnader som Kammarkollegiet och Statens fastighetsverk.
                <p>Metoden avgränsar sig till att gälla kyrkor byggda före 1946.
                <p><u>Referensgruppen:</u>
                <p>Anna Güthlein, Antikvarie, Västerås stift
                <p>Christian Ferm, Fastighetsstrateg, Härnösand stift
                <p>Johan Stråhle, Stiftssamordnare, Västerås stift
                <p>Mikael Karlsson Aili, Antikvarie, Västerås stift
                <p>Mikael Andersson Ekholst, Fastighetsstrateg, Växjö stift
                <p> Rickard Isaksson, Antikvarie, Stockholms stift
                <p>Anders Engström, Byggnadsingenjör, Kyrkans Försäkring AB
                <p> Joakim Lindqvist, Risk ingenjör, Kyrkans Försäkring AB
                
            </div>

            <div id="what" class="info_selections">
              <p>Värdet som kalkyleras fram är ett förslag till första riskvärde att ta ställning till som försäkringstagare. Detta första riskvärde är inte nödvändigtvis det slutgiltiga värdet. Det är ett schablonvärde som man kan höja eller sänka.
              <p>Det kalkylerade värdet är ett tänkt första riskvärde som skall täcka kostnaderna för att uppföra en ny kyrkobyggnad, med samma profil, och yta som den befintliga, men byggd med rationella metoder och modernt material. Den skall även räcka till att täcka kostnader för att återställa byggnaden vid en delskada med rationella metoder och moderna material.
              <p>Att beakta i sammanhanget är att Länsstyrelsen, Riksantikvarieämbetet och andra aktörer kan komma att ställa andra krav på återställning gällande metoder och materialval. Hur detta i så fall skall finansieras sker då i samverkan och kanske till och med genom ekonomiskt stöd eller insamling.
                
            </div>

            <div id="additional" class="info_selections">
              <p>I grunden för beräkning av värdet ligger Statistiska centralbyråns faktorprisindex för flerbostadshus, FPI. Detta är ett snittpris för vad det kostar att bygga flerbostadshus per kvadratmeter i landet. I detta ingår samtliga projekteringskostnader som byggkostnader.
              <p>För att detta skall kunna appliceras på kyrkor behöver kvadratmeterpriset justeras. Denna justering sker genom en kvot som beror på olika parametrar av kyrkobyggnadens olika delar. De ingående parametrarna är dels byggnadens material och konstruktion men också byggnadens utsmyckningsnivå.
              <p>Till detta adderas sedan byggnadsdelar som altare, predikstol, kyrkklockor, orgel mm.
                
            </div>
            <!--
            <div id="own" class="risk_selections">
              <p>Hur mycket ni har mätt upp att kyrkan ska försäkras för om ni inte vill använda er av verktygets beräknade värde.</p>
              <div class="category_items">
                <label for="own_value">Annat belopp:</label>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="own_value" name="own_value">
              </div>
            </div>
          -->
          </form>






<!--
          <div class="category_items">
            <div id="menubar2">
              <div class="menuitem2" onclick="switch_tab('information')">Varför värderingsmetod för kyrkor?</div>
              
              <div class="menuitem" onclick="switch_tab('första_risk')">Förstarisk</div>
              <div class="menuitem" onclick="switch_tab('bildexempel')">Bildexempel</div>
              
              <div class="menuitem2" onclick="switch_tab('information')">Så har metoden tagits fram?</div>
              <div class="menuitem2" onclick="switch_tab('information')">Vad värde står för?</div>
              <div class="menuitem2" onclick="switch_tab('information')">Så beräknas värdet?</div>
            </div>
          </div>
          <div class=pages2>

          </div>
          <div class=pages2>
            
          </div>
          <div class=pages2>
            
          </div>
          <div class=pages2>
            
          </div>-->
          <?php
          if ($_COOKIE['admin_status'] == true) {
            echo '<a href="admin.php" id="admin">';
            echo '<button type="button">Admin</button>';
            echo '</a>';
          }
          ?>
         
            
    </body>
</html>