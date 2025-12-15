import React, { useState } from 'react';
import { Text, Button, Icon } from '@momentum-design/components/react';
import './EditorCard.css';

export interface EditorCardData {
    type: 'call-queue' | 'auto-attendant' | 'holiday-schedule' | 'voicemail-policy' | 'location' | 'pstn' | 'phone-numbers';
    title: string;
    fields: Record<string, any>;
}

interface EditorCardProps {
    data: EditorCardData;
    onSave: (data: any) => void;
}

const EditorCard: React.FC<EditorCardProps> = ({ data, onSave }) => {
    const [expanded, setExpanded] = useState(true);
    const [formData, setFormData] = useState(data.fields);
    const [isEditing, setIsEditing] = useState(false);

    const getIconName = () => {
        switch (data.type) {
            case 'location': return 'location-regular';
            case 'pstn': return 'handset-regular';
            case 'phone-numbers': return 'phone-regular';
            case 'call-queue': return 'busy-presence-regular';
            case 'auto-attendant': return 'bot-regular';
            case 'holiday-schedule': return 'calendar-add-regular';
            case 'voicemail-policy': return 'voicemail-regular';
            default: return 'settings-regular';
        }
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    const handleFieldChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const renderField = (key: string, value: any) => {
        if (isEditing) {
            return (
                <input
                    type="text"
                    className="editor-input"
                    value={value}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                />
            );
        }
        return <Text type="body-small-medium">{value}</Text>;
    };

    return (
        <div className="editor-card">
            <div className="editor-card-header" onClick={() => setExpanded(!expanded)}>
                <div className="editor-card-title">
                    <Icon name={getIconName()} />
                    <Text type="body-midsize-bold">{data.title}</Text>
                </div>
                <div className="editor-card-actions">
                    <Button
                        variant="tertiary"
                        className="expand-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}
                    >
                        <Icon name={expanded ? 'arrow-up-regular' : 'arrow-down-regular'} />
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className="editor-card-content">
                    <div className="editor-fields">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key} className="editor-field">
                                <Text type="body-small-medium" className="field-label">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                </Text>
                                <div className="field-value">
                                    {renderField(key, value)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="editor-card-footer">
                        {isEditing ? (
                            <>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    <Icon name="check-regular" /> Save
                                </Button>
                            </>
                        ) : (
                            <Button variant="secondary" onClick={() => setIsEditing(true)}>
                                <Icon name="edit-regular" /> Edit
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorCard;

