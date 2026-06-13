import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainOverview from "./pages/MainOverview";
import BuildingOverview from "./pages/BuildingOverview";
import FloorOverview from "./pages/FloorOverview";
import ClientOverview from "./pages/ClientOverview";

export default function App() {
  return (
    <BrowserRouter basename="/bmsdashboard1">
      <Routes>
        <Route path="/" element={<MainOverview />} />
        <Route path="/building/:buildingId" element={<BuildingOverview />} />
        <Route path="/building/:buildingId/floor/:floorId" element={<FloorOverview />} />
        <Route path="/building/:buildingId/floor/:floorId/client/:clientId" element={<ClientOverview />} />
      </Routes>
    </BrowserRouter>
  );
}
