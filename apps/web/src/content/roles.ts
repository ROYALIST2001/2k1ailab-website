import type { Role } from '@company/domain';

/**
 * Open roles shown on /careers.
 *
 * One entry per vacancy. The `slug` is also the value submitted with an
 * application, so keep it stable once a role is published. To close a
 * vacancy, delete its entry — the page falls back to an open-application
 * state when this array is empty.
 */
export const roles: readonly Role[] = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    discipline: 'Web & Mobile',
    location: 'Remote or on-site',
    employmentType: 'Full-time',
    summary:
      'Build the websites, apps and business systems our clients use every day, and keep them working well as the business grows.',
    responsibilities: [
      'Build new features from the database to the screen',
      'Connect our software to the systems clients already use',
      'Write clean code, test it, and fix problems quickly',
    ],
    requirements: [
      'Good experience with modern web tools, for example TypeScript and React',
      'Able to take a task from idea to finished, working software',
      'Comfortable talking with clients and explaining things simply',
    ],
  },
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    discipline: 'AI & Automation',
    location: 'Remote or on-site',
    employmentType: 'Full-time',
    summary:
      "Build AI tools that answer questions from a client's own data, take over repetitive work, and stay accurate and affordable.",
    responsibilities: [
      'Build chatbots and assistants that work from client documents and data',
      'Set up workflow automation with clear rules and approval steps',
      'Test results carefully and keep improving accuracy and cost',
    ],
    requirements: [
      'Hands-on experience building with AI models and Python',
      'Careful about checking what the AI produces before it reaches a client',
      'Able to explain what AI can and cannot do to non-technical people',
    ],
  },
  {
    slug: 'iot-engineer',
    title: 'IoT Engineer',
    discipline: 'IoT & Cloud',
    location: 'Remote or on-site',
    employmentType: 'Full-time',
    summary:
      'Connect real equipment such as sensors, devices and machines to the cloud, and turn their data into useful dashboards and alerts.',
    responsibilities: [
      'Write firmware and connect devices to the internet',
      'Build the cloud side: data collection, dashboards and alerts',
      'Find and fix problems across hardware, network and cloud',
    ],
    requirements: [
      'Experience with embedded C or C++ and at least one scripting language',
      'Familiar with device protocols such as MQTT or Bluetooth',
      'Happy to work hands-on with real hardware',
    ],
  },
] as const;
