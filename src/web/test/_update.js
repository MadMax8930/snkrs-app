const axios = require('axios');

let baseUrl = 'https://www.whentocop.fr/_next/data/vMVgPctMJxNGeuHOE1cpo';

async function updateBaseUrl() {
  try {
    const response = await axios.get(`${baseUrl}/drops.json`);
    if (response.status !== 200) { throw new Error('Request to baseUrl failed'); }
    console.log('Request to baseUrl successful');
  } catch (error) {
    console.error('Error fetching base URL:', error.message);
    
    // Extract changing segment from the URL obtained through developer tools
    const segments = baseUrl.split('/');
    const changingSegment = segments[segments.length - 1];
 
    if (changingSegment) {
      baseUrl = baseUrl.replace(/\/([^\/]+)$/, `/${changingSegment}`);
      console.log('Base URL updated from dev tools:', baseUrl);

      // Retry the fetch with the updated URL
      await fetchWithUpdatedUrl();
    } else {
      throw new Error('Unable to extract changing segment from dev tools URL');
    }
  }
}

async function fetchWithUpdatedUrl() {
  try {
    const response = await axios.get(`${baseUrl}/drops.json`);
    if (response.status !== 200) { throw new Error('Request to updated baseUrl failed'); }
    console.log('Request to updated baseUrl successful');
  } catch (error) {
    console.error('Error fetching updated base URL:', error.message);
  }
}

module.exports = { updateBaseUrl, baseUrl };