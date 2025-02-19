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
  
        if (targetNodes.length > 0) {
            targetNodes.addClass('highlighted');
            console.log('Highlighted nodes:', targetNodes.map(function(ele){ return ele.data('shared_name'); }));
  
            // Center view on the found nodes
            cy.animate({
                fit: {
                    eles: targetNodes,
                    padding: 400
                },
                duration: 1000,
                zoom: 1.2
            });
            console.log('Animated to fit highlighted nodes.');
        } 

        if (targetNodesOnDescription.length > 0) {
            targetNodesOnDescription.addClass('highlighted');
            console.log('Highlighted nodes:', targetNodesOnDescription.map(function(ele){ return ele.data('description'); }));
  
            // Center view on the found nodes
            cy.animate({
                fit: {
                    eles: targetNodesOnDescription,
                    padding: 400
                },
                duration: 1000,
                zoom: 1.2
            });
            console.log('Animated to fit highlighted nodes.');
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
        // Check if the target is not a node (i.e., it's somewhere else in the graph)
        if (event.target === cy) {
            // If clicked anywhere other than a node, close node info (back button)
            var backButtonNodeInfo = document.getElementById('back-btn-node-info');
            if (backButtonNodeInfo) {
                backButtonNodeInfo.click();
            }
        }
    });
});

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

  