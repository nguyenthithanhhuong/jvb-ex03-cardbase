const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const courseApi = 'https://dog.ceo/api/breeds/image/random/3'

const imagesItem = $$('.slide-item');

let prevSlide = $('.prev-slide');
let currentSlide = $('.current-slide');
let nextSlide = $('.next-slide');

const leftCurrentSlide = $('.current-slide__before');
const rightCurrentSlide = $('.current-slide__after');

const prevBtn = $('.prev-btn');
const nextBtn = $('.next-btn');

// Fetch api
getImages = (callback) => {
    fetch(courseApi)
    .then((response) => response.json())
    .then(callback);
}

// generate background image
generateBackgroundImage = (imageUrl) => {
    $('body').style.backgroundImage = `${imageUrl}`;
}

// Get image from api -> render to layout
renderImages = (images) => {
    imagesItem.forEach((item, index) => {
        item.style.backgroundImage = `url('${images.message[index]}')`
    })

    const currentSlideImageUrl = `url('${images.message[1]}')`;
    generateBackgroundImage(currentSlideImageUrl);
}

// update slides and image of slides when click pre-btn or click next-btn
updateSlide = () => {
    imagesItem.forEach(item => {
        item.classList.remove('prev-slide', 'current-slide', 'next-slide');
    });

    prevSlide.classList.add('prev-slide');
    currentSlide.classList.add('current-slide');
    nextSlide.classList.add('next-slide');

    const currentBackgroundUrl = currentSlide.style.backgroundImage;
    generateBackgroundImage(currentBackgroundUrl);
    console.log(currentBackgroundUrl)
}

start = () => {
    // prev-btn click event
    prevBtn.addEventListener('click', function() {
        let tempSlide = prevSlide;
        prevSlide = currentSlide;
        currentSlide = nextSlide;
        nextSlide = tempSlide;

        updateSlide();
    });

    // next-btn click event
    nextBtn.addEventListener('click', function() {
        let tempSlide = nextSlide;
        nextSlide = currentSlide;
        currentSlide = prevSlide;
        prevSlide = tempSlide;

        updateSlide();
    });

    // hover left of current-slide event
    leftCurrentSlide.addEventListener('mouseover', () => {
        currentSlide.classList.add('rotate-left');
        currentSlide.classList.remove('rotate-right');
    });

    // hover right of current-slide event
    rightCurrentSlide.addEventListener('mouseover', () => {
        currentSlide.classList.add('rotate-right');
        currentSlide.classList.remove('rotate-left');
    });

    leftCurrentSlide.addEventListener('mouseleave', () => {
        currentSlide.classList.remove('rotate-left');
    });

    rightCurrentSlide.addEventListener('mouseleave', () => {
        currentSlide.classList.remove('rotate-right');
    });

    getImages(renderImages);
}

start();