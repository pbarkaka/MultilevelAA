import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Text, Button, Icon } from '@momentum-design/components/react';
import './PhoneNumbersModal.css';

export interface PhoneNumbersData {
    numbers: string[];
    activateLater: boolean;
}

interface PhoneNumbersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: PhoneNumbersData) => void;
    locationName?: string;
}

const PhoneNumbersModal: React.FC<PhoneNumbersModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave
}) => {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [activateLater, setActivateLater] = useState(false);

    const handleSave = () => {
        onSave({ 
            numbers: phoneNumbers,
            activateLater 
        });
    };

    const handleCancel = () => {
        setPhoneNumbers([]);
        setInputValue('');
        setActivateLater(false);
        onClose();
    };

    const handleClearAll = () => {
        setPhoneNumbers([]);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            const newNumbers = inputValue
                .split(',')
                .map(num => num.trim())
                .filter(num => num.length > 0);
            setPhoneNumbers([...phoneNumbers, ...newNumbers]);
            setInputValue('');
        } else if (e.key === 'Backspace' && !inputValue && phoneNumbers.length > 0) {
            // Remove last tag if input is empty and backspace is pressed
            setPhoneNumbers(phoneNumbers.slice(0, -1));
        }
    };

    const handleRemoveNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    };

    const phoneCount = phoneNumbers.length;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleCancel} 
            title=""
            size="large"
        >
            <div className="phone-numbers-modal-content">
                <div className="phone-numbers-header">
                    <Text type="heading-small-bold">Enter numbers you want to add</Text>
                    <Text type="body-small-regular" className="phone-numbers-subtitle">
                        Input your numbers, with area codes, to add them to this location.
                        <br />
                        Country codes, plus signs, dashes, and parentheses are optional.
                        <br />
                        Valid examples: 4507832223, (450) 783-2223, 450-783-2223, +1-450-783-2223
                    </Text>
                </div>

                <div className="activate-later-section">
                    <div className="activate-later-label">
                        <Text type="body-small-medium">Activate Numbers Later</Text>
                        <Icon name="info-circle-regular" size={16} className="info-icon" />
                    </div>
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={activateLater}
                            onChange={(e) => setActivateLater(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="phone-numbers-input-section">
                    <div className="phone-numbers-tags-container">
                        {phoneNumbers.map((number, index) => (
                            <div key={index} className="phone-number-tag">
                                <span className="tag-text">{number}</span>
                                <button 
                                    className="tag-remove" 
                                    onClick={() => handleRemoveNumber(index)}
                                    type="button"
                                >
                                    <Icon name="cancel-regular" size={12} />
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={phoneNumbers.length === 0 ? "Enter phone numbers separated by commas" : ""}
                            className="phone-numbers-input"
                        />
                    </div>
                    <div className="phone-numbers-footer">
                        <Text type="body-small-regular" className="phone-counter">
                            {phoneCount}/1000 Phone numbers
                        </Text>
                        <button className="clear-all-button" onClick={handleClearAll}>
                            <Icon name="delete-regular" size={16} />
                            <span>Clear All</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <Button variant="secondary" onClick={handleCancel}>
                    Back
                </Button>
                <Button onClick={handleSave} disabled={phoneCount === 0}>
                    Next
                </Button>
            </div>
        </Modal>
    );
};

export default PhoneNumbersModal;

