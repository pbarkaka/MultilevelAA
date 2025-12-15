import React, { useRef, useEffect } from 'react';
import { Text, Button } from '@momentum-design/components/react';
import type { ActionChip } from '../../utils/aiResponses';
import EditorCard, { type EditorCardData } from './EditorCard';
import './ConversationalPanel.css';

export interface Message {
    id: string;
    type: 'user' | 'ai' | 'editor-card';
    content: string;
    timestamp: Date;
    chips?: ActionChip[];
    editorData?: EditorCardData;
}

interface ConversationalPanelProps {
    messages: Message[];
    onChipClick: (chipId: string) => void;
    onEditorSave: (cardId: string, data: any) => void;
}

const ConversationalPanel: React.FC<ConversationalPanelProps> = ({
    messages,
    onChipClick,
    onEditorSave
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    // Function to convert markdown links to HTML links
    const formatMessageContent = (content: string) => {
        // Match markdown links: [text](url)
        const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        
        const parts: Array<{ type: 'text' | 'link'; content: string; url?: string }> = [];
        let lastIndex = 0;
        
        // First, process markdown-style links [text](url)
        let match;
        const markdownMatches: Array<{ start: number; end: number; text: string; url: string }> = [];
        
        while ((match = markdownLinkRegex.exec(content)) !== null) {
            markdownMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                text: match[1],
                url: match[2]
            });
        }
        
        // Process the content, splitting it into text and link parts
        for (let i = 0; i < markdownMatches.length; i++) {
            const mdMatch = markdownMatches[i];
            
            // Add text before the link
            if (mdMatch.start > lastIndex) {
                const textBefore = content.substring(lastIndex, mdMatch.start);
                if (textBefore) {
                    parts.push({ type: 'text', content: textBefore });
                }
            }
            
            // Add the link
            parts.push({ type: 'link', content: mdMatch.text, url: mdMatch.url });
            lastIndex = mdMatch.end;
        }
        
        // Add remaining text
        if (lastIndex < content.length) {
            parts.push({ type: 'text', content: content.substring(lastIndex) });
        }
        
        // If no markdown links were found, treat the whole content as text
        if (parts.length === 0) {
            parts.push({ type: 'text', content: content });
        }
        
        return parts;
    };

    return (
        <div className="conversational-panel">
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message.id} className={`message-wrapper ${message.type}`}>
                        <div className="message-content-wrapper">
                            {message.type === 'editor-card' && message.editorData ? (
                                <EditorCard
                                    data={message.editorData}
                                    onSave={(data) => onEditorSave(message.id, data)}
                                />
                            ) : (
                                <div className="message-card">
                                    <div className="message-text">
                                        {formatMessageContent(message.content).map((part, index) => {
                                            if (part.type === 'link') {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={part.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="message-link"
                                                    >
                                                        {part.content}
                                                    </a>
                                                );
                                            } else {
                                                return (
                                                    <span key={index}>{part.content}</span>
                                                );
                                            }
                                        })}
                                    </div>
                                    
                                    {message.chips && message.chips.length > 0 && (
                                        <div className="message-chips">
                                            {message.chips.map(chip => (
                                                <Button
                                                    key={chip.id}
                                                    variant="secondary"
                                                    className="message-chip"
                                                    onClick={() => onChipClick(chip.id)}
                                                >
                                                    {chip.label}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <Text type="body-small-medium" className="message-time">
                                        {formatTime(message.timestamp)}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ConversationalPanel;

