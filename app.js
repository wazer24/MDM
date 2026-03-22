/* ═══════════════════════════════════════════════
   SmartCart – FreshMart Superstore
   Complete JavaScript – All Functional Components
   ═══════════════════════════════════════════════ */

// ── Product Database ──
const PRODUCTS = [
    { id: 1,  name: "Amul Toned Milk",         brand: "Amul",       price: 30,  category: "Dairy",     aisle: "A1", emoji: "🥛" },
    { id: 2,  name: "Full Cream Milk",          brand: "Mother Dairy", price: 35, category: "Dairy",   aisle: "A1", emoji: "🥛" },
    { id: 3,  name: "Whole Wheat Bread",        brand: "Britannia",  price: 45,  category: "Bakery",   aisle: "A2", emoji: "🍞" },
    { id: 4,  name: "Multigrain Bread",         brand: "Harvest Gold", price: 55, category: "Bakery", aisle: "A2", emoji: "🍞" },
    { id: 5,  name: "Farm Fresh Eggs (12 pcs)", brand: "FreshMart",  price: 85,  category: "Poultry",  aisle: "B1", emoji: "🥚" },
    { id: 6,  name: "Free Range Eggs (6 pcs)",  brand: "Eggoz",      price: 90,  category: "Poultry",  aisle: "B1", emoji: "🥚" },
    { id: 7,  name: "Amul Butter (100g)",       brand: "Amul",       price: 56,  category: "Dairy",    aisle: "A1", emoji: "🧈" },
    { id: 8,  name: "Salted Butter (200g)",     brand: "Britannia",  price: 105, category: "Dairy",    aisle: "A1", emoji: "🧈" },
    { id: 9,  name: "Basmati Rice (1kg)",       brand: "India Gate",  price: 145, category: "Grains",   aisle: "C1", emoji: "🍚" },
    { id: 10, name: "Brown Rice (1kg)",         brand: "Daawat",     price: 165, category: "Grains",   aisle: "C1", emoji: "🍚" },
    { id: 11, name: "Fresh Paneer (200g)",      brand: "Amul",       price: 90,  category: "Dairy",    aisle: "A1", emoji: "🧀" },
    { id: 12, name: "Greek Yogurt (400g)",      brand: "Epigamia",   price: 120, category: "Dairy",    aisle: "A1", emoji: "🥣" },
    { id: 13, name: "Organic Honey (250g)",     brand: "Dabur",      price: 195, category: "Pantry",   aisle: "C2", emoji: "🍯" },
    { id: 14, name: "Olive Oil (500ml)",        brand: "Figaro",     price: 320, category: "Pantry",   aisle: "C2", emoji: "🫒" },
    { id: 15, name: "Red Apples (4 pcs)",       brand: "Imported",   price: 160, category: "Fruits",   aisle: "D1", emoji: "🍎" },
    { id: 16, name: "Fresh Bananas (6 pcs)",    brand: "Local",      price: 40,  category: "Fruits",   aisle: "D1", emoji: "🍌" },
    { id: 17, name: "Orange Juice (1L)",        brand: "Tropicana",  price: 110, category: "Beverages",aisle: "B2", emoji: "🧃" },
    { id: 18, name: "Green Tea (25 bags)",      brand: "Lipton",     price: 145, category: "Beverages",aisle: "B2", emoji: "🍵" },
    { id: 19, name: "Dark Chocolate (100g)",    brand: "Cadbury",    price: 125, category: "Snacks",   aisle: "D2", emoji: "🍫" },
    { id: 20, name: "Potato Chips (150g)",      brand: "Lay's",      price: 50,  category: "Snacks",   aisle: "D2", emoji: "🥔" },
    { id: 21, name: "Tomato Ketchup (500g)",    brand: "Kissan",     price: 115, category: "Pantry",   aisle: "C2", emoji: "🍅" },
    { id: 22, name: "Instant Noodles (4 pack)", brand: "Maggi",      price: 56,  category: "Pantry",   aisle: "C2", emoji: "🍜" },
    { id: 23, name: "Fresh Spinach (250g)",     brand: "Local",      price: 30,  category: "Vegetables",aisle: "D1", emoji: "🥬" },
    { id: 24, name: "Onions (1kg)",             brand: "Local",      price: 35,  category: "Vegetables",aisle: "D1", emoji: "🧅" },
];

