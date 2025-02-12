var styles = [ {
  "format_version" : "1.0",
  "generated_by" : "cytoscape-3.10.2",
  "target_cytoscapejs_version" : "~2.1",
  "title" : "default",
  "style" : [ 
    {
      "selector" : "node",
      "css" : {
        "border-color" : "rgb(0,0,0)",
        "background-color" : "rgb(204,204,204)",
        "text-opacity" : 1.0,
        "font-size" : 12,
        "text-valign" : "center",
        "text-halign" : "center",
        "background-opacity" : 1.0,
        "border-width" : 2.0,
        "height" : 35.0,
        "color" : "rgb(0,0,0)",
        "border-opacity" : 1.0,
        "font-family" : "SansSerif.plain",
        "font-weight" : "normal",
        "width" : 75.0,
        "shape" : "roundrectangle",
        "content" : "data(name)"
      }
    },
    {
      "selector" : "node[size_factor = 1]",
      "css" : {
        "font-size" : 20
      }
    },
    {
      "selector" : "node[size_factor = 2]",
      "css" : {
        "font-size" : 12
      }
    },
    {
      "selector" : "node[size_factor = 3]",
      "css" : {
        "font-size" : 10
      }
    },
    {
      "selector" : "node[network_node_colour = 0]",
      "css" : {
        "background-color" : "rgb(255,179,230)"
      }
    },
    {
      "selector" : "node[network_node_colour = 1]",
      "css" : {
        "background-color" : "rgb(255,51,51)"
      }
    },
    {
      "selector" : "node[network_node_colour = 3]",
      "css" : {
        "background-color" : "rgb(224,179,255)"
      }
    },
    {
      "selector" : "node[network_node_colour = 20]",
      "css" : {
        "background-color" : "rgb(203,203,203)"
      }
    },
    {
      "selector" : "node[network_node_colour = 5]",
      "css" : {
        "background-color" : "rgb(179,179,255)"
      }
    },
    {
      "selector" : "node[network_node_colour = 21]",
      "css" : {
        "background-color" : "rgb(130,130,130)"
      }
    },
    {
      "selector" : "node[network_node_colour = 6]",
      "css" : {
        "background-color" : "rgb(138,229,138)"
      }
    },
    {
      "selector" : "node[network_node_colour = 22]",
      "css" : {
        "background-color" : "rgb(239,180,131)"
      }
    },
    {
      "selector" : "node[network_node_colour = 9]",
      "css" : {
        "background-color" : "rgb(225,225,122)"
      }
    },
    {
      "selector" : "node[network_node_colour = 11]",
      "css" : {
        "background-color" : "rgb(128,175,247)"
      }
    },
    {
      "selector" : "node[network_node_colour = 12]",
      "css" : {
        "background-color" : "rgb(132,220,220)"
      }
    },
    {
      "selector" : "node[size_factor = 1]",
      "css" : {
        "width" : 150.0
      }
    },
    {
      "selector" : "node[size_factor = 2]",
      "css" : {
        "width" : 100.0
      }
    },
    {
      "selector" : "node[size_factor = 3]",
      "css" : {
        "width" : 100.0
      }
    },
    {
      "selector" : "node[size_factor = 1]",
      "css" : {
        "shape" : "octagon"
      }
    },
    {
      "selector" : "node[size_factor = 2]",
      "css" : {
        "shape" : "ellipse"
      }
    },
    {
      "selector" : "node[size_factor = 3]",
      "css" : {
        "shape" : "roundrectangle"
      }
    },
    {
      "selector" : "node[size_factor = 1]",
      "css" : {
        "height" : 80.0
      }
    },
    {
      "selector" : "node[size_factor = 2]",
      "css" : {
        "height" : 60.0
      }
    },
    {
      "selector" : "node[size_factor = 3]",
      "css" : {
        "height" : 25.0
      }
    },
    {
      "selector" : "node:selected",
      "css" : {
        "background-color" : "rgb(255,255,0)"
      }
    },
    {
      "selector" : "edge",
      "css" : {
        "content" : "",
        "source-arrow-color" : "rgb(0,0,0)",
        "font-size" : 10,
        "font-family" : "Dialog.plain",
        "font-weight" : "normal",
        "target-arrow-color" : "rgb(0,0,0)",
        "text-opacity" : 1.0,
        "width" : 2.0,
        "line-color" : "rgb(132,132,132)",
        "opacity" : 1.0,
        "source-arrow-shape" : "none",
        "color" : "rgb(0,0,0)",
        "target-arrow-shape" : "none",
        "line-style" : "solid"
      }
    },
    {
      "selector" : "edge:selected",
      "css" : {
        "line-color" : "rgb(255,0,0)"
      }
    },
    // Added Highlighted Node Style
    {
      "selector" : ".highlighted",
      "css" : {
        "background-color" : "#FFD700", // Gold color
        "border-color" : "#FF4500",     // OrangeRed color
        "border-width" : 4,
        "shape" : "ellipse",            // Optional: Change shape
        "z-index" : 9999
      }
    }
  ]
} ];