document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentName = form.studentName.value.trim();
    const guardianName = form.guardianName.value.trim();
    const studentClass = form.studentClass.value;
    const age = form.age.value.trim();
    const course = form.course.value;
    const phone = form.phone.value.trim();
    const city = form.city.value.trim();
    const classTime = form.classTime.value.trim();

    if (!studentName || !guardianName || !studentClass || !age || !course || !phone || !city) {
      const status = document.getElementById("form-status");
      status.textContent = "Please fill in all required fields before submitting.";
      status.style.color = "var(--coral)";
      return;
    }

    const message =
      `New Registration Request — ${SITE.name}\n\n` +
      `Student Name: ${studentName}\n` +
      `Father's/Guardian's Name: ${guardianName}\n` +
      `Class: ${studentClass}\n` +
      `Age: ${age}\n` +
      `Course Interested In: ${course}\n` +
      `Phone/WhatsApp Number: ${phone}\n` +
      `Village/City: ${city}\n` +
      (classTime ? `Preferred Class Time: ${classTime}\n` : "") +
      `\nPlease confirm the next available batch. Thank you!`;

    window.open(waLink(message), "_blank");

    const status = document.getElementById("form-status");
    status.textContent = "Thank you! Your registration has been received. We will contact you soon.";
    status.style.color = "var(--leaf)";
    form.reset();
  });
});
