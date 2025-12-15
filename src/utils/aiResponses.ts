// AI Response patterns for calling setup workflow

export interface ActionChip {
    id: string;
    label: string;
    action: string;
}

export interface AIResponse {
    content: string;
    chips?: ActionChip[];
    generatesCard?: 'call-queue' | 'auto-attendant' | 'holiday-schedule' | 'voicemail-policy' | 'location' | 'pstn' | 'phone-numbers';
    switchesPanel?: 'entity' | 'routing' | 'suggestions' | 'resources';
    suggestions?: string[];
}

export interface ResponsePattern {
    trigger: RegExp;
    response: AIResponse;
}

export const responsePatterns: ResponsePattern[] = [
    // Questions about locations
    {
        trigger: /what is a location|what are locations|explain location/i,
        response: {
            content: "A location represents a physical site where your calling services are deployed (like an office, branch, or building).\n\nEach location includes:\n• Physical address for emergency calling (E911)\n• Timezone for scheduling and call routing\n• Main number as the default outbound caller ID\n• PSTN connection defining how calls reach the phone network\n\nYou can have multiple locations, each with its own calling configuration.\n\n📚 Learn more: https://help.webex.com/article/nli32cb/",
            chips: [
                { id: 'add-location', label: 'Add Location', action: 'add-location' },
                { id: 'more-locations', label: 'Learn More', action: 'learn-locations' },
            ]
        }
    },
    {
        trigger: /multiple locations|how many locations|several locations|can i add multiple locations/i,
        response: {
            content: "Yes! You can add as many locations as you need - one for each physical site where your organization operates.\n\nWhy multiple locations matter:\n• Different emergency calling addresses\n• Separate business hours and schedules\n• Local phone numbers for each site\n• Regional call routing preferences\n\nBest practice: Create a location for each office, branch, or building where people will be making calls.\n\n📚 Location management guide: https://help.webex.com/article/nli32cb/",
            chips: [
                { id: 'add-first-location', label: 'Add First Location', action: 'add-location' },
            ],
            suggestions: ['How to name locations?', 'Can I move users between locations?']
        }
    },
    {
        trigger: /multiple addresses|batch add|bulk add|add many at once/i,
        response: {
            content: "Great question! The ability to add multiple items at once depends on what you're configuring:\n\nYou CAN bulk add:\n• Users - CSV import or directory sync\n• Phone numbers - Order multiple numbers in one request\n• Devices - Bulk provisioning with activation codes\n• Emergency addresses - Import from spreadsheet\n\nConfigure individually:\n• Locations - Each location needs unique settings\n• PSTN connections - Each trunk configured separately\n• Auto attendants - Each menu system is unique\n\nWould you like help with any of these?\n\n📚 Bulk provisioning: https://help.webex.com/article/n2x57bb/",
            chips: [
                { id: 'bulk-users', label: 'Bulk Import Users', action: 'bulk-import-users' },
                { id: 'order-numbers', label: 'Order Multiple Numbers', action: 'order-numbers' },
            ]
        }
    },
    
    // Questions about PSTN
    {
        trigger: /what is pstn|explain pstn|pstn meaning/i,
        response: {
            content: "PSTN stands for Public Switched Telephone Network - it's the traditional phone network that lets you make calls to regular phone numbers outside your organization.\n\nWhy you need it:\n• Call mobile phones and landlines\n• Receive calls from external numbers\n• Make emergency (911) calls\n\nConnection options:\n• Cloud Connected PSTN - Cisco provides the connection (easiest)\n• Local Gateway - Use your existing SIP trunks\n• Premises-Based - Connect through on-premises equipment\n\n📚 PSTN options explained: https://help.webex.com/article/n0t07n8/",
            chips: [
                { id: 'choose-pstn', label: 'Choose Connection Type', action: 'setup-pstn' },
                { id: 'compare-options', label: 'Compare Options', action: 'compare-pstn' },
            ],
            suggestions: ['Which PSTN type is best?', 'Do I need PSTN for internal calls?']
        }
    },
    {
        trigger: /which pstn|best pstn|pstn option|recommend pstn|which pstn type should i choose/i,
        response: {
            content: "The best PSTN option depends on your situation:\n\nCloud Connected PSTN (Recommended for most):\n• Easiest to set up - no hardware needed\n• Cisco manages call quality and routing\n• Automatic failover and redundancy\n• May have higher per-minute costs\n\nLocal Gateway:\n• Use existing SIP trunk contracts\n• More control over call routing\n• Requires configuration and maintenance\n• You manage equipment and troubleshooting\n\nPremises-Based PSTN:\n• Keep existing PBX investment\n• Gradual migration path\n• Most complex setup\n• Requires on-site equipment\n\nFor new deployments, Cloud Connected PSTN is usually the best choice.\n\n📚 Compare PSTN options: https://help.webex.com/article/n0t07n8/\n📚 Local Gateway setup: https://help.webex.com/article/n18glgz/",
            chips: [
                { id: 'cloud-pstn', label: 'Set Up Cloud PSTN', action: 'cloud-connected-pstn' },
                { id: 'local-gateway', label: 'Configure Local Gateway', action: 'local-gateway' },
            ]
        }
    },
    {
        trigger: /internal calls|calls between users|within organization|without pstn/i,
        response: {
            content: "Great question! You don't need PSTN for internal calls between Webex users.\n\nInternal calls work automatically:\n• User-to-user calls within your organization\n• Calls between Webex apps (desktop, mobile, web)\n• Video calls and screen sharing\n• All FREE - no per-minute charges!\n\nYou only need PSTN for:\n• Calling external phone numbers (mobile, landlines)\n• Receiving calls from outside your organization\n• Emergency services (911/E911)\n\nYou could start with just locations and users, then add PSTN later when you need external calling.",
            chips: [
                { id: 'skip-pstn', label: 'Skip PSTN for Now', action: 'skip-pstn' },
                { id: 'setup-pstn', label: 'Set Up PSTN Anyway', action: 'setup-pstn' },
            ]
        }
    },
    
    // Questions about phone numbers
    {
        trigger: /how many numbers|how many phone numbers|number of numbers/i,
        response: {
            content: "The number of phone numbers you need depends on your use case:\n\nTypical scenarios:\n• 1 number - Small business main line\n• 1 per user - Direct dial for everyone\n• 1 per location - Main number for each office\n• 1 per department - Sales, support, etc.\n• Extra for services - Auto attendants, call queues, fax\n\nPro tip: Start with fewer numbers than users. Not everyone needs a direct line - many users can share a main number and use extensions.\n\nExample for 100 users:\n• Main line: 1 number\n• Departments: 5-10 numbers\n• Direct lines: 20-30 for executives/sales\n• Total: ~30-40 numbers (not 100!)\n\n📚 Phone number management: https://help.webex.com/article/nmgvbb3/",
            suggestions: ['Can I port my existing numbers?', 'What about toll-free numbers?']
        }
    },
    {
        trigger: /port number|keep my number|transfer number|existing number/i,
        response: {
            content: "Yes! You can port (transfer) your existing phone numbers to Webex Calling.\n\nPorting process:\n1. Submit port request - Provide numbers and carrier info\n2. Carrier approval - 2-4 weeks typically\n3. Schedule port date - Choose when to switch\n4. Numbers go live - Usually happens overnight\n\nImportant notes:\n• Don't cancel your old service until port completes\n• Keep your numbers active during the process\n• Port usually takes 2-4 weeks for wireless, 1-2 weeks for landlines\n• You can port toll-free numbers too!\n\nAlternative: Order new numbers now, port later.\n\n📚 Number porting guide: https://help.webex.com/article/n96yw5d/\n📚 Port request checklist: https://help.webex.com/article/n3pbbge/",
            chips: [
                { id: 'start-port', label: 'Start Port Request', action: 'port-numbers' },
                { id: 'order-new', label: 'Order New Numbers', action: 'order-numbers' },
            ]
        }
    },
    {
        trigger: /toll free|800 number|888 number/i,
        response: {
            content: "Yes, Webex Calling supports toll-free numbers (800, 888, 877, 866, 855, 844, 833).\n\nYou can:\n• Order new toll-free numbers\n• Port existing toll-free numbers\n• Assign to auto attendants or users\n• Track usage and costs\n\nCommon uses:\n• Customer support lines\n• Sales hotlines\n• National main numbers\n\nCost: Toll-free numbers have per-minute charges (varies by plan). Regular numbers are usually included in your license.\n\n📚 Toll-free number guide: https://help.webex.com/article/nmgvbb3/",
            chips: [
                { id: 'order-tollfree', label: 'Order Toll-Free', action: 'order-tollfree' },
            ]
        }
    },
    
    // Questions about emergency calling
    {
        trigger: /what is e911|explain e911|emergency calling|911|how does emergency calling work/i,
        response: {
            content: "E911 (Enhanced 911) ensures emergency responders know exactly where you are when you call 911.\n\nWhy it's critical:\n• 911 operators see your physical address\n• First responders come to the right location\n• Required by law for VoIP services in the US\n\nHow it works:\n• Each location has emergency addresses\n• Users/devices are assigned to addresses\n• When someone dials 911, their address is sent automatically\n\nImportant: You must configure this before users make calls!\n\nDynamic E911: For remote workers or traveling employees, addresses can update based on their network location.\n\n📚 Emergency calling setup: https://help.webex.com/article/njqxwcb/\n📚 E911 requirements: https://help.webex.com/article/n676cq8/",
            chips: [
                { id: 'add-addresses', label: 'Add Emergency Addresses', action: 'add-emergency-addresses' },
                { id: 'test-e911', label: 'Learn About Testing', action: 'test-e911' },
            ],
            suggestions: ['What about remote workers?', 'How to test E911?']
        }
    },
    {
        trigger: /remote work|home office|work from home|traveling|how to handle remote workers/i,
        response: {
            content: "Great question! Remote and traveling users need special E911 consideration.\n\nOptions for remote workers:\n\n1. Static E911 (Simplest)\n• User sets their home address\n• Must update manually if they move\n• Good for: Permanent remote workers\n\n2. Dynamic E911 (Advanced)\n• Address updates automatically based on network\n• Works with RedSky or similar providers\n• Good for: Mobile workers, multiple offices\n\n3. Nomadic E911\n• Users must confirm/update address before calling 911\n• Pop-up prompts for address verification\n• Good for: Frequent travelers\n\nImportant: Users must keep addresses current. It's a life safety issue!\n\n📚 Remote worker E911: https://help.webex.com/article/nz0iocw/\n📚 Dynamic E911 providers: https://help.webex.com/article/nhwpbg7/",
            chips: [
                { id: 'setup-static', label: 'Set Up Static E911', action: 'static-e911' },
                { id: 'learn-dynamic', label: 'Learn About Dynamic E911', action: 'dynamic-e911' },
            ]
        }
    },
    
    // Questions about users and licenses
    {
        trigger: /how many licenses|what license|which license|license type|what license types are available/i,
        response: {
            content: "Webex Calling has several license types:\n\nProfessional (Most common):\n• Full calling features\n• Voicemail, call forwarding, etc.\n• Mobile/desktop apps included\n• Direct phone number assignment\n\nWorkspace:\n• For shared devices (conference rooms)\n• Desk phones and room systems\n• No personal features (voicemail, etc.)\n\nCommon Area:\n• Lobbies, hallways, break rooms\n• Basic calling only\n• Shared by multiple people\n\nYou need one license per person or device that will make/receive calls. Users with both a desk phone and Webex app only need one license!\n\n📚 License comparison: https://help.webex.com/article/nmuj09u/\n📚 User setup guide: https://help.webex.com/article/narp57ab/",
            suggestions: ['Can users share licenses?', 'What about conference rooms?']
        }
    },
    {
        trigger: /conference room|meeting room|room system|how to set up conference rooms/i,
        response: {
            content: "Conference rooms and meeting spaces use Workspace licenses (not user licenses).\n\nSetting up a conference room:\n1. Create a Workspace (not a user)\n2. Assign a Workspace license\n3. Add a phone number (optional)\n4. Register the room device\n5. Configure calling features\n\nDevices that work:\n• Cisco Room Devices (Room Kit, Board, etc.)\n• Webex Desk devices\n• SIP desk phones\n• Webex Share devices\n\nKey differences from users:\n• No voicemail by default\n• No personal settings\n• Optimized for shared use\n• Calendar integration for room booking\n\n📚 Workspace setup: https://help.webex.com/article/narp57ab/\n📚 Device registration: https://help.webex.com/article/n2e3tm9/",
            chips: [
                { id: 'add-workspace', label: 'Add Conference Room', action: 'add-workspace' },
            ]
        }
    },
    
    // Questions about auto attendants
    {
        trigger: /what is auto attendant|explain auto attendant|what is aa|what is ivr/i,
        response: {
            content: "An Auto Attendant (AA) is like a virtual receptionist that answers calls and routes them based on caller input.\n\nHow it works:\n1. Caller dials your main number\n2. Hears a greeting: \"Press 1 for Sales, 2 for Support...\"\n3. Presses a key\n4. Gets routed to the right department\n\nCommon uses:\n• Main company phone line\n• Department directories\n• After-hours handling\n• Holiday routing\n\nFeatures:\n• Custom greetings (recorded or text-to-speech)\n• Menu options (press 1, 2, 3...)\n• Extension dialing (\"dial by name\")\n• Business hours routing\n• Voicemail overflow\n\nPro tip: Keep menus simple - 3-4 options max!\n\n📚 Auto Attendant setup: https://help.webex.com/article/n1bplybb/\n📚 Best practices guide: https://help.webex.com/article/njjgts/",
            chips: [
                { id: 'create-aa', label: 'Create Auto Attendant', action: 'create-auto-attendant' },
            ],
            suggestions: ['How to record greetings?', 'Can I have multiple menus?']
        }
    },
    {
        trigger: /call queue|what is queue|explain queue/i,
        response: {
            content: "A Call Queue distributes incoming calls to a group of agents (like support or sales teams).\n\nHow it works:\n1. Callers dial the queue number\n2. Hear music or announcements while waiting\n3. Call goes to next available agent\n4. If all busy, callers wait in queue\n\nRouting strategies:\n• Round-robin - Fair distribution to all agents\n• Longest idle - Agents who've been free longest\n• Simultaneous - Rings all agents at once\n• Sequential - Tries agents in specific order\n\nFeatures:\n• Queue announcements (\"You're caller number 3...\")\n• Estimated wait time\n• Overflow to voicemail after X minutes\n• Agent join/leave controls\n• Real-time queue statistics\n\nCommon for: Support lines, sales teams, help desks\n\n📚 Call Queue setup: https://help.webex.com/article/n1bplybb/\n📚 Queue analytics: https://help.webex.com/article/njro6t/",
            chips: [
                { id: 'create-queue', label: 'Create Call Queue', action: 'create-call-queue' },
            ],
            suggestions: ['Which routing is best?', 'How long should queue be?']
        }
    },
    
    // General guidance
    {
        trigger: /where do i start|getting started|first step|begin setup/i,
        response: {
            content: "Let's get you started with Webex Calling! Here's the recommended order:\n\nStep 1: Foundation (Required)\n1. Add your first location\n2. Set up PSTN connection\n3. Order or port phone numbers\n\nStep 2: Location Configuration\n4. Assign main number to location\n5. Configure emergency calling (E911)\n6. Set business hours\n\nStep 3: Users & Devices\n7. Add users with licenses\n8. Assign phone numbers\n9. Register devices\n\nStep 4: Advanced Features\n10. Create auto attendant (optional)\n11. Set up call queues (optional)\n\nStart with: Add your first location. Everything else builds from there!\n\n📚 Getting started guide: https://help.webex.com/article/narp57ab/\n📚 Setup checklist: https://help.webex.com/article/n7ek59/",
            chips: [
                { id: 'add-location', label: 'Add First Location', action: 'add-location' },
                { id: 'view-checklist', label: 'View Full Checklist', action: 'view-checklist' },
            ]
        }
    },
    {
        trigger: /help|what can you do/i,
        response: {
            content: "I'm here to help you set up Webex Calling!\n\nI can help you:\n• Answer questions about the setup process\n• Explain calling concepts (PSTN, E911, etc.)\n• Guide you through configuration steps\n• Provide best practices and recommendations\n• Create configurations for locations, queues, etc.\n\nTry asking:\n• \"What is a location?\"\n• \"How many phone numbers do I need?\"\n• \"Can I port my existing numbers?\"\n• \"What's the difference between auto attendant and call queue?\"\n• \"How do I set up emergency calling?\"\n• \"Where do I start?\"\n\nOr tell me what you want to do:\n• \"Add a location\"\n• \"Set up PSTN\"\n• \"Create an auto attendant\"\n\n📚 Webex Calling documentation: https://help.webex.com/landing/calling/\n📚 Admin training: https://help.webex.com/article/nmlwsqk/",
            switchesPanel: 'suggestions'
        }
    },
    
    // Action-oriented commands (for actual configuration)
    {
        trigger: /^(add|create|setup|configure) location/i,
        response: {
            content: "Let me help you add a location. I'll create a configuration template for you.",
            generatesCard: 'location',
            chips: [
                { id: 'add-address', label: 'Set Address', action: 'add-address' },
                { id: 'set-timezone', label: 'Set Timezone', action: 'set-timezone' },
            ],
            suggestions: ['What is a location?', 'Can I add multiple locations?']
        }
    },
    {
        trigger: /^(add|create|setup|configure) pstn/i,
        response: {
            content: "I'll help you set up your PSTN connection. Choose your connection type:",
            chips: [
                { id: 'cloud-connected', label: 'Cloud Connected PSTN', action: 'cloud-connected-pstn' },
                { id: 'local-gateway', label: 'Local Gateway', action: 'local-gateway' },
            ],
            suggestions: ['What is PSTN?', 'Which PSTN type should I choose?']
        }
    },
    {
        trigger: /^(add|order|create) phone number/i,
        response: {
            content: "Let's add phone numbers to your organization.",
            generatesCard: 'phone-numbers',
            chips: [
                { id: 'order-new', label: 'Order New Numbers', action: 'order-numbers' },
                { id: 'port-existing', label: 'Port Existing Numbers', action: 'port-numbers' },
            ],
            suggestions: ['How many numbers do I need?', 'Can I port my numbers?']
        }
    },
    {
        trigger: /^(add|create|setup) (auto attendant|aa)/i,
        response: {
            content: "I'll create an Auto Attendant for you. This will greet callers and route them based on menu options.",
            generatesCard: 'auto-attendant',
            chips: [
                { id: 'add-menu', label: 'Add Menu Options', action: 'add-menu' },
                { id: 'record-greeting', label: 'Record Greeting', action: 'record-greeting' },
            ],
            suggestions: ['What is an auto attendant?', 'How to record greetings?']
        }
    },
    {
        trigger: /^(add|create|setup) (call queue|queue)/i,
        response: {
            content: "Let's create a call queue. What routing strategy would you like?",
            generatesCard: 'call-queue',
            chips: [
                { id: 'rr', label: 'Round-robin', action: 'set-routing-round-robin' },
                { id: 'li', label: 'Longest idle', action: 'set-routing-longest-idle' },
            ],
            suggestions: ['What is a call queue?', 'Which routing strategy is best?']
        }
    },
];