// ── Aisle Map Data ──
const AISLE_MAP = [
    { category: "Dairy & Cheese",   aisle: "A1",  icon: "🥛" },
    { category: "Bakery",           aisle: "A2",  icon: "🍞" },
    { category: "Poultry & Eggs",   aisle: "B1",  icon: "🥚" },
    { category: "Beverages",        aisle: "B2",  icon: "🧃" },
    { category: "Grains & Cereals", aisle: "C1",  icon: "🍚" },
    { category: "Pantry & Sauces",  aisle: "C2",  icon: "🍯" },
    { category: "Fruits & Veggies", aisle: "D1",  icon: "🍎" },
    { category: "Snacks & Sweets",  aisle: "D2",  icon: "🍫" },
];

// ── Valid coupon codes ──
const COUPONS = {
    "FRESH10": { type: "percent", value: 10, label: "10% off" },
    "SAVE50":  { type: "flat",    value: 50, label: "₹50 off" },
    "SMART20": { type: "percent", value: 20, label: "20% off" },
};

// ── App State ──
const state = {
    currentScreen: "home",
    cart: {},            // { productId: quantity }
    appliedCoupon: null,
    selectedPaymentMethod: "upi",
    sessionId: "",
    rfidActive: true,
    browseCategory: "All",
};

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    generateSessionId();
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(updateStoreStatus, 60000);
    updateStoreStatus();
    initStoreMap();
    buildBrowseSection();
    bindEvents();
});

// ══════════════════════════════════════════════════
// SESSION ID
// ══════════════════════════════════════════════════
function generateSessionId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "SC-";
    for (let i = 0; i < 5; i++) id += chars[Math.floor(Math.random() * chars.length)];
    state.sessionId = id;
    document.getElementById("session-id").textContent = id;
}

// ══════════════════════════════════════════════════
// LIVE CLOCK
// ══════════════════════════════════════════════════
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHour = hours % 12 || 12;
    const timeStr = `${displayHour}:${mins}`;

    // Home clock
    const clockEl = document.getElementById("live-clock");
    if (clockEl) {
        clockEl.querySelector(".clock-time").textContent = timeStr;
        clockEl.querySelector(".clock-ampm").textContent = ampm;
    }

    // Date
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const dateEl = document.getElementById("live-date");
    if (dateEl) dateEl.textContent = dateStr;

    // Screen clocks (24h)
    const h24 = String(now.getHours()).padStart(2, "0");
    const screenClockStr = `📶 ${h24}:${mins}`;
    ["search-clock", "cart-clock", "payment-clock"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = screenClockStr;
    });
}

// ══════════════════════════════════════════════════
// STORE STATUS
// ══════════════════════════════════════════════════
function updateStoreStatus() {
    const now = new Date();
    const hour = now.getHours();
    const statusEl = document.getElementById("store-status");
    if (hour >= 9 && hour < 22) {
        statusEl.classList.remove("closed");
        statusEl.querySelector(".store-label").textContent = "Store Open";
    } else {
        statusEl.classList.add("closed");
        statusEl.querySelector(".store-label").textContent = "Store Closed";
    }
}

// ══════════════════════════════════════════════════
// RFID TOGGLE
// ══════════════════════════════════════════════════
function toggleRFID() {
    state.rfidActive = !state.rfidActive;
    const widget = document.getElementById("rfid-widget");
    const statusEl = document.getElementById("rfid-status");
    const metaEl = document.getElementById("rfid-meta");

    if (state.rfidActive) {
        widget.classList.remove("inactive");
        statusEl.textContent = "RFID Active";
        statusEl.classList.remove("inactive");
        metaEl.textContent = "All items monitored";
        showToast("🛡️ RFID security activated", "success");
    } else {
        widget.classList.add("inactive");
        statusEl.textContent = "RFID Inactive";
        statusEl.classList.add("inactive");
        metaEl.textContent = "Tap to activate";
        showToast("⚠️ RFID security deactivated", "error");
    }
}

// ══════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════
function navigateTo(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(`screen-${screen}`);
    if (target) {
        target.classList.add("active");
        target.scrollTop = 0;
        state.currentScreen = screen;
    }
    updateAllBadges();
    updateStepIndicators(screen);
}

