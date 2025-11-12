import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import type { Screen } from './types';

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'translate':
        return <ChatInterface />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-gray-200">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

export default App;
