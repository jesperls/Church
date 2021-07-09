import pandas as pd


if __name__ == '__main__':
    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[8, 9, 10, 11, 12, 13])
    df.columns = ["Tjocklek", "Typ", "Beskrivning", "Pris", "Jmf_pris", "Faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    df.to_json('./static/data/walls.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[18, 19, 20, 21])
    df.columns = ["Typ", "Beskrivning", "Pris", "Faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    df.to_json('./static/data/floors.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[22, 23, 24, 25, 26, 27, 28, 29])
    df.columns = ["Typ", "Beskrivning", "Plant", "Tunnavalv", "Kryssvalv", "Plant_faktor", "Tunnavalv_faktor",
                  "Kryssvalv_faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    df.to_json('./static/data/inner_roofs.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[30, 31, 32, 33, 34, 35])
    df.columns = ["Typ", "Beskrivning", "Flack", "Brant", "Flackt_faktor", "Brant_faktor"]
    df.dropna(axis=0, thresh=4, inplace=True)
    df.to_json('./static/data/outer_roofs.json', orient='records')

    df = pd.read_excel("static/data/HiQ.xlsx", sheet_name="Data", skiprows=3, usecols=[46, 47, 48, 49, 50, 51, 52, 53,
                                                                                       54, 55])
    df.columns = ["Typ", "Beskrivning", "Pris_4", "Pris_4_12", "Pris_12_20", "Pris_20", "Pris2_4", "Pris2_4_12",
                  "Pris2_12_20", "Pris2_20"]
    df.dropna(axis=0, thresh=4, inplace=True)
    df.to_json('./static/data/tower_roof.json', orient='records')
