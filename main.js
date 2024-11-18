const provinceData = {
    "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
    "Punjab": ["Lahore", "Faisalabad", "Rawalpindi", "Multan"],
    "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad", "Swat"],
    "Balochistan": ["Quetta", "Gwadar", "Turbat", "Khuzdar"],
    "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza", "Chilas"],
    "Azad Kashmir": ["Muzaffarabad", "Mirpur", "Rawalakot", "Bagh"]
};

const menuData = {
    "monday": {
        "Main Dishes": [
            { name: "Chicken Karahi", price: 500 },
            { name: "Beef Nihari", price: 600 },
            { name: "Vegetable Biryani", price: 300 }
        ],
        "Salads": [
            { name: "Kachumber Salad", price: 100 },
            { name: "Cucumber Raita", price: 80 }
        ],
        "Beverages": [
            { name: "Lassi", price: 120 },
            { name: "Chai", price: 50 },
            { name: "Rooh Afza", price: 70 }
        ]
    },
    "tuesday": {
        "Main Dishes": [
            { name: "Mutton Korma", price: 650 },
            { name: "Fish Tikka", price: 700 },
            { name: "Chana Masala", price: 250 }
        ],
        "Salads": [
            { name: "Mixed Sprout Salad", price: 150 },
            { name: "Mint Raita", price: 90 }
        ],
        "Beverages": [
            { name: "Mango Lassi", price: 150 },
            { name: "Green Tea", price: 50 },
            { name: "Lemonade", price: 80 }
        ]
    },
    "wednesday": {
        "Main Dishes": [
            { name: "Chicken Biryani", price: 550 },
            { name: "Beef Kebab", price: 600 },
            { name: "Palak Paneer", price: 400 }
        ],
        "Salads": [
            { name: "Chickpea Salad", price: 120 },
            { name: "Boondi Raita", price: 90 }
        ],
        "Beverages": [
            { name: "Thandai", price: 150 },
            { name: "Kashmiri Chai", price: 70 },
            { name: "Fresh Orange Juice", price: 100 }
        ]
    },
    "thursday": {
        "Main Dishes": [
            { name: "Mutton Biryani", price: 700 },
            { name: "Chicken Handi", price: 550 },
            { name: "Dal Makhani", price: 350 }
        ],
        "Salads": [
            { name: "Aloo Chana Chaat", price: 140 },
            { name: "Pineapple Raita", price: 100 }
        ],
        "Beverages": [
            { name: "Falooda", price: 180 },
            { name: "Doodh Patti", price: 60 },
            { name: "Watermelon Juice", price: 110 }
        ]
    },
    "friday": {
        "Main Dishes": [
            { name: "Seekh Kebab", price: 600 },
            { name: "Fish Karahi", price: 750 },
            { name: "Vegetable Jalfrezi", price: 400 }
        ],
        "Salads": [
            { name: "Russian Salad", price: 200 },
            { name: "Burani Raita", price: 100 }
        ],
        "Beverages": [
            { name: "Sugarcane Juice", price: 120 },
            { name: "Kashmiri Chai", price: 70 },
            { name: "Mint Lemonade", price: 90 }
        ]
    },
    "saturday": {
        "Main Dishes": [
            { name: "Chicken Tikka Masala", price: 600 },
            { name: "Mutton Paya", price: 800 },
            { name: "Aloo Gobi", price: 300 }
        ],
        "Salads": [
            { name: "Fruit Chaat", price: 150 },
            { name: "Cucumber Mint Raita", price: 90 }
        ],
        "Beverages": [
            { name: "Almond Milk Shake", price: 200 },
            { name: "Doodh Soda", price: 120 },
            { name: "Fresh Lime Soda", price: 80 }
        ]
    },
    "sunday": {
        "Main Dishes": [
            { name: "Haleem", price: 700 },
            { name: "Chicken Malai Boti", price: 650 },
            { name: "Vegetable Kofta", price: 350 }
        ],
        "Salads": [
            { name: "Macaroni Salad", price: 200 },
            { name: "Onion Raita", price: 70 }
        ],
        "Beverages": [
            { name: "Mango Shake", price: 180 },
            { name: "Kashmiri Chai", price: 70 },
            { name: "Fresh Pineapple Juice", price: 150 }
        ]
    }
};

