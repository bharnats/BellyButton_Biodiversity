# BellyButton_Biodiversity

### Objective:
Build an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/)

### Step 1 - Read the csv files into pandas dataFrames

Read the CSV data directly into Pandas DataFrames and output the data as JSON in the flask routes.
  * BellyButton_Biodiversity_Samples
  
  ![BellyButton_Biodiversity_Samples](images/OTUvsSample_Values.PNG)
  
  * OTU Description
  
  ![OTU Description](images/OTU_description.PNG)
  
  * Sample Metadata
  
  ![Sample Metadata](images/MetaData.PNG)
  
  * Metadata dictionary
  
  ![Metadata dictionary](images/MetaData_dict.PNG)
  


* First, create a template called `index.html` for the dashboard landing page. Use the Bootstrap grid system to create the structure of the dashboard page.

### Flask API
Use Flask to design an API for the dataset and to serve the HTML and JavaScript required for the dashboard page.
* create the following routes for the api.

```python
@app.route("/")
    """Return the dashboard homepage."""
```
```python
@app.route('/names')
    """List of sample names.

    Returns a list of sample names in the format
    [
        "BB_940",
        "BB_941",
        "BB_943",
        "BB_944",
        "BB_945",
        "BB_946",
        "BB_947",
        ...
    ]

    """
```
```python
@app.route('/otu')
    """List of OTU descriptions.

    Returns a list of OTU descriptions in the following format

    [
        "Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus",
        "Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus",
        "Bacteria",
        "Bacteria",
        "Bacteria",
        ...
    ]
    """
```
```python
@app.route('/metadata/<sample>')
    """MetaData for a given sample.

    Args: Sample in the format: `BB_940`

    Returns a json dictionary of sample metadata in the format

    {
        AGE: 24,
        BBTYPE: "I",
        ETHNICITY: "Caucasian",
        GENDER: "F",
        LOCATION: "Beaufort/NC",
        SAMPLEID: 940
    }
    """
```
```python
@app.route('/wfreq/<sample>')
    """Weekly Washing Frequency as a number.

    Args: Sample in the format: `BB_940`

    Returns an integer value for the weekly washing frequency `WFREQ`
    """
```
```python
@app.route('/samples/<sample>')
    """OTU IDs and Sample Values for a given sample.

    Sort the Pandas DataFrame (OTU_ID and Sample Value)
    in Descending Order by Sample Value

    Return a list of dictionaries containing sorted lists  for `otu_ids`
    and `sample_values`

    [
        {
            otu_ids: [
                1166,
                2858,
                481,
                ...
            ],
            sample_values: [
                163,
                126,
                113,
                ...
            ]
        }
    ]
    """
```

---



