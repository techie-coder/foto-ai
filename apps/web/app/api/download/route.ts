
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('imageUrl');
  
    if (!imageUrl) {
      return new Response('Missing imageUrl parameter', { status: 400 });
    }
  
    try {
      const response = await fetch(imageUrl);
  
      if (!response.ok) {
        return new Response('Failed to fetch image', { status: 500 });
      }
  
      const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
      const imageBuffer = await response.arrayBuffer();
  
      const filename = imageUrl.split('/').pop() || 'image.jpg';
  
      return new Response(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } catch (error) {
      return new Response('Error downloading image', { status: 500 });
    }
  }
  