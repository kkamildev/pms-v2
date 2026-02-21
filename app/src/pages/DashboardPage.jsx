import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import UsersDisplay from "../components/sections/UsersDisplay";
import MpzpDisplay from "../components/sections/MpzpDisplay";
import GeneralPlansDisplay from "../components/sections/GeneralPlansDisplay";
import LandTypesDisplay from "../components/sections/LandTypesDisplay";
import LandPurposesDisplay from "../components/sections/LandPurposesDisplay";
import OwnersDisplay from "../components/sections/OwnersDisplay";
import LandsDisplay from "../components/sections/LandsDisplay";
import RentsDisplay from "../components/sections/RentsDisplay";
import FormsDisplay from "../components/sections/FormsDisplay";
import CommunesDisplay from "../components/sections/CommunesDisplay";
import GroundClassesDisplay from "../components/sections/GroundClassesDisplay";
import LandDataDisplay from "../components/sections/LandDataDisplay";
import NotFound from "../components/sections/NotFound";

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/lands/:id" element={<LandDataDisplay/>}/>
                <Route path="/users" element={<UsersDisplay/>}/>
                <Route path="/mpzp" element={<MpzpDisplay/>}/>
                <Route path="/general-plans" element={<GeneralPlansDisplay/>}/>
                <Route path="/land-types" element={<LandTypesDisplay/>}/>
                <Route path="/land-purposes" element={<LandPurposesDisplay/>}/>
                <Route path="/owners" element={<OwnersDisplay/>}/>
                <Route path="/rents" element={<RentsDisplay/>}/>
                <Route path="/" element={<LandsDisplay/>}/>
                <Route path="/forms" element={<FormsDisplay/>}/>
                <Route path="/communes" element={<CommunesDisplay/>}/>
                <Route path="/ground-classes" element={<GroundClassesDisplay/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    )
}

export default DashboardPage;