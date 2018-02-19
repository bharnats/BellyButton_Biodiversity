//grab the reference for the html elements
var $selSample= document.querySelector("#selectSample");

var fragment = document.createDocumentFragment();

var filterSample = $selSample.value;



// populate the sample names into sample dropdownlist
var sample = samples;
unique_sample =  (Array.from(new Set(sample))).sort();
unique_sample.forEach(function(item, index) {
     var opt = document.createElement('option');
     opt.innerHTML = item;
     opt.value = item;
     fragment.appendChild(opt);
 });

$selSample.appendChild(fragment);

// initial page load

function init(){
    url = '/samples/BB_1258';
    meta_url='/metadata/BB_1258';
// Add metadata to #metadata div
d3.json(meta_url, function(response) {
  d3.select("body").select("#metadata").selectAll("p").remove();
  console.log(response);
  var dataarray = [];
 
  dataarray.push({"BBTYPE": response.BBTYPE})
  dataarray.push({"AGE": response.AGE})
	dataarray.push({"ETHNICITY": response.ETHNICITY})
	dataarray.push({"GENDER": response.GENDER})
	dataarray.push({"LOCATION": response.LOCATION})
	dataarray.push({"SAMPLEID": response.SAMPLEID})
	dataarray.push({"WFREQ": response.WFREQ})
	console.log(dataarray)
  d3.select("body").select("#metadata").selectAll("p").data(dataarray).enter().append("p").text(function(d) {return Object.keys(d) + ": " + Object.values(d)});

})

 // grab the api url and plot the pie chart and bubble chart
    Plotly.d3.json(url,function(error,resp_data){
        if(error) return console.warn(error);
    var Values = resp_data.sample_values;
    var Labels = resp_data.otu_id;

      var data = [{
        values:Values,
        labels:Labels,
        type: 'pie'
    }];

      var layout = {
        title:'sample values vs OTU_id',
        height: 400,
        width: 500
      };
    var trace1 = {
  x : Labels,
  y: Values,
  mode: 'markers',
  marker: {
    color:['rgb(93, 164, 214)', 'rgb(255, 144, 14)',
               'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(93, 130, 200)','rgb(77, 111, 244)','rgb(223, 111, 12)','rgb(93, 164, 214)','rgb(133, 13, 214)','rgb(23, 164, 214)'],
    opacity: [1, 0.8, 0.6, 0.7, 1, 0.7, 0.4, 0.8, 0.6, 0.7],
    size: Values
  }
};
    var data2 = [trace1];
    var layout2 = {
  title: 'Sample Values vs OTU_id',
  xaxis:{title:"OTU-id",titlefont: {
      family: 'Courier New, monospace',
      size: 15,
      color: '#7f7f7f'
    }},
  yaxis:{title:"sample values",titlefont: {
      family: 'Courier New, monospace',
      size: 15,
      color: '#7f7f7f'
    }},
  showlegend: false,
  height: 400,
  width: 800
};

Plotly.newPlot('pie', data, layout);
Plotly.newPlot('bubble', data2, layout2);


   })

}

// function called when option is changed on the dropdown list
function optionChanged(id) {
  
    url = '/samples/'+id+'';
    meta_url='/metadata/'+id+'';
// Add metadata to #metadata div
d3.json(meta_url, function(response) {
  
  d3.select("body").select("#metadata").selectAll("p").remove();
  console.log(response);

  var dataarray = [];
 
  dataarray.push({"BBTYPE": response.BBTYPE})
  dataarray.push({"AGE": response.AGE})
	dataarray.push({"ETHNICITY": response.ETHNICITY})
	dataarray.push({"GENDER": response.GENDER})
	dataarray.push({"LOCATION": response.LOCATION})
	dataarray.push({"SAMPLEID": response.SAMPLEID})
	dataarray.push({"WFREQ": response.WFREQ})
	console.log(dataarray)
  d3.select("body").select("#metadata").selectAll("p").data(dataarray).enter().append("p").text(function(d) {return Object.keys(d) + ": " + Object.values(d)});

})

 
    Plotly.d3.json(url,function(error,resp_data){
        if(error) return console.warn(error);
    var Values = resp_data.sample_values;
    var Labels = resp_data.otu_id;

      var data = [{
        values:Values,
        labels:Labels,
        type: 'pie'
    }];

      var layout = {
        title:'sample values vs OTU_id',
        height: 400,
        width: 500
      };
    var trace1 = {
  x : Labels,
  y: Values,
  mode: 'markers',
  marker: {
    color:['rgb(93, 164, 214)', 'rgb(255, 144, 14)',
               'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(93, 130, 200)','rgb(77, 111, 244)','rgb(223, 111, 12)','rgb(93, 164, 214)','rgb(133, 13, 214)','rgb(23, 164, 214)'],
    opacity: [1, 0.8, 0.6, 0.7, 1, 0.7, 0.4, 0.8, 0.6, 0.7],
    size: Values
  }
};
    var data2 = [trace1];
    var layout2 = {
  title: 'Sample Values vs OTU_id',
  xaxis:{title:"OTU-id",titlefont: {
      family: 'Courier New, monospace',
      size: 15,
      color: '#7f7f7f'
    }},
  yaxis:{title:"sample values",titlefont: {
      family: 'Courier New, monospace',
      size: 15,
      color: '#7f7f7f'
    }},
  showlegend: false,
  height: 400,
  width: 800
};

Plotly.newPlot('pie', data, layout);
Plotly.newPlot('bubble', data2, layout2);


   })
}
    

Plotly.d3.select("select").on("change", function() {
  console.log(this.value);
  optionChanged(this.value);
})
init();
