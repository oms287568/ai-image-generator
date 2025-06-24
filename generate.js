export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const prompt = req.body.prompt;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error("HuggingFace API request failed");
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    res.status(200).json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    console.error("Image generation error:", error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
}






