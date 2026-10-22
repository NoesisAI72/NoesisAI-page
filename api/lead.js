// api/lead.js — Reçoit le formulaire "gate" des ressources et crée une ligne
// dans la base Notion « Prospects — Ressources NoesisAI ».
// Le secret Notion reste côté serveur (variables d'environnement Vercel) :
//   NOTION_TOKEN  = secret interne de l'intégration Notion (ntn_…)
//   NOTION_DB_ID  = 5f10193f61b84d69979021b82187e1e7
// Même domaine que la page => aucun problème de CORS.

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  // Lecture tolérante à la casse : accepte NOTION_TOKEN / notion_token,
  // et NOTION_DB_ID / NOTION_DBID / Notion_DBID, etc.
  function envAny(names) {
    const keys = Object.keys(process.env);
    for (const wanted of names) {
      const hit = keys.find((k) => k.toLowerCase() === wanted.toLowerCase());
      if (hit && process.env[hit]) return process.env[hit];
    }
    return undefined;
  }
  const token = envAny(["NOTION_TOKEN"]);
  const dbId = envAny(["NOTION_DB_ID", "NOTION_DBID"]);
  if (!token || !dbId) { res.status(500).json({ error: "Configuration serveur manquante" }); return; }

  // Body (Vercel parse déjà le JSON, on gère aussi le cas string).
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  const firstName = String(body.firstName || body.prenom || "").trim().slice(0, 100);
  const lastName = String(body.lastName || body.nom || "").trim().slice(0, 100);
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const ressource = String(body.ressource || "").trim().slice(0, 200);
  const sourceRaw = String(body.source || "LinkedIn").trim();
  const source = ["LinkedIn", "Instagram", "Autre"].includes(sourceRaw) ? sourceRaw : "Autre";

  // Honeypot anti-bot : champ caché rempli => on répond OK sans rien enregistrer.
  if (String(body.company || "").trim() !== "") { res.status(200).json({ ok: true }); return; }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // Le téléphone est facultatif : certaines ressources ne le demandent pas.
  // S'il est fourni, il doit rester plausible ; sinon on n'enregistre pas de numéro.
  const phoneOk = phone === "" || phone.replace(/[^\d]/g, "").length >= 6;
  if (!emailOk) { res.status(400).json({ error: "Email invalide." }); return; }
  if (!phoneOk) { res.status(400).json({ error: "Téléphone invalide." }); return; }

  // Titre de la ligne = « Prénom Nom » quand on l'a, sinon l'email (anciennes pages
  // encore en cache qui postent sans nom : on enregistre quand même le lead).
  const fullName = [firstName, lastName].filter(Boolean).join(" ").slice(0, 200);

  const baseProperties = {
    "Prospect": { title: [{ text: { content: fullName || email.slice(0, 200) } }] },
    "Email": { email },
    "Téléphone": { phone_number: phone ? phone.slice(0, 40) : null },
    "Ressource": { rich_text: [{ text: { content: ressource || "(non précisée)" } }] },
    "Source": { select: { name: source } },
    "Statut": { select: { name: "Nouveau" } },
  };
  const properties = { ...baseProperties };
  if (firstName) properties["Prénom"] = { rich_text: [{ text: { content: firstName } }] };
  if (lastName) properties["Nom"] = { rich_text: [{ text: { content: lastName } }] };

  function createPage(props) {
    return fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: dbId }, properties: props }),
    });
  }

  try {
    let r = await createPage(properties);

    // Filet de sécurité : si les colonnes Prénom/Nom n'existent pas encore dans la
    // base, on réessaie sans elles plutôt que de perdre le lead.
    if (!r.ok && r.status === 400) {
      const detail = await r.text();
      if (/is not a property that exists/i.test(detail)) {
        console.warn("Notion: colonnes Prénom/Nom absentes, fallback sans ces champs");
        r = await createPage(baseProperties);
      } else {
        console.error("Notion API error", r.status, detail);
        res.status(502).json({ error: "Enregistrement impossible pour le moment." });
        return;
      }
    }

    if (!r.ok) {
      const detail = await r.text();
      console.error("Notion API error", r.status, detail);
      res.status(502).json({ error: "Enregistrement impossible pour le moment." });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("lead handler error", e);
    res.status(500).json({ error: "Erreur serveur." });
  }
}