// ══════════════════════════════════════════════════
// DYNAMIC STEP INDICATORS
// ══════════════════════════════════════════════════
function updateStepIndicators(screen) {
    // Map screen to active step number
    const stepMap = { search: 1, cart: 3, payment: 4 };
    const activeStep = stepMap[screen];
    if (!activeStep) return;

    // Determine if items have been added (for step 2)
    const hasItems = getCartCount() > 0;

    // Update ALL step indicators in the current screen
    const currentScreen = document.getElementById(`screen-${screen}`);
    if (!currentScreen) return;

    const indicator = currentScreen.querySelector(".step-indicator");
    if (!indicator) return;

    const steps = indicator.querySelectorAll(".step");
    const lines = indicator.querySelectorAll(".step-line");

    steps.forEach((step, i) => {
        const stepNum = i + 1;
        const numEl = step.querySelector(".step-num");

        step.classList.remove("active", "completed");

        if (stepNum < activeStep) {
            step.classList.add("completed");
            numEl.textContent = "✓";
        } else if (stepNum === activeStep) {
            step.classList.add("active");
            numEl.textContent = stepNum;
        } else {
            numEl.textContent = stepNum;
        }

        // Special: step 2 (Add Items) is completed if cart has items
        if (stepNum === 2 && hasItems && activeStep >= 2) {
            step.classList.add("completed");
            numEl.textContent = "✓";
        }
    });

    lines.forEach((line, i) => {
        const afterStep = i + 1; // line between step i+1 and i+2
        if (afterStep < activeStep || (afterStep === 1 && hasItems)) {
            line.classList.add("active-line");
        } else {
            line.classList.remove("active-line");
        }
    });
}

// ══════════════════════════════════════════════════
// STORE MAP NAVIGATION
// ══════════════════════════════════════════════════

let mapHighlightTimeout;

function initStoreMap() {
    // Add click listeners to shelves
    document.querySelectorAll(".map-shelf").forEach(shelf => {
        shelf.addEventListener("click", () => {
            const loc = shelf.dataset.location;
            const aisleInfo = AISLE_MAP.find(a => a.aisle === loc);
            if (aisleInfo) {
                highlightShelf(loc);
                showMapInfo(aisleInfo.category, loc, aisleInfo.icon);
            }
        });
    });

    // Close info panel
    document.getElementById("map-info-close").addEventListener("click", hideMapInfo);
}

function highlightShelf(locationId) {
    document.querySelectorAll(".map-shelf").forEach(s => s.classList.remove("highlight"));
    clearRoute();
    if (!locationId) return;

    const shelf = document.querySelector(`.map-shelf[data-location="${locationId}"]`);
    if (shelf) {
        shelf.classList.add("highlight");
        drawRouteToShelf(locationId);
        clearTimeout(mapHighlightTimeout);
        mapHighlightTimeout = setTimeout(() => {
            shelf.classList.remove("highlight");
            clearRoute();
        }, 8000);
    }
}

function showMapInfo(title, location, icon) {
    const panel = document.getElementById("map-info-panel");
    document.getElementById("map-info-title").textContent = title;
    document.getElementById("map-info-desc").textContent = `Aisle ${location}`;
    document.getElementById("map-info-emoji").textContent = icon || "📍";
    panel.style.display = "flex";
}

function hideMapInfo() {
    document.getElementById("map-info-panel").style.display = "none";
    document.querySelectorAll(".map-shelf").forEach(s => s.classList.remove("highlight"));
    clearRoute();
}

// ── SVG Route Drawing ──
function clearRoute() {
    const svg = document.getElementById("map-path-svg");
    if (svg) svg.innerHTML = "";
}

