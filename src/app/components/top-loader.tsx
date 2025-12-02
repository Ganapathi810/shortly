"use client"

import NextTopLoader from 'nextjs-toploader'

export const TopLoader = () => { 
    return (
        <NextTopLoader 
            color="#0eb3b3"
            initialPosition={0.08} // Start position (8%)
            crawlSpeed={200} // Speed of the crawl animation
            height={3} // Height in pixels
            crawl={true} // Whether to show the crawl animation
            showSpinner={false} // Disable the circular spinner icon
            easing="ease" // CSS easing function
            speed={200} // Animation speed
            // Include a small z-index to ensure it sits above everything
            zIndex={1600}
      />
    )
}