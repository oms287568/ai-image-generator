async function generateImage() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",  // <-- Aapka API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  document.getElementById("result").src = imageUrl;
}

