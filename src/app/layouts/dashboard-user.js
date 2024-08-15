

import SidebarPeminjam from '../components/SidebarPeminjam';
import WelcomeBanner from '../components/WelcomeBanner';
import Profile from '../components/ProfileBanner';


const UserLayout = ({children}) => {
  

  return ( 
    <div className="flex h-screen overflow-hidden bg-bg-primary">
    {/* Sidebar */}
    <SidebarPeminjam />

    {/* Content area */}
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      {/* Site header */}
      <Profile />
      <div className="p-4 md:p-6 ml-0 md:ml-64">
        {children}
      </div>
    </div>
  </div>
  );
}

export default UserLayout;