

import SidebarPeminjam from '../components/SidebarPeminjam';
import WelcomeBanner from '../components/WelcomeBanner';
import Profile from '../components/ProfileBanner';
import UserLayout from '../layouts/dashboard-user';


const DashboardUser = () => {
  

  return (
   <UserLayout>
      <WelcomeBanner />
    </UserLayout>
  );
}

export default DashboardUser;