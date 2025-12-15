// Calling setup process based on Webex Control Hub workflow

export interface SetupStep {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    tasks: SetupTask[];
    isRequired: boolean;
}

export interface SetupTask {
    id: string;
    label: string;
    completed: boolean;
    description?: string;
}

export const callingSetupSteps: SetupStep[] = [
    {
        id: 'step1',
        stepNumber: 1,
        title: 'Define service foundation',
        description: 'This step is required and recommended to set up before adding users.',
        isRequired: true,
        tasks: [
            {
                id: 'add-locations',
                label: 'Add location(s)',
                completed: false,
                description: 'Define physical locations where your calling services will be deployed'
            },
            {
                id: 'setup-pstn',
                label: 'Set up PSTN connection',
                completed: false,
                description: 'Configure your Public Switched Telephone Network connection for external calling'
            },
            {
                id: 'add-phone-numbers',
                label: 'Add phone numbers and define your internal dialing',
                completed: false,
                description: 'Import or order phone numbers and set up dial plans'
            }
        ]
    },
    {
        id: 'step2',
        stepNumber: 2,
        title: 'Configure locations',
        description: 'Set up location-specific calling settings and emergency services.',
        isRequired: false,
        tasks: [
            {
                id: 'assign-main-number',
                label: 'Assign a main number to your location',
                completed: false,
                description: 'Set the primary outbound caller ID for each location'
            },
            {
                id: 'emergency-services',
                label: 'Configure your emergency services calling',
                completed: false,
                description: 'Set up E911 or emergency calling addresses for each location'
            },
            {
                id: 'setup-schedules',
                label: 'Set up the schedules',
                completed: false,
                description: 'Define business hours and holiday schedules'
            },
            {
                id: 'setup-voice-portals',
                label: 'Set up the voice portals',
                completed: false,
                description: 'Configure voicemail and other voice portal settings'
            }
        ]
    },
    {
        id: 'step3',
        stepNumber: 3,
        title: 'Configure users, workspaces, and devices for calling',
        description: 'Add and configure users, workspaces, and devices with calling capabilities.',
        isRequired: false,
        tasks: [
            {
                id: 'add-users',
                label: 'Add users and assign calling licenses',
                completed: false,
                description: 'Provision users with Webex Calling licenses'
            },
            {
                id: 'configure-user-settings',
                label: 'Configure user settings',
                completed: false,
                description: 'Set up user-specific calling features and phone numbers'
            },
            {
                id: 'add-workspaces',
                label: 'Add workspaces and assign calling licenses',
                completed: false,
                description: 'Configure shared spaces like conference rooms'
            },
            {
                id: 'configure-workspace-settings',
                label: 'Configure workspace settings',
                completed: false,
                description: 'Set up calling features for shared workspaces'
            },
            {
                id: 'add-devices',
                label: 'Add personal, shared usage, and hot desk only devices',
                completed: false,
                description: 'Register and configure desk phones and other devices'
            }
        ]
    },
    {
        id: 'step4',
        stepNumber: 4,
        title: 'Configure common calling features',
        description: 'Set up advanced calling features like auto attendants and call queues.',
        isRequired: false,
        tasks: [
            {
                id: 'configure-auto-attendant',
                label: 'Configure an auto attendant',
                completed: false,
                description: 'Create IVR menus to route incoming calls'
            },
            {
                id: 'configure-call-queue',
                label: 'Configure a call queue',
                completed: false,
                description: 'Set up call distribution to groups of agents'
            }
        ]
    }
];

export const getStepByNumber = (stepNumber: number): SetupStep | undefined => {
    return callingSetupSteps.find(step => step.stepNumber === stepNumber);
};

export const getTaskById = (taskId: string): SetupTask | undefined => {
    for (const step of callingSetupSteps) {
        const task = step.tasks.find(t => t.id === taskId);
        if (task) return task;
    }
    return undefined;
};

export const getTotalTasksCompleted = (): number => {
    return callingSetupSteps.reduce((total, step) => {
        return total + step.tasks.filter(task => task.completed).length;
    }, 0);
};

export const getTotalTasks = (): number => {
    return callingSetupSteps.reduce((total, step) => {
        return total + step.tasks.length;
    }, 0);
};

