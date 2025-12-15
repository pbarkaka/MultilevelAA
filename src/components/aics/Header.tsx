import React from 'react';
import { Icon, Avatar } from '@momentum-design/components/react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="control-hub-header">
            <div className="header-left">
                <div className="header-logo">
                    <span className="logo-text">webex</span>
                    <span className="logo-product">Control Hub</span>
                </div>
            </div>

            <div className="header-right">
                <button className="icon-button" aria-label="Apps">
                    <Icon name="apps-regular" size={20} />
                </button>
                <button className="icon-button" aria-label="Notifications">
                    <Icon name="alert-regular" size={20} />
                </button>
                <button className="icon-button" aria-label="Settings">
                    <Icon name="settings-regular" size={20} />
                </button>
                <button className="icon-button" aria-label="Help">
                    <Icon name="help-circle-regular" size={20} />
                </button>
                <button className="icon-button" aria-label="Tasks">
                    <Icon name="note-regular" size={20} />
                </button>
                <Avatar
                    initials="PB"
                    size={32}
                    className="user-avatar"
                />
            </div>
        </header>
    );
};

export default Header;