function drawRouteToShelf(locationId) {
    const mapEl = document.getElementById("store-map");
    const svg = document.getElementById("map-path-svg");
    const entrance = document.getElementById("map-entrance");
    const shelf = document.querySelector(`.map-shelf[data-location="${locationId}"]`);
    if (!mapEl || !svg || !entrance || !shelf) return;

    const mapRect = mapEl.getBoundingClientRect();

    const getCenter = (el) => {
        const r = el.getBoundingClientRect();
        return {
            x: r.left + r.width / 2 - mapRect.left,
            y: r.top + r.height / 2 - mapRect.top
        };
    };

    const start = getCenter(entrance);
    const end = getCenter(shelf);

    // Find cross-aisle Y position
    const crossAisle = mapEl.querySelector(".cross-aisle");
    const crossY = crossAisle ? getCenter(crossAisle).y : (start.y + end.y) / 2;

    // Build waypoints from entrance to shelf
    const waypoints = [start];
    const isRow2 = locationId.endsWith("2");

    if (isRow2) {
        // Row 2: go horizontally to shelf column, then up
        waypoints.push({ x: end.x, y: start.y });
        waypoints.push(end);
    } else {
        // Row 1: go up to cross-aisle, across, then up to shelf
        waypoints.push({ x: start.x, y: crossY });
        waypoints.push({ x: end.x, y: crossY });
        waypoints.push(end);
    }

    // Set viewBox to map's pixel dimensions
    svg.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);

    // Draw polyline route
    const pointsStr = waypoints.map(p => `${p.x},${p.y}`).join(" ");
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", pointsStr);
    polyline.setAttribute("class", "route-line");
    svg.appendChild(polyline);

    // Start dot (green)
    const startDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    startDot.setAttribute("cx", start.x);
    startDot.setAttribute("cy", start.y);
    startDot.setAttribute("r", "5");
    startDot.setAttribute("class", "route-dot");
    startDot.setAttribute("fill", "#22c55e");
    svg.appendChild(startDot);

    // Destination pulsing dot
    const destDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    destDot.setAttribute("cx", end.x);
    destDot.setAttribute("cy", end.y);
    destDot.setAttribute("r", "6");
    destDot.setAttribute("class", "route-destination");
    svg.appendChild(destDot);

    // Direction arrows at midpoints of each segment
    for (let i = 1; i < waypoints.length; i++) {
        const from = waypoints[i - 1];
        const to = waypoints[i];
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        arrow.setAttribute("points", "0,-4 8,0 0,4");
        arrow.setAttribute("class", "route-arrow");
        arrow.setAttribute("transform", `translate(${midX},${midY}) rotate(${angle})`);
        svg.appendChild(arrow);
    }
}

function locateProductOnMap(query) {
    if (!query) return;
    const q = query.toLowerCase();
    
    let found = AISLE_MAP.find(a => a.category.toLowerCase().includes(q) || a.aisle.toLowerCase() === q);
    if (!found) {
        const product = PRODUCTS.find(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        if (product) {
            found = AISLE_MAP.find(a => a.aisle === product.aisle);
        }
    }

    if (found) {
        highlightShelf(found.aisle);
        showMapInfo(found.category, found.aisle, found.icon);
        showToast(`📍 Found ${found.category} at Aisle ${found.aisle}`, "success");
    } else {
        showToast("❌ Could not locate item on map", "error");
        hideMapInfo();
    }
}

// ══════════════════════════════════════════════════
// BROWSE ALL (HOME - Popular Products)
// ══════════════════════════════════════════════════
function buildBrowseSection() {
    // Build category tabs
    const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];
    const tabsEl = document.getElementById("category-tabs");
    tabsEl.innerHTML = categories.map(c =>
        `<button class="category-tab${c === state.browseCategory ? ' active' : ''}" data-cat="${c}">${c}</button>`
    ).join("");

    // Bind tab clicks
    tabsEl.querySelectorAll(".category-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            state.browseCategory = tab.dataset.cat;
            tabsEl.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderBrowseGrid();
        });
    });

    renderBrowseGrid();
}

