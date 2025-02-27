document.addEventListener('DOMContentLoaded', function(){
    // Ensure that Cytoscape has been initialized
    if (typeof window.cy === 'undefined') {
        console.error('Cytoscape instance "cy" is not defined.');
        return;
    }
    var cy = window.cy; // Global Cytoscape instance
  
    // Sidebar navigation elements
    var generalInfoBtn = document.getElementById('general-info-btn');
    var legendBtn = document.getElementById('legend-btn');
    var searchAssetsBtn = document.getElementById('search-assets-btn');
  
    // Content sections
    var generalInfoContent = document.getElementById('general-info-content');
    var legendContent = document.getElementById('legend-content');
    var searchAssetsContent = document.getElementById('search-assets-content');
  
    // Back buttons
    var backBtn = document.getElementById('back-btn');
    var backBtnLegend = document.getElementById('back-btn-legend');
    var backBtnSearch = document.getElementById('back-btn-search');
  
    // Sidebar menu container
    var sidebarMenu = document.getElementById('sidebar-menu');
  
    // --- Navigation for Sidebar Sections ---
    // Show General Information
    generalInfoBtn.addEventListener('click', function(){
        sidebarMenu.style.display = 'none';
        generalInfoContent.style.display = 'block';
    });
  
    // Show Legend
    legendBtn.addEventListener('click', function(){
        sidebarMenu.style.display = 'none';
        legendContent.style.display = 'block';
    });
  
    // Show Search Assets
    searchAssetsBtn.addEventListener('click', function(){
        sidebarMenu.style.display = 'none';
        searchAssetsContent.style.display = 'block';
    });
  
    // Back button for General Information
    backBtn.addEventListener('click', function(){
        generalInfoContent.style.display = 'none';
        sidebarMenu.style.display = 'block';
    });
  
    // Back button for Legend
    backBtnLegend.addEventListener('click', function(){
        legendContent.style.display = 'none';
        sidebarMenu.style.display = 'block';
    });
  
    // Back button for Search Assets
    backBtnSearch.addEventListener('click', function(){
        searchAssetsContent.style.display = 'none';
        sidebarMenu.style.display = 'block';
        // Optionally, clear any search highlights when exiting search view:
        cy.elements().removeClass('highlighted');
    });
  
    // --- Search Functionality ---
    var searchInput = document.getElementById('search-input');
    var searchButton = document.getElementById('search-button');
    var clearButton = document.getElementById('clear-button');
  
    // Log all shared_names for debugging
    function logAllSharedNames() {
        var sharedNames = cy.nodes().map(function(ele){ return ele.data('shared_name'); });
        console.log('All shared_names:', sharedNames);
    }
    logAllSharedNames();
  
    // Search Button Event Listener
    searchButton.addEventListener('click', function() {
        var query = searchInput.value.trim().toLowerCase();
        console.log('Search query:', query);
  
        if (query === "") {
            cy.elements().removeClass('highlighted');
            console.log('Search query is empty. Removed all highlights.');
            return;
        }
  
        // Remove previous highlights
        cy.elements().removeClass('highlighted');
        console.log('Removed previous highlights.');
  
        // Find matching node(s)
        var targetNodes = cy.nodes().filter(function(ele){
            var sharedName = ele.data('shared_name');
            return sharedName && sharedName.toLowerCase() === query;
        });

        var targetNodesOnDescription = cy.nodes().filter(function(ele){
            var description = ele.data('description');
            return description && description.toLowerCase() === query;
        });
  
        console.log('Number of matched nodes:', targetNodes.length);
  
        // Combine both sets to avoid duplicates
        var allTargetNodes = targetNodes.union(targetNodesOnDescription);

        console.log('Number of unique matched nodes:', allTargetNodes.length);

        if (allTargetNodes.length > 0) {
            allTargetNodes.addClass('highlighted');
            console.log('Highlighted nodes:', allTargetNodes.map(function(ele){ return ele.data('shared_name') || ele.data('description'); }));

            // Center view on all found nodes in one animation
            cy.animate({
                fit: {
                    eles: allTargetNodes,
                    padding: 400
                },
                duration: 1000,
                zoom: 1.2
            });
            console.log('Animated to fit all highlighted nodes.');
        }

        if (targetNodes.length == 0 && targetNodesOnDescription.length == 0) {
            alert('No asset found with the name or description: ' + searchInput.value);
            console.log('No matching asset found for query:', query);
        }
    });
  
    // Allow pressing 'Enter' to trigger search
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
  
    // Clear Button Event Listener
    clearButton.addEventListener('click', function() {
        searchInput.value = "";
        cy.elements().removeClass('highlighted');
        console.log('Cleared search input and removed all highlights.');
        // Reset view (adjust padding/zoom as desired)
        cy.animate({
            fit: {
                eles: cy.elements(),
                padding: 50
            },
            duration: 1000,
            zoom: 1
        });
        console.log('Reset view after clearing.');
    });

    // --- Handle clicks outside nodes (tap) ---
    cy.on('tap', function(event) {
        if (event.target === cy) {
            var nodeInfoContent = document.getElementById('node-info-content');
            var backButtonNodeInfo = document.getElementById('back-btn-node-info');
    
            // Only trigger the back button if node info is currently visible
            if (nodeInfoContent.style.display === 'block' && backButtonNodeInfo) {
                backButtonNodeInfo.click();
            }
        }
    });
});



