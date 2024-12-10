document.getElementById('takeScreenshotBtn').addEventListener('click', async () => {
  try {
    // Capture the current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Take the screenshot
    const imageDataUrl = await chrome.tabs.captureVisibleTab();
    
    // Send to API
    const response = await fetch('http://localhost:3000/api/validationrequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'IMAGE',
        content: imageDataUrl
      })
    });
    
    console.log("Sending response");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Screenshot sent successfully:', data);
    
  } catch (error) {
    console.error('Error:', error);
  }
});
