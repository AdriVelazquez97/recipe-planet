const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 1000
});

document.getElementById("btn-signup").addEventListener("click", function(e) {
  api
  .get("/users")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error.response);
  });
});