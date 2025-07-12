const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const car = document.getElementById("car");
const startDate = document.getElementById("start");
const endDate = document.getElementById("end");
const bookingForm = document.getElementById("rentalForm");
const bookingSummary = document.getElementById("booking-summary");
const availabilityBadges = document.querySelectorAll(".status");
const rentButtons = document.querySelectorAll(".rent-btn");
const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactname");
const contactEmail = document.getElementById("contactemail");
const contactSubject = document.getElementById("contactsubject");
const contactMessage = document.getElementById("contactmessage");
const contactSummary = document.querySelector(".contact-summary");


bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const carValue = car.value;
  const startDateValue = startDate.value;
  const endDateValue = endDate.value;

  const captalizedName = nameValue
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!carValue || !startDateValue || !endDateValue) {
    alert("Please fill all required fields.");
    return;
  }

  const sDate = new Date(startDateValue);
  const eDate = new Date(endDateValue);
  const totalDays = Math.ceil((eDate - sDate) / (1000 * 60 * 60 * 24));

  let carPricePerDay = 0;
  const carElements = document.querySelectorAll(".car");
  carElements.forEach((el) => {
    const carName = el.querySelector(".car-details h3").textContent.trim();
    if (carName === carValue) {
      carPricePerDay = parseInt(el.dataset.price);
    }
  });

  const totalCost = carPricePerDay * totalDays;

  bookingSummary.innerHTML = `
    <h3>Booking Summary</h3>
    <p><span>Name:</span> ${captalizedName}</p>
    <p><span>Email:</span> ${emailValue}</p>
    <p><span>Phone:</span> ${phoneValue}</p>
    <p><span>Car:</span> ${carValue}</p>
    <p><span>Start Date:</span> ${startDateValue}</p>
    <p><span>End Date:</span> ${endDateValue}</p>
    <p><span>Total Days:</span> ${totalDays}</p>
    <p class="total"><span>Total Cost:</span> PKR ${totalCost.toLocaleString()}</p>
  `;

  const selectedCar = document.getElementById("car").value;
  document.querySelectorAll(".car").forEach((car) => {
    const carName = car.querySelector(".car-details h3").textContent.trim();

    if (carName === selectedCar) {
      const badge = car.querySelector(".status");
      const button = car.querySelector(".rent-btn");

      badge.classList.remove("available");
      badge.classList.add("not-available");
      badge.innerHTML = '<i class="fas fa-times-circle"></i> Not Available';

      button.textContent = "Booked";
      button.removeAttribute("href");
      button.classList.add("disabled");
    }
  });

  alert(`Booking confirmed! The car is now booked for ${totalDays} days.`);

  name.value = "";
  email.value = "";
  phone.value = "";
  car.value = "";
  startDate.value = "";
  endDate.value = "";
});


contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const contactNameValue = contactName.value.trim();
  const contactEmailValue = contactEmail.value.trim();
  const contactSubjectValue = contactSubject.value.trim();
  const contactMessageValue = contactMessage.value.trim();

  contactSummary.innerHTML = `
    <h3>Contact Summary</h3>
    <p><strong>Name:</strong> ${contactNameValue}</p>
    <p><strong>Email:</strong> ${contactEmailValue}</p>
    <p><strong>Subject:</strong> ${contactSubjectValue || "(No Subject)"}</p>
    <p><strong>Message:</strong> ${contactMessageValue}</p>
  `;

  alert("Your message has been sent!");
});

const newsletterForm = document.getElementById("newsletterForm");
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    alert("Please enter your email.");
    return;
  }

  alert("You have successfully subscribed to our newsletter!");
  emailInput.value = "";
});
