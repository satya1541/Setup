export interface SetupGuide {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technologies: string[];
  featured: boolean;
  icon: string;
  category: string;
}

export interface SetupCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  guides: SetupGuide[];
}

export const setupCategories: SetupCategory[] = [
  {
    id: 'web-servers',
    title: 'Web Servers',
    description: 'Complete web server stack installations and configurations',
    icon: 'Server',
    guides: [
      {
        id: 'lemp-stack',
        title: 'LEMP Stack Setup',
        description: 'Linux, Nginx, MySQL, PHP stack with phpMyAdmin on Ubuntu 24.04',
        difficulty: 'Intermediate',
        duration: '30 minutes',
        technologies: ['Linux', 'Nginx', 'MySQL', 'PHP', 'phpMyAdmin'],
        featured: true,
        icon: 'Database',
        category: 'web-servers'
      },
      {
        id: 'lamp-stack',
        title: 'LAMP Stack Setup',
        description: 'Linux, Apache, MySQL, PHP stack installation and configuration',
        difficulty: 'Intermediate',
        duration: '25 minutes',
        technologies: ['Linux', 'Apache', 'MySQL', 'PHP'],
        featured: true,
        icon: 'Globe',
        category: 'web-servers'
      },
      {
        id: 'mean-stack',
        title: 'MEAN Stack Setup',
        description: 'MongoDB, Express.js, Angular, Node.js full-stack development environment',
        difficulty: 'Advanced',
        duration: '45 minutes',
        technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
        featured: false,
        icon: 'Code',
        category: 'web-servers'
      }
    ]
  },
  {
    id: 'databases',
    title: 'Database Systems',
    description: 'Database installation, configuration, and optimization guides',
    icon: 'Database',
    guides: [
      {
        id: 'mysql-setup',
        title: 'MySQL Server Setup',
        description: 'Complete MySQL server installation with security hardening',
        difficulty: 'Beginner',
        duration: '15 minutes',
        technologies: ['MySQL', 'SQL'],
        featured: false,
        icon: 'Database',
        category: 'databases'
      },
      {
        id: 'postgresql-setup',
        title: 'PostgreSQL Setup',
        description: 'PostgreSQL database server with pgAdmin configuration',
        difficulty: 'Intermediate',
        duration: '20 minutes',
        technologies: ['PostgreSQL', 'pgAdmin'],
        featured: false,
        icon: 'Database',
        category: 'databases'
      },
      {
        id: 'mongodb-setup',
        title: 'MongoDB Setup',
        description: 'MongoDB NoSQL database with MongoDB Compass setup',
        difficulty: 'Intermediate',
        duration: '25 minutes',
        technologies: ['MongoDB', 'NoSQL'],
        featured: false,
        icon: 'Database',
        category: 'databases'
      }
    ]
  },
  {
    id: 'containers',
    title: 'Containerization',
    description: 'Docker, Kubernetes, and container orchestration setups',
    icon: 'Box',
    guides: [
      {
        id: 'docker-setup',
        title: 'Docker Installation',
        description: 'Docker Engine and Docker Compose setup on Ubuntu',
        difficulty: 'Beginner',
        duration: '15 minutes',
        technologies: ['Docker', 'Docker Compose'],
        featured: true,
        icon: 'Box',
        category: 'containers'
      },
      {
        id: 'kubernetes-setup',
        title: 'Kubernetes Cluster',
        description: 'Local Kubernetes cluster with minikube setup',
        difficulty: 'Advanced',
        duration: '40 minutes',
        technologies: ['Kubernetes', 'minikube', 'kubectl'],
        featured: false,
        icon: 'Network',
        category: 'containers'
      }
    ]
  },
  {
    id: 'development',
    title: 'Development Tools',
    description: 'Programming languages, IDEs, and development environment setups',
    icon: 'Code',
    guides: [
      {
        id: 'nodejs-setup',
        title: 'Node.js Development',
        description: 'Node.js with npm/yarn and development tools setup',
        difficulty: 'Beginner',
        duration: '10 minutes',
        technologies: ['Node.js', 'npm', 'yarn'],
        featured: false,
        icon: 'Code',
        category: 'development'
      },
      {
        id: 'python-setup',
        title: 'Python Development',
        description: 'Python with pip, virtual environments, and common packages',
        difficulty: 'Beginner',
        duration: '15 minutes',
        technologies: ['Python', 'pip', 'virtualenv'],
        featured: false,
        icon: 'Code',
        category: 'development'
      },
      {
        id: 'git-setup',
        title: 'Git & GitHub Setup',
        description: 'Git installation with SSH keys and GitHub configuration',
        difficulty: 'Beginner',
        duration: '12 minutes',
        technologies: ['Git', 'GitHub', 'SSH'],
        featured: false,
        icon: 'GitBranch',
        category: 'development'
      }
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging & IoT',
    description: 'MQTT brokers, message queues, and IoT communication protocols',
    icon: 'Radio',
    guides: [
      {
        id: 'mqtt-setup',
        title: 'MQTT WSS/MQTTS Setup',
        description: 'Secure MQTT broker with SSL/TLS, Nginx proxy, and WebSocket support',
        difficulty: 'Advanced',
        duration: '45 minutes',
        technologies: ['MQTT', 'Mosquitto', 'SSL/TLS', 'Nginx', 'WebSocket'],
        featured: true,
        icon: 'Radio',
        category: 'messaging'
      }
    ]
  }
];

export const featuredGuides = setupCategories
  .flatMap(category => category.guides)
  .filter(guide => guide.featured);