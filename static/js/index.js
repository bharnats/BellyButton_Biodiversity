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


function optionChanged(id) {
  
    url = '/samples/'+id+'';
    meta_url='/metadata/'+id+'';
    // d3.json(meta_url,function(error,data){

    //   d3.select(".metadata")
    //   .selectAll("div")
    //   .data(data)
    //   .text(function(data){
    //     return data;
        
    // })
    // });
  

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
    var trace1 = {
  x : Labels,
  y: Values,
  mode: 'markers',
  marker: {
    color: Labels,
    opacity: [1, 0.8, 0.6, 0.7, 1, 0.7, 0.4, 0.8, 0.6, 0.7],
    size: Values
  }
};
    var data2 = [trace1];
    var layout2 = {
  title: 'Sample Values vs OTU_id',
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
