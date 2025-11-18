import './App.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SubmenuPage from './pages/SubmenuPage'
import '@momentum-design/fonts/dist/css/fonts.css';
import '@momentum-design/tokens/dist/css/components/complete.css';
import { ThemeProvider, IconProvider } from '@momentum-design/components/react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  return (
    <BrowserRouter>
      <ThemeProvider themeclass={`mds-theme-stable-${theme}Webex`}>
        <IconProvider iconSet='momentum-icons'>
          <Routes>
            <Route path="/" element={
              <MainLayout theme={theme} setTheme={setTheme}>
                <HomePage />
              </MainLayout>
            } />
            <Route path="/submenu" element={<SubmenuPage theme={theme} setTheme={setTheme} />} />
          </Routes>
        </IconProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
