from flask import Flask, render_template, request

app = Flask(__name__)

types = ["Tegnerlada", "Katedral", "Medeltidskyrka", "Salkyrka", "Hallkyrka", "Roundkyrka", "Korskyrka", "Kapell"]
decorations = ["Enkel", "Något påkostad", "Påkostad", "Extremt påkostad"]
walls = ["temp"]
floors = ["temp"]
inner_roof = ["temp"]
outer_roof = ["temp"]
tower_walls = ["temp", "temp2"]
tower_floor = ["temp"]
tower_roof = ["temp"]


@app.route('/')
def homepage():
    return render_template("index.html",
                           len={"types": len(types), "decorations": len(decorations), "walls": len(walls),
                                "floors": len(floors), "inner_roof": len(inner_roof), "outer_roof": len(outer_roof),
                                "tower_walls": len(tower_walls), "tower_floor": len(tower_floor),
                                "tower_roof": len(tower_roof)},
                           categories={"types": types, "decorations": decorations, "walls": walls, "floors": floors,
                                       "inner_roof": inner_roof, "outer_roof": outer_roof, "tower_walls": tower_walls,
                                       "tower_floor": tower_floor, "tower_roof": tower_roof})


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
