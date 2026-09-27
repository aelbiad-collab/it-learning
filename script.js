// IT Learning Academy — Préinscription
// Remplacer l'URL ci-dessous par l'URL du Web App Apps Script (voir README.md)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzO60htgY9Ekq6lotVOceqfkQ3YcZHo38UG6uXl3yS9rDspUkeet4fDseJbzwXo6aR4/exec";

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("preregForm");
const submitBtn = document.getElementById("submitBtn");
const statusBox = document.getElementById("formStatus");

function showStatus(kind, text) {
  statusBox.textContent = text;
  statusBox.className = "form-status show " + kind;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (SCRIPT_URL.indexOf("REPLACE_WITH") === 0) {
    showStatus("err", "Le formulaire n'est pas encore connecté au Google Sheet. Voir README.md pour le déploiement de l'Apps Script.");
    return;
  }

  const payload = {
    prenom: form.prenom.value.trim(),
    nom: form.nom.value.trim(),
    email: form.email.value.trim(),
    telephone: form.telephone.value.trim(),
    campus: form.campus.value,
    profil: form.profil.value,
    domaine: form.domaine.value,
    format: form.format.value,
    message: form.message.value.trim(),
    source: document.title + " — " + window.location.href
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Envoi en cours...";
  statusBox.className = "form-status";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload)
    });

    showStatus("ok", "Merci ! Votre préinscription a bien été envoyée. Notre équipe vous recontacte sous 24h.");
    form.reset();
  } catch (err) {
    showStatus("err", "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement au +212 661 830 846.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Envoyer ma préinscription";
  }
});
