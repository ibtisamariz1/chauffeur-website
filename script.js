// ✅ Google Maps Autocomplete — attach to window
window.initAutocomplete = function () {
  const pickup = document.getElementById("pickup");
  const dropoff = document.getElementById("dropoff");

  if (pickup instanceof HTMLInputElement && dropoff instanceof HTMLInputElement) {
    const options = {
      componentRestrictions: { country: "au" },
      fields: ["formatted_address", "geometry"]
    };

    new google.maps.places.Autocomplete(pickup, options);
    new google.maps.places.Autocomplete(dropoff, options);

    console.log("Autocomplete initialized ✅");
  } else {
    console.error("❌ Pickup or dropoff field not found or not HTMLInputElement.");
  }
};


// ✅ Form submission (safe to use DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        sheet1: {
          name: form.name.value,
          phone: form.phone.value,
          pickup: form.pickup.value,
          dropoff: form.dropoff.value,
          datetime: form.datetime.value,
          note: form.note.value
        }
      };

      fetch("https://api.sheety.co/06715a440d0876e6e992449b57a5e0ee/chauffeurBookings/sheet1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            alert("Booking submitted successfully!");
            form.reset();
          } else {
            alert("There was an error submitting your booking.");
          }
        })
        .catch(error => {
          console.error("Error submitting booking:", error);
          alert("Network error. Please try again.");
        });
    });
  }
});
