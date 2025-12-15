import React from 'react';
import { Text, Button, Icon } from '@momentum-design/components/react';
import type { ActionChip } from '../../utils/aiResponses';
import './BottomBar.css';

interface BottomBarProps {
    input: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
    smartChips: ActionChip[];
    onChipClick: (chipId: string) => void;
    pendingChangesCount: number;
    onApplyChanges: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
    input,
    onInputChange,
    onSend,
    pendingChangesCount,
    onApplyChanges
}) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="aics-bottom-bar">
            <div className="input-container">
                <div className="input-wrapper">
                    <textarea
                        className="message-input"
                        placeholder="Type your request or use / for commands..."
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        rows={1}
                    />
                    <div className="input-actions">
                        <Button 
                            variant="primary" 
                            className="send-button"
                            onClick={onSend}
                            disabled={!input.trim()}
                        >
                            <Icon name="send-regular" />
                        </Button>
                    </div>
                </div>
                
                {pendingChangesCount > 0 && (
                    <Button
                        variant="primary"
                        className="apply-button"
                        onClick={onApplyChanges}
                    >
                        <Icon name="check-regular" />
                        <Text type="body-small-bold">
                            Apply {pendingChangesCount} Change{pendingChangesCount !== 1 ? 's' : ''}
                        </Text>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BottomBar;

