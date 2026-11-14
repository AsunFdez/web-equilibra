const deletionForm = document.querySelector("#deletion-request-form");
const accountEmail = document.querySelector("#account-email");
const requestDetails = document.querySelector("#request-details");
const requestStatus = document.querySelector("#request-status");

if (deletionForm && accountEmail && requestDetails && requestStatus) {
  deletionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const subject = "Solicitud de eliminación de cuenta Equilibra";
    const details = requestDetails.value.trim();
    const body = [
      "Solicito la eliminación de mi cuenta de Equilibra y de los datos asociados que puedan eliminarse.",
      "",
      `Correo de Google vinculado a Equilibra: ${accountEmail.value.trim()}`,
      ...(details ? ["", "Información adicional:", details] : []),
    ].join("\n");
    const mailto = `mailto:asunfdezdiez@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    requestStatus.textContent = "Se abrirá tu aplicación de correo con la solicitud preparada. Revísala y envíala para completar la petición.";
    window.location.href = mailto;
  });
}
