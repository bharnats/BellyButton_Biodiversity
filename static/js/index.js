var $selSample= document.querySelector("#selectSample");

var fragment = document.createDocumentFragment();
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