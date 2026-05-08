import { Navigate, Route, Routes } from "react-router-dom";
import { AdminAuthGate } from "./admin/AdminAuthGate";
import { Layout } from "./components/Layout";
import { isAdminSiteBuild } from "./lib/siteMode";
import { AssociationDetailPage } from "./pages/AssociationDetailPage";
import { AssociationsPage } from "./pages/AssociationsPage";
import { AdminNotAvailable } from "./pages/AdminNotAvailable";
import { AdminPage } from "./pages/AdminPage";
import { BusinessPage } from "./pages/BusinessPage";
import { EmigrationPage } from "./pages/EmigrationPage";
import { HomePage } from "./pages/HomePage";
import { LawsPage } from "./pages/LawsPage";
import { TalentPassportPage } from "./pages/TalentPassportPage";

export default function App() {
  if (isAdminSiteBuild()) {
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminAuthGate>
              <AdminPage />
            </AdminAuthGate>
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emigration" element={<EmigrationPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/talent-passport" element={<TalentPassportPage />} />
        <Route path="/laws" element={<LawsPage />} />
        <Route path="/associations" element={<AssociationsPage />} />
        <Route path="/associations/:slug" element={<AssociationDetailPage />} />
        <Route path="/admin" element={<AdminNotAvailable />} />
      </Routes>
    </Layout>
  );
}
