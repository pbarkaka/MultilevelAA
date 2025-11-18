import React, { useState } from 'react';
import { 
  Button, 
  Text, 
  Input, 
  Checkbox,
  InputChip,
  Divider
} from '@momentum-design/components/react';
import './submenumodal.css';

interface SubmenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  key: number;
  action: string;
  label: string;
  triggers: string[];
  isExpanded: boolean;
}

const SubmenuModal: React.FC<SubmenuModalProps> = ({ isOpen, onClose }) => {
  const [submenuName, setSubmenuName] = useState('');
  const [enableExtensionDialing, setEnableExtensionDialing] = useState(false);
  const [enableVoiceInput, setEnableVoiceInput] = useState(false);
  const [greetingType, setGreetingType] = useState('default');
  const [showAllItems, setShowAllItems] = useState(true);
  const [newTriggerInputs, setNewTriggerInputs] = useState<{ [key: string]: string }>({});

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 'press-0', key: 0, action: 'Not used', label: '', triggers: [], isExpanded: false },
    { id: 'press-1', key: 1, action: 'Play announcement', label: '', triggers: [], isExpanded: true },
    { id: 'press-2', key: 2, action: 'Transfer call with prompt', label: 'Label name', triggers: ['Operator', 'Manager', 'Analyst', 'Developer'], isExpanded: true },
    { id: 'press-3', key: 3, action: 'Transfer call without prompt', label: 'Label name', triggers: ['Operator', 'Analyst', 'Developer'], isExpanded: true },
    { id: 'press-4', key: 4, action: 'Transfer call to operator', label: 'Label name', triggers: ['Analyst'], isExpanded: true },
    { id: 'press-5', key: 5, action: 'Transfer call to voicemail', label: 'Label name', triggers: ['Analyst'], isExpanded: true },
    { id: 'press-6', key: 6, action: 'Dial by name', label: '', triggers: [], isExpanded: false },
    { id: 'press-7', key: 7, action: 'Dial by extension', label: 'Label name', triggers: ['Analyst'], isExpanded: true },
    { id: 'press-8', key: 8, action: 'Repeat menu', label: 'Text', triggers: ['Analyst'], isExpanded: true },
    { id: 'press-9', key: 9, action: 'Exit menu', label: 'Text', triggers: ['Analyst'], isExpanded: true },
    { id: 'press-asterisk', key: -1, action: 'Not used', label: '', triggers: [], isExpanded: false },
    { id: 'press-hash', key: -2, action: 'Not used', label: '', triggers: [], isExpanded: false },
  ]);

  const handleActionChange = (id: string, value: string) => {
    setMenuItems(items => 
      items.map(item => {
        if (item.id === id) {
          // If "Not used" is selected, clear label and triggers (like Remove button)
          if (value === 'Not used') {
            return { ...item, action: value, label: '', triggers: [], isExpanded: false };
          }
          return { ...item, action: value };
        }
        return item;
      })
    );
  };

  const getKeyLabel = (key: number) => {
    if (key === -1) return '*';
    if (key === -2) return '#';
    if (key === 10) return '0';
    return key.toString();
  };

  const actionOptions = [
    'Not used',
    'Play announcement',
    'Transfer call with prompt',
    'Transfer call without prompt',
    'Transfer call to operator',
    'Transfer call to voicemail',
    'Dial by name',
    'Dial by extension',
    'Repeat menu',
    'Exit menu'
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-fullpage">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <Text type="heading-small-bold" tagname="h2">Add / Edit submenu</Text>
          <Button 
            variant="tertiary" 
            size={20} 
            prefixIcon="cancel-bold" 
            aria-label="close modal"
            onClick={onClose}
            className="header-close-btn"
          />
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Submenu Name Section */}
          <div className="modal-section">
            <Divider className="section-divider" />
            <div className="section-layout">
              <Text type="body-large-medium" tagname="div" className="section-label">
                Submenu name
              </Text>
              <div className="section-content">
                <Input 
                  value={submenuName}
                  onChange={(e: any) => setSubmenuName(e.target.value)}
                  className="submenu-name-input"
                />
              </div>
            </div>
          </div>

          {/* Dial Configurations Section */}
          <div className="modal-section dial-configurations">
            <Divider className="section-divider" />
            <div className="section-layout">
              <Text type="body-large-medium" tagname="div" className="section-label">
                Dial configurations
              </Text>
              <div className="section-content">
                <Text type="body-midsize-regular" tagname="p" className="section-description">
                  Apply different functions to each keypad option. These settings direct your customers where they need to go when they enter a specific number on the phone.
                </Text>
                
                <div className="checkbox-wrapper">
                  <Checkbox
                    checked={enableExtensionDialing}
                    onChange={(e: any) => setEnableExtensionDialing(e.target.checked)}
                  />
                  <Text type="body-midsize-regular" tagname="span" className="checkbox-label">
                    Enable extension dialling without requiring a menu item.
                  </Text>
                </div>

                <div className="checkbox-wrapper">
                  <Checkbox
                    checked={enableVoiceInput}
                    onChange={(e: any) => setEnableVoiceInput(e.target.checked)}
                  />
                  <Text type="body-midsize-regular" tagname="span" className="checkbox-label">
                    Enable voice input
                  </Text>
                </div>

                {/* Menu Items List */}
                <div className="menu-items-list">
                  {menuItems.slice(0, showAllItems ? menuItems.length : 2).map((item) => (
                    <div key={item.id} className="menu-item-card">
                      <div className={`menu-item-header ${item.action !== 'Not used' ? 'expanded' : ''}`}>
                        <div className="menu-item-row">
                          <Text type="body-midsize-medium" tagname="span" className="press-label">
                            Press {getKeyLabel(item.key)} to
                          </Text>
                          <select
                            value={item.action}
                            onChange={(e) => handleActionChange(item.id, e.target.value)}
                            className="action-dropdown"
                          >
                            {actionOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {item.action !== 'Not used' && (
                            <>
                              {item.action !== 'Dial by name' && (
                                <>
                                  <Text type="body-midsize-medium" tagname="span" className="to-label">
                                    to
                                  </Text>
                                  <div className="phone-input-wrapper">
                                    <Input 
                                      placeholder="Phone number or extension"
                                      className="phone-input"
                                    />
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {item.action !== 'Not used' && (
                        <div className="menu-item-content">
                          <div className="divider-line"></div>
                          <div className="menu-item-fields">
                            <Input 
                              label="Label"
                              value={item.label}
                              onChange={(e: any) => {
                                setMenuItems(items => 
                                  items.map(i => 
                                    i.id === item.id ? { ...i, label: e.target.value } : i
                                  )
                                );
                              }}
                              className="label-input"
                            />
                            {enableVoiceInput && (
                              <div className="triggers-input-wrapper">
                                <div className="triggers-input-container">
                                  <Text type="body-midsize-medium" tagname="div" className="triggers-label">
                                    Triggers
                                  </Text>
                                  <div className="token-input-field-custom">
                                    {item.triggers.map((trigger, idx) => (
                                      <InputChip 
                                        key={idx}
                                        label={trigger}
                                        onRemove={() => {
                                          setMenuItems(items => 
                                            items.map(i => 
                                              i.id === item.id 
                                                ? { ...i, triggers: i.triggers.filter((_, i) => i !== idx) } 
                                                : i
                                            )
                                          );
                                        }}
                                      />
                                    ))}
                                    <input
                                      type="text"
                                      className="trigger-text-input-custom"
                                      placeholder="Enter trigger words..."
                                      value={newTriggerInputs[item.id] || ''}
                                      onChange={(e) => {
                                        setNewTriggerInputs(prev => ({
                                          ...prev,
                                          [item.id]: e.target.value
                                        }));
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && newTriggerInputs[item.id]?.trim()) {
                                          e.preventDefault();
                                          const newTrigger = newTriggerInputs[item.id].trim();
                                          setMenuItems(items => 
                                            items.map(i => 
                                              i.id === item.id 
                                                ? { ...i, triggers: [...i.triggers, newTrigger] } 
                                                : i
                                            )
                                          );
                                          setNewTriggerInputs(prev => ({
                                            ...prev,
                                            [item.id]: ''
                                          }));
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button 
                  variant="secondary" 
                  size={32} 
                  className="show-less-btn"
                  onClick={() => setShowAllItems(!showAllItems)}
                >
                  {showAllItems ? 'Show less' : 'Show more'}
                </Button>
              </div>
            </div>
          </div>

          {/* Greeting Section */}
          <div className="modal-section greeting-section">
            <Divider className="section-divider" />
            <div className="section-layout">
              <Text type="body-large-medium" tagname="div" className="section-label">
                Greeting
              </Text>
              <div className="section-content">
                <Text type="body-midsize-regular" tagname="p" className="section-description">
                  This is the message your customers hear when they reach this submenu. Greeting also has a short welcome message and tell the menu options.
                </Text>
                
                <div className="greeting-radio-group">
                  <div className="radio-option">
                    <input 
                      type="radio" 
                      id="default-greeting" 
                      name="greeting" 
                      value="default"
                      checked={greetingType === 'default'}
                      onChange={(e) => setGreetingType(e.target.value)}
                    />
                    <label htmlFor="default-greeting">
                      <Text type="body-midsize-medium" tagname="span">Default greeting</Text>
                    </label>
                  </div>
                  <div className="radio-option">
                    <input 
                      type="radio" 
                      id="custom-greeting" 
                      name="greeting" 
                      value="custom"
                      checked={greetingType === 'custom'}
                      onChange={(e) => setGreetingType(e.target.value)}
                    />
                    <label htmlFor="custom-greeting">
                      <Text type="body-midsize-medium" tagname="span">Custom greeting</Text>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="footer-actions">
            <div className="footer-right-actions">
              <Button variant="secondary" size={40} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" size={40}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmenuModal;

