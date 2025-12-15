import React from 'react';
import { Icon } from '@momentum-design/components/react';
import './LeftNav.css';

interface NavItem {
    id: string;
    label: string;
    icon: string;
    isActive?: boolean;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

const LeftNav: React.FC = () => {
    const navSections: NavSection[] = [
        {
            items: [
                { id: 'overview', label: 'Overview', icon: 'home-regular' },
                { id: 'alerts', label: 'Alerts', icon: 'alert-regular' }
            ]
        },
        {
            title: 'MONITORING',
            items: [
                { id: 'analytics', label: 'Analytics', icon: 'analysis-regular' },
                { id: 'troubleshooting', label: 'Troubleshooting', icon: 'diagnose-regular' },
                { id: 'reports', label: 'Reports', icon: 'document-regular' }
            ]
        },
        {
            title: 'MANAGEMENT',
            items: [
                { id: 'users', label: 'Users', icon: 'user-regular' },
                { id: 'groups', label: 'Groups', icon: 'people-regular' },
                { id: 'locations', label: 'Locations', icon: 'location-regular' },
                { id: 'workspaces', label: 'Workspaces', icon: 'workspace-regular' },
                { id: 'devices', label: 'Devices', icon: 'device-regular' },
                { id: 'apps', label: 'Apps', icon: 'apps-regular' },
                { id: 'account', label: 'Account', icon: 'user-regular' },
                { id: 'security', label: 'Security', icon: 'secure-lock-regular' },
                { id: 'organization', label: 'Organization settings', icon: 'settings-regular' }
            ]
        },
        {
            title: 'SERVICES',
            items: [
                { id: 'messaging', label: 'Messaging', icon: 'chat-regular' },
                { id: 'meetings', label: 'Meetings', icon: 'meetings-regular' },
                { id: 'calling', label: 'Calling', icon: 'handset-regular', isActive: true },
                { id: 'contact-center', label: 'Contact Center', icon: 'contact-card-regular' },
                { id: 'connected-uc', label: 'Connected UC', icon: 'audio-video-regular' },
                { id: 'ucm-cloud', label: 'UCM Cloud', icon: 'cloud-regular' },
                { id: 'customer-name', label: 'Customer Name', icon: 'building-regular' }
            ]
        }
    ];

    return (
        <nav className="left-nav">
            {navSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="nav-section">
                    {section.title && (
                        <div className="nav-section-title">{section.title}</div>
                    )}
                    <ul className="nav-items">
                        {section.items.map((item) => (
                            <li
                                key={item.id}
                                className={`nav-item ${item.isActive ? 'active' : ''}`}
                            >
                                <Icon name={item.icon as any} size={16} className="nav-icon" />
                                <span className="nav-label">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

export default LeftNav;

