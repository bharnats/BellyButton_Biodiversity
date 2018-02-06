import os

import pandas as pd
from flask import Flask, jsonify, render_template

# read the csv files into pandas as dataframes
filepath1 = os.path.join("belly_button_biodiversity_samples.csv")
samples_df = pd.read_csv(filepath1)

samples = list(samples_df.columns.values)
# read the csv files into pandas as dataframes
filepath2 = os.path.join("belly_button_biodiversity_otu_id.csv")
otu_df = pd.read_csv(filepath2)
otu_description = list(otu_df.lowest_taxonomic_unit_found)# read the csv files into pandas as dataframes
filepath3 = os.path.join("belly_button_biodiversity_MetaData.csv")
metaData_df = pd.read_csv(filepath3)

sample_metaData = metaData_df.to_dict('records')
print(sample_metaData)



app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/names")
def names():
    return jsonify(samples)


@app.route("/otu")
def otu():
    return jsonify(otu_description)

@app.route("/metadata/<sample>")
def metaData(sample):
    
    """Fetch the metadata for sample whose sample matches
       the path variable supplied by the user, or a 404 if not."""
    
    for each in sample_metaData:
        search = each['SAMPLEID']
        search_term = "BB_"+ str(search)
        if search_term == sample:
            return jsonify(each)
        message = "Sample ID  " + sample + " not found."
        return jsonify({"error": message}), 404

@app.route("/wfreq/<sample>")
def wfreq(sample):
    for each in sample_metaData:
        search = each['SAMPLEID']
        search_term = "BB_" + str(search)
        if search_term == sample:
            return jsonify(int(each['WFREQ']))
        message = "Sample ID  " + sample + " not found."
        return jsonify({"error": message}), 404

if __name__ == "__main__":
    app.run(debug=True)
    



