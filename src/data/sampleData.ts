// Mock data for AICS demo

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    licensed: boolean;
}

export interface PhoneNumber {
    id: string;
    number: string;
    type: 'toll-free' | 'local' | 'mobile';
    assigned: boolean;
}

export interface Group {
    id: string;
    name: string;
    memberCount: number;
    type: string;
}

export interface Location {
    id: string;
    name: string;
    address: string;
    timezone: string;
}

export interface CallQueue {
    id: string;
    name: string;
    agents: string[];
    routingType: 'round-robin' | 'longest-idle' | 'simultaneous';
    businessHours: string;
    overflow: string;
}

export interface RoutingNode {
    id: string;
    type: 'queue' | 'auto-attendant' | 'agent' | 'voicemail';
    label: string;
    x: number;
    y: number;
}

export interface RoutingEdge {
    id: string;
    from: string;
    to: string;
    label?: string;
}

export const sampleUsers: User[] = [
    { id: 'u1', name: 'John Smith', email: 'john.smith@company.com', phone: '+1-555-0101', location: 'New York', licensed: true },
    { id: 'u2', name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '+1-555-0102', location: 'San Francisco', licensed: true },
    { id: 'u3', name: 'Michael Chen', email: 'mchen@company.com', phone: '+1-555-0103', location: 'India', licensed: true },
    { id: 'u4', name: 'Emily Davis', email: 'edavis@company.com', phone: '+1-555-0104', location: 'London', licensed: true },
    { id: 'u5', name: 'David Wilson', email: 'dwilson@company.com', phone: '+1-555-0105', location: 'New York', licensed: true },
    { id: 'u6', name: 'Lisa Anderson', email: 'landerson@company.com', phone: '+1-555-0106', location: 'India', licensed: true },
    { id: 'u7', name: 'Robert Martinez', email: 'rmartinez@company.com', phone: '+1-555-0107', location: 'San Francisco', licensed: false },
    { id: 'u8', name: 'Jennifer Taylor', email: 'jtaylor@company.com', phone: '+1-555-0108', location: 'London', licensed: true },
    { id: 'u9', name: 'James Brown', email: 'jbrown@company.com', phone: '+1-555-0109', location: 'India', licensed: true },
    { id: 'u10', name: 'Maria Garcia', email: 'mgarcia@company.com', phone: '+1-555-0110', location: 'New York', licensed: true },
];

export const samplePhoneNumbers: PhoneNumber[] = [
    { id: 'p1', number: '+1-800-555-0001', type: 'toll-free', assigned: false },
    { id: 'p2', number: '+1-800-555-0002', type: 'toll-free', assigned: true },
    { id: 'p3', number: '+1-415-555-1234', type: 'local', assigned: false },
    { id: 'p4', number: '+1-212-555-5678', type: 'local', assigned: false },
    { id: 'p5', number: '+1-650-555-9999', type: 'mobile', assigned: true },
];

export const sampleGroups: Group[] = [
    { id: 'g1', name: 'Sales Team', memberCount: 15, type: 'Department' },
    { id: 'g2', name: 'Support Team', memberCount: 8, type: 'Department' },
    { id: 'g3', name: 'Engineering', memberCount: 25, type: 'Department' },
];

export const sampleLocations: Location[] = [
    { id: 'l1', name: 'San Francisco HQ', address: '123 Market St, San Francisco, CA', timezone: 'PST' },
    { id: 'l2', name: 'New York Office', address: '456 Broadway, New York, NY', timezone: 'EST' },
];

export const sampleCallQueues: CallQueue[] = [
    {
        id: 'cq1',
        name: 'Sales Queue',
        agents: ['u1', 'u2', 'u5'],
        routingType: 'round-robin',
        businessHours: '9:00 AM - 6:00 PM',
        overflow: 'Voicemail'
    },
];

export const sampleRoutingNodes: RoutingNode[] = [
    { id: 'n1', type: 'queue', label: 'Sales Queue', x: 150, y: 100 },
    { id: 'n2', type: 'agent', label: 'John Smith', x: 350, y: 50 },
    { id: 'n3', type: 'agent', label: 'Sarah Johnson', x: 350, y: 150 },
    { id: 'n4', type: 'voicemail', label: 'Voicemail', x: 550, y: 100 },
];

export const sampleRoutingEdges: RoutingEdge[] = [
    { id: 'e1', from: 'n1', to: 'n2', label: 'Business Hours' },
    { id: 'e1', from: 'n1', to: 'n3', label: 'Business Hours' },
    { id: 'e3', from: 'n1', to: 'n4', label: 'Overflow' },
];

export interface Suggestion {
    id: string;
    icon: string;
    text: string;
    category: string;
}

export const sampleSuggestions: Suggestion[] = [
    { id: 's1', icon: 'info-circle-regular', text: 'What is a location?', category: 'Learn' },
    { id: 's2', icon: 'info-circle-regular', text: 'What is PSTN?', category: 'Learn' },
    { id: 's3', icon: 'phone-regular', text: 'How many phone numbers do I need?', category: 'Planning' },
    { id: 's4', icon: 'phone-regular', text: 'Can I port my existing numbers?', category: 'Numbers' },
    { id: 's5', icon: 'location-regular', text: 'Can I add multiple locations?', category: 'Locations' },
    { id: 's6', icon: 'alert-regular', text: 'How does emergency calling work?', category: 'E911' },
    { id: 's7', icon: 'user-regular', text: 'What license types are available?', category: 'Licensing' },
    { id: 's8', icon: 'chat-regular', text: 'What is an auto attendant?', category: 'Features' },
    { id: 's9', icon: 'headset-regular', text: 'What is a call queue?', category: 'Features' },
    { id: 's10', icon: 'info-circle-regular', text: 'Which PSTN type should I choose?', category: 'Planning' },
    { id: 's11', icon: 'home-regular', text: 'How to handle remote workers?', category: 'E911' },
    { id: 's12', icon: 'video-regular', text: 'How to set up conference rooms?', category: 'Workspaces' },
];
