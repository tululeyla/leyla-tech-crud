export async function fetchEngineers(user){
   const url = "https://jsonplaceholder.typicode.com/users";
   const users = {name:user,company:{name:"LeylaTech"}};
  
const response = await fetch(url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(users)
   })

   if(!response.ok){
    throw new Error("Network response was not ok",response.status);
   }
   return await response.json();
  

}