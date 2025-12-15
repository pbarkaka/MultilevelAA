import React, { useState, useEffect } from 'react';
import Header from '../components/aics/Header';
import LeftNav from '../components/aics/LeftNav';
import ConversationalPanel, { type Message } from '../components/aics/ConversationalPanel';
import ContextPanel from '../components/aics/ContextPanel';
import BottomBar from '../components/aics/BottomBar';
import LocationModal, { type LocationData } from '../components/aics/LocationModal';
import PSTNModal, { type PSTNData } from '../components/aics/PSTNModal';
import PhoneNumbersModal, { type PhoneNumbersData } from '../components/aics/PhoneNumbersModal';
import { getAIResponse, welcomeMessage, type ActionChip } from '../utils/aiResponses';
import { type EditorCardData } from '../components/aics/EditorCard';
import { callingSetupSteps, type SetupStep } from '../data/callingSetupSteps';
import './aicspage.css';

export interface ProgressStage {
    id: string;
    label: string;
    completed: boolean;
}

type PanelMode = 'steps' | 'suggestions';

const AICSPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [smartChips, setSmartChips] = useState<ActionChip[]>(welcomeMessage.chips || []);
    const [pendingChanges, setPendingChanges] = useState(0);
    const [contextPanelMode, setContextPanelMode] = useState<PanelMode>('steps');
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isPSTNModalOpen, setIsPSTNModalOpen] = useState(false);
    const [isPhoneNumbersModalOpen, setIsPhoneNumbersModalOpen] = useState(false);
    
    // Track task completion using the actual callingSetupSteps data
    const [setupSteps, setSetupSteps] = useState<SetupStep[]>(callingSetupSteps);
    
    // Calculate progress based on task completion
    const progress: ProgressStage[] = setupSteps.map((step) => {
        const allTasksCompleted = step.tasks.every(task => task.completed);
        return {
            id: step.id,
            label: step.title,
            completed: allTasksCompleted
        };
    });

    // Initialize with welcome message
    useEffect(() => {
        setMessages([{
            id: '0',
            type: 'ai',
            content: welcomeMessage.content,
            timestamp: new Date(),
            chips: welcomeMessage.chips
        }]);
    }, []);

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        
        // Check if this should open location modal
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('add location') || 
            lowerInput.includes('create location') ||
            lowerInput.includes('setup location') ||
            lowerInput === 'add location') {
            setIsLocationModalOpen(true);
            setInput('');
            return;
        }
        
        // Get AI response
        setTimeout(() => {
            const aiResponse = getAIResponse(input);
            
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: aiResponse.content,
                timestamp: new Date(),
                chips: aiResponse.chips
            };

            setMessages(prev => [...prev, aiMessage]);

            // Handle card generation
            if (aiResponse.generatesCard) {
                const cardData: EditorCardData = {
                    type: aiResponse.generatesCard,
                    title: getCardTitle(aiResponse.generatesCard),
                    fields: getCardFields(aiResponse.generatesCard)
                };

                const cardMessage: Message = {
                    id: (Date.now() + 2).toString(),
                    type: 'editor-card',
                    content: '',
                    timestamp: new Date(),
                    editorData: cardData
                };

                setMessages(prev => [...prev, cardMessage]);
                setPendingChanges(prev => prev + 1);
            }

            // Update smart chips
            if (aiResponse.chips) {
                setSmartChips(aiResponse.chips);
            }

            // Update suggestions (keep for potential future use)
            // if (aiResponse.suggestions) {
            //     setSuggestions(aiResponse.suggestions);
            // }

            // Switch panel mode if needed
            if (aiResponse.switchesPanel) {
                // Map old panel modes to new ones
                if (aiResponse.switchesPanel === 'suggestions') {
                    setContextPanelMode('suggestions');
                } else {
                    setContextPanelMode('steps');
                }
            }

            // Update progress based on keywords
            updateProgress(input);
        }, 500);

        setInput('');
    };

    const handleSuggestionClick = (suggestion: string) => {
        // Populate the input box with the suggestion text
        setInput(suggestion);
    };

    const handleChipClick = (chipId: string) => {
        const chip = smartChips.find(c => c.id === chipId);
        if (chip) {
            // Check if this is an add location action
            if (chip.action === 'add-location' || chip.label.toLowerCase().includes('add location')) {
                setIsLocationModalOpen(true);
                return;
            }
            
            // Check if this is a setup PSTN action
            if (chip.action === 'setup-pstn' || chip.label.toLowerCase().includes('setup pstn')) {
                setIsPSTNModalOpen(true);
                return;
            }
            
            // Check if this is an add phone numbers action
            if (chip.action === 'add-phone-numbers' || chip.label.toLowerCase().includes('add phone') || chip.label.toLowerCase().includes('add number')) {
                setIsPhoneNumbersModalOpen(true);
                return;
            }
            
            setInput(chip.label);
            handleSendMessage();
        }
    };

    const handleEditorSave = (data: any) => {
        // Handle saving editor card changes
        console.log('Saving editor data:', data);
    };

    const handleApplyChanges = () => {
        const confirmMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: `✅ Successfully applied ${pendingChanges} change${pendingChanges !== 1 ? 's' : ''}! Your calling configuration has been updated.`,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, confirmMessage]);
        setPendingChanges(0);
    };

    const handleLocationSave = (locationData: LocationData) => {
        // Mark "Add location(s)" task as completed
        setSetupSteps(prev => prev.map((step, index) => {
            if (index === 0) {
                return {
                    ...step,
                    tasks: step.tasks.map(task => 
                        task.id === 'add-locations' 
                            ? { ...task, completed: true } 
                            : task
                    )
                };
            }
            return step;
        }));
        
        // Add a message showing the location was created
        const locationMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: `✅ Location "${locationData.name}" has been created successfully!\n\n**Details:**\n• Address: ${locationData.address}, ${locationData.city}, ${locationData.state} ${locationData.zipCode}\n• Timezone: ${locationData.timezone || 'Not set'}\n• Country: ${locationData.country}\n\nWhat would you like to do next?`,
            timestamp: new Date(),
            chips: [
                { id: 'setup-pstn', label: 'Set up PSTN', action: 'setup-pstn' },
                { id: 'add-numbers', label: 'Add Phone Numbers', action: 'add-phone-numbers' },
                { id: 'another-location', label: 'Add Another Location', action: 'add-location' }
            ]
        };
        
        setMessages(prev => [...prev, locationMessage]);
        setSmartChips(locationMessage.chips || []);
        setIsLocationModalOpen(false);
        
        // Switch to steps panel to show progress
        setContextPanelMode('steps');
    };

    const handlePSTNSave = (pstnData: PSTNData) => {
        // Mark "Set up PSTN connection" task as completed
        setSetupSteps(prev => prev.map((step, index) => {
            if (index === 0) {
                return {
                    ...step,
                    tasks: step.tasks.map(task => 
                        task.id === 'setup-pstn' 
                            ? { ...task, completed: true } 
                            : task
                    )
                };
            }
            return step;
        }));
        
        // Add a message showing the PSTN was configured
        const pstnMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: `✅ PSTN connection has been configured successfully!\n\n**Connection Type:** ${pstnData.connectionType === 'cisco' ? 'Cisco Calling Plans' : pstnData.connectionType === 'cloud-connected' ? 'Cloud Connected PSTN' : 'Premises-based PSTN'}\n\nWhat would you like to do next?`,
            timestamp: new Date(),
            chips: [
                { id: 'add-numbers', label: 'Add Phone Numbers', action: 'add-phone-numbers' },
                { id: 'configure-emergency', label: 'Configure Emergency Services', action: 'configure-emergency' }
            ]
        };
        
        setMessages(prev => [...prev, pstnMessage]);
        setSmartChips(pstnMessage.chips || []);
        setIsPSTNModalOpen(false);
        
        // Switch to steps panel to show progress
        setContextPanelMode('steps');
    };

    const handlePhoneNumbersSave = (phoneNumbersData: PhoneNumbersData) => {
        // Mark "Add phone numbers" task as completed
        setSetupSteps(prev => prev.map((step, index) => {
            if (index === 0) {
                return {
                    ...step,
                    tasks: step.tasks.map(task => 
                        task.id === 'add-phone-numbers' 
                            ? { ...task, completed: true } 
                            : task
                    )
                };
            }
            return step;
        }));
        
        // Add a message showing the phone numbers were added
        const phoneNumbersMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: `✅ Successfully added ${phoneNumbersData.numbers.length} phone number${phoneNumbersData.numbers.length !== 1 ? 's' : ''}!\n\n${phoneNumbersData.activateLater ? '📝 Note: Numbers will be activated later.' : '✨ Numbers are now active.'}\n\nWhat would you like to do next?`,
            timestamp: new Date(),
            chips: [
                { id: 'configure-emergency', label: 'Configure Emergency Services', action: 'configure-emergency' },
                { id: 'add-users', label: 'Add Users', action: 'add-users' }
            ]
        };
        
        setMessages(prev => [...prev, phoneNumbersMessage]);
        setSmartChips(phoneNumbersMessage.chips || []);
        setIsPhoneNumbersModalOpen(false);
        
        // Switch to steps panel to show progress
        setContextPanelMode('steps');
    };

    const updateProgress = (userInput: string) => {
        const lowerInput = userInput.toLowerCase();
        
        // Update tasks based on keywords
        setSetupSteps(prev => prev.map(step => {
            return {
                ...step,
                tasks: step.tasks.map(task => {
                    // Check for task completion keywords
                    if ((lowerInput.includes('pstn') || lowerInput.includes('setup pstn')) && task.id === 'setup-pstn') {
                        return { ...task, completed: true };
                    }
                    if ((lowerInput.includes('phone number') || lowerInput.includes('add number')) && task.id === 'add-phone-numbers') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('emergency') && task.id === 'emergency-services') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('schedule') && task.id === 'setup-schedules') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('voice portal') && task.id === 'setup-voice-portals') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('user') && task.id === 'add-users') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('workspace') && task.id === 'add-workspaces') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('device') && task.id === 'add-devices') {
                        return { ...task, completed: true };
                    }
                    if (lowerInput.includes('auto attendant') && task.id === 'configure-auto-attendant') {
                        return { ...task, completed: true };
                    }
                    if ((lowerInput.includes('call queue') || lowerInput.includes('queue')) && task.id === 'configure-call-queue') {
                        return { ...task, completed: true };
                    }
                    return task;
                })
            };
        }));
    };

    const handleTaskToggle = (stepId: string, taskId: string) => {
        setSetupSteps(prev => prev.map(step => {
            if (step.id === stepId) {
                return {
                    ...step,
                    tasks: step.tasks.map(task => 
                        task.id === taskId 
                            ? { ...task, completed: !task.completed } 
                            : task
                    )
                };
            }
            return step;
        }));
    };

    const getCardTitle = (type: string): string => {
        switch (type) {
            case 'call-queue': return 'Call Queue Configuration';
            case 'auto-attendant': return 'Auto Attendant Setup';
            case 'holiday-schedule': return 'Business Hours & Holidays';
            case 'voicemail-policy': return 'Voice Portal Configuration';
            case 'location': return 'Location Setup';
            case 'pstn': return 'PSTN Connection';
            case 'phone-numbers': return 'Phone Number Management';
            default: return 'Configuration';
        }
    };

    const getCardFields = (type: string): Record<string, any> => {
        switch (type) {
            case 'location':
                return {
                    name: 'New York Office',
                    address: '123 Main Street, New York, NY 10001',
                    timezone: 'America/New_York',
                    mainNumber: '+1 (212) 555-0100'
                };
            case 'pstn':
                return {
                    connectionType: 'Cloud Connected PSTN',
                    provider: 'Cisco',
                    status: 'Configuring',
                    trunkCount: '2'
                };
            case 'phone-numbers':
                return {
                    totalNumbers: '50',
                    assigned: '0',
                    unassigned: '50',
                    dialPlan: 'Not configured'
                };
            case 'call-queue':
                return {
                    name: 'Support Queue',
                    routingType: 'Round-robin',
                    agents: '0 agents',
                    businessHours: 'Not configured',
                    overflow: 'Voicemail',
                    maxWaitTime: '5 minutes'
                };
            case 'auto-attendant':
                return {
                    name: 'Main Reception',
                    greeting: 'Not recorded',
                    menuOptions: '0 options',
                    businessHours: '24/7',
                    afterHours: 'Voicemail'
                };
            case 'holiday-schedule':
                return {
                    name: 'Business Schedule',
                    businessHours: 'Monday-Friday, 9:00 AM - 5:00 PM',
                    holidays: '0 holidays configured',
                    afterHoursAction: 'Play message'
                };
            case 'voicemail-policy':
                return {
                    transcription: 'Disabled',
                    emailNotification: 'Disabled',
                    maxDuration: '3 minutes',
                    storage: '30 days'
                };
            default:
                return {};
        }
    };

    return (
        <div className="aics-page">
            <Header />
            <div className="aics-main-content">
                <LeftNav />
                <div className="aics-content-area">
                    <h2 className="page-title">AI assisted Calling setup</h2>
                    <div className="aics-panels-container">
                        <div className="aics-left-panel">
                            <ContextPanel
                                mode={contextPanelMode}
                                onModeChange={setContextPanelMode}
                                selectedEntity={undefined}
                                onSuggestionClick={handleSuggestionClick}
                                progress={progress}
                                setupSteps={setupSteps}
                                onTaskToggle={handleTaskToggle}
                            />
                        </div>
                        
                        <div className="aics-right-panel">
                            <ConversationalPanel 
                                messages={messages}
                                onChipClick={handleChipClick}
                                onEditorSave={handleEditorSave}
                            />
                            <BottomBar
                                input={input}
                                onInputChange={setInput}
                                onSend={handleSendMessage}
                                smartChips={smartChips}
                                onChipClick={handleChipClick}
                                pendingChangesCount={pendingChanges}
                                onApplyChanges={handleApplyChanges}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                onSave={handleLocationSave}
            />
            
            <PSTNModal
                isOpen={isPSTNModalOpen}
                onClose={() => setIsPSTNModalOpen(false)}
                onSave={handlePSTNSave}
            />
            
            <PhoneNumbersModal
                isOpen={isPhoneNumbersModalOpen}
                onClose={() => setIsPhoneNumbersModalOpen(false)}
                onSave={handlePhoneNumbersSave}
                locationName="Testing"
            />
        </div>
    );
};

export default AICSPage;