function renderBrowseGrid() {
    const grid = document.getElementById("browse-grid");
    const countEl = document.getElementById("browse-count");
    const filtered = state.browseCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === state.browseCategory);

    countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

    grid.innerHTML = filtered.map(p => {
        const qtyInCart = state.cart[p.id] || 0;
        return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-emoji">${p.emoji}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-brand">${p.brand}</div>
                <div class="product-meta">
                    <span class="product-price">₹${p.price}</span>
                    <span class="product-aisle">${p.aisle}</span>
                </div>
                <div class="product-actions">
                    ${qtyInCart > 0 ? `
                        <div class="qty-controls">
                            <button class="qty-btn remove" onclick="handleBrowseQty(${p.id}, -1)">−</button>
                            <span class="qty-display">${qtyInCart}</span>
                            <button class="qty-btn" onclick="handleBrowseQty(${p.id}, 1)">+</button>
                        </div>
                    ` : `
                        <button class="btn-add" onclick="handleBrowseAdd(${p.id})">+ Add to Cart</button>
                    `}
                </div>
            </div>
        `;
    }).join("");
}

window.handleBrowseAdd = function(id) {
    addToCart(id);
    renderBrowseGrid();
};

window.handleBrowseQty = function(id, delta) {
    if (delta > 0) addToCart(id);
    else removeFromCart(id);
    renderBrowseGrid();
};

// ══════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ══════════════════════════════════════════════════
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
}

// ══════════════════════════════════════════════════
// CART HELPERS
// ══════════════════════════════════════════════════
function getCartCount() {
    return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}

function getCartSubtotal() {
    let total = 0;
    for (const [id, qty] of Object.entries(state.cart)) {
        const product = PRODUCTS.find(p => p.id === Number(id));
        if (product) total += product.price * qty;
    }
    return total;
}

function getDiscount(subtotal) {
    if (!state.appliedCoupon) return 0;
    const coupon = COUPONS[state.appliedCoupon];
    if (!coupon) return 0;
    if (coupon.type === "percent") return Math.round(subtotal * coupon.value / 100);
    return Math.min(coupon.value, subtotal);
}

function addToCart(productId) {
    if (state.cart[productId]) {
        state.cart[productId]++;
    } else {
        state.cart[productId] = 1;
    }
    updateAllBadges();
    updateHomeWidgets();
    const product = PRODUCTS.find(p => p.id === productId);
    showToast(`${product.emoji} ${product.name} added to cart`, "success");
}

function removeFromCart(productId) {
    if (state.cart[productId]) {
        state.cart[productId]--;
        if (state.cart[productId] <= 0) delete state.cart[productId];
    }
    updateAllBadges();
    updateHomeWidgets();
}

function clearCart() {
    state.cart = {};
    state.appliedCoupon = null;
    updateAllBadges();
    updateHomeWidgets();
    renderBrowseGrid();
    showToast("🗑️ Cart cleared", "info");
}

// ══════════════════════════════════════════════════
// BADGE & WIDGET UPDATES
// ══════════════════════════════════════════════════
function updateAllBadges() {
    const count = getCartCount();
    // Search screen badge
    const badge = document.getElementById("search-cart-badge");
    if (badge) badge.textContent = count;
    // Home widgets
    updateHomeWidgets();
}

function updateHomeWidgets() {
    const count = getCartCount();
    const subtotal = getCartSubtotal();
    const tax = Math.round(subtotal * 0.05);
    const discount = getDiscount(subtotal);
    const total = subtotal + tax - discount;

    const homeTotal = document.getElementById("home-cart-total");
    if (homeTotal) homeTotal.textContent = `₹${total}`;
    const homeCount = document.getElementById("home-cart-count");
    if (homeCount) homeCount.textContent = `${count} item${count !== 1 ? "s" : ""}`;
}

// ══════════════════════════════════════════════════
// PRODUCT SEARCH
// ══════════════════════════════════════════════════
function searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.aisle.toLowerCase().includes(q)
    );
}

function renderSearchResults(results) {
    const emptyState = document.getElementById("search-empty-state");
    const grid = document.getElementById("results-grid");

    if (results.length === 0) {
        emptyState.style.display = "flex";
        emptyState.querySelector("h3").textContent = "No products found";
        emptyState.querySelector("p").innerHTML = 'Try searching for <strong>"Milk"</strong>, <strong>"Bread"</strong>, or <strong>"Rice"</strong>';
        grid.innerHTML = "";
        return;
    }

    emptyState.style.display = "none";
    grid.innerHTML = results.map(p => {
        const qtyInCart = state.cart[p.id] || 0;
        return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-emoji">${p.emoji}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-brand">${p.brand}</div>
                <div class="product-meta">
                    <span class="product-price">₹${p.price}</span>
                    <span class="product-aisle">${p.aisle}</span>
                </div>
                <div class="product-actions">
                    ${qtyInCart > 0 ? `
                        <div class="qty-controls">
                            <button class="qty-btn remove" onclick="handleQtyChange(${p.id}, -1)">−</button>
                            <span class="qty-display">${qtyInCart}</span>
                            <button class="qty-btn" onclick="handleQtyChange(${p.id}, 1)">+</button>
                        </div>
                    ` : `
                        <button class="btn-add" onclick="handleAddProduct(${p.id})">+ Add to Cart</button>
                    `}
                </div>
            </div>
        `;
    }).join("");

    // Update step indicator to show "Add Items" if items exist
    updateStepIndicators("search");
}

