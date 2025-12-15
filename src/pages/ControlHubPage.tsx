import React, { useState } from 'react';
import { Avatar, Text, Button, Icon, Badge } from '@momentum-design/components/react';
import './controlhubpage.css';

const ControlHubPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="control-hub-wrapper">
            {/* Top Header */}
            <header className="control-hub-header">
                <div className="header-left">
                    <Button variant="tertiary" prefixIcon="list-menu-regular" aria-label="menu" className="menu-button" />
                    <Text type="heading-midsize-bold" tagname="span" className="header-title">
                        <Icon name="placeholder-regular" className="webex-icon" />
                        <span className="brand-name">webex</span> Control Hub
                    </Text>
                </div>
                <div className="header-center">
                    <div className="search-container">
                        <Icon name="search-regular" className="search-icon" />
                        <input type="text" placeholder="Search" className="search-input" />
                    </div>
                </div>
                <div className="header-right">
                    <Button variant="tertiary" prefixIcon="alert-regular" aria-label="notifications" className="icon-button">
                        <Badge type="error" className="notification-badge">1</Badge>
                    </Button>
                    <Button variant="tertiary" prefixIcon="help-circle-regular" aria-label="help" className="icon-button" />
                    <Avatar size={32} initials="PB" />
                </div>
            </header>

            <div className="control-hub-content">
                {/* Left Sidebar */}
                <aside className="control-hub-sidebar">
                    <nav className="sidebar-nav">
                        <div className="nav-item active">
                            <Icon name="home-regular" />
                            <Text type="body-small-medium">Overview</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="alert-regular" />
                            <Text type="body-small-medium">Alerts center</Text>
                        </div>

                        <Text type="body-small-bold" className="nav-section-title">MONITORING</Text>
                        <div className="nav-item">
                            <Icon name="analysis-regular" />
                            <Text type="body-small-medium">Analytics</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="diagnostics-regular" />
                            <Text type="body-small-medium">Troubleshooting</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="file-text-regular" />
                            <Text type="body-small-medium">Reports</Text>
                        </div>

                        <Text type="body-small-bold" className="nav-section-title">MANAGEMENT</Text>
                        <div className="nav-item">
                            <Icon name="user-regular" />
                            <Text type="body-small-medium">Users</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="people-circle-regular" />
                            <Text type="body-small-medium">Groups</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="location-regular" />
                            <Text type="body-small-medium">Locations</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="folder-regular" />
                            <Text type="body-small-medium">Workspaces</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="devices-regular" />
                            <Text type="body-small-medium">Devices</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="apps-regular" />
                            <Text type="body-small-medium">Apps</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="settings-regular" />
                            <Text type="body-small-medium">Account</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="settings-regular" />
                            <Text type="body-small-medium">Organization settings</Text>
                        </div>

                        <Text type="body-small-bold" className="nav-section-title">SERVICES</Text>
                        <div className="nav-item">
                            <Icon name="chat-regular" />
                            <Text type="body-small-medium">Messaging</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="meetings-regular" />
                            <Text type="body-small-medium">Meetings</Text>
                        </div>
                        <div className="nav-item active">
                            <Icon name="handset-regular" />
                            <Text type="body-small-medium">Calling</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="phone-regular" />
                            <Text type="body-small-medium">PSTN & Routing</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="contact-card-regular" />
                            <Text type="body-small-medium">Customer Experience</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="headset-regular" />
                            <Text type="body-small-medium">Contact Center</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="voicemail-regular" />
                            <Text type="body-small-medium">Connected UC</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="cloud-regular" />
                            <Text type="body-small-medium">UCM Cloud</Text>
                        </div>
                        <div className="nav-item">
                            <Icon name="share-screen-regular" />
                            <Text type="body-small-medium">Hybrid</Text>
                        </div>
                    </nav>

                    <div className="sidebar-footer">
                        <Icon name="company-regular" />
                        <Text type="body-small-medium">Company Ltd</Text>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="control-hub-main">
                    {/* Info Banner */}
                    <div className="info-banner">
                        <Icon name="info-circle-regular" className="info-icon" />
                        <Text type="body-small-medium">
                            Numbers, PSTN, Call routing and Gateway configurations are under Services &gt; PSTN in the left nav bar.
                        </Text>
                        <Button variant="tertiary" prefixIcon="cancel-regular" aria-label="close" className="close-button" />
                    </div>

                    {/* Page Title */}
                    <Text type="heading-large-bold" tagname="h1" className="page-title">Calling</Text>

                    {/* Tabs */}
                    <div className="tabs-container">
                        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                            Overview
                        </button>
                        <button className={`tab ${activeTab === 'numbers' ? 'active' : ''}`} onClick={() => setActiveTab('numbers')}>
                            Numbers
                        </button>
                        <button className={`tab ${activeTab === 'virtual-lines' ? 'active' : ''}`} onClick={() => setActiveTab('virtual-lines')}>
                            Virtual lines
                        </button>
                        <button className={`tab ${activeTab === 'call-routing' ? 'active' : ''}`} onClick={() => setActiveTab('call-routing')}>
                            Call routing
                        </button>
                        <button className={`tab ${activeTab === 'managed-gateways' ? 'active' : ''}`} onClick={() => setActiveTab('managed-gateways')}>
                            Managed gateways
                        </button>
                        <button className={`tab ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>
                            Features
                        </button>
                        <button className={`tab ${activeTab === 'pstn' ? 'active' : ''}`} onClick={() => setActiveTab('pstn')}>
                            PSTN
                        </button>
                        <button className={`tab ${activeTab === 'service-settings' ? 'active' : ''}`} onClick={() => setActiveTab('service-settings')}>
                            Service settings
                        </button>
                        <button className={`tab ${activeTab === 'client-settings' ? 'active' : ''}`} onClick={() => setActiveTab('client-settings')}>
                            Client settings
                        </button>
                    </div>

                    {/* Content Grid */}
                    <div className="content-grid">
                        {/* PSTN Section */}
                        <div className="card pstn-card">
                            <Text type="heading-small-bold" tagname="h2">PSTN</Text>
                            <div className="cisco-calling-plans">
                                <div className="plan-icon">
                                    <Icon name="placeholder-regular" className="cisco-icon" />
                                </div>
                                <div className="plan-details">
                                    <Text type="body-midsize-bold">Cisco Calling Plans</Text>
                                    <Text type="body-small-medium" className="plan-subtitle">Learn More</Text>
                                </div>
                                <div className="plan-features">
                                    <div className="feature-item">
                                        <Icon name="check-regular" className="check-icon" />
                                        <Text type="body-small-medium">Business texting</Text>
                                    </div>
                                    <div className="feature-item">
                                        <Icon name="check-regular" className="check-icon" />
                                        <Text type="body-small-medium">Contact center</Text>
                                    </div>
                                    <div className="feature-item">
                                        <Icon name="check-regular" className="check-icon" />
                                        <Text type="body-small-medium">Service numbers</Text>
                                    </div>
                                    <div className="feature-item">
                                        <Icon name="check-regular" className="check-icon" />
                                        <Text type="body-small-medium">User numbers</Text>
                                    </div>
                                    <div className="feature-item">
                                        <Icon name="check-regular" className="check-icon" />
                                        <Text type="body-small-medium">Webex Go/Mobile</Text>
                                    </div>
                                </div>
                            </div>
                            <div className="pstn-links">
                                <div className="link-item">
                                    <Icon name="webex-teams-regular" />
                                    <Text type="body-small-medium">Providers</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="shopping-cart-regular" />
                                    <Text type="body-small-medium">Orders</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="other-number-regular" />
                                    <Text type="body-small-medium">Numbers</Text>
                                </div>
                            </div>
                            <div className="pstn-links">
                                <div className="link-item">
                                    <Icon name="follow-up-regular" />
                                    <Text type="body-small-medium">Business texting</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="settings-regular" />
                                    <Text type="body-small-medium">Settings</Text>
                                </div>
                            </div>
                        </div>

                        {/* Calling Features Section */}
                        <div className="card calling-features-card">
                            <div className="card-header">
                                <Text type="heading-small-bold" tagname="h2">Calling features</Text>
                                <a href="#" className="view-all-link">View all</a>
                            </div>
                            <div className="feature-row">
                                <div className="feature-info">
                                    <Icon name="busy-presence-regular" className="feature-icon" />
                                    <div>
                                        <Text type="body-midsize-bold">Call queue</Text>
                                        <Text type="body-small-medium" className="feature-description">
                                            Send the right call to the right agent. Automatically route calls to available agents based on policy, or direct calls with messages, music, and announcements.
                                        </Text>
                                    </div>
                                </div>
                                <Button variant="secondary">Manage</Button>
                            </div>
                            <div className="feature-row">
                                <div className="feature-info">
                                    <Icon name="bot-regular" />
                                    <div>
                                        <Text type="body-midsize-bold">Auto attendant</Text>
                                        <Text type="body-small-medium" className="feature-description">
                                            Set up custom greetings, schedules and menus to help callers, and route their calls to answering services.
                                        </Text>
                                    </div>
                                </div>
                                <Button variant="secondary">Manage</Button>
                            </div>
                            <div className="feature-row">
                                <div className="feature-info">
                                    <Icon name="people-circle-regular" className="feature-icon" />
                                    <div>
                                        <Text type="body-midsize-bold">Hunt group</Text>
                                        <Text type="body-small-medium" className="feature-description">
                                            Fine-tune call direction by automatically routing calls from one number to a group, and define how the calls are managed based on how the group works.
                                        </Text>
                                    </div>
                                </div>
                                <Button variant="secondary">Manage</Button>
                            </div>
                        </div>

                        {/* Gateway Configurations Section */}
                        <div className="card gateway-card">
                            <Text type="heading-small-bold" tagname="h2">Gateway configurations</Text>
                            <div className="gateway-links">
                                <div className="link-item">
                                    <Icon name="tools-regular" />
                                    <Text type="body-small-medium">Managed gateways</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="location-regular" />
                                    <Text type="body-small-medium">Trunk</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="participant-regular" />
                                    <Text type="body-small-medium">Route groups</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="dialpad-regular" />
                                    <Text type="body-small-medium">Dial plans</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="settings-regular" />
                                    <Text type="body-small-medium">More gateway configurations</Text>
                                </div>
                            </div>
                        </div>

                        {/* Feature Highlight Section */}
                        <div className="card feature-highlight-card">
                            <Text type="heading-small-bold" tagname="h2">Feature highlight</Text>
                            <div className="highlight-content">
                                <div className="highlight-icon">
                                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                        <circle cx="45" cy="45" r="20" stroke="#8B4EDA" strokeWidth="2" fill="none"/>
                                        <circle cx="75" cy="45" r="20" stroke="#8B4EDA" strokeWidth="2" fill="none"/>
                                        <rect x="50" y="70" width="40" height="30" stroke="#8B4EDA" strokeWidth="2" fill="none" rx="4"/>
                                    </svg>
                                </div>
                                <Text type="body-midsize-bold">Single number reach</Text>
                                <Text type="body-small-medium" className="highlight-description">
                                    With single number reach, you can make, receive, and seamlessly move calls to or from any device such as desk phone and mobile phone
                                </Text>
                                <Button variant="secondary">Manage</Button>
                            </div>
                        </div>

                        {/* Useful Resources Section */}
                        <div className="card resources-card">
                            <Text type="heading-small-bold" tagname="h2">Useful resources</Text>
                            <div className="resource-links">
                                <div className="resource-link">
                                    <Text type="body-small-medium">Getting started with calling</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">Using group call management</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">Multi line support using virtual lines</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">Manage auto attendants</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">Manage hunt groups</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">How to use call park extensions</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">Manage virtual extensions</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                                <div className="resource-link">
                                    <Text type="body-small-medium">Manage voicemail groups</Text>
                                    <Icon name="pop-out-regular" />
                                </div>
                            </div>
                        </div>

                        {/* Calling Quick Links Section */}
                        <div className="card quick-links-card">
                            <Text type="heading-small-bold" tagname="h2">Calling quick links</Text>
                            <div className="quick-links">
                                <div className="link-item">
                                    <Icon name="diagnostics-regular" />
                                    <Text type="body-small-medium">Troubleshooting</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="location-regular" />
                                    <Text type="body-small-medium">Locations</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="devices-regular" />
                                    <Text type="body-small-medium">Devices</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="analysis-regular" />
                                    <Text type="body-small-medium">Calling analytics</Text>
                                </div>
                                <div className="link-item">
                                    <Icon name="call-settings-regular" />
                                    <Text type="body-small-medium">Service settings</Text>
                                </div>
                            </div>
                        </div>

                        {/* What's New Section */}
                        <div className="card whats-new-card">
                            <Text type="heading-small-bold" tagname="h2">What's new?</Text>
                            <div className="whats-new-content">
                                <Text type="body-small-medium">
                                    We've added a lot of exciting new features in Webex Calling. Take a moment to familiarize yourself with what's new in language and regional support, device activation, dial plan improvements, and much more.
                                </Text>
                                <Button variant="secondary">Learn more</Button>
                                <div className="illustration">
                                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
                                        <circle cx="75" cy="75" r="50" stroke="#07C1A2" strokeWidth="2" fill="none"/>
                                        <path d="M60 60 L90 90 M60 90 L90 60" stroke="#07C1A2" strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ControlHubPage;

