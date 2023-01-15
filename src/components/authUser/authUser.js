export const authUser = (email) => {
const authEmail = {
    email:email , 
}
fetch("http://localhost:3025/jwt" , {
method:"POST" , 
headers:{
"Content-Type" : "application/json"
} ,
body:JSON.stringify(authEmail) 
})
.then(res => res.json())
.then(data => localStorage.setItem("portfolio-token" , data.token)) 
.catch(error => console.log(error))
}