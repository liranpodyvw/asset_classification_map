// General Information Section
document.getElementById('general-info-btn').addEventListener('click', function() {
    // Hide the "Asset Class Plan" title
    document.querySelector('#sidebar h3').style.display = 'none';
    
    document.getElementById('sidebar-menu').style.display = 'none'; // Hide the original menu
    document.getElementById('general-info-content').style.display = 'block'; // Show the new content
});

document.getElementById('back-btn').addEventListener('click', function() {
    // Show the "Asset Class Plan" title again
    document.querySelector('#sidebar h3').style.display = 'block';

    document.getElementById('sidebar-menu').style.display = 'block'; // Show the original menu
    document.getElementById('general-info-content').style.display = 'none'; // Hide the new content
});

// Legend Section
document.getElementById('legend-btn').addEventListener('click', function() {
    // Hide the "Asset Class Plan" title
    document.querySelector('#sidebar h3').style.display = 'none';
    
    document.getElementById('sidebar-menu').style.display = 'none'; // Hide the original menu
    document.getElementById('legend-content').style.display = 'block'; // Show the Legend content
});

document.getElementById('back-btn-legend').addEventListener('click', function() {
    // Show the "Asset Class Plan" title again
    document.querySelector('#sidebar h3').style.display = 'block';

    document.getElementById('sidebar-menu').style.display = 'block'; // Show the original menu
    document.getElementById('legend-content').style.display = 'none'; // Hide the Legend content
});

// Search Assets Section
document.getElementById('search-assets-btn').addEventListener('click', function() {
    // Hide the "Asset Class Plan" title
    document.querySelector('#sidebar h3').style.display = 'none';
    
    document.getElementById('sidebar-menu').style.display = 'none'; // Hide the original menu
    document.getElementById('search-assets-content').style.display = 'block'; // Show the search assets content
});

document.getElementById('back-btn-search').addEventListener('click', function() {
    // Show the "Asset Class Plan" title again
    document.querySelector('#sidebar h3').style.display = 'block';

    document.getElementById('sidebar-menu').style.display = 'block'; // Show the original menu
    document.getElementById('search-assets-content').style.display = 'none'; // Hide the search assets content
});


// Layout Options Section


// Export Section
document.getElementById('export-btn').addEventListener('click', function() {
    // Hide the "Asset Class Plan" title
    document.querySelector('#sidebar h3').style.display = 'none';

    document.getElementById('sidebar-menu').style.display = 'none'; // Hide the menu
    document.getElementById('export-content').style.display = 'block'; // Show export content
});

document.getElementById('back-btn-export').addEventListener('click', function() {
    // Show the "Asset Class Plan" title again
    document.querySelector('#sidebar h3').style.display = 'block';

    document.getElementById('sidebar-menu').style.display = 'block'; // Show the menu
    document.getElementById('export-content').style.display = 'none'; // Hide export content
});


// Cytoscape Initialization and Additional Functionality
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