function filterNodes() {
    var cy = window.cy;
    
    // Get selected filters
    var selectedAssetOwner = document.getElementById('asset-owner-dropdown').value.toUpperCase();
    var selectedProblematic = document.getElementById('problematic-dropdown').value.toUpperCase();

    // Map specific values
    if (selectedProblematic === 'TBA') {
        selectedProblematic = 'N';
    } else if (selectedProblematic === 'SPECIALIST-ASSESSMENT') {
        selectedProblematic = 'A';
    }

    // Show all nodes if both filters are at default
    if (selectedAssetOwner === 'DEFAULT' && selectedProblematic === 'DEFAULT') {
        cy.nodes().forEach(n => n.style('visibility', 'visible'));
        cy.edges().forEach(e => e.style('visibility', 'visible'));
        return;
    }

    // Apply filters
    let filteredNodes = cy.nodes().filter(n => {
        let matchesAssetOwner = selectedAssetOwner === 'DEFAULT' || n.data('asset_owner') === selectedAssetOwner;
        let matchesProblematic = selectedProblematic === 'DEFAULT' || 
                                 (n.data('corrective_work_needed') && n.data('corrective_work_needed').toUpperCase() === selectedProblematic);
        return matchesAssetOwner && matchesProblematic;
    });

    // Hide all nodes except the filtered ones
    cy.nodes().forEach(n => {
        if (filteredNodes.has(n)) {
            n.style('visibility', 'visible'); // Show nodes that match both filters
        } else {
            n.style('visibility', 'hidden'); // Hide others
        }
    });

    // Adjust edge visibility (only show edges where both connected nodes are visible)
    cy.edges().forEach(e => {
        let src = e.source();
        let tgt = e.target();
        if (filteredNodes.has(src) && filteredNodes.has(tgt)) {
            e.style('visibility', 'visible'); // Show edges if both connected nodes are visible
        } else {
            e.style('visibility', 'hidden'); // Hide other edges
        }
    });
}

// Event listeners for dropdowns
document.getElementById('asset-owner-dropdown').addEventListener('change', filterNodes);
document.getElementById('problematic-dropdown').addEventListener('change', filterNodes);



