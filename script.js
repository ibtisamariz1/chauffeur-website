// ✅ Google Maps Autocomplete
function initAutocomplete() {
  const pickup = document.getElementById("pickup");
  const dropoff = document.getElementById("dropoff");

  if (pickup instanceof HTMLInputElement && dropoff instanceof HTMLInputElement) {
    const options = {
      componentRestrictions: { country: "au" },
      fields: ["formatted_address", "geometry"]
    };

    new google.maps.places.Autocomplete(pickup, options);
    new google.maps.places.Autocomplete(dropoff, options);
  }
}

// ✅ Smooth Scroll for "Book Now" Button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('.btn-primary');
  if (btn) {
    btn.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector('#quote').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const form = document.getElementById("booking-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        sheet1: {
          name: form.name.value,
          phone: form.phone.value,
          email: form.email.value,
          pickup: form.pickup.value,
          dropoff: form.dropoff.value,
          datetime: form.datetime.value,
          note: form.note.value
        }
      };

      // ✅ Send to Sheety API (Google Sheet)
      fetch("https://api.sheety.co/06715a440d0876e6e992449b57a5e0ee/chauffeurBookings/sheet1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) throw new Error("Sheety error");

          // ✅ Also send to FormSubmit via hidden form
          form.action = "https://formsubmit.co/bookings@numberonechauffeur.au";
          form.method = "POST";
          form.submit();
        })
        .catch(error => {
          console.error("Error submitting booking:", error);
          alert("There was a network error. Please try again.");
        });
    });
  }
});

// ✅ Auto-Rotate Testimonials (if added later)
let currentTestimonial = 0;
setInterval(() => {
  const testimonials = document.querySelectorAll(".testimonial");
  if (testimonials.length === 0) return;

  testimonials.forEach((el) => el.classList.remove("active"));
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add("active");
}, 5000);
