import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import UsersDisplay from "../components/sections/UsersDisplay";
import MpzpDisplay from "../components/sections/MpzpDisplay";
import GeneralPlansDisplay from "../components/sections/GeneralPlansDisplay";
import LandTypesDisplay from "../components/sections/LandTypesDisplay";
import LandPurposesDisplay from "../components/sections/LandPurposesDisplay";

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/users" element={<UsersDisplay/>}/>
                <Route path="/mpzp" element={<MpzpDisplay/>}/>
                <Route path="/general-plans" element={<GeneralPlansDisplay/>}/>
                <Route path="/land-types" element={<LandTypesDisplay/>}/>
                <Route path="/land-purposes" element={<LandPurposesDisplay/>}/>
            </Routes>
        </DashboardLayout>
    )
}

export default DashboardPage;