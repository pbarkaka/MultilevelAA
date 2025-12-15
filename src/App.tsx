import './App.css'
import ControlHubPage from './pages/ControlHubPage'
import AICSPage from './pages/AICSPage'
import '@momentum-design/fonts/dist/css/fonts.css';
import '@momentum-design/tokens/dist/css/components/complete.css';
import { ThemeProvider, IconProvider } from '@momentum-design/components/react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [theme] = useState<'dark' | 'light'>('light')
  return (
    <ThemeProvider themeclass={`mds-theme-stable-${theme}Webex`}>
      <IconProvider iconSet='momentum-icons'>
        <BrowserRouter>
          <Routes>
            <Route path="/Overview" element={<ControlHubPage />} />
            <Route path="/AICS" element={<AICSPage />} />
            <Route path="/" element={<Navigate to="/Overview" replace />} />
          </Routes>
        </BrowserRouter>
      </IconProvider>
    </ThemeProvider>
  )
}

export default App
