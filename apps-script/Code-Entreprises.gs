/**
 * IT Learning Academy — Demandes de devis entreprises
 * Reçoit les soumissions du formulaire entreprises.html (POST JSON) et les
 * ajoute comme nouvelle ligne dans l'onglet actif du Google Sheet lié.
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
    data.entreprise || "",
    data.secteur || "",
    data.contact || "",
    data.fonction || "",
    data.email || "",
    data.telephone || "",
    data.effectif || "",
    data.domaine || "",
    data.format || "",
    data.delai || "",
    data.message || "",
    data.source || ""
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
