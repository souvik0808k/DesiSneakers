const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const prevArrow = document.querySelector(".sliderArrow.left");
const nextArrow = document.querySelector(".sliderArrow.right");

const productPrevArrow = document.querySelector(".productArrow.left");
const productNextArrow = document.querySelector(".productArrow.right");

const galleryPrevArrow = document.querySelector(".galleryArrow.left");
const galleryNextArrow = document.querySelector(".galleryArrow.right");
const galleryWrapper = document.querySelector(".galleryWrapper");

const products = [
  {
    id: 1,
    title: "AIR FORCE",
    price: 199,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
    embedSrc: "https://sketchfab.com/models/b580fb8a337e4609807185f1fab2f305/embed?ui_infos=0&ui_watermark_link=0&ui_watermark=0",
    embedTitle: "Nike Air Force 1"
  },
  {
    id: 2,
    title: "JORDAN",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
    embedSrc: "https://sketchfab.com/models/c00345fd64414c4e8895c6aaa262e4d5/embed?ui_infos=0&ui_watermark_link=0&ui_watermark=0",
    embedTitle: "Nike Air Jordan"
  },
  {
    id: 3,
    title: "BLAZER",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
    embedSrc: "https://sketchfab.com/models/b147852f4b3f481aac7a4686b08cf43c/embed?ui_infos=0&ui_watermark_link=0&ui_watermark=0",
    embedTitle: "Nike Air Uptempo Sneaker"
  },
  {
    id: 4,
    title: "CRATER",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
    embedSrc: "https://sketchfab.com/models/e505919b58ba488396a38894e5038726/embed?ui_infos=0&ui_watermark_link=0&ui_watermark=0",
    embedTitle: "2014 - FlyKnit Lunar+2"
  },
  {
    id: 5,
    title: "HIPPIE",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
    embedSrc: "https://sketchfab.com/models/a4769fb9ccaf404b90e4fad29abe8c7d/embed?ui_infos=0&ui_watermark_link=0&ui_watermark=0",
    embedTitle: "Nike Space Hippie 04 sneakers"
  },
];

let chosenProduct = products[0];

const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const productIframe = document.getElementById("productIframe");
const productDetails = document.querySelector(".productDetails");

let sliderIndex = 0;
let productIndex = 0;
let galleryIndex = 0;

const updateSlider = () => {
  wrapper.style.transform = `translateX(${-100 * sliderIndex}vw)`;
};

const updateProduct = () => {
  chosenProduct = products[productIndex];
  currentProductTitle.textContent = chosenProduct.title;
  currentProductPrice.textContent = "$" + chosenProduct.price;
  productIframe.src = chosenProduct.embedSrc;
  productIframe.title = chosenProduct.embedTitle;
  currentProductColors.forEach((color, index) => {
    color.style.backgroundColor = chosenProduct.colors[index].code;
  });
  productDetails.style.opacity = 0;
  setTimeout(() => {
    productDetails.style.opacity = 1;
  }, 100);
};

const updateGallery = () => {
  galleryWrapper.style.transform = `translateX(${- (galleryIndex * 100 / 3)}%)`;
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const index = parseInt(item.dataset.index);
    sliderIndex = index;
    productIndex = index;
    updateSlider();
    updateProduct();
  });
});

prevArrow.addEventListener("click", () => {
  sliderIndex = (sliderIndex - 1 + products.length) % products.length;
  updateSlider();
});

nextArrow.addEventListener("click", () => {
  sliderIndex = (sliderIndex + 1) % products.length;
  updateSlider();
});

// Product navigation (manual only, no auto)
productPrevArrow.addEventListener("click", () => {
  productIndex = (productIndex - 1 + products.length) % products.length;
  updateProduct();
});

productNextArrow.addEventListener("click", () => {
  productIndex = (productIndex + 1) % products.length;
  updateProduct();
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    // Color change logic if needed (3D doesn't change, but can add 2D img if wanted)
  });
});

currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Gallery manual navigation (no auto to match product, but can add if wanted)
galleryPrevArrow.addEventListener("click", () => {
  galleryIndex = (galleryIndex - 1 + 3) % 3;
  updateGallery();
});

galleryNextArrow.addEventListener("click", () => {
  galleryIndex = (galleryIndex + 1) % 3;
  updateGallery();
});

// Parallax for newSeason
const nsItems = document.querySelectorAll(".nsItem:not(.center)");
nsItems.forEach(item => {
  item.addEventListener("mousemove", (e) => {
    const img = item.querySelector(".nsImg");
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1.1)`;
  });
  item.addEventListener("mouseleave", () => {
    const img = item.querySelector(".nsImg");
    img.style.transform = `translate(0, 0) scale(1)`;
  });
});

// Initial update
updateProduct();