export const getAIResponse = (userMessage: string): AIResponse => {
    const pattern = responsePatterns.find(p => p.trigger.test(userMessage));
    
    if (pattern) {
        return pattern.response;
    }
    
    // Default response with helpful suggestions
    return {
        content: "I can help you with that! Could you tell me more about what you'd like to know?\n\nCommon topics:\n• Locations and PSTN setup\n• Phone numbers and emergency calling\n• Users, licenses, and devices\n• Auto attendants and call queues\n• Best practices and recommendations\n\nTry asking:\n• \"What is [concept]?\" for explanations\n• \"How do I [task]?\" for instructions\n• \"Can I [action]?\" for capabilities\n• Or just tell me what you want to configure!\n\n📚 Browse all documentation: https://help.webex.com/landing/calling/",
        chips: [
            { id: 'help', label: 'What can you help with?', action: 'show-help' },
            { id: 'start', label: 'Where do I start?', action: 'getting-started' },
        ],
        switchesPanel: 'suggestions'
    };
};

export const welcomeMessage: AIResponse = {
    content: "Welcome to Webex Calling Setup!\n\nI'm here to help you configure your calling services. You can ask me questions about the setup process, or tell me what you'd like to configure.\n\nTry asking:\n• \"Where do I start?\"\n• \"What is a location?\"\n• \"How many phone numbers do I need?\"\n• \"What's the difference between auto attendant and call queue?\"\n\nOr tell me:\n• \"Add a location\"\n• \"Set up PSTN\"\n• \"Create a call queue\"\n\n📚 Need help? Check out the full documentation: https://help.webex.com/landing/calling/",
    chips: [
        { id: 'start', label: 'Where do I start?', action: 'getting-started' },
        { id: 'add-location', label: 'Add Location', action: 'add-location' },
        { id: 'help', label: 'What can you help with?', action: 'show-help' },
    ]
};
