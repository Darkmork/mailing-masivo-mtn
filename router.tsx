
import React from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ListsPage from './pages/ListsPage';
import TemplatesPage from './pages/TemplatesPage';
import CampaignsPage from './pages/CampaignsPage';
import TestSendPage from './pages/TestSendPage';
import WebhooksLogsPage from './pages/WebhooksLogsPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createHashRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'lists', element: <ListsPage /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'campaigns', element: <CampaignsPage /> },
      { path: 'test-send', element: <TestSendPage /> },
      { path: 'webhooks-logs', element: <WebhooksLogsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
