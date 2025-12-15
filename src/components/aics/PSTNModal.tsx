import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Text, Button, Icon } from '@momentum-design/components/react';
import './PSTNModal.css';

export interface PSTNData {
    connectionType: 'cisco' | 'cloud-connected' | 'premises-based';
    provider?: string;
}

interface PSTNModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: PSTNData) => void;
}

type ProviderType = {
    id: string;
    name: string;
    certified: boolean;
};

const PROVIDERS: ProviderType[] = [
    { id: 'averistar', name: 'Averistar', certified: true },
    { id: 'bandwidth', name: 'Bandwidth', certified: true },
    { id: 'brcx', name: 'BRCX', certified: true },
    { id: 'fusion-connect', name: 'Fusion Connect', certified: true },
    { id: 'intelepeer', name: 'Intelepeer', certified: true },
    { id: 'nuwave', name: 'Nuwave', certified: true },
    { id: 'peerless', name: 'Peerless', certified: true },
    { id: 'pure-ip', name: 'Pure IP', certified: true },
    { id: 'allstream', name: 'AllStream', certified: false },
    { id: 'calltower', name: 'CallTower', certified: false },
    { id: 'convergia', name: 'Convergia', certified: false },
    { id: 'firstdigital', name: 'FirstDigital', certified: false },
    { id: 'gtt', name: 'GTT', certified: false },
    { id: 'ntt', name: 'NTT', certified: false },
    { id: 'sinch', name: 'Sinch', certified: false },
    { id: 'tata', name: 'Tata', certified: false },
];

const PSTNModal: React.FC<PSTNModalProps> = ({ isOpen, onClose, onSave }) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedType, setSelectedType] = useState<'cisco' | 'cloud-connected' | 'premises-based' | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

    const handleNext = () => {
        if (step === 1 && selectedType === 'cloud-connected') {
            setStep(2);
        } else if (selectedType) {
            onSave({ connectionType: selectedType, provider: selectedProvider || undefined });
            handleReset();
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            setSelectedProvider(null);
        }
    };

    const handleProviderSelect = (providerId: string) => {
        setSelectedProvider(providerId);
        // Immediately complete the PSTN setup when a provider is selected
        onSave({ 
            connectionType: 'cloud-connected', 
            provider: providerId 
        });
        handleReset();
    };

    const handleReset = () => {
        setStep(1);
        setSelectedType(null);
        setSelectedProvider(null);
        onClose();
    };

    const handleCancel = () => {
        handleReset();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleCancel} 
            title={step === 1 ? "Add PSTN connection for New Calling Location" : "Select a Provider"} 
            size="large"
        >
            {step === 1 ? (
                <>
                    <div className="pstn-modal-content">
                        <div className="pstn-header">
                            <Text type="heading-small-bold">Connection Type</Text>
                            <Text type="body-small-regular" className="pstn-subtitle">
                                Choose the connection type for all phone numbers associated with Testing.
                            </Text>
                        </div>

                        <div className="pstn-options-grid">
                            {/* Cisco Calling Plans */}
                            <div 
                                className={`pstn-option-card ${selectedType === 'cisco' ? 'selected' : ''}`}
                                onClick={() => setSelectedType('cisco')}
                            >
                                <div className="pstn-card-icon">
                                    <Icon name="handset-regular" size={24} />
                                </div>
                                <div className="pstn-card-content">
                                    <Text type="body-large-bold" className="pstn-card-title">
                                        Cisco Calling Plans
                                    </Text>
                                    <Text type="body-small-regular" className="pstn-card-description">
                                        Cisco-provided PSTN provides a bundled Cisco solution that simplifies your cloud calling experience with easy PSTN ordering and full support from Cisco and our Partners.
                                    </Text>
                                </div>
                                {selectedType === 'cisco' && (
                                    <div className="pstn-selected-check">
                                        <Icon name="check-circle-filled" size={12} />
                                    </div>
                                )}
                            </div>

                            {/* Cloud Connected PSTN - Selected */}
                            <div 
                                className={`pstn-option-card ${selectedType === 'cloud-connected' ? 'selected' : ''}`}
                                onClick={() => setSelectedType('cloud-connected')}
                            >
                                <div className="pstn-card-icon">
                                    <Icon name="cloud-regular" size={24} />
                                </div>
                                <div className="pstn-card-content">
                                    <Text type="body-large-bold" className="pstn-card-title">
                                        Cloud Connected PSTN
                                    </Text>
                                    <Text type="body-small-regular" className="pstn-card-description">
                                        Select Cisco Cloud Connected PSTN partners that provide white glove global PSTN solutions fully integrated with Cisco's Webex Calling cloud.
                                    </Text>
                                </div>
                                {selectedType === 'cloud-connected' && (
                                    <div className="pstn-selected-check">
                                        <Icon name="check-circle-filled" size={12} />
                                    </div>
                                )}
                            </div>

                            {/* Premises-based PSTN */}
                            <div 
                                className={`pstn-option-card ${selectedType === 'premises-based' ? 'selected' : ''}`}
                                onClick={() => setSelectedType('premises-based')}
                            >
                                <div className="pstn-card-icon">
                                    <Icon name="server-regular" size={24} />
                                </div>
                                <div className="pstn-card-content">
                                    <Text type="body-large-bold" className="pstn-card-title">
                                        Premises-based PSTN
                                    </Text>
                                    <Text type="body-small-regular" className="pstn-option-label">
                                        (formerly local gateway)
                                    </Text>
                                    <Text type="body-small-regular" className="pstn-card-description">
                                        Bring Your Own Carrier by interconnecting any Service Provider's PSTN with a premises-based local gateway that tightly integrates to Cisco's Webex Calling cloud.
                                    </Text>
                                </div>
                                {selectedType === 'premises-based' && (
                                    <div className="pstn-selected-check">
                                        <Icon name="check-circle-filled" size={12} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleNext} disabled={!selectedType}>Next</Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="pstn-modal-content">
                        <div className="pstn-header">
                            <Text type="body-small-regular" className="pstn-subtitle">
                                Choose the provider you'll use to order new numbers or port existing numbers.
                            </Text>
                        </div>

                        <div className="provider-grid">
                            {PROVIDERS.map((provider) => (
                                <div 
                                    key={provider.id}
                                    className={`provider-card ${selectedProvider === provider.id ? 'selected' : ''}`}
                                    onClick={() => handleProviderSelect(provider.id)}
                                >
                                    <div className="provider-avatar">
                                        {provider.name.charAt(0)}
                                    </div>
                                    <div className="provider-info">
                                        <Text type="body-small-bold" className="provider-name">
                                            {provider.name}
                                        </Text>
                                        {provider.certified && (
                                            <span className="provider-badge">Certified</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleBack}>Back</Button>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default PSTNModal;
