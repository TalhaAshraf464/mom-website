export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <strong>Sania Asif</strong>
        <span>Clinical Psychologist</span>
      </div>
      <p>Online worldwide <span aria-hidden="true">&middot;</span> In-person in Karachi, Pakistan</p>
      <p className="footer-note">
        <a href="tel:+923002025956">Call: +92 300 202 5956</a>
        <a className="footer-instagram" href="https://www.instagram.com/opentalkcounselling/" target="_blank" rel="noreferrer">Instagram · @opentalkcounselling ↗</a>
        <a className="admin-entry" href="/admin">Admin login ↗</a>
      </p>
    </footer>
  );
}
