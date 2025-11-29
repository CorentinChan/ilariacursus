import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  return (
    <section className="welcome-banner">
      <div className="welcome-text">
        <h2 className="welcome-title">Bienvenue dans votre premier atelier React</h2>
        <p className="welcome-description">
          Nous allons découvrir ensemble comment JSX et les composants
          transforment un simple fichier JavaScript en une interface moderne,
          claire et maintenable.
        </p>
        <p className="welcome-hint">
          Commence par lire le code, puis joue avec lui : change les textes,
          ajoute des éléments, observe le rendu instantané.
        </p>
      </div>

      <div className="welcome-badge">
        <span className="welcome-badge-label">Niveau</span>
        <span className="welcome-badge-value">Débutant motivé</span>
      </div>
    </section>
  );
}