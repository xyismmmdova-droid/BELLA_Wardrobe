// Məhsulları ekrana çıxararkən select-ləri də əlavə edirik
const productList = document.getElementById('product-list');
products.forEach(p => {
    productList.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm text-center p-2">
                <img src="${p.img}" class="card-img-top product-img" alt="${p.name}">
                <div class="card-body p-2">
                    <h6 class="mb-1">${p.name}</h6>
                    <p class="text-primary small fw-bold">${p.price} AZN</p>
                    
                    ${p.type === "Dəri Ayaqqabı" ? `
<select id="size-${p.id}" class="form-select form-select-sm mb-2 bg-light">
<option value="35">Ölçü: 35</option>
<option value="36">Ölçü: 36</option>
<option value="37">Ölçü: 37</option>
<option value="38">Ölçü: 38</option>
</select>
` : `
<select id="size-${p.id}" class="form-select form-select-sm mb-2 bg-light">
<option value="35">Ölçü: S</option>
<option value="M">Ölçü: M</option>
<option value="L">Ölçü: L</option>
<option value="XL">Ölçü: XL</option>
</select>
`}

                    <select id="color-${p.id}" class="form-select form-select-sm mb-2">
                        <option value="Qara">Rəng: Qara</option>
                        <option value="Ağ">Rəng: Ağ</option>
                        <option value="Mavi">Rəng: Mavi</option>
                            <option value="Qırmızı">Rəng: Qırmızı</option>
                    </select>

                    <button onclick="addToCart(${p.id})" class="btn btn-success btn-sm w-100">Səbətə at🛒</button>
                    <button onclick="removeFromCart(${item.uniqueId})" class="btn btn-sm text-danger shadow-none">
    <i class="fas fa-trash-alt"></i>
</button>
                </div>
            </div>
        </div>
    `;
});

function addToCart(id) {
    const product = products.find(p => p.id === id);
    
    // İstifadəçinin seçdiyi dəyərləri götürürük
    const selectedSize = document.getElementById(`size-${id}`).value;
    const selectedColor = document.getElementById(`color-${id}`).value;

    // Səbətdə eyni ID, eyni Ölçü və eyni Rəngdə məhsul varmı?
    const existingItem = cart.find(item => 
        item.id === id && 
        item.size === selectedSize && 
        item.color === selectedColor
    );

    if (existingItem) {
        existingItem.quantity++; // Hər şey eynidirsə, yalnız sayı artır
    } else {
        // Fərqlidirsə (məsələn: eyni kofta amma fərqli rəng), yeni element kimi əlavə et
        cart.push({ 
            ...product, 
            quantity: 1, 
            size: selectedSize, 
            color: selectedColor 
        });
    }
    updateCart();
}
function setLanguage(lang) {

  const data = {
    az: {
      title: "Salam",
      desc: "Bu mənim saytımdır",
      products: "Məhsullar",
      contact: "Əlaqə",
      privacy: "Məxfilik"
    },
    en: {
      title: "Hello",
      desc: "This is my website",
      products: "Products",
      contact: "Contact",
      privacy: "Privacy"
    },
    ru: {
      title: "Привет",
      desc: "Это мой сайт",
      products: "Товары",
      contact: "Контакты",
      privacy: "Конфиденциальность"
    }
  };

  document.getElementById("title").innerText = data[lang].title;
  document.getElementById("desc").innerText = data[lang].desc;

  document.getElementById("nav-products").innerText = data[lang].products;
  document.getElementById("nav-contact").innerText = data[lang].contact;
  document.getElementById("nav-privacy").innerText = data[lang].privacy;
}
// Səbət siyahısını yeniləyən funksiya (Görünüş üçün)
function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceEl = document.getElementById('total-price'); // total price elementi

    cartList.innerHTML = '';

    let totalSum = 0; // cəmi qiymət
    cart.forEach(item => {
        totalSum += item.price * item.quantity; // qiymət * miqdar

        cartList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center small">
                <div>
                    <strong>${item.name}</strong><br>
                    <small class="text-muted">${item.size} / ${item.color}</small>
                    <span class="badge bg-primary ms-1">x${item.quantity}</span>
                    <span class="text-success ms-2">${item.price * item.quantity} AZN</span>
                </div>
                <button onclick="removeFromCart('${item.id}-${item.size}-${item.color}')" class="btn btn-sm text-danger">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>
        `;
    });

    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    totalPriceEl.innerText = totalSum + " AZN"; // cəmi qiyməti ekrana çıxarır
}

// Silmə funksiyasını ID + Size + Color kombinasiyasına görə tənzimləyirik
function removeFromCart(uniqueKey) {
    cart = cart.filter(item => `${item.id}-${item.size}-${item.color}` !== uniqueKey);
    updateCart();
}
// Sifarişi rəsmiləşdir butonu
const checkoutBtn = document.querySelector('.btn.btn-success.w-100.mt-3.shadow-sm');
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
        alert("Səbətiniz boşdur!");
        return;
    }
    // Modal göstərmək
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();

    // Səbəti təmizləmək
    cart = [];
    updateCart();
});
function checkout() {
    if(cart.length === 0){
        alert("Səbətiniz boşdur!");
    } else {
        var orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
        orderModal.show();

        // Səbəti təmizləyirik
        cart = [];
        updateCart();
    }
}