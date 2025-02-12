// scripts/custom.js

document.addEventListener('DOMContentLoaded', function(){
  // Ensure that Cytoscape has been initialized
  if (typeof window.cy === 'undefined') {
      console.error('Cytoscape instance "cy" is not defined.');
      return;
  }

  var cy = window.cy; // Access the global Cytoscape instance

  // Get references to the search input and buttons
  var searchInput = document.getElementById('search-input');
  var searchButton = document.getElementById('search-button');
  var clearButton = document.getElementById('clear-button'); // If you added a clear button

  // Save the initial layout for reset when clearing
  var initialLayout = cy.layout({
      name: 'preset',
      padding: 10
  });

  // Function to log all shared_names (for debugging)
  function logAllSharedNames() {
      var sharedNames = cy.nodes().map(function(ele){ return ele.data('shared_name'); });
      console.log('All shared_names:', sharedNames);
  }

  // Initial log of shared_names
  logAllSharedNames();

  // Search Button Event Listener
  searchButton.addEventListener('click', function() {
      var query = searchInput.value.trim().toLowerCase();
      console.log('Search query:', query); // Debugging

      if (query === "") {
          cy.elements().removeClass('highlighted');
          console.log('Search query is empty. Removed all highlights.');
          return;
      }

      // Remove previous highlights
      cy.elements().removeClass('highlighted');
      console.log('Removed previous highlights.');

      // Find the node(s) with the matching 'shared_name'
      var targetNodes = cy.nodes().filter(function(ele){
          var sharedName = ele.data('shared_name');
          var match = sharedName && sharedName.toLowerCase() === query;
          if(match){
              console.log('Matched node:', sharedName);
          }
          return match;
      });

      console.log('Number of matched nodes:', targetNodes.length);

      if (targetNodes.length > 0) {
          // Highlight the node(s)
          targetNodes.addClass('highlighted');
          console.log('Highlighted nodes:', targetNodes.map(function(ele){ return ele.data('shared_name'); }));

          // Center the view on the node(s)
          cy.animate({
              fit: {
                  eles: targetNodes,
                  padding: 400 // You can adjust this value to reduce zoom further
              },
              duration: 1000,
              zoom: 1.2 // You can set the zoom level here, values less than 1 will zoom out
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

  // Clear Button Event Listener (Optional)
  if (clearButton) {
      clearButton.addEventListener('click', function() {
          searchInput.value = "";
          cy.elements().removeClass('highlighted');
          console.log('Cleared search input and removed all highlights.');

          // Reset zoom and layout to initial state
          initialLayout.run(); // Reset the layout to its original state
          cy.fit(); // Reset zoom to the fit layout
          console.log('Reset zoom and layout to initial state.');
      });
  }
});
