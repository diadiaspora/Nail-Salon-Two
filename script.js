/*
  GLOSS NAIL STUDIO
  Update the WhatsApp number below before publishing.
  Use the country code and number only, without +, spaces, or dashes.
*/

const WHATSAPP_NUMBER = "51987654321"; // REPLACE with the salon's real number

function openWhatsApp(message) {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "19292920584") {
    alert("Please configure the salon's WhatsApp number in script.js first.");
    return;
  }

  const url =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

// Mobile navigation
document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const nav = button.parentElement.querySelector(".main-nav");
    if (!nav) return;

    const isOpen = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "✕" : "☰";
  });
});

// Current year in the footer
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// WhatsApp contact links throughout the site
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsApp(
      "Hello! I'd like to ask about nail services and appointments.",
    );
  });
});

// Set the minimum booking date to today
const dateInput = document.querySelector("#booking-date");

if (dateInput) {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  dateInput.min = localToday;

  // Preselect a service when a visitor clicks "Book this service"
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service");
  const serviceSelect = document.querySelector("#service");

  if (requestedService && serviceSelect) {
    const matchingOption = Array.from(serviceSelect.options).find(
      (option) =>
        option.value.toLowerCase() === requestedService.toLowerCase() ||
        option.textContent.trim().toLowerCase() ===
          requestedService.toLowerCase(),
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }
}

// Booking form: create a WhatsApp message from the form details
const bookingForm = document.querySelector("#booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const formData = new FormData(bookingForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    const message = [
      "Hello Gloss Nail Studio! I'd like to request an appointment.",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Service: " + service,
      "Preferred date: " + date,
      "Preferred time: " + time,
      notes ? "Additional details: " + notes : "",
      "",
      "Please let me know if this time is available.",
    ]
      .filter(Boolean)
      .join("\n");

    const status = document.querySelector("#form-status");
    if (status) {
      status.textContent =
        "Opening WhatsApp to send your appointment request...";
    }

    openWhatsApp(message);
  });
}

// Portfolio category filters
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    portfolioItems.forEach((item) => {
      const matches = filter === "all" || item.dataset.category === filter;

      item.hidden = !matches;
    });
  });
});
