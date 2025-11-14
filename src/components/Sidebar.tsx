type PageKey = "ai-chat" | "my-skills" | "cv-processing" | "skill-search" | "employee-profiles";

interface SidebarProps {
  currentPage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const navItems = [
    { key: "skill-search", label: "Skill Search", page: "skill-search" as PageKey, icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
    )},
    { key: "analytics", label: "Analytics", disabled: true, icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>
    )},
    { key: "my-skills", label: "My Skills - Employee only", page: "my-skills" as PageKey, icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
      </svg>
    )},
    { key: "certifications", label: "CV Processing", page: "cv-processing" as PageKey, icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>
    )},

    { key: "employee-profiles", label: "Employee Profiles", page: "employee-profiles" as PageKey, icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
      </svg>
    )},
  ];

  return (
    <aside 
      className="sidebar sticky top-0 z-30 flex h-screen w-72 flex-col"
      style={{ 
        
       background: 'linear-gradient(180deg, #a91d6a 0%, #7d1550 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        padding: '12px 25px 8px 18px',
      }}
    >
      <div className="logo-section" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: '20px',
        marginBottom: '15px',
        height: '45px',
      }}>
        <img 
          src="/logoTKW.png" 
          alt="TecknoworkNS Logo" 
          style={{ 
            width: 'auto', 
            height: '180px',
            objectFit: 'cover',
            objectPosition: 'center'
          }} 
        />
      </div>

            <div 
        className="ai-assistant"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          borderRadius: '10px',
          padding: '12px 14px',
          marginBottom: '40px',
          
    position: 'relative',

        }}
      >
        <div className="ai-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7.5 3.5a.5.5 0 0 1 1 0V9a.5.5 0 0 1-1 0V3.5zM8 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>AI Assistant</span>
        </div>
        <p className="ai-description" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '13px', marginBottom: '10px', lineHeight: '1.4' }}>
          Get personalized skill recommendations
        </p>
        <button 
          className="try-now-btn"
          onClick={() => onPageChange('ai-chat')}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: '#B91C7E',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Try Now
        </button>
      </div>

      <div 
        className="search-box" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '12px 16px',
          backgroundColor: currentPage === 'skill-search' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderRadius: '10px',
          color: 'white',
          fontSize: '15px',
          marginBottom: '8px',
          cursor: currentPage === 'skill-search' ? 'default' : 'pointer',
          transition: 'background-color 0.2s',
        }}
        onClick={() => onPageChange('skill-search')}
        onMouseEnter={(e) => currentPage !== 'skill-search' && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
        onMouseLeave={(e) => currentPage !== 'skill-search' && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <span>Skill Search</span>
      </div>

      <nav className="nav-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.slice(1).map((item) => {
          const isActive = item.page && item.page === currentPage;
          return (
            <div 
              key={item.key}
              className="nav-item"
              onClick={() => !item.disabled && item.page && onPageChange(item.page)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '15px',
                borderRadius: '10px',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.5 : 1,
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => !item.disabled && !isActive && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => !item.disabled && !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>



      <div 
        className="user-profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
          padding: '12px',
          marginBottom: '20px',
        }}
      >
        <div 
          className="user-avatar"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '14px',
          }}
        >
          JD
        </div>
        <div className="user-info" style={{ flex: 1 }}>
          <div className="user-name" style={{ color: 'white', fontSize: '14px', fontWeight: '600', lineHeight: '1.3' }}>John Doe</div>
          <div className="user-role" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', lineHeight: '1.3' }}>Administrator</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
      </div>
    </aside>
  );
}
