async function getRecipe(prompt) {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": "gemini_api_key_here" // test the code with your API key here
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are a cute pastry chef AI that creates simple and sweet cake recipes with a kind tone. Create a simple, cozy and easy-to-follow cake recipe using these flavors: ${prompt}. Use only common ingredients and explain the steps clearly in English.`
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

document.getElementById("generate").addEventListener("click", async () => {
  const flavors = document.getElementById("flavors").value.trim();
  const recipeBox = document.getElementById("recipe");

  if (!flavors) {
    recipeBox.textContent = "Please type the flavors you want 💕";
    return;
  }

  recipeBox.textContent = "Baking something sweet for you... 🍰";
  
  try {
    const result = await getRecipe(flavors);
    recipeBox.textContent = result;
  } catch (error) {
    recipeBox.textContent = `Oops! Something went wrong: ${error.message}. Check your API key or try again later. 💔`;
  }
});