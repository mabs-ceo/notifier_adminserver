
async function postalSeach(postal){
    const authToken = process.env.POSTAL_ACCESS_TOKEN ||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlN2FjMDk2N2NjNDI0YWI5NTBiNDg2OWViYzYzMGE1YiIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC1uZXctMTYzMzc5OTU0Mi5hcC1zb3V0aGVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hcGkvdjIvdXNlci9wYXNzd29yZCIsImlhdCI6MTc0NDg2MjIzNiwiZXhwIjoxNzQ1MTIxNDM2LCJuYmYiOjE3NDQ4NjIyMzYsImp0aSI6Ik9hZ2dCYXNIY3hXWVRkSkQiLCJ1c2VyX2lkIjoyOTk3LCJmb3JldmVyIjpmYWxzZX0.jUWwi-SK-NvISrp3CGOXD_y2gEUpHRbtYSnJLklqPMI" 

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