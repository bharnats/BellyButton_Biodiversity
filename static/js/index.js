var $selSample= document.querySelector("#selectSample");

var fragment = document.createDocumentFragment();

 var filterSample = $selSample.value

 var jsonData = my_data;
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

function init() {
  var pie_data = [{
    values: jsonData.data,
    labels: jsonData.index,
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.plot("pie", pie_data, layout);
}

function updatePlotly(newdata) {
  var PIE = document.getElementById("pie");
  Plotly.restyle(PIE, "values", [newdata]);
}


function onChanged(sample_id) {
    var z = document.getElementById("selectSample").selectedIndex;
    if(z != 0){
        jsonData= jsonData.filter(function(sampleName){
        var Sample_id = sampleName.name.toLowerCase();
        return Sample_id === filterSample;
})}
    updatePlotly(jsonData)
}
    
Plotly.d3.select("selectSample").on("change", function() {
  console.log(this.value);
  onChanged(this.value);
})
init();