document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add('blurred');

    setTimeout(() => {
        document.querySelector('.intro').classList.add('fadeOut');
        setTimeout(() => {
            document.querySelector('.intro').style.display = 'none';
            document.querySelector('.content').classList.remove('hidden');
            document.body.classList.remove('blurred');
        }, 1000);
    }, 5000); // Wait for 5 seconds before starting to fade out the intro
});

let shop = document.getElementById("shop");
let cartItemsData = [];
let shopItemsData =  [{
    id: "jj1",
    name: "Basic Nike t-shirt",
    price: 35,
    desc: "Black nike basic.",
    img: "zia.image/nike1.jpg"
}, {
    id: "jj2",
    name: "Jordan Designed Short",
    price: 85,
    desc: "Jordan Sport Men's Dri-FIT Diamond Shorts.",
    img: "zia.image/jordan1.png"
}, {
    id: "jj3",
    name: "Air Jordan 1 Low SE",
    price: 140,
    desc: "This AJ1 is revamped with new colors and ultra-stylish textures, without sacrificing its iconic look and much-loved comfort. Simply legendary. Premium materials. Comfortable Nike Air cushioning. Subtle details (just look at that embroidered heel!). All combined in a must-have sneaker.",
    img: "zia.image/Air jordan 1 low SE.jpeg"
}, {
    id: "jj4",
    name: "Nike Air Max Plus",
    price: 199.99,
    desc: "Embrace your rebellious side with the Nike Air Max Plus, an innovative Air model that provides perfect stability and exceptional cushioning. It embodies an extraordinary style with the original wavy lines, plastic details, and breathable mesh.",
    img: "zia.image/Nike Air Max PLus.jpeg"
}];

let generateShop = () => {
    shop.innerHTML = shopItemsData.map((item) => `
        <div class="item" id="${item.id}">
            <img src="${item.img}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.desc}</p>
            <p class="price">$${item.price}</p>
            <div class="quantity">
                <span class="minus" data-id="${item.id}" onclick="decrement('${item.id}')">-</span>
                <span class="count" id="count-${item.id}">0</span>
                <span class="plus" data-id="${item.id}" onclick="increment('${item.id}')">+</span>
            </div>
            <button onclick="addToCart('${item.id}')">Add to Collection</button>
        </div>
    `).join("");
};

generateShop();

let increment = (id) => {
    let countElement = document.getElementById(`count-${id}`);
    let currentCount = parseInt(countElement.innerText);
    countElement.innerText = currentCount + 1;
    console.log(`Increment: ${id}`);
};

let decrement = (id) => {
    let countElement = document.getElementById(`count-${id}`);
    let currentCount = parseInt(countElement.innerText);
    if (currentCount > 0) {
        countElement.innerText = currentCount - 1;
        console.log(`Decrement: ${id}`);
    }
};

let addToCart = (id) => {
    let selectedItem = shopItemsData.find(item => item.id === id);
    let cartItem = cartItemsData.find(item => item.id === id);

    if (cartItem) {
        cartItem.count += 1;
    } else {
        cartItemsData.push({...selectedItem, count: 1});
    }

    updateCart();
};

let updateCart = () => {
    let cartElement = document.getElementById("cartItems");
    let cartAmountElement = document.querySelector(".cartAmount");

    cartElement.innerHTML = cartItemsData.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Quantity: ${item.count}</p>
        </div>
    `).join("");

    let totalItems = cartItemsData.reduce((total, item) => total + item.count, 0);
    cartAmountElement.innerText = totalItems;
};

let toggleCart = () => {
    let cartElement = document.getElementById("cartItems");
    cartElement.classList.toggle("hidden");
};
