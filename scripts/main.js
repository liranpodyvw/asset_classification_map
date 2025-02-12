// scripts/main.js

document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // Function to retrieve style by title
    function getStyleByTitle(title, stylesArray) {
        for (var i = 0; i < stylesArray.length; i++) {
            if (stylesArray[i].title === title) {
                return stylesArray[i];
            }
        }
        return null;
    }

    var cyContainer = "#cy",
        network = networks[Object.keys(networks)[0]],
        styleDefinition = styles[0];

    // Initialize Cytoscape
    var cy = cytoscape({
        container: document.querySelector(cyContainer),

        elements: network.elements, // Add elements during initialization

        style: styleDefinition.style, // Directly provide the style array

        layout: {
            name: "preset",
            padding: 10
        },

        boxSelectionEnabled: true
    });

    window.cy = cy; // Make Cytoscape instance globally accessible

    console.log("Network Data:", network);
    console.log("Style Definition:", styleDefinition);

    // Apply additional styles if needed
    var defaultStyle = getStyleByTitle("default", styleDefinition.style);
    if (defaultStyle === null) {
        defaultStyle = styleDefinition; // Fallback to the entire styleDefinition
    }
    cy.style().fromJson(defaultStyle.style).update();

    // Run layout if necessary
    cy.layout({ name: 'preset' }).run();

    // Add mouseover and mouseout events to change cursor and bold the node border
    cy.nodes().on('mouseover', function(event) {
        var node = event.target;

        // Change cursor to pointer
        cy.container().style.cursor = 'pointer';

        // Bold the node border
        node.style({
            'border-width': 4
        });
    });

    cy.nodes().on('mouseout', function(event) {
        var node = event.target;

        // Reset cursor to default
        cy.container().style.cursor = 'default';

        // Reset node border width
        node.style({
            'border-width': 2
        });
    });
});
