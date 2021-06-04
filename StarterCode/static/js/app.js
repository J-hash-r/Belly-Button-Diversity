// # Plot.ly Homework - Belly Button Biodiversity

// ![Bacteria by filterforge.com](Images/bacteria.jpg)

// In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

// The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

// ## Step 1: Plotly

// 1. Use the D3 library to read in `samples.json`.

// function buildMetadata(sample) {

// Fetch the JSON data and console log it
// d3.json("../StarterCode/samples.json").then((data) => {
//   console.log(data);
// });
  var globaltest;
  var url = '../StarterCode/samples.json'

function buildMetadata(sample) {


  var url = '../StarterCode/samples.json'
  d3.json(url).then((Data) => {
      // Use d3 to Select the Panel with id of `#sample-metadata`
      console.log(Data);
      // data =JSON.stringify(Data)
      // console.log(data)
      var PANEL = d3.select("#sample-metadata");
      // Use `.html("") to Clear any Existing Metadata
      PANEL.html("");
      // Use `Object.entries` to Add Each Key & Value Pair to the Panel
      // Hint: Inside the Loop, Use d3 to Append New Tags for Each Key-Value in the Metadata
 //let sample = 940;
      globaltest = Data.metadata;
      var result = globaltest.filter(xx => {
        //console.log(xx.id);
        console.log(sample);
        return xx.id == sample;
      });
      // result = JSON.stringify(result)

      console.log(result[0]);
      
      Object.entries(result[0]).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}:${value}`);
        //console.log(data.metadata[0]);
      })
    // BONUS: Build the Gauge Chart
      // buildGauge(result[0].WFREQ);

  
    });
}

var url = '../StarterCode/samples.json'
function buildCharts(sample) {

  // @TODO: Use `d3.json` to Fetch the Sample Data for the Plots
  d3.json(url).then((BBS) => {

    globaltest2 = BBS.samples;
    var result2 = globaltest2.filter(yy => {
      //console.log(xx.id);
      //console.log(sample);
      return yy.id == sample;
    });
    console.log(result2[0])

    // @TODO: Build a Bubble Chart Using the Sample Data
    const otu_ids = result2[0].otu_ids;
    const otu_labels = result2[0].otu_labels;
    const sample_values = result2[0].sample_values;
    // @TODO: Build a Pie Chart
    // console.log(BBS.samples[0])

    let bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closests",
      xaxis: { title: "OTU ID"}
    }

    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ]

    Plotly.plot("bubble", bubbleData, bubbleLayout);

    // HINT: Use slice() to Grab the Top 10 sample_values,
    // otu_ids, and otu_labels (10 Each)
    let barData = [
      {
        y: sample_values.slice(0, 10),
        x: otu_ids.slice(0, 10),
        hovertext: otu_labels.slice(0, 10),
        hoverinfo: "hovertext",
        orientation: 'h',
        type: "bar",
        marker: {
         color: 'rgba(255,153,51,0.6)',
              width: 200
            }

      }
    ];
    var layout = {
      autosize: false,
      width: 1000,
      height: 1000,
      xaxis : { title: "OTU ID"},
      yaxis : {title: "sample_values"},
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 300,
        pad: 4
      }
    }
  


    // let barLayout = {
    //   margin: { t: 20, l: 30}
    // };

    Plotly.plot("bar", barData,layout)
})
}

// var BBSample = {
//   x: otu_ids,
//   y: sample_values,
//   hovertext: otu_labels,
//   hoverinfo: "hovertext",
//   name: 'Belly Button Samples',
//   orientation: 'h',
//   type: 'bar',
//   marker: {
//     color: 'rgba(255,153,51,0.6)',
//     width: 1
//   })
// }


// var layout = {
//   title: 'Colored Bar Chart',
//   barmode: 'stack'
// };

// Plotly.newPlot('pie', BBSample, layout);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.

//   ![bar Chart](Images/hw01.png)

// 3. Create a bubble chart that displays each sample.

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

// ![Bubble Chart](Images/bubble_chart.png)

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all of the plots any time that a new sample is selected.

function init() {
    // Grab a Reference to the Dropdown Select Element
    var selector = d3.select("#selDataset");
  
    // Use the List of Sample Names to Populate the Select Options
    d3.json(url).then((sampleNames) => {
      sampleNames.names.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the First Sample from the List to Build Initial Plots
      const firstSample = sampleNames[0];
      buildCharts(940);
      buildMetadata(940); //940
    });
  }
  
  function optionChanged(newSample) {
    console.log(newSample);
    // Fetch New Data Each Time a New Sample is Selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the Dashboard
  init();

// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// ![hw](Images/hw02.png)