import AdminRoutes from "./adminPages/adminRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LoginModal from "./components/boostrap/loginModal";
import HeaderPage from "./components/headerPage";
import TopAlertProvider from "./context/alertProvider";
import { LoadingProvider } from "./context/loadingProvider";
import UserRoutes from "./userPages/userRoutes";
import { UserProvider } from "../view/context/userContext";
import ProtectedRoute from "../view/context/protectedRoute";
import { AcadYearProvider } from "./context/acadyearContext";

function App() {
	return (
		<TopAlertProvider>
			<LoadingProvider>
				<LoginModal />
				<AcadYearProvider>
					<HeaderPage />
					<UserRoutes />
					<UserProvider>
						<ProtectedRoute>
							<AdminRoutes />
						</ProtectedRoute>
					</UserProvider>
				</AcadYearProvider>
			</LoadingProvider>
		</TopAlertProvider>
	);
}

export default App;
