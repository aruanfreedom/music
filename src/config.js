const config = {};

config.api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://test-music.zzz.com.ua';

export default config;
