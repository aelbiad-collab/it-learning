/**
 * IT Learning Academy — Préinscription
 * Reçoit les soumissions du formulaire (POST JSON) et les ajoute
 * comme nouvelle ligne dans l'onglet actif du Google Sheet lié.
 *
 * Déploiement : voir README.md à la racine du projet.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "invalid_json" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    data.prenom || "",
    data.nom || "",
    data.email || "",
    data.telephone || "",
    data.campus || "",
    data.profil || "",
    data.domaine || "",
    data.format || "",
    data.message || "",
    data.source || ""
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
