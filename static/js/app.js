
//D3 Initialization
function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
    //array to hold all names
    names = data.samples.map(x=>x.id)
    //Dropdown
    names.forEach(function(name) {
        d3.select('#selDataset').append('option').text(name)
        });
  
    // Arrays for sample_values, OTU ids, and OTU labels        
    var sample_values = data.samples.map(x=> x.sample_values);
    var otu_ids = data.samples.map(x=> x.otu_ids);
    var otu_label = data.samples.map(x=> x.otu_labels);
    
    // top ten OTUs
    var top_ten = sample_values.map(x => x.slice(0,10)).sort(function(a, b){return b-a});
    var top_ids = otu_ids.map(x =>x.slice(0,10)).sort(function(a, b){return b-a});
    var top_labels = otu_label.map(x =>x.slice(0,10)).sort(function(a, b){return b-a});
  
    // Initial Metadata
    var firstID = d3.select("#sample-metadata").selectAll('h1').data(d3.entries(data.metadata[0]))
    firstID.enter().append('h1').merge(firstID).text(d => `${d.key} : ${d.value}`).style('font-size','75%')

    //Initial bar chart
    var trace1 = {
        x : top_ten[0],
        y : top_ids[0].map(x => "OTU" + x),
        text : top_labels[0],
        type : 'bar',
        orientation : 'h',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
          }],
    };
    var layout1 = {
        title : '<b>Top 10 OTU</b>',
    };
    var data = [trace1];
    Plotly.newPlot('bar', data, layout1);
  
    //Initial bubble chart
    var trace2 = {
        x : otu_ids[0],
        y : sample_values[0],
        text : otu_label[0],
        mode : 'markers',
        marker : {
            color : otu_ids[0],
            size : sample_values[0]
        }
    };
    var layout2 = {
        title: '<b>Bubble Chart</b>',
        automargin: true,
        autosize: true,
        xaxis: {title: 'OTU ID'}
    };
    
    var data2 = [trace2];
    Plotly.newPlot('bubble',data2,layout2);

  });
  };

  



//Updating Dropdown
  function update(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
      
      var test = data.samples.filter(x => x.id === id);


      // top 10 sample values
      var sample_values = test.map(x => x.sample_values).sort(function(a, b){return b-a});
      var top_values = sample_values.map(x => x.slice(0,10));

      // top IDs
      var otu_ids = test.map(x=> x.otu_ids).sort(function(a, b){return b-a});
      var top_ids = otu_ids.map(x => x.slice(0,10));

      // top labels
      var otu_label = test.map(x=> x.otu_labels).sort(function(a, b){return b-a});
      var top_labels = otu_label.map(x => x.slice(0,10));
  
        var metadataSamples = data.metadata.filter(x => x.id === +id)[0];
  
      //Metadata
        var sampleMetadata = d3.select("#sample-metadata").selectAll('h1').data(d3.entries(metadataSamples))
        sampleMetadata.enter().append('h1').merge(sampleMetadata).text(d => `${d.key} : ${d.value}`).style('font-size','75%')
        
        //bar chart
        var trace = {
            x : top_values[0],
            y : top_ids[0].map(x => "OTU" + x),
            text : top_labels[0],
            type : 'bar',
            orientation : 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
              }],
        };
        var layout1 = {
            title: "<b>Top 10 OTU</b>"
        };
        var data1 = [trace];
        Plotly.newPlot('bar', data1,layout1);
  
        //bubble chart
        var trace2 = {
            x : otu_ids[0],
            y : sample_values[0],
            text : otu_label[0],
            mode : 'markers',
            marker : {
            color : otu_ids[0],
            size : sample_values[0]
            }   
        };
        var layout2 = {
            title: '<b>Bubble Chart</b>',
            automargin: true,
            autosize: true,
            xaxis: {title: 'OTU ID'}
        };
        var data2 = [trace2];
        Plotly.newPlot('bubble', data2,layout2)
    });
  };
  
  // updatePlotly
  function optionChanged(id) {
    update(id);
  };
  
  init();