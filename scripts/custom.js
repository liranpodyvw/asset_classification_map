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
        } else {
            alert('No node found with the shared name: ' + searchInput.value);
            console.log('No matching node found for query:', query);
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
