import React from 'react';
import { Text } from '@momentum-design/components/react';
import './PageHeader.css';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
    return (
        <div className="page-header">
            <div className="page-header-content">
                <div className="page-header-text">
                    <Text type="heading-large-bold" className="page-title">
                        {title}
                    </Text>
                    {subtitle && (
                        <Text type="body-small-regular" className="page-subtitle">
                            {subtitle}
                        </Text>
                    )}
                </div>
                {actions && (
                    <div className="page-header-actions">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;

