export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prompt = req.body.prompt;

    const response = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;  // ✅
        

      },
      body: JSON.stringify({
        inputs: prompt
      }),
    });

    if (!response.ok) {
      throw new Error("HuggingFace API Error");
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    res.status(200).json({ image: base64 });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}





