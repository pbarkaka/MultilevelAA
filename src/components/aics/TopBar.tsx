import React from 'react';
import { Text, Icon } from '@momentum-design/components/react';
import './TopBar.css';

export interface ProgressStage {
    id: string;
    label: string;
    completed: boolean;
}

interface TopBarProps {
    progress: ProgressStage[];
}

const TopBar: React.FC<TopBarProps> = ({ progress }) => {
    return (
        <div className="aics-top-bar">
            <div className="top-bar-content">
                <div className="top-bar-title">
                    <Icon name="bot-customer-assistant-regular" size={20} />
                    <Text type="body-large-bold">Calling Setup Assistant</Text>
                </div>
                
                <div className="progress-tracker">
                    {progress.map((stage, index) => (
                        <React.Fragment key={stage.id}>
                            <div className={`progress-stage ${stage.completed ? 'completed' : ''}`}>
                                <div className="stage-indicator">
                                    {stage.completed ? (
                                        <Icon name="check-bold" size={12} />
                                    ) : (
                                        <span className="stage-number">{index + 1}</span>
                                    )}
                                </div>
                                <Text type="body-small-regular" className="stage-label">
                                    {stage.label}
                                </Text>
                            </div>
                            {index < progress.length - 1 && (
                                <div className={`progress-connector ${stage.completed ? 'completed' : ''}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopBar;