function resetSearchView() {
    const emptyState = document.getElementById("search-empty-state");
    const grid = document.getElementById("results-grid");
    emptyState.style.display = "flex";
    emptyState.querySelector("h3").textContent = "Search for a product";
    emptyState.querySelector("p").innerHTML = 'Type a product name above or tap <strong>"Milk"</strong> to try a demo search';
    grid.innerHTML = "";
}

// ── Global handlers for inline onclick ──
window.handleAddProduct = function(id) {
    addToCart(id);
    // Re-render results to show qty controls
    const input = document.getElementById("product-search-input");
    if (input && input.value.trim()) {
        renderSearchResults(searchProducts(input.value));
    }
};

window.handleQtyChange = function(id, delta) {
    if (delta > 0) addToCart(id);
    else removeFromCart(id);
    const input = document.getElementById("product-search-input");
    if (input && input.value.trim()) {
        renderSearchResults(searchProducts(input.value));
    }
};

// ══════════════════════════════════════════════════
// CART SCREEN RENDERING
// ══════════════════════════════════════════════════
function renderCartScreen() {
    const emptyState = document.getElementById("cart-empty-state");
    const cartList = document.getElementById("cart-list");
    const cartSummary = document.getElementById("cart-summary");
    const itemSummary = document.getElementById("cart-item-summary");
    const count = getCartCount();

    if (count === 0) {
        emptyState.style.display = "flex";
        cartList.innerHTML = "";
        cartSummary.style.display = "none";
        itemSummary.textContent = "0 items in your cart";
        return;
    }

    emptyState.style.display = "none";
    cartSummary.style.display = "block";
    itemSummary.textContent = `${count} item${count !== 1 ? "s" : ""} in your cart`;

    // Render items
    let html = "";
    for (const [id, qty] of Object.entries(state.cart)) {
        const p = PRODUCTS.find(pr => pr.id === Number(id));
        if (!p) continue;
        html += `
            <div class="cart-item" data-id="${p.id}">
                <div class="cart-item-emoji">${p.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${p.name}</div>
                    <div class="cart-item-brand">${p.brand}</div>
                    <div class="cart-item-price">₹${p.price} each</div>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-controls">
                        <button class="qty-btn remove" onclick="handleCartQty(${p.id}, -1)">−</button>
                        <span class="qty-display">${qty}</span>
                        <button class="qty-btn" onclick="handleCartQty(${p.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">₹${p.price * qty}</div>
                <button class="cart-item-remove" onclick="handleCartRemove(${p.id})">✕</button>
            </div>
        `;
    }
    cartList.innerHTML = html;

    // Update totals
    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = getCartSubtotal();
    const tax = Math.round(subtotal * 0.05);
    const discount = getDiscount(subtotal);
    const total = subtotal + tax - discount;

    document.getElementById("cart-subtotal").textContent = `₹${subtotal}`;
    document.getElementById("cart-tax").textContent = `₹${tax}`;

    const discountRow = document.getElementById("discount-row");
    if (discount > 0) {
        discountRow.style.display = "flex";
        document.getElementById("cart-discount").textContent = `-₹${discount}`;
    } else {
        discountRow.style.display = "none";
    }

    document.getElementById("cart-total").textContent = `₹${total}`;
}

window.handleCartQty = function(id, delta) {
    if (delta > 0) addToCart(id);
    else removeFromCart(id);
    renderCartScreen();
};

window.handleCartRemove = function(id) {
    const product = PRODUCTS.find(p => p.id === id);
    delete state.cart[id];
    updateAllBadges();
    updateHomeWidgets();
    renderCartScreen();
    if (product) showToast(`${product.emoji} ${product.name} removed`, "error");
};

// ══════════════════════════════════════════════════
// COUPON
// ══════════════════════════════════════════════════
function applyCoupon() {
    const input = document.getElementById("coupon-input");
    const msg = document.getElementById("coupon-msg");
    const code = input.value.trim().toUpperCase();

    if (!code) {
        msg.textContent = "Please enter a coupon code";
        msg.className = "coupon-msg error";
        return;
    }

    if (COUPONS[code]) {
        state.appliedCoupon = code;
        msg.textContent = `✅ Coupon applied: ${COUPONS[code].label}`;
        msg.className = "coupon-msg success";
        showToast(`🎉 Coupon ${code} applied! ${COUPONS[code].label}`, "success");
        updateCartTotals();
        updateHomeWidgets();
    } else {
        msg.textContent = "❌ Invalid coupon code. Try FRESH10, SAVE50, or SMART20";
        msg.className = "coupon-msg error";
    }
}

