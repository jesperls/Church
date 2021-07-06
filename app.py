from flask import Flask, render_template, request

app = Flask(__name__)

types = ["Tegnerlada", "Katedral", "Medeltidskyrka", "Salkyrka", "Hallkyrka", "Roundkyrka", "Korskyrka", "Kapell"]
decorations = ["Enkel", "Något påkostad", "Påkostad"]
walls = ["temp"]
floors = ["temp"]
inner_roof = ["temp"]
outer_roof = ["temp"]
tower_walls = ["temp", "temp2"]
tower_floor = ["temp"]
tower_roof = ["temp"]
stapel_typer = ["Typ 1", "Typ 2", "Typ 3"]
fönster_typer = ["Typ 1", "Typ 2", "Typ 3"]


@app.route('/')
def homepage():
    return render_template("index.html",
                           len={"types": len(types), "decorations": len(decorations), "walls": len(walls),
                                "floors": len(floors), "inner_roof": len(inner_roof), "outer_roof": len(outer_roof),
                                "tower_walls": len(tower_walls), "tower_floor": len(tower_floor),
                                "tower_roof": len(tower_roof), "stapel_typer": len(stapel_typer),
                                "fönster_typer": len(fönster_typer)},
                           categories={"types": types, "decorations": decorations, "walls": walls, "floors": floors,
                                       "inner_roof": inner_roof, "outer_roof": outer_roof, "tower_walls": tower_walls,
                                       "tower_floor": tower_floor, "tower_roof": tower_roof,
                                       "stapel_typer": stapel_typer, "fönster_typer": fönster_typer})


@app.route('/import', methods=["POST"])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        if(f.filename[-4:] == "json"):
            f.save("data.json")
            return "Lyckades ladda upp!"
    return "Funktion ej fullständigt implementerad än"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="80")
