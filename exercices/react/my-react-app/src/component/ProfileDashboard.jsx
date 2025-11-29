
// src/components/ProfileDashboard.jsx
// Composant parent qui orchestre la carte de profil et les compétences

import "./ProfileDashboard.css";
import ProfileCard from "./ProfileCard.jsx";
import TagList from "./TagList.jsx";

export default function ProfileDashboard() {
  // Données de démonstration (elles seront plus tard fournies par un backend)
  const skills = ["React", "JavaScript", "CSS moderne", "UX pédagogique"];

  return (
    <section className="profile-dashboard">
      <h2 className="profile-dashboard-title">Mini dashboard de profil</h2>

      <div className="profile-dashboard-layout">
        <ProfileCard
          name="Bechir"
          role="Formateur & Consultant"
          description="Accompagne les équipes dans la montée en compétence sur React et l'écosystème JavaScript."
        />

        <TagList title="Compétences clés" tags={skills} />
      </div>
    </section>
  );
}