from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

types = ["Tegnerlada", "Katedral", "Medeltidskyrka", "Salkyrka", "Hallkyrka", "Roundkyrka", "Korskyrka", "Kapell"]
decorations = ["Enkel", "Något påkostad", "Påkostad"]
walls = ["1A Fasadtegel, Natursten, Tegel", "1B Puts, Tegel, Natursten, Tegel, Puts", "2A Natursten, Puts"]
floors = ["1A Tegel, Sand", "1B Tegel, Bruk, Betong", "2A Natursten, Sand"]
inner_roof = ["1A Natursten", "2A ½-sten tegel", "2B ½-sten tegel, Puts"]
outer_roof = ["1A Eternit på reglar", "1B Korrugerad plåt på reglar", "1C Falor på reglar"]
tower_walls = ["1A Fasadtegel, Natursten, Tegel", "1B Puts, Tegel, Natursten, Tegel, Puts", "2A Natursten, Puts"]
tower_floor = ["1A Tegel, Sand", "1B Tegel, Bruk, Betong", "2A Natursten, Sand"]
tower_roof = ["1A Falor", "1B Spån", "1C Galvaniserad plåt eller skiffer"]
stapel_typer = ["Typ 1", "Typ 2", "Typ 3"]
fönster_typer = ["Typ 1", "Typ 2", "Typ 3"]


@app.route('/')
def homepage():
    load_dfs()
    return render_template("index.html",
                           len={"types": len(types), "decorations": len(decorations), "walls": len(walls),
                                "floors": len(floors), "inner_roof": len(inner_roof), "outer_roof": len(outer_roof),
                                "tower_roof": len(tower_roof), "stapel_typer": len(stapel_typer),
                                "fönster_typer": len(fönster_typer)},
                           categories={"types": types, "decorations": decorations, "walls": walls, "floors": floors,
                                       "inner_roof": inner_roof, "outer_roof": outer_roof, "tower_roof": tower_roof,
                                       "stapel_typer": stapel_typer, "fönster_typer": fönster_typer})


@app.route('/import', methods=["POST"])
def upload(name="json"):
    if request.method == 'POST':
        f = request.files['file']
        if(f.filename[-4:] == "xlsx"):
            f.save(f"./static/data/HiQ.xlsx")
            load_dfs()
            return "Lyckades ladda upp!"
    return "Ej excel fil!"


def load_dfs():
    global walls, floors, inner_roof, outer_roof, tower_roof
    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[8, 9, 10, 11, 12, 13])
    df.columns = ["Tjocklek", "Typ", "Beskrivning", "Pris", "Jmf_pris", "Faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    walls = []
    for index, row in df.iterrows():
        walls.append(row["Beskrivning"])
    df.to_json('./static/data/walls.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[18, 19, 20, 21])
    df.columns = ["Typ", "Beskrivning", "Pris", "Faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    floors = []
    for index, row in df.iterrows():
        floors.append(row["Beskrivning"])
    df.to_json('./static/data/floors.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[22, 23, 24, 25, 26, 27, 28, 29])
    df.columns = ["Typ", "Beskrivning", "Plant", "Tunnavalv", "Kryssvalv", "Plant_faktor", "Tunnavalv_faktor",
                  "Kryssvalv_faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    inner_roof = []
    for index, row in df.iterrows():
        inner_roof.append(row["Beskrivning"])
    df.to_json('./static/data/inner_roofs.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[30, 31, 32, 33, 34, 35])
    df.columns = ["Typ", "Beskrivning", "Flack", "Brant", "Flackt_faktor", "Brant_faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    outer_roof = []
    for index, row in df.iterrows():
        outer_roof.append(row["Beskrivning"])
    df.to_json('./static/data/outer_roofs.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[46, 47, 48, 49, 50, 51, 52, 53,
                                                                                       54, 55])
    df.columns = ["Typ", "Beskrivning", "Pris_4", "Pris_4_12", "Pris_12_20", "Pris_20", "Pris2_4", "Pris2_4_12",
                  "Pris2_12_20", "Pris2_20"]
    df.dropna(axis=0, thresh=4, inplace=True)
    tower_roof = []
    for index, row in df.iterrows():
        tower_roof.append(row["Beskrivning"])
    df.to_json('./static/data/tower_roofs.json', orient='records')



if __name__ == '__main__':
    app.run(host="0.0.0.0", port="80")