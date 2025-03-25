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
document.getElementById('layout-options-btn').addEventListener('click', function() {
    // Hide the "Asset Class Plan" title
    document.querySelector('#sidebar h3').style.display = 'none';
    
    document.getElementById('sidebar-menu').style.display = 'none'; // Hide the original menu
    document.getElementById('layout-options-content').style.display = 'block'; // Show the new content
});

document.getElementById('back-btn-layout').addEventListener('click', function() {
    // Show the "Asset Class Plan" title again
    document.querySelector('#sidebar h3').style.display = 'block';

    document.getElementById('sidebar-menu').style.display = 'block'; // Show the original menu
    document.getElementById('layout-options-content').style.display = 'none'; // Hide the new content
});


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

    cy.zoom({ level: 0.0965 });  // Adjust the zoom level (lower value means more zoomed out)

    cy.panBy({ x: -75, y: -2 }); // Shift the network 

    // Add the mouseover event for node to show node info and hide the heading
    cy.nodes().on('mouseover', function(event) {
        var node = event.target;

        // Add tap event for nodes to show node info in the sidebar
        cy.on('tap', 'node', function(event) {
            var node = event.target;

            // Hide the "Asset Class Plan" and "Node Information" title
            document.querySelector('#sidebar h3').style.display = 'none';

            // Show Node Information Section
            document.getElementById('node-info-content').style.display = 'block';
            document.getElementById('sidebar-menu').style.display = 'none'; // Hide the menu
            // Hide the currently visible sidebar content (general info, export, etc.)
            document.getElementById('general-info-content').style.display = 'none';
            document.getElementById('legend-content').style.display = 'none';
            document.getElementById('search-assets-content').style.display = 'none';
            document.getElementById('layout-options-content').style.display = 'none';
            document.getElementById('export-content').style.display = 'none';

            // Update Sidebar with Node Information
            document.getElementById('node-description').textContent = node.data('description');
            document.getElementById('node-proposed-classification').textContent = node.data('shared_name');
            document.getElementById('node-maximo-classification').textContent = node.data('maximo_classification');
            document.getElementById('node-hierarchy').innerHTML = node.data('proposed_hierarchy').replace(/\//g, '<br>'); 
            document.getElementById('node-number-assets').textContent = node.data('number_of_assets');
            document.getElementById('node-corrective-work').textContent = node.data('corrective_work_needed');

            // Check for asset_owner attribute and update if it exists
            if (node.data('asset_owner')) {
                document.getElementById('node-asset-owner').textContent = node.data('asset_owner');
            } else {
                document.getElementById('node-asset-owner').textContent = 'N/A';
            }

            // Check for ldtext attribute and update if it exists
            if (node.data('ldtext')) {
                document.getElementById('node-ldtext').textContent = node.data('ldtext');
            } else {
                document.getElementById('node-ldtext').textContent = 'N/A';
            }
        });

    // Back Button for Node Information
    document.getElementById('back-btn-node-info').addEventListener('click', function() {
        // Show "Asset Class Plan" title again
        document.querySelector('#sidebar h3').style.display = 'block';

        // Hide Node Info Section and Show Sidebar Menu
        document.getElementById('node-info-content').style.display = 'none';
        document.getElementById('sidebar-menu').style.display = 'block';

        // Unselect any selected nodes to remove the yellow highlight
        cy.nodes().unselect();
    });

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
