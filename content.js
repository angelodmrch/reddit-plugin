// Track which posts have already been unblurred
const processedPosts = new WeakSet();
const removedGamePosts = new WeakSet();

// Function to click all 18+ content overlays
function clickNSFWButtons() {
  // Find Reddit's shreddit-blurred-container elements (new Reddit design)
  const blurredContainers = document.querySelectorAll('shreddit-blurred-container[reason="nsfw"]');
  
  blurredContainers.forEach(container => {
    // Skip if already processed
    if (processedPosts.has(container)) {
      return;
    }
    
    // Look for the clickable "outer" div within the shadow DOM or light DOM
    const outerDiv = container.querySelector('div.outer');
    if (outerDiv) {
      outerDiv.click();
      processedPosts.add(container);
      console.log('Clicked NSFW overlay');
      return;
    }
    
    // If no outer div, try clicking the first child div inside slot="blurred"
    const blurredSlot = container.querySelector('[slot="blurred"]');
    if (blurredSlot) {
      const firstDiv = blurredSlot.querySelector('div');
      if (firstDiv) {
        firstDiv.click();
        processedPosts.add(container);
        console.log('Clicked blurred slot');
        return;
      }
    }
    
    // Last resort: click the container itself once
    container.click();
    processedPosts.add(container);
  });
}

// Remove posts that are game posts (<shreddit-post game="">)
function removeGamePosts() {
  const gamePosts = document.querySelectorAll('shreddit-post[game]');

  gamePosts.forEach((post) => {
    if (removedGamePosts.has(post)) {
      return;
    }

    const article = post.closest('article');
    if (article) {
      article.remove();
      removedGamePosts.add(post);
      console.log('Removed game post');
      return;
    }

    post.remove();
    removedGamePosts.add(post);
    console.log('Removed game shreddit-post');
  });
}

function runAllFilters() {
  clickNSFWButtons();
  removeGamePosts();
}

// Run immediately
runAllFilters();

// Set up a MutationObserver to watch for new posts being loaded
const observer = new MutationObserver((mutations) => {
  let shouldCheck = false;
  
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      shouldCheck = true;
    }
  });
  
  if (shouldCheck) {
    // Delay slightly to let Reddit finish rendering
    setTimeout(runAllFilters, 100);
  }
});

// Start observing the document body for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also check periodically as a backup (every 2 seconds)
setInterval(runAllFilters, 2000);

console.log('Reddit show 18+ fix loaded');
