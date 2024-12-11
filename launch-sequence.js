// First, register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there

    //Read the logs
    const response = await fetch("/api/logs");
    const data = await response.json();
    console.log(data);

    //See personnel 8 
    const personResponse = await fetch("/api/personnel/8");
    const personData = await personResponse.json();
    console.log(personData);

    //Read person 8's messages
    const messageResponse = await fetch("/api/messages?to=8");
    const messageData = await messageResponse.json();
    console.log(messageData[0].message);

    //See personnel 11 who we know is the dog
    const dogResponse = await fetch("/api/personnel/11");
    const dogData = await dogResponse.json();
    console.log(dogData);

    //Make the response the dog name and change to uppercase
    const submitResponse = await fetch("/api/codes", {
      method: "POST",
      body: JSON.stringify ({
        enter: dogData.name.toUpperCase(),
      }),
    });
    //submit response
    const submitData = await submitResponse.json();
    console.log(submitData);

    //get the victory gif if correct
    const img = document.getElementById("launch");
    img.src = submitData.img;

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });

// submitCode(); // calls the function above to run your code
