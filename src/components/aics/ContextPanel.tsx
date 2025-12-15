import React from 'react';
import { Text, Icon } from '@momentum-design/components/react';
import { type ProgressStage } from '../../pages/AICSPage';
import { type SetupStep } from '../../data/callingSetupSteps';
import { sampleSuggestions } from '../../data/sampleData';
import './ContextPanel.css';

type PanelMode = 'steps' | 'suggestions';

interface ContextPanelProps {
    mode: PanelMode;
    onModeChange: (mode: PanelMode) => void;
    selectedEntity?: any;
    onSuggestionClick: (suggestion: string) => void;
    progress: ProgressStage[];
    setupSteps: SetupStep[];
    onTaskToggle: (stepId: string, taskId: string) => void;
}

const ContextPanel: React.FC<ContextPanelProps> = ({
    mode,
    onModeChange,
    onSuggestionClick,
    progress,
    setupSteps,
    onTaskToggle
}) => {
    const renderSteps = () => {
        return (
            <div className="steps-panel">
                <div className="panel-header">
                    <Text type="heading-small-bold">Setup Steps</Text>
                </div>
                <div className="steps-list">
                    {setupSteps.map((step, stepIndex) => {
                        const isStepCompleted = progress[stepIndex]?.completed || false;
                        
                        return (
                            <div key={step.id} className="setup-step">
                                <div className="step-header">
                                    <div className={`step-number ${isStepCompleted ? 'completed' : ''}`}>
                                        {isStepCompleted ? (
                                            <Icon name="check-regular" className="step-check" />
                                        ) : (
                                            <Text type="body-small-bold">{stepIndex + 1}</Text>
                                        )}
                                    </div>
                                    <div className="step-info">
                                        <Text type="body-small-bold">{step.title}</Text>
                                        {step.description && (
                                            <Text type="body-small-regular" className="step-description">
                                                {step.description}
                                            </Text>
                                        )}
                                    </div>
                                </div>
                                <div className="step-tasks">
                                    {step.tasks.map((task) => (
                                        <div 
                                            key={task.id} 
                                            className={`task-item ${task.completed ? 'completed' : ''}`}
                                            onClick={() => onTaskToggle(step.id, task.id)}
                                        >
                                            <div className={`task-checkbox ${task.completed ? 'checked' : ''}`}>
                                                {task.completed && <Icon name="check-bold" size={12} />}
                                            </div>
                                            <Text type="body-small-regular">{task.label}</Text>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderSuggestions = () => {
        return (
            <div className="suggestions-panel">
                <div className="panel-header">
                    <Text type="heading-small-bold">AI Suggestions</Text>
                </div>
                <div className="suggestions-list">
                    {sampleSuggestions.length === 0 ? (
                        <div className="empty-state">
                            <Icon name="info-circle-regular" />
                            <Text type="body-small-medium">
                                No suggestions at this time
                            </Text>
                        </div>
                    ) : (
                        sampleSuggestions.map((suggestion) => (
                            <div
                                key={suggestion.id}
                                className="suggestion-item"
                                onClick={() => onSuggestionClick(suggestion.text)}
                            >
                                <div className="suggestion-content">
                                    <Icon name={suggestion.icon as any} />
                                    <Text type="body-small-regular">{suggestion.text}</Text>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="context-panel">
            <div className="context-panel-tabs">
                <button
                    className={`context-tab ${mode === 'steps' ? 'active' : ''}`}
                    onClick={() => onModeChange('steps')}
                >
                    <Icon name="list-menu-regular" />
                    <Text type="body-small-medium">Steps</Text>
                </button>
                <button
                    className={`context-tab ${mode === 'suggestions' ? 'active' : ''}`}
                    onClick={() => onModeChange('suggestions')}
                >
                    <Icon name="info-circle-regular" />
                    <Text type="body-small-medium">Suggestions</Text>
                </button>
            </div>
            
            <div className="context-panel-content">
                {mode === 'steps' && renderSteps()}
                {mode === 'suggestions' && renderSuggestions()}
            </div>
        </div>
    );
};

export default ContextPanel;
