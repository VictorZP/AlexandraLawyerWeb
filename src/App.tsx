import { Navigate, Route, Routes } from "react-router-dom";
import { AdminEntry } from "./admin/AdminEntry";
import { AdminAssociationDetailEditor } from "./admin/pages/AdminAssociationDetailEditor";
import { AdminAssociationDetailsHub } from "./admin/pages/AdminAssociationDetailsHub";
import { AdminAssociationItemEditor } from "./admin/pages/AdminAssociationItemEditor";
import { AdminAssociationItemsHub } from "./admin/pages/AdminAssociationItemsHub";
import { AdminAssociationsPageEditor } from "./admin/pages/AdminAssociationsPageEditor";
import { AdminDashboard } from "./admin/pages/AdminDashboard";
import { AdminHomeEditor } from "./admin/pages/AdminHomeEditor";
import { AdminSettingsPage } from "./admin/pages/AdminSettingsPage";
import { AdminLawsEditor } from "./admin/pages/AdminLawsEditor";
import { AdminTopicEditor } from "./admin/pages/AdminTopicEditor";
import { Layout } from "./components/Layout";
import { isAdminSiteBuild } from "./lib/siteMode";
import { AssociationDetailPage } from "./pages/AssociationDetailPage";
import { AssociationsPage } from "./pages/AssociationsPage";
import { AdminNotAvailable } from "./pages/AdminNotAvailable";
import { BusinessPage } from "./pages/BusinessPage";
import { EmigrationPage } from "./pages/EmigrationPage";
import { HomePage } from "./pages/HomePage";
import { LawsPage } from "./pages/LawsPage";
import { TalentPassportPage } from "./pages/TalentPassportPage";
import { ConsultationPage } from "./pages/ConsultationPage";

export default function App() {
  if (isAdminSiteBuild()) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminEntry />}>
          <Route index element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="home" element={<AdminHomeEditor />} />
          <Route path="emigration" element={<AdminTopicEditor section="emigration" />} />
          <Route path="business" element={<AdminTopicEditor section="business" />} />
          <Route path="talent-passport" element={<AdminTopicEditor section="talentPassport" />} />
          <Route path="laws" element={<AdminLawsEditor />} />
          <Route path="associations" element={<AdminAssociationsPageEditor />} />
          <Route path="associations/items" element={<AdminAssociationItemsHub />} />
          <Route path="associations/items/:slug" element={<AdminAssociationItemEditor />} />
          <Route path="associations/details" element={<AdminAssociationDetailsHub />} />
          <Route path="associations/details/:slug" element={<AdminAssociationDetailEditor />} />
        </Route>
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
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/admin/*" element={<AdminNotAvailable />} />
      </Routes>
    </Layout>
  );
}
