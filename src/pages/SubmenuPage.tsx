import React from 'react';
import SubmenuModal from '../components/modal/SubmenuModal';
import { useNavigate } from 'react-router-dom';

interface SubmenuPageProps {
  theme: 'dark' | 'light';
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

const SubmenuPage: React.FC<SubmenuPageProps> = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <div className={`mds-theme-stable-${theme}Webex`}>
      <SubmenuModal 
        isOpen={true} 
        onClose={() => navigate('/')} 
      />
    </div>
  );
};

export default SubmenuPage;

