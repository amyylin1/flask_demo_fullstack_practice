// grab data
let api_1 = "/api/v1.0/ind";
let api_2 = "/api/v1.0/edu";


function init() {
  
  d3.json(api_1).then(function(data) {
      console.log(data['Region']);
      let trace1 = {
        x: data['Region'],
        type: 'histogram',
        marker: {
          color: [
            'rgba(255, 100, 102, 0.7)',
            'rgba(254, 39, 60, 0.7)',
            'rgba(252, 185, 88, 0.7)',
            'rgba(40, 51, 223, 0.7)'
          ],
        },
      };

      let layout1 = {
        title: 'Region',
        font: {size: 18},
        xaxis: {
          title: 'Region'
        },
        yaxis: {
          title: 'Count'
        }
      };

      let config = {responsive: true}
      Plotly.newPlot("plot1", [trace1], layout1, config);
    });


  d3.json(api_1).then(function(data) {
      console.log(data['Education']);
      let trace2 = {
        x: data['Education'],
        type: 'histogram',
        marker: {
          color: [
            'rgba(255, 100, 102, 0.7)',
            'rgba(254, 39, 60, 0.7)',
            'rgba(252, 185, 88, 0.7)',
            'rgba(40, 51, 223, 0.7)',
            'rgba(255, 100, 102, 0.4)',
            'rgba(254, 39, 60, 0.4)',
            'rgba(252, 185, 88, 0.4)',
            'rgba(40, 51, 223, 0.4)',
            'rgba(255, 100, 102, 0.2)',
            'rgba(254, 39, 60, 0.2)',
            'rgba(252, 185, 88, 0.2)',
            'rgba(40, 51, 223, 0.2)'
          ],
        },
      };

      let layout2 = {
        title: 'Education',
        xaxis: {
          title: 'Education'
        },
        yaxis: {
          title: 'Count'
        }
      };

      Plotly.newPlot("plot2", [trace2], layout2);
    });


  d3.json(api_1).then(function(data) {
      console.log(data['Race']);
      let trace3 = {
        x: data['Race'],
        type: 'histogram',
        marker: {
          color: [
            'rgba(255, 100, 102, 0.7)',
            'rgba(254, 39, 60, 0.7)',
            'rgba(252, 185, 88, 0.7)',
            'rgba(40, 51, 223, 0.7)',
            'rgba(255, 100, 102, 0.4)',
            'rgba(254, 39, 60, 0.4)',
            'rgba(252, 185, 88, 0.4)',
            'rgba(40, 51, 223, 0.4)',
            'rgba(255, 100, 102, 0.2)',
            'rgba(254, 39, 60, 0.2)',
            'rgba(252, 185, 88, 0.2)',
            'rgba(40, 51, 223, 0.2)'
          ],
        },
    };
  
      let layout3 = {
      title: 'Race',
      xaxis: {
        title: 'Race'
      },
      yaxis: {
        title: 'Count'
      }
    };
    Plotly.newPlot("plot3", [trace3], layout3);
  });



  // test

  d3.json(api_1).then(function(data) {
    let labels = Object.keys(data['Race']);
    let values = Object.values(data['Race']);
    console.log('the is', values)
  
    let trace3_1 = [{
      labels: labels,
      values: values,
      type: 'pie'
    }];
  
    Plotly.newPlot("plot3_1", trace3_1);
  });
  
  // 


  d3.json(api_1).then(function(data) {
    console.log(data['Poverty_Ratio']);
    let trace4 = {
      x: data['Poverty_Ratio'],
      type: 'histogram',
      marker: {
        color: data['Poverty_Ratio']
      },
  };

    let layout4 = {
    title: 'Poverty Ratio',
    xaxis: {
      title: 'Poverty Ratio'
    },
    yaxis: {
      title: 'Count'
    }
  };
  Plotly.newPlot("plot4", [trace4], layout4);
  });

  // };


  d3.json(api_1).then(function(data) {
    // console.log(data['Age']);
    let trace5 = {
      x: data['Age'],
      type: 'histogram',
      marker: {
      color: data['Age']
      },
    };

    let layout5 = {
      title: 'Age',
      xaxis: {
        title: 'Age'
      },
      yaxis: {
        title: 'Count'
      }
    };
    Plotly.newPlot("plot5", [trace5], layout5);
  });


  d3.json(api_2).then(function(data) {
      let filter = "Female"
      data = data['Female']
      console.log(data);
      let dataPlot = [{
        x: Object.keys(data),
        y: Object.values(data),
        type: 'bar',
        marker: {
          color: 'pink',
        },
      }]
      Plotly.newPlot("plot6", dataPlot);
  });
  

  d3.json(api_2).then(function(data) {
    data_m = data['Male']
    data_f = data['Female']
    console.log(data);

    let Male = {
      x: Object.keys(data_m),
      y: Object.values(data_m),
      type: 'bar',
      marker: {
        color: 'sky blue'
      }
    };

    let Female = {
        x: Object.keys(data_f),
        y: Object.values(data_f),
        type: 'bar',
        marker: {
          color: 'pink'
        }
    };

    let dataPlot = [Male, Female];

    let layout7 = {
      title: 'Gender and Education ',
      xaxis: {
        title: 'Education'
      },
      yaxis: {
        title: 'Gender'
      }
    };

    Plotly.newPlot("plot7", dataPlot, layout7);

  });

};


// Function called by DOM changes
function refreshPlot() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let filter = dropdownMenu.property("value");
  // Call function to update the chart
  d3.json(api_2).then(function(data) {
    data = data[filter]
    console.log(data);
    let dataPlot = [{
      x: Object.keys(data),
      y: Object.values(data),
      type: 'bar',
      marker: {
       color: filter
      },
    }]
    Plotly.newPlot("plot6", dataPlot);
  });
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", refreshPlot);

init();
