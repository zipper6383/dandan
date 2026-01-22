const API_URL = 'http://localhost:5000/api';

async function testNews() {
  try {
    console.log('Fetching News...');
    const res = await fetch(`${API_URL}/news`);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const data = await res.json();
    console.log('✅ News fetched:', data.data?.length, 'items');
    console.log('Pagination:', data.pagination);
    if (data.data && data.data.length > 0) {
      console.log('First item:', data.data[0].title);
    }
  } catch (e) {
    console.error('❌ News fetch failed:', e);
  }
}

testNews();
