export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { storeId, rating } = req.body;
  
    // Validate input
    if (!storeId || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating data' });
    }
  
    try {
      // Forward to Strapi's endpoint
      const strapiResponse = await fetch(`https://admin.savesright.com/api/stores/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 82193145001e65735cbff28574e174bb94a4a50bd8861a6f1ff43ea5c9ad39133001a2c635306e836387faa89924b212a90af8a77704c0b933d7bae60b2825d192ec402353de10a8ab5dd7d1ed1c22beda961e8fa36ae43e1dc5a7ef3925110f30a181881e86f02ee7f6348d4368652237d678cce0c91ce7b393057569430c4d`
        },
        body: JSON.stringify({ storeId, rating })
      });
  
      if (!strapiResponse.ok) {
        throw new Error('Strapi API error');
      }
  
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Rating submission error:', error);
      return res.status(500).json({ error: 'Failed to submit rating' });
    }
  }