// ══════════════════════════════════════════════════
// PAYMENT SCREEN
// ══════════════════════════════════════════════════
function renderPaymentScreen() {
    const count = getCartCount();
    const subtotal = getCartSubtotal();
    const tax = Math.round(subtotal * 0.05);
    const discount = getDiscount(subtotal);
    const total = subtotal + tax - discount;

    document.getElementById("pay-item-count").textContent = count;
    document.getElementById("pay-subtotal").textContent = `₹${subtotal}`;
    document.getElementById("pay-tax").textContent = `₹${tax}`;

    const payDiscountRow = document.getElementById("pay-discount-row");
    if (discount > 0) {
        payDiscountRow.style.display = "flex";
        document.getElementById("pay-discount").textContent = `-₹${discount}`;
    } else {
        payDiscountRow.style.display = "none";
    }

    document.getElementById("pay-total").textContent = `₹${total}`;

    // Reset payment method selection
    document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
    const selected = document.querySelector(`.payment-option[data-method="${state.selectedPaymentMethod}"]`);
    if (selected) selected.classList.add("selected");

    // Show content, hide processing/success
    document.getElementById("payment-content").style.display = "block";
    document.getElementById("payment-processing").style.display = "none";
    document.getElementById("payment-success").style.display = "none";
}

function processPayment() {
    const subtotal = getCartSubtotal();
    const tax = Math.round(subtotal * 0.05);
    const discount = getDiscount(subtotal);
    const total = subtotal + tax - discount;

    const methods = { upi: "UPI", card: "Credit/Debit Card", wallet: "Digital Wallet" };

    // Show processing
    document.getElementById("payment-content").style.display = "none";
    document.getElementById("payment-processing").style.display = "flex";

    setTimeout(() => {
        // Show success
        document.getElementById("payment-processing").style.display = "none";
        document.getElementById("payment-success").style.display = "flex";

        document.getElementById("success-amount").textContent = `₹${total}`;
        document.getElementById("success-method").textContent = `Paid via ${methods[state.selectedPaymentMethod]}`;

        // Transaction ID
        const txnId = "TXN-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
        document.getElementById("txn-id").textContent = txnId;

        // Date/Time
        const now = new Date();
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let h = now.getHours();
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        const txnDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${h}:${String(now.getMinutes()).padStart(2,"0")} ${ampm}`;
        document.getElementById("txn-datetime").textContent = txnDate;

        showToast("💳 Payment successful!", "success");
    }, 2500);
}

function startNewSession() {
    state.cart = {};
    state.appliedCoupon = null;
    state.selectedPaymentMethod = "upi";
    state.browseCategory = "All";
    generateSessionId();
    updateAllBadges();
    updateHomeWidgets();
    buildBrowseSection();
    navigateTo("home");
    showToast("🛒 New shopping session started!", "info");
}

// ══════════════════════════════════════════════════
// EVENT BINDINGS
// ══════════════════════════════════════════════════
function bindEvents() {

    // ── Start Shopping ──
    document.getElementById("btn-start-shopping").addEventListener("click", () => {
        navigateTo("search");
        resetSearchView();
        document.getElementById("product-search-input").value = "";
    });

    // ── Feature Cards ──
    document.getElementById("card-smart-search").addEventListener("click", () => {
        navigateTo("search");
        resetSearchView();
        document.getElementById("product-search-input").value = "";
        document.getElementById("product-search-input").focus();
    });

    document.getElementById("card-aisle-nav").addEventListener("click", () => {
        navigateTo("navigation");
    });

    document.getElementById("card-checkout").addEventListener("click", () => {
        if (getCartCount() === 0) {
            showToast("Your cart is empty! Add some items first.", "error");
            return;
        }
        renderCartScreen();
        navigateTo("cart");
    });

    // ── Clickable Cart Widget (home) ──
    document.getElementById("home-cart-widget").addEventListener("click", () => {
        if (getCartCount() === 0) {
            showToast("Your cart is empty! Start shopping to add items.", "info");
            return;
        }
        renderCartScreen();
        navigateTo("cart");
    });

    // ── RFID Widget Toggle ──
    document.getElementById("rfid-widget").addEventListener("click", toggleRFID);

    // ── Home Search ──
    document.getElementById("home-search-btn").addEventListener("click", () => {
        const query = document.getElementById("home-search-input").value.trim();
        navigateTo("search");
        document.getElementById("product-search-input").value = query;
        if (query) {
            renderSearchResults(searchProducts(query));
        } else {
            resetSearchView();
        }
    });

    document.getElementById("home-search-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            document.getElementById("home-search-btn").click();
        }
    });

    // ── Back Buttons ──
    document.querySelectorAll(".back-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.back;
            if (target === "home") {
                renderBrowseGrid(); // refresh browse grid in case cart changed
                navigateTo("home");
            } else {
                navigateTo(target);
                if (target === "search") {
                    const input = document.getElementById("product-search-input");
                    if (input && input.value.trim()) {
                        renderSearchResults(searchProducts(input.value));
                    }
                }
                if (target === "cart") {
                    renderCartScreen();
                }
            }
        });
    });

    // ── Go to Cart from Search ──
    document.getElementById("btn-go-cart-from-search").addEventListener("click", () => {
        renderCartScreen();
        navigateTo("cart");
    });

    // ── Product Search ──
    const productInput = document.getElementById("product-search-input");
    let searchTimeout;

    productInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const q = productInput.value.trim();
            if (q) {
                renderSearchResults(searchProducts(q));
            } else {
                resetSearchView();
            }
        }, 200);
    });

    document.getElementById("product-search-btn").addEventListener("click", () => {
        const q = productInput.value.trim();
        if (q) {
            renderSearchResults(searchProducts(q));
        }
    });

    productInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const q = productInput.value.trim();
            if (q) renderSearchResults(searchProducts(q));
        }
    });

    // ── Suggestion Chips ──
    document.querySelectorAll(".chip[data-term]").forEach(chip => {
        chip.addEventListener("click", () => {
            const term = chip.dataset.term;
            productInput.value = term;
            renderSearchResults(searchProducts(term));
            productInput.focus();
        });
    });

    // ── Cart Screen ──
    document.getElementById("btn-clear-cart").addEventListener("click", () => {
        if (getCartCount() === 0) {
            showToast("Cart is already empty!", "info");
            return;
        }
        clearCart();
        renderCartScreen();
    });

    document.getElementById("btn-browse-products").addEventListener("click", () => {
        navigateTo("search");
        resetSearchView();
        document.getElementById("product-search-input").value = "";
    });

    // ── Coupon ──
    document.getElementById("btn-apply-coupon").addEventListener("click", applyCoupon);
    document.getElementById("coupon-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") applyCoupon();
    });

    // ── Checkout ──
    document.getElementById("btn-checkout").addEventListener("click", () => {
        if (getCartCount() === 0) {
            showToast("Your cart is empty!", "error");
            return;
        }
        renderPaymentScreen();
        navigateTo("payment");
    });

    // ── Payment Method ──
    document.querySelectorAll(".payment-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
            option.classList.add("selected");
            state.selectedPaymentMethod = option.dataset.method;
        });
    });

    // ── Pay Now ──
    document.getElementById("btn-pay-now").addEventListener("click", processPayment);

    // ── New Session ──
    document.getElementById("btn-new-session").addEventListener("click", startNewSession);

    // ── Print Receipt ──
    document.getElementById("btn-print-receipt").addEventListener("click", () => {
        showToast("🖨️ Receipt sent to printer!", "success");
    });

    // ── Store Map Search ──
    const mapInput = document.getElementById("map-search-input");
    document.getElementById("map-search-btn").addEventListener("click", () => {
        locateProductOnMap(mapInput.value.trim());
    });
    mapInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            locateProductOnMap(mapInput.value.trim());
        }
    });

    // ── Keyboard Shortcut: Escape to go back ──
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            // Navigate back
            const backMap = { search: "home", cart: "search", payment: "cart", navigation: "home" };
            const backTarget = backMap[state.currentScreen];
            if (backTarget) {
                if (backTarget === "home") {
                    renderBrowseGrid();
                    navigateTo("home");
                } else {
                    navigateTo(backTarget);
                    hideMapInfo();
                    if (backTarget === "search") {
                        const input = document.getElementById("product-search-input");
                        if (input && input.value.trim()) {
                            renderSearchResults(searchProducts(input.value));
                        }
                    }
                    if (backTarget === "cart") {
                        renderCartScreen();
                    }
                }
            }
        }
    });
}
