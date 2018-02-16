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


// function init() {
//   var pie_data = [{
//     values: jsonData.data,
//     labels: jsonData.index,
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.plot("pie", pie_data, layout);
// }

// function updatePlotly(newdata) {
//   var PIE = document.getElementById("pie");
//   Plotly.restyle(PIE, "values", [newdata]);
// }


function optionChanged(id) {
  
  console.log(id);
    url = '/samples/'+id+''
    Plotly.d3.json(url,function(error,response){
        if(error) return console.warn(error);
    var Values = response.sample_values;
    var Labels = response.otu_id;

      var data = [{
        values:Values,
        labels:Labels,
        type: 'pie'
}];

      var layout = {
        height: 400,
        width: 500
        };

Plotly.newPlot('pie', data, layout);

   })
}
    


Plotly.d3.select("select").on("change", function() {
  console.log(this.value);
  optionChanged(this.value);
})
//  init();