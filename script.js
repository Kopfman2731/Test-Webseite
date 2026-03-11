const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");

const nextBtn = document.querySelector(".right");
const prevBtn = document.querySelector(".left");
const closeBtn = document.querySelector(".close");

const slideshowBtn = document.getElementById("slideshow");

let currentIndex = 0;
let slideshowInterval;


// open image

function showImage(index){

currentIndex = index;

lightbox.style.display = "flex";

lightboxImg.src = images[index].src;

caption.textContent = images[index].dataset.caption || "";

}


// click gallery

images.forEach((img,index)=>{

img.addEventListener("click",()=>{

showImage(index);

});

});


// navigation

function nextImage(){

currentIndex++;

if(currentIndex >= images.length){

currentIndex = 0;

}

showImage(currentIndex);

}

function prevImage(){

currentIndex--;

if(currentIndex < 0){

currentIndex = images.length - 1;

}

showImage(currentIndex);

}


nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);


// close

function closeLightbox(){

lightbox.style.display = "none";
clearInterval(slideshowInterval);

}

closeBtn.addEventListener("click", closeLightbox);

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape") closeLightbox();
if(e.key==="ArrowRight") nextImage();
if(e.key==="ArrowLeft") prevImage();

});


// slideshow

slideshowBtn.addEventListener("click",()=>{

clearInterval(slideshowInterval);

slideshowInterval = setInterval(nextImage,3000);

});


// swipe gestures (mobile)

let startX = 0;

lightbox.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX;

});

lightbox.addEventListener("touchend",(e)=>{

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50){

nextImage();

}

if(endX - startX > 50){

prevImage();

}

});