document.getElementById('export-image-btn').addEventListener('click', async function () {
    if (typeof window.cy === 'undefined') {
        console.error('Cytoscape instance "cy" is not defined.');
        return;
    }

    // Generate a PNG image from the current viewport
    var pngData = window.cy.png({
        full: false,
        bg: 'white',
        scale: 2
    });

    // Convert Base64 data to a Blob
    const byteCharacters = atob(pngData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    try {
        // Show the file save dialog
        const handle = await window.showSaveFilePicker({
            suggestedName: "asset-hierarchy.png",
            types: [{
                description: 'PNG Image',
                accept: { 'image/png': ['.png'] }
            }]
        });

        // Write the file
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log("File saved successfully.");
    } catch (error) {
        console.error("File save canceled or failed:", error);
    }
});

document.getElementById('export-pdf-btn').addEventListener('click', async function() {
    // Ensure the Cytoscape instance is available
    if (typeof window.cy === 'undefined') {
        console.error('Cytoscape instance "cy" is not defined.');
        return;
    }

    // Generate a PNG image from the current viewport of the Cytoscape container.
    var pngData = window.cy.png({
        full: false,    // Capture only the current viewport (not the full graph)
        bg: 'white',    // Set background to white (adjust as needed)
        scale: 2        // Increase resolution by scaling the output (optional)
    });

    try {
        // Show the file save dialog
        const handle = await window.showSaveFilePicker({
            suggestedName: "asset-hierarchy.pdf",
            types: [{
                description: 'PDF Document',
                accept: { 'application/pdf': ['.pdf'] }
            }]
        });

        // Create a writable stream for the selected file
        const writable = await handle.createWritable();

        // Use jsPDF to create a new PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add the Cytoscape image to the PDF
        doc.addImage(pngData, 'PNG', 10, 10, 180, 160); // Position and size the image

        // Write the PDF to the file
        const pdfBlob = doc.output('blob');
        await writable.write(pdfBlob);
        await writable.close();
        console.log("PDF saved successfully.");
    } catch (error) {
        console.error("File save canceled or failed:", error);
    }
});

// Collapsible Nodes
document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.cy === 'undefined') {
        console.error('Cytoscape instance "cy" is not defined.');
        return;
    }
    var cy = window.cy; // Global Cytoscape instance

    // Track last clicked node to simulate "dblclick"
    var lastClickTime = 0;
    var lastClickedNode = null;

    // Extract the last part of the hierarchy (final part after splitting)
    function getLastPartOfHierarchy(hierarchy) {
        var parts = hierarchy.split('/');
        return parts.length > 0 ? parts[parts.length - 1] : null; // Last part of the hierarchy
    }

    // Function to extract the parent from 'hierarchy'
    function getParentFromHierarchy(node) {
        var hierarchy = node.data('hierarchy'); // Example: "x/y/z"

        if (!hierarchy || !hierarchy.includes('/')) {
            return null; // No valid hierarchy
        }

        var parts = hierarchy.split('/'); // Split into ["x", "y", "z"]

        if (parts.length < 2) {
            return null; // No parent exists
        }

        return parts[parts.length - 2]; // Second-last element (parent)
    }

    // Function to find all descendants (children, children's children, etc.)
    function getAllDescendants(node) {
        var descendants = cy.nodes().filter(n => n.data('hierarchy').startsWith(node.data('hierarchy')));
        return descendants;
    }

    cy.on('tap', 'node', function (event) {
        var node = event.target;
        var now = new Date().getTime();

        // Detect double click (within 300ms)
        if (lastClickedNode === node && now - lastClickTime < 300) {
            event.stopPropagation(); // Prevent single click actions on double-click

            console.log("Double click detected on node:", node.data('id'));

            // Extract parent from hierarchy
            var parentId = getParentFromHierarchy(node);
            console.log("Extracted Parent ID:", parentId);

            // Get all descendants (children and children's children)
            var familyNodes = getAllDescendants(node);
            familyNodes = familyNodes.union(node); // Also include the selected node

            console.log("Family nodes found:", familyNodes.length);


            // Hide all nodes except family
            cy.nodes().forEach(n => {
                if (familyNodes.has(n)) {
                    n.style('display', 'element'); // Show family nodes
                } else {
                    n.style('display', 'none'); // Hide all other nodes
                }
            });

            // Adjust edge visibility (only show edges where both nodes are visible)
            cy.edges().forEach(e => {
                var src = e.source();
                var tgt = e.target();
                if (src.style('display') === 'element' && tgt.style('display') === 'element') {
                    e.style('display', 'element');
                } else {
                    e.style('display', 'none');
                }
            });

            lastClickedNode = null; // Reset last clicked node
        } else {
            lastClickTime = now;
            lastClickedNode = node;
        }
    });

    // Restore full network when clicking on background or pressing the window
    function restoreFullNetwork() {
        console.log("Restoring full network.");
        cy.nodes().style('display', 'element');
        cy.edges().style('display', 'element');
    }

    // Click on background restores all nodes & edges
    cy.on('tap', function (event) {
        if (event.target === cy) {
            restoreFullNetwork();
        }
    });

    // Pressing anywhere on the window also restores all nodes & edges
    window.addEventListener('click', function (event) {
        if (!event.target.closest('#cy')) {
            restoreFullNetwork();
        }
    });
});
