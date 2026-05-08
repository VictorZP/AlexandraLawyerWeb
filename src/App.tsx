import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { EmigrationPage } from "./pages/EmigrationPage";
import { BusinessPage } from "./pages/BusinessPage";
import { TalentPassportPage } from "./pages/TalentPassportPage";
import { LawsPage } from "./pages/LawsPage";
import { AssociationsPage } from "./pages/AssociationsPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emigration" element={<EmigrationPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/talent-passport" element={<TalentPassportPage />} />
        <Route path="/laws" element={<LawsPage />} />
        <Route path="/associations" element={<AssociationsPage />} />
      </Routes>
    </Layout>
  );
}
