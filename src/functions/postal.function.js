
async function postalSeach(postal){
    const authToken = process.env.POSTAL_ACCESS_TOKEN 

    const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `${authToken}`,
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        return data?.results[0]['ADDRESS']
    
      } catch (error) {
        console.error('Error:', error);
      }

}

module.exports={postalSeach}