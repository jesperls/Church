from flask import Flask, render_template, request
import pandas as pd
import json

import jinja2
import os
import subprocess
import tempfile
import shutil
from jinja2 import Template


app = Flask(__name__)

types = []
decorations = ["Enkel", "Något påkostad", "Påkostad"]
walls = []
floors = []
inner_roof = []
outer_roof = []
tower_walls = []
tower_floor = []
tower_roof = []
churches = []
parishes = []
stapel_typer = ["Typ 1", "Typ 2", "Typ 3"]
fönster_typer = ["Typ 1", "Typ 2", "Typ 3"]

frames = ["Sten", "Trä"]
church_states = ["Normalt bruksskick", "Underhållsbehov", "Nyrenoverat/Toppskick"]
material_restoration = ["Budget", "Standard", "Exklusivt"]


@app.route('/')
def homepage():
    return render_template("index.html",
                            len={"types": len(types), "decorations": len(decorations), "walls": len(walls),
                                "floors": len(floors), "inner_roof": len(inner_roof), "outer_roof": len(outer_roof),
                                "tower_roof": len(tower_roof), "stapel_typer": len(stapel_typer),
                                "fönster_typer": len(fönster_typer), "churches": len(churches), "parishes": len(parishes),
                                "frames": len(frames), "church_states": len(church_states), "material_restoration": len(material_restoration)},
                            categories={"types": types, "decorations": decorations, "walls": walls, "floors": floors,
                                        "inner_roof": inner_roof, "outer_roof": outer_roof, "tower_roof": tower_roof,
                                        "stapel_typer": stapel_typer, "fönster_typer": fönster_typer, "churches": churches, "parishes": parishes,
                                        "frames": frames, "church_states": church_states, "material_restoration": material_restoration})

@app.route('/admin_panel')
def admin():
    return render_template("admin.html")

@app.route('/import/<type>', methods=["POST"])
def upload(type):
    if request.method == 'POST':
        f = request.files['file']
        if(f.filename[-4:] == "xlsx"):
            if type == "vanlig":
                f.save(f"./static/data/data.xlsx")
            elif type == "risk":
                f.save(f"./static/data/risk_data.xlsx")
            else:
                return "Något har gått fel!"
            load_dfs()
            return "Lyckades ladda upp!"
    return "Ej excel fil!"

@app.route('/import_json/<name>', methods=["POST"])
def upload_json(name):
    if request.method == 'POST':
        json_file = request.json
        if json_file:
            if name == "export":
                generate_pdf(json_file)
                return render_template("./Kyrka.pdf")
            jsonFile = open(f"./static/data/{name}.json", "w")
            jsonFile.write(json.dumps(json_file))
            jsonFile.close()
        #if(f.filename[-4:] == "json"):
        #    f.save(f"./static/data/{name}.json")
        ##    load_dfs()
            return "Lyckades ladda upp!"
    return "Ej json fil!"

@app.route('/render_pdf')
def render_pdf():
    return render_template("temp.html")


def generate_pdf(json):
    latex_jinja_env = jinja2.Environment(
        block_start_string = '\BLOCK{',
        block_end_string = '}',
        variable_start_string = '\VAR{',
        variable_end_string = '}',
        comment_start_string = '\#{',
        comment_end_string = '}',
        line_statement_prefix = '%%',
        line_comment_prefix = '%#',
        trim_blocks = True,
        autoescape = False,
        loader = jinja2.FileSystemLoader(os.path.abspath('.'))
    )
    template = latex_jinja_env.get_template('./static/data/template.tex')

    template_vars = {}
    template_vars["Title"] = json["Namn"]
    
    current = os.getcwd()
    temp = tempfile.mkdtemp()
    os.chdir(temp)
    output_file = open("./generated.tex", "w")
    tex = template.render(template_vars)
    output_file.write(tex)
    output_file.close() 

    proc=subprocess.Popen(['pdflatex','-interaction', 'nonstopmode', 'generated.tex'])
    subprocess.Popen(['pdflatex', tex])
    proc.communicate()

    os.rename('generated.pdf', "Kyrka.pdf")
    shutil.copy("Kyrka.pdf", current)
    os.chdir(current)
    print(os.getcwd())
    os.replace("Kyrka.pdf", "./static/content/Kyrka.pdf")

