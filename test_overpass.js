const q = '[out:json][timeout:25];(node[amenity="hospital"](around:5000,23.0225,72.5714);way[amenity="hospital"](around:5000,23.0225,72.5714);relation[amenity="hospital"](around:5000,23.0225,72.5714););out center;';

fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'User-Agent': 'NyteHawk-App/1.0'
  },
  body: 'data=' + encodeURIComponent(q)
})
.then(res => {
  console.log('Status:', res.status);
  return res.text();
})
.then(text => console.log('Response:', text.substring(0, 500)))
.catch(console.error);
