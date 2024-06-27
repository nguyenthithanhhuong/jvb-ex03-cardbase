const courseApi = 'https://dog.ceo/api/breeds/image/random'

function start() {
    getImage(function(image) {
        console.log(image.message);
    });
}

start();

function getImage(callback) {
    fetch(courseApi)
    .then(function(response) {
        return response.json();
    }) 
    .then(callback);
}