
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });
    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    res.status(200).json({ image_url: `data:image/png;base64,${base64Image}` });
  } else {
    res.status(405).end();
  }
}
