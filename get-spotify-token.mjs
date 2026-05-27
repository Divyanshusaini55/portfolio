import readline from 'readline';
import querystring from 'querystring';

const CLIENT_ID = '39b5067168d14aeeb245f4aa53b7c77f';
const CLIENT_SECRET = 'c6a10682bf114c3faf159f04a374964c';

// Using example.com because Spotify dashboard can be very strict about localhost
const REDIRECT_URI = 'https://example.com/callback';
const SCOPE = 'user-read-currently-playing user-read-recently-played';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SCOPE,
  redirect_uri: REDIRECT_URI,
});

console.log('\n=========================================');
console.log('1. Click this link and log in to Spotify:');
console.log(authUrl);
console.log('=========================================\n');
console.log('2. After you click "Agree", your browser will redirect to a page that says "This site can’t be reached" (ERR_SSL_PROTOCOL_ERROR).');
console.log('   THIS IS NORMAL! Do not panic.\n');

rl.question('3. Copy the ENTIRE URL from your browser address bar and paste it here:\n> ', async (urlStr) => {
  try {
    const url = new URL(urlStr);
    const code = url.searchParams.get('code');

    if (!code) {
      console.log('Error: Could not find "code" in that URL. Make sure you pasted the full URL.');
      process.exit(1);
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.log('\n❌ Spotify API Error:', data);
      process.exit(1);
    }

    console.log('\n✅ SUCCESS! Add these to your .env.local file in your portfolio directory:\n');
    console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
    console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    
    console.log('After adding those to .env.local, restart your Next.js server!');
    process.exit(0);

  } catch (error) {
    console.log('Error parsing URL or fetching token:', error.message);
    process.exit(1);
  }
});
