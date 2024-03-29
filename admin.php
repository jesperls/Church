<?php
if ($_COOKIE['admin_status'] == true) {
}
else {
    header("Location: main.php");
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Försäkrings Verktyg</title>
        <script type=text/javascript src="static/js/admin.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link rel= "stylesheet" type= "text/css" href= "static/css/admin_style.css">
        <link rel="icon" href="static/content/logo.png">
    </head>
    <body onload="load_values(), load_boxes()">
        <div id="header">
            <img id="title_image" src="static/content/Logo_main.png" alt="logo">
            <h1 id="title">Beräkningsverktyg adminpanel</h1>
            <div id="menubar">
                <div class="menuitem" onclick="location.href='main.php'">Gå tillbaka</div>
            </div>
        </div>
        <!-- 
            pillar_prices 
            BPI;
            platform_price
            win_values
            win_types
            moms
            klock_kg
            mount_clock
            pris_klock
            benches
            chairs
            pianos
            spec_prices
        -->
        <div id="form">
            <form class="categories">
                <div class="category_title">
                    <h2>Diverse data</h2>
                </div>
                <!--PILLAR-->
                <div class="category_items">
                    <label>Stapel priser</label><br>
                    <label for="stapel_ett">Typ 1</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pillar_one" name="pillar_one" class="value">
                    <br class="mobile_break">
                    <label for="stapel_tvp">Typ 2</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pillar_two" name="pillar_two" class="value">
                    <br class="mobile_break">
                    <label for="stapel_tre">Typ 3</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pillar_three" name="pillar_three" class="value">
                </div>
                <div class="category_items">
                    <label for="BPI">BPI-värde:</label>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="BPI" name="BPI" class="value">
                </div>
                <div class="category_items">
                    <label for="läktare">Läktare pris/kvm:</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="läktare" name="läktare" class="value">
                </div>
                    <!--WIN VALUES-->
                <div class="category_items">
                    <label>Fönster priser</label><br>
                    <label for="fönster_ett">Typ 1</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="window_one" name="window_one" class="value">
                    <br class="mobile_break">
                    <label for="fönster_två">Typ 2</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="window_two" name="window_two" class="value">
                    <br class="mobile_break">
                    <label for="fönster_tre">Typ 3</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="window_three" name="window_three" class="value">
                    <br class="mobile_break">
                </div>
                <div class="category_items">
                    <label for="moms">Moms:</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="moms" name="moms" class="value">
                </div>
                <div class="category_items">
                    <label for="klock_kg">Pris klocka/kg:</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="klock_kg" name="klock_kg" class="value">
                </div>
                <div class="category_items">
                    <label for="mount_clock">Pris montering klocka:</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="mount_clock" name="mount_clock" class="value">
                </div>
                <div class="category_items">
                    <label for="pris_klock">Pris elektrisk ringanordning klocka:</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pris_klock" name="pris_klock" class="value">
                </div>
                <div class="category_items">
                    <label for="pris_torn">Pris tornur:</label>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="pris_torn" name="pris_torn" class="value">
                </div>
                <!--
                benches
                chairs
                pianos
                spec_prices
                -->
                <div class="category_items">
                    <label>Bänkar Pris</label><br>
                    <label for="bänkar_enkla">Enkla:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="bänkar_enkla" name="bänkar_enkla">
                    <br class="mobile_break">
                    <label for="bänkar_påkostade">Påkostade:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="bänkar_påkostade" name="bänkar_påkostade">
                </div>
                <div class="category_items">
                    <label>Stolar Pris</label><br>
                    <label for="stolar_enkla">Enkla:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stolar_enkla" name="stolar_enkla">
                    <br class="mobile_break">
                    <label for="stolar_påkostade">Påkostade:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stolar_påkostade" name="stolar_påkostade">
                </div>
                <div class="category_items">
                    <label>Orgel Pris</label><br>
                    <label for="kororgel">Kororgel:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="kororgel" name="kororgel">
                    <br class="mobile_break">
                    <label for="läktarorgel">Läktarorgel:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="läktarorgel" name="läktarorgel">
                </div>
                <div class="category_items">
                    <label>Byggnadstyper</label><br>
                    <label for="kyrka">Kyrka:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="kyrka" name="kyrka">
                    <br>
                    <label for="tegner">Tegnérlada:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="tegner" name="tegner">
                    <br>
                    <label for="trä_ej">Träkyrka, ej timmer:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="trä_ej" name="trä_ej">
                    <br>
                    <label for="trä_tim">Träkyrka, timmer:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="trä_tim" name="trä_tim">
                    <br>
                    <label for="medeltidskyrka">Medeltidskyrka:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="medeltidskyrka" name="medeltidskyrka">
                    <br>
                    <label for="katedral">Katedral:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="katedral" name="katedral">
                </div>

                <div class="category_items">
                    <label>Byggnadstyper</label><br>
                    <label for="simple">Enkel:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="simple" name="simple">
                    <br class="mobile_break">
                    <label for="somewhat">Något påkostad:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="somewhat" name="somewhat">
                    <br class="mobile_break">
                    <label for="expensive">Påkostad:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="expensive" name="expensive">
                    <br class="mobile_break">
                </div>


                <button type="button" onclick="submit_misc()">Ladda in ny data</button>
            </form>
            <form class="categories">
                <div class="category_title">
                    <h2>Speciellt värderade tillbehör</h2>
                </div>
                <div class="category_items">
                    <label for="altargrund">Altargrund:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="altargrund" name="altargrund">
                </div>
                <div class="category_items">
                    <label for="altare">Altare:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="altare" name="altare">
                </div>
                
                <div class="category_items">
                    <label>Altarupstas</label><br>
                    <label for="altaruppstas_enkel">Enkel:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="altaruppstas_enkel" name="altaruppstas_enkel">
                    <br class="mobile_break">
                    <label for="altaruppstas_påkostad">Något påkostad:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="altaruppstas_påkostad" name="altaruppstas_påkostad">
                    <br class="mobile_break">
                    <label for="altaruppstas_mycket">Påkostad:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="altaruppstas_mycket" name="altaruppstas_mycket">
                    <br class="mobile_break">
                </div>

                <div class="category_items">
                    <label for="dopfunt">Dopfunt:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="dopfunt" name="dopfunt">
                </div>
                
                <div class="category_items">
                    <label>Predikstol:</label><br>
                    <label for="predikstol_enkel">Enkel:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="predikstol_enkel" name="predikstol_enkel">
                    <br class="mobile_break">
                    <label for="predikstol_påkostad">Något påkostad:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="predikstol_påkostad" name="predikstol_påkostad">
                    <br class="mobile_break">
                    <label for="predikstol_mycket">Påkostad:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="predikstol_mycket" name="predikstol_mycket">
                    <br class="mobile_break">
                </div>

                <div class="category_items">
                    <label for="ljuskronor_under">Ljuskronor under 1m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="ljuskronor_under" name="ljuskronor_under">
                </div>
                <div class="category_items">
                    <label for="ljuskronor_över">Ljuskronor över 1m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="ljuskronor_över" name="ljuskronor_över">
                </div>

                
                <div class="category_items">
                    <label>Takryttare:</label><br>
                    <label for="takryttare1">Höjd 0-3 m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="takryttare1" name="takryttare1">
                    <br class="mobile_break">
                    <label for="takryttare2">Höjd 3-6 m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="takryttare2" name="takryttare2">
                    <br class="mobile_break">
                    <label for="takryttare3">Höjd >6m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="takryttare3" name="takryttare3">
                    <br class="mobile_break">
                </div>
                <div class="category_items">
                    <label>Fial:</label><br>
                    <label for="fial1">Höjd 0-3m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fial1" name="fial1">
                    <br class="mobile_break">
                    <label for="fial2">Höjd >3 m:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="fial2" name="fial2">
                    <br class="mobile_break">
                </div>

                <button type="button" onclick="submit_misc()">Ladda in ny data</button>

            </form>

            <form class="categories">
                <div class="category_title">
                    <h2>Första risk data</h2>
                </div>
                <!-- <div class="category_items">
                    <label>Stomme uppräkning %</label><br>
                    <label for="stone_base">Sten:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="stone_base" name="stone_base">
                    <span>%</span><br>
                    <label for="tree_base">Trä:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="tree_base" name="tree_base">
                    <span>%</span>
                </div> -->
                <!-- <div class="category_items">
                    <label>Byggnadsdelar</label><br>
                    <label for="clocks">Klockor:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="clocks" name="clocks"><br>
                    <label for="organ">Orgel:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="organ" name="organ"><br>
                    <label for="tones">Stämmor:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="tones" name="tones"><br>
                    <label for="mosaik_window">Mosaikfönster:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="mosaik_window" name="mosaik_window"><br>
                    <label for="artistic">Konstnärlig utsmyckning:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="artistic" name="artistic">
                    <span>%</span>
                </div> -->
                <div class="category_items">
                    <label>Återställningsgrads faktor</label><br>
                    <label for="budget">Budget:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="budget" name="budget"><br>
                    <label for="standard">Standard:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="standard" name="standard"><br>
                    <label for="exklusivt">Exklusivt:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="exklusivt" name="exklusivt">
                </div>
                <div class="category_items">
                    <label for="raze">Rivning/Sanering:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="raze" name="raze">
                </div>
                <div class="category_items">
                    <label for="factor">Faktor kalkylvärde:</label>
                    <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" id="factor" name="factor">
                </div>
                <button type="button" onclick="submit_misc_risk()">Ladda in ny data</button>




                <!--<div id="import" class=category_items>
                    <p>Här laddar man upp excel filen med data på förstarisk värden</p>
                    <p>OBS! Filen måste ha exakt samma format som originalfilen</p>
                    <form action = "/import/risk" method = "POST" enctype = "multipart/form-data">
                        <input type="file" name="file">
                        <input type="submit" value="Submit">
                    </form>
                    <p>Här kan du extrahera den nuvarande excel filen</p>
                    <a href="static/data/risk_data.xlsx') }}" download>
                        <button type="button">Extrahera</button>
                    </a>
                </div>
            -->
            </form>


            <form class="categories">
                <div class="category_title">
                    <h2>Vägg</h2>
                </div>
                <div class="category_items">
                    <div class="data_lists" id="walls">
                        <script type="text/javascript">
                            data_load("walls");
                        </script>
                        <div id="walls_add">
                            <input id="walls_name" placeholder="Vägg namn">
                            <input id="walls_factor" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Vägg faktor">
                            <label  onclick="add_data('walls')">+</label>
                        </div>
                    </div>
                </div>
                <button type="button" onclick="submit_data('walls')">Ladda in ny data</button>
            </form>
            
            <form class="categories">
                <div class="category_title">
                    <h2>Golv</h2>
                </div>
                <div class="category_items">
                    <div class="data_lists" id="floors">
                        <script type="text/javascript">
                            data_load("floors");
                        </script>
                        <div id="floors_add">
                            <input id="floors_name" placeholder="Golv namn">
                            <input id="floors_factor" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Golv faktor">
                            <label  onclick="add_data('floors')">+</label>
                        </div>
                    </div>
                </div>
                <button type="button" onclick="submit_data('floors')">Ladda in ny data</button>
            </form>
            
            <form class="categories">
                <div class="category_title">
                    <h2>Innertak</h2>
                </div>
                <div class="category_items">
                    <div class="data_lists" id="inner_roofs">
                        <script type="text/javascript">
                            data_load("inner_roofs");
                        </script>
                        <div id="inner_roofs_add">
                            <input id="inner_roofs_name" placeholder="Innertak namn">
                            <input id="inner_roofs_factor" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Innertak faktor">
                            <label  onclick="add_data('inner_roofs')">+</label>
                        </div>
                    </div>
                </div>
                <button type="button" onclick="submit_data('inner_roofs')">Ladda in ny data</button>
            </form>
            
            <form class="categories">
                <div class="category_title">
                    <h2>Yttertak</h2>
                </div>
                <div class="category_items">
                    <div class="data_lists" id="outer_roofs">
                        <script type="text/javascript">
                            data_load("outer_roofs");
                        </script>
                        <div id="outer_roofs_add">
                            <input id="outer_roofs_name" placeholder="Yttertak namn">
                            <input id="outer_roofs_factor" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Yttertak faktor">
                            <label  onclick="add_data('outer_roofs')">+</label>
                        </div>
                    </div>
                </div>
                <button type="button" onclick="submit_data('outer_roofs')">Ladda in ny data</button>
            </form>
            
            <form class="categories">
                <div class="category_title">
                    <h2>Torntak</h2>
                </div>
                <div class="category_items">
                    <div class="data_lists" id="tower_roofs">
                        <script type="text/javascript">
                            roofs_load();
                        </script>
                        <div id="tower_roofs_add">
                            <input id="tower_roofs_name" placeholder="Tak namn">
                            <input id="tower_roofs_Pris2_4" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Tak <4m pris">
                            <input id="tower_roofs_Pris2_4_12" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Tak 4-12m pris">
                            <input id="tower_roofs_Pris2_12_20" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Tak 12-20m pris">
                            <input id="tower_roofs_Pris2_20" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="Tak >20m pris">
                            <label  onclick="roofs_add('tower_roofs')">+</label>
                        </div>
                    </div>
                </div>
                <button type="button" onclick="submit_data('tower_roofs')">Ladda in ny data</button>
            </form>

            
            
            <!-- <div class="categories">
                <div class="category_title">
                    <h2>Excel data</h2>
                </div>
                <div id="import" class=category_items>
                    <p>Här laddar man upp excel filen med data på väggar, golv etc.</p>
                    <p>OBS! Filen måste ha exakt samma format som originalfilen</p>
                    <form action = "/import/vanlig" method = "POST" enctype = "multipart/form-data">
                        <input type="file" name="file">
                        <input type="submit" value="Submit">
                    </form>
                    <p>Här kan du extrahera den nuvarande excel filen</p>
                    <a href="static/data/data.xlsx') }}" download>
                        <button type="button">Extrahera</button>
                    </a>
                </div>
            </div> -->
        </div>
    </body>
</html>