// 1. MƏHSUL DATA BAZASI
const products = [
    { id: 1, name: "Dəri Ayaqqabı", price: 85, type: "shoes", img: "https://come4buy.com/cdn/shop/files/come4buy_24_869060c5-2b37-4af9-ac64-785cb0d04a06_800x.jpg?v=1749622320" },
    { id: 2, name: "Pambıq Kofta", price: 40, type: "clothing", img: "https://i5.walmartimages.com/seo/Olyvenn-Women-Pullover-Sweaters-Long-Sleeve-V-Neck-Cable-Knit-Chunky-Sweater-Loose-Casual-Fall-Winter-Knitwear-Blouse-Tops-White-M_486c743e-70c8-434d-a932-c67064d2bf9a.d7cb4b8680eda20b7e31bd8b4280892a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" },
    { id: 3, name: "Klassik Ətək", price: 50, type: "clothing", img: "https://s.alicdn.com/@sc04/kf/H813aedaf8ac54ca2931cab97e5acf3f5S/Wholesale-2025-European-American-Summer-Bohemian-A-Line-Midi-Skirt-Flowing-Swing-Layered-Cake-Ladies-Elegant-Skirt.jpg_300x300.jpg" },
    { id: 4, name: "Cins Şalvar", price: 65, type: "clothing", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
    { id: 5, name: "Ziyafət Donu", price: 150, type: "clothing", img: "https://image.made-in-china.com/202f0j00qnKlgTmznkrV/Women-Elegant-Slim-Chiffon-Summer-Lace-Party-Long-Dress-Europe-Solid-Color-Bridesmaids-Wedding-Maxi-Dresses.webp" },
    { id: 6, name: "Yun Corablar", price: 12, type: "clothing", img: "https://come4buy.com/cdn/shop/products/SHOE04E.jpg?v=1640184263" }
];

let cart = [];

// 2. MƏHSULLARI EKRANA ÇIXARMAQ
function displayProducts() {
    const container = document.getElementById('product-container');
    if (!container) return; // Errorun qarşısını almaq üçün

    container.innerHTML = products.map(p => `
        <div class="col-md-6 col-xl-4 mb-4">
            <div class="card h-100 shadow-sm border-0">
                <img src="${p.img}" class="card-img-top product-img" alt="${p.name}" style="height: 200px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold">${p.name}</h6>
                    <p class="text-success fw-bold small">${p.price} AZN</p>
                    
                    <div class="mt-auto">
                        <select id="size-${p.id}" class="form-select form-select-sm mb-2 bg-light">
                            ${p.type === "shoes" 
                                ? '<option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option>' 
                                : '<option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option>'}
                        </select>

                        <select id="color-${p.id}" class="form-select form-select-sm mb-3 bg-light">
                            <option value="Qara">Qara</option>
                            <option value="Ağ">Ağ</option>
                            <option value="Mavi">Mavi</option>
                            <option value="Qırmızı">Qırmızı</option>
                        </select>

                        <button onclick="addToCart(${p.id})" class="btn btn-success btn-sm w-100 rounded-pill">Səbətə at🛒</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. SƏBƏTƏ ƏLAVƏ ETMƏK
window.addToCart = function (id) {
    const product = products.find(p => p.id === id);
    const selectedSize = document.getElementById(`size-${id}`).value;
    const selectedColor = document.getElementById(`color-${id}`).value;

    const existingItem = cart.find(item =>
        item.id === id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
            uniqueId: Date.now() + Math.random()
        });
    }
    updateCart();
};

// 4. SƏBƏTDƏN SİLMƏK
window.removeFromCart = function (uniqueId) {
    cart = cart.filter(item => item.uniqueId !== uniqueId);
    updateCart();
};

// 5. SƏBƏTİ YENİLƏMƏK
function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceEl = document.getElementById('total-price');

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="list-group-item text-muted text-center py-4">Səbətiniz boşdur</li>';
        cartCount.innerText = '0';
        totalPriceEl.innerText = '0 AZN';
        return;
    }

    let totalSum = 0;
    let totalQty = 0;
    let cartHTML = '';

    cart.forEach(item => {
        totalSum += item.price * item.quantity;
        totalQty += item.quantity;
        cartHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center px-2">
                <div style="flex: 1">
                    <div class="fw-bold small">${item.name}</div>
                    <div class="text-muted" style="font-size: 11px;">${item.size} / ${item.color}</div>
                    <div class="text-success fw-bold small">${item.price * item.quantity} AZN (x${item.quantity})</div>
                </div>
                <button onclick="removeFromCart(${item.uniqueId})" class="btn btn-sm text-danger border-0">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>
        `;
    });

    cartList.innerHTML = cartHTML;
    cartCount.innerText = totalQty;
    totalPriceEl.innerText = totalSum + ' AZN';
}

// 6. DİL DƏYİŞMƏ
window.setLanguage = function(lang) {
    const data = {
        az: { title: "MODA MAĞAZASI", products: "Məhsullar", contact: "Əlaqə", privacy: "Məxfilik" },
        en: { title: "FASHION STORE", products: "Products", contact: "Contact", privacy: "Privacy" },
        ru: { title: "МАГАЗИН МОДЫ", products: "Товары", contact: "Контакты", privacy: "Конфиденциальность" }
    };

    // Naviqasiya linklərini tapmaq (id əlavə etmək daha yaxşı olar, amma mövcud struktura görə selectorla tapırıq)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks[1].innerText = data[lang].products;
    navLinks[2].innerText = data[lang].contact;
    navLinks[3].innerText = data[lang].privacy;
    
    document.querySelector('h1.text-center').innerText = data[lang].title;
};

// 7. SİFARİŞİ TƏSDİQLƏMƏK
window.checkout = function() {
    if (cart.length === 0) {
        alert("Səbətiniz boşdur!");
        return;
    }
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
    cart = [];
    updateCart();
};

// BAŞLAT
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});