const daySelect = document.getElementById('daySelect');
const provinceSelect = document.getElementById('provinceSelect');
const citySelect = document.getElementById('citySelect');
const menuCategories = document.getElementById('menuCategories');
const orderForm = document.getElementById('orderForm');
const orderSummary = document.getElementById('orderSummary');
const summaryContent = document.getElementById('summaryContent');
const paymentMethodSelect = document.getElementById('paymentMethod'); // Payment method select input

const DELIVERY_FEE = 100;  // You can change this if you want dynamic fees based on city or province

function showProvinces() {
    provinceSelect.innerHTML = '<option value="" disabled selected>Select Province</option>';
    for (const province in provinceData) {
        provinceSelect.innerHTML += `<option value="${province}">${province}</option>`;
    }
}

provinceSelect.addEventListener('change', function() {
    const selectedProvince = this.value;
    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
    provinceData[selectedProvince].forEach(city => {
        citySelect.innerHTML += `<option value="${city}">${city}</option>`;
    });
    citySelect.disabled = false;
});

function showMenuCategories(day) {
    menuCategories.innerHTML = '';
    if (menuData[day]) {
        for (const [category, dishes] of Object.entries(menuData[day])) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'menu-category';
            categoryDiv.innerHTML = `
                <h3>${category}</h3>
                <div class="dish-item">
                    <label for="${category}">Select Dish:</label>
                    <select id="${category}" name="${category}">
                        <option value="" disabled selected>Choose a dish</option>
                        ${dishes.map(dish => `
                            <option value="${dish.name}" data-price="${dish.price}">
                                ${dish.name} - Rs. ${dish.price}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
            menuCategories.appendChild(categoryDiv);
        }
    }
}

daySelect.addEventListener('change', function() {
    showMenuCategories(this.value);
});

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedDay = daySelect.value;
    const selectedProvince = provinceSelect.value;
    const selectedCity = citySelect.value;
    const selectedPaymentMethod = paymentMethodSelect.value; // Get the selected payment method
    const selectedDishes = [];
    let totalPrice = 0;

    // Loop through each select input to gather selected dish information
    document.querySelectorAll('select').forEach(select => {
        const selectedDish = select.value;
        if (selectedDish) {
            const price = parseFloat(select.selectedOptions[0].dataset.price);
            if (!isNaN(price)) {
                selectedDishes.push({
                    category: select.name,
                    dish: selectedDish,
                    price: price
                });
                totalPrice += price;
            }
        }
    });

    // Check if at least one dish has been selected
    if (selectedDishes.length === 0) {
        alert('Please select at least one dish.');
        return;
    }

    // Add delivery fee to the total price
    totalPrice += DELIVERY_FEE;

    // Show order summary
    showOrderSummary(selectedDay, selectedProvince, selectedCity, selectedPaymentMethod, selectedDishes, totalPrice);
});

function showOrderSummary(day, province, city, paymentMethod, dishes, totalPrice) {
    // Format the day name (capitalize first letter)
    const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);

    // Build the summary HTML
    let summaryHTML = `
        <p><strong>Day:</strong> ${formattedDay}</p>
        <p><strong>Delivery Location:</strong> ${city}, ${province}</p>
        <p><strong>Delivery Time:</strong> 30 Minutes</p>
        <p><strong>Name:</strong> ${document.getElementById('name').value}</p>
        <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
        <h3>Selected Dishes:</h3>
        <ul>
    `;

    // Add the selected dishes to the order summary
    dishes.forEach(dish => {
        summaryHTML += `<li>${dish.dish} (${dish.category}) - Rs. ${dish.price}</li>`;
    });

    summaryHTML += `</ul>
        <p><strong>Delivery Fee:</strong> Rs. ${DELIVERY_FEE}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1).replace('/', ' & ')}</p>
        <p><strong>Total Price:</strong> Rs. ${totalPrice}</p>`;

    // Update the summary content
    summaryContent.innerHTML = summaryHTML;
    orderSummary.classList.remove('hidden');
}

showProvinces();
