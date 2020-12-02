// Create a request variable and assign a new XMLHttpRequest object to it.
const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = "https://raw.githubusercontent.com/taniarascia/sandbox/master/ghibli/logo.png";

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);


var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () {
    // Begin accessing JSON data here
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(this.response);

        data.forEach((movie) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300); 
            p.textContent = movie.description.length <= 300 ? movie.description : movie.description + '...';

            card.appendChild(h1);
            card.appendChild(p);

            container.appendChild(card);
        })
    } else {
        const error = document.createElement('marquee');
        error.textContent = 'Hello, error in API!';

        container.appendChild(error);
    }
}

// Send request
request.send();