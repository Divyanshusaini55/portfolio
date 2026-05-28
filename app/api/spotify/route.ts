import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';
export const revalidate = 10;

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400 || !response.data) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = response.data;
    if (!track || !track.name) {
       return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = response.isPlaying || false;
    const title = track.name;
    const artist = track.artists.map((_artist: { name: string }) => _artist.name).join(', ');
    const album = track.album?.name || '';
    const albumImageUrl = track.album?.images?.[0]?.url || '';
    const songUrl = track.external_urls?.spotify || '';

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
