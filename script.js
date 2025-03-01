// Sample Flight Data (21 Flights)
const flights = [
    { id: 1, from: 'New York', to: 'London', date: '2023-10-15', price: 500, image: 'images/photo1.jpg' },
    { id: 2, from: 'Paris', to: 'Tokyo', date: '2023-10-16', price: 700, image: 'images/photo2.jpg' },
    { id: 3, from: 'Dubai', to: 'Sydney', date: '2023-10-17', price: 900, image: 'images/photo3.jpg' },
    { id: 4, from: 'Berlin', to: 'Rome', date: '2023-10-18', price: 400, image: 'images/photo4.jpg' },
    { id: 5, from: 'Moscow', to: 'Beijing', date: '2023-10-19', price: 800, image: 'images/photo5.jpg' },
    { id: 6, from: 'Cairo', to: 'Riyadh', date: '2023-10-20', price: 300, image: 'images/photo6.jpg' },
    { id: 7, from: 'Toronto', to: 'Vancouver', date: '2023-10-21', price: 350, image: 'images/photo7.jpg' },
    { id: 8, from: 'Sydney', to: 'Melbourne', date: '2023-10-22', price: 200, image: 'images/photo8.jpg' },
    { id: 9, from: 'Tokyo', to: 'Osaka', date: '2023-10-23', price: 150, image: 'images/photo9.jpg' },
    { id: 10, from: 'Madrid', to: 'Barcelona', date: '2023-10-24', price: 100, image: 'images/photo10.jpg' },
    { id: 11, from: 'New Delhi', to: 'Mumbai', date: '2023-10-25', price: 120, image: 'images/photo11.jpg' },
    { id: 12, from: 'Singapore', to: 'Kuala Lumpur', date: '2023-10-26', price: 180, image: 'images/photo12.jpg' },
];

// Initialize bookings array from localStorage or empty array
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

// Display Flights on Home Page (6 Flights)
if (window.location.pathname.includes('index.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const flightsContainer = document.getElementById('flights');
        flightsContainer.innerHTML = '';

        flights.slice(0, 6).forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300';
            flightCard.innerHTML = `
                <img src="${flight.image}" alt="${flight.from} to ${flight.to}" class="w-full h-48 object-cover rounded-lg">
                <h3 class="text-xl font-bold mt-4">${flight.from} to ${flight.to}</h3>
                <p class="text-gray-600">${flight.date}</p>
                <p class="text-green-600 font-bold mt-2">$${flight.price}</p>
                <a href="passenger.html?id=${flight.id}" class="bg-gray-800 text-white p-2 rounded-lg mt-4 w-full block text-center hover:bg-gray-900 transition duration-300">Book Now</a>
            `;
            flightsContainer.appendChild(flightCard);
        });
    });
}

// Display All Flights on Flights Page (21 Flights)
if (window.location.pathname.includes('flights.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const flightsContainer = document.getElementById('flights');
        flightsContainer.innerHTML = '';

        flights.slice(0, 21).forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300';
            flightCard.innerHTML = `
                <img src="${flight.image}" alt="${flight.from} to ${flight.to}" class="w-full h-48 object-cover rounded-lg">
                <h3 class="text-xl font-bold mt-4">${flight.from} to ${flight.to}</h3>
                <p class="text-gray-600">${flight.date}</p>
                <p class="text-green-600 font-bold mt-2">$${flight.price}</p>
                <a href="passenger.html?id=${flight.id}" class="bg-gray-800 text-white p-2 rounded-lg mt-4 w-full block text-center hover:bg-gray-900 transition duration-300">Book Now</a>
            `;
            flightsContainer.appendChild(flightCard);
        });
    });
}