def load_dfs():
    global walls, floors, inner_roof, outer_roof, tower_roof, churches
    df = pd.read_excel("./static/data/data.xlsx", sheet_name="Data", skiprows=3, usecols=[3, 4, 5, 6, 7, 8])
    df.columns = ["Tjocklek", "Typ", "Beskrivning", "Pris", "Jmf_pris", "Faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    walls = []
    for index, row in df.iterrows():
        walls.append(row["Beskrivning"])
    df.to_json('./static/data/walls.json', orient='records')

    df = pd.read_excel("./static/data/data.xlsx", sheet_name="Data", skiprows=3, usecols=[9, 10, 11, 12])
    df.columns = ["Typ", "Beskrivning", "Pris", "Faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    floors = []
    for index, row in df.iterrows():
        floors.append(row["Beskrivning"])
    df.to_json('./static/data/floors.json', orient='records')

    df = pd.read_excel("./static/data/data.xlsx", sheet_name="Data", skiprows=3, usecols=[13, 14, 15, 16, 17, 18, 19, 20])
    df.columns = ["Typ", "Beskrivning", "Plant", "Tunnavalv", "Kryssvalv", "Plant_faktor", "Tunnavalv_faktor",
                    "Kryssvalv_faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    inner_roof = []
    for index, row in df.iterrows():
        inner_roof.append(row["Beskrivning"])
    df.to_json('./static/data/inner_roofs.json', orient='records')

    df = pd.read_excel("./static/data/data.xlsx", sheet_name="Data", skiprows=3, usecols=[21, 22, 23, 24, 25, 26])
    df.columns = ["Typ", "Beskrivning", "Flack", "Brant", "Flackt_faktor", "Brant_faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    outer_roof = []
    for index, row in df.iterrows():
        outer_roof.append(row["Beskrivning"])
    df.to_json('./static/data/outer_roofs.json', orient='records')

    df = pd.read_excel("./static/data/data.xlsx", sheet_name="Data", skiprows=3, usecols=[27, 28, 29, 30, 31, 32, 33, 34,
                                                                                        35, 36])
    df.columns = ["Typ", "Beskrivning", "Pris_4", "Pris_4_12", "Pris_12_20", "Pris_20", "Pris2_4", "Pris2_4_12",
                    "Pris2_12_20", "Pris2_20"]
    df.dropna(axis=0, thresh=4, inplace=True)
    tower_roof = []
    for index, row in df.iterrows():
        tower_roof.append(row["Beskrivning"])
    df.to_json('./static/data/tower_roofs.json', orient='records')

    df = pd.read_excel("kyrkor.xlsx")
    df.drop(df.columns.difference(['Byggnadsverksnamn','Funktion', "Bruksarea(m²)", "Enhetsnamn"]), 1, inplace=True)
    df = df[df["Funktion"] == "Kyrka/kapell"]
    df = df[df["Enhetsnamn"].notna()]
    df = df.sort_values(by="Enhetsnamn")
    churches = []
    for index, row in df.iterrows():
        churches.append(f"{row['Enhetsnamn']} {row['Byggnadsverksnamn']}")
    df.to_json('./static/data/churches.json', orient='records')
    #df = pd.read_excel("static/data/data.xlsx", sheet_name="Data", skiprows=3, usecols=[4, 5, 35, 56, 61, 62, 64])
    #df.dropna(axis=0, thresh=4, inplace=True)
    #df.columns = ["BPI", "moms", "platform_price", "klock_kg", "pris_klock", "mount_klock", "pris_torn"]
    #df.to_json('./static/data/misc.json', orient='records')



if __name__ == '__main__':
    load_dfs()
    app.run(host="0.0.0.0", port="80")