// Handle Passenger Form Submission
if (window.location.pathname.includes('passenger.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const passengerForm = document.getElementById('passengerForm');
        const flightId = new URLSearchParams(window.location.search).get('id');
        const editIndex = new URLSearchParams(window.location.search).get('edit');

        // If editing, fill the form with existing data
        if (editIndex !== null) {
            const booking = bookings[editIndex];
            document.getElementById('passengerName').value = booking.passengerName;
            document.getElementById('passengerEmail').value = booking.passengerEmail;
            document.getElementById('passengerPhone').value = booking.passengerPhone;
        }

        passengerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get passenger details
            const passengerName = document.getElementById('passengerName').value;
            const passengerEmail = document.getElementById('passengerEmail').value;
            const passengerPhone = document.getElementById('passengerPhone').value;

            const selectedFlight = flights.find(flight => flight.id == flightId);

            if (selectedFlight) {
                const booking = {
                    ...selectedFlight,
                    passengerName,
                    passengerEmail,
                    passengerPhone,
                    bookingDate: new Date().toLocaleDateString()
                };

                if (editIndex !== null) {
                    // Update existing booking
                    bookings[editIndex] = booking;
                } else {
                    // Add new booking
                    bookings.push(booking);
                }

                // Save bookings to localStorage
                localStorage.setItem('bookings', JSON.stringify(bookings));

                // Redirect to confirmation page
                window.location.href = 'confirmation.html';
            }
        });
    });
}

// Display Confirmation Message
if (window.location.pathname.includes('confirmation.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'bg-white p-8 rounded-lg shadow-lg text-center';
        confirmationMessage.innerHTML = `
            <i class="fas fa-check-circle text-6xl text-green-500 mb-6"></i>
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Booking Confirmed!</h2>
            <p class="text-lg text-gray-600">Your flight has been successfully booked. Check your email for details.</p>
            <div class="mt-6">
                <a href="index.html" class="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-500 transition duration-300">Back to Home</a>
                <a href="bookings.html" class="mt-4 inline-block bg-gray-800 text-white py-2 px-6 rounded-lg text-lg hover:bg-gray-700 transition duration-300">My Bookings</a>
            </div>
        `;
        document.querySelector('main').appendChild(confirmationMessage);
    });
}

// Display Bookings on My Bookings Page
if (window.location.pathname.includes('bookings.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const bookingsContainer = document.getElementById('bookings');
        bookingsContainer.innerHTML = '';

        if (bookings.length === 0) {
            bookingsContainer.innerHTML = '<p class="text-gray-600">No bookings found.</p>';
        } else {
            bookings.forEach((booking, index) => {
                const bookingCard = document.createElement('div');
                bookingCard.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300';
                bookingCard.innerHTML = `
                    <h3 class="text-xl font-bold">${booking.from} to ${booking.to}</h3>
                    <p class="text-gray-600">${booking.date}</p>
                    <p class="text-green-600 font-bold mt-2">$${booking.price}</p>
                    <p class="text-gray-800 mt-2">Passenger: ${booking.passengerName}</p>
                    <p class="text-gray-800">Email: ${booking.passengerEmail}</p>
                    <p class="text-gray-800">Phone: ${booking.passengerPhone}</p>
                    <p class="text-gray-800">Booking Date: ${booking.bookingDate}</p>
                    <div class="mt-4 flex space-x-4">
                        <button onclick="editBooking(${index})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300">Edit</button>
                        <button onclick="deleteBooking(${index})" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300">Delete</button>
                    </div>
                `;
                bookingsContainer.appendChild(bookingCard);
            });
        }
    });
}

// Edit Booking Function
function editBooking(index) {
    const booking = bookings[index];
    window.location.href = `passenger.html?id=${booking.id}&edit=${index}`;
}

// Delete Booking Function
function deleteBooking(index) {
    if (confirm('Are you sure you want to delete this booking?')) {
        bookings.splice(index, 1); // Remove the booking
        localStorage.setItem('bookings', JSON.stringify(bookings)); // Update localStorage
        window.location.reload(); // Refresh the page
    }
}
  // Toggle Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const closeMenu = document.getElementById('close-menu');

// Open Menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.remove('translate-x-full');
});

// Close Menu
closeMenu.addEventListener('click', () => {
    navMenu.classList.add('translate-x-full');
});

// Close Menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.add('translate-x-full');
    }
});
  // Slideshow
  let slideIndex = 0;

  function showSlides() {
      const slides = document.getElementsByClassName("mySlides");
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }

      slideIndex++;
      if (slideIndex > slides.length) {
          slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 3000);
  }

  showSlides();