export interface Step {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  additionalCode?: {
    title: string;
    code: string;
    language: string;
  };
  tips?: string[];
}

export const mqttSteps: Step[] = [
  {
    id: 'mqtt-step-1',
    title: 'Update System and Install Prerequisites',
    description: 'Update the system packages and install essential networking tools.',
    code: `sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install net-tools -y`,
    language: 'bash',
    tips: [
      'Always update system packages before installing new software',
      'Net-tools provides ifconfig and other network utilities'
    ]
  },
  {
    id: 'mqtt-step-2',
    title: 'Install and Configure Nginx',
    description: 'Install Nginx web server for reverse proxy functionality.',
    code: `sudo apt-get install nginx -y
sudo systemctl enable nginx && sudo systemctl start nginx
sudo systemctl status nginx`,
    language: 'bash',
    tips: [
      'Nginx will act as a reverse proxy for MQTT connections',
      'Enable service to start automatically on boot'
    ]
  },
  {
    id: 'mqtt-step-3',
    title: 'Install and Configure MariaDB',
    description: 'Install MariaDB for potential data storage and logging needs.',
    code: `sudo apt-get install mariadb-server -y
sudo systemctl start mariadb && sudo systemctl enable mariadb
sudo systemctl status mariadb`,
    language: 'bash',
    tips: [
      'MariaDB can be used for MQTT message logging',
      'Secure installation will be done in a later step'
    ]
  },
  {
    id: 'mqtt-step-4',
    title: 'Install PHP and Extensions',
    description: 'Install PHP and necessary extensions for web management interfaces.',
    code: `sudo apt-get install php php-cli php-mysql php-mbstring php-zip php-gd php-json php-curl php-fpm -y`,
    language: 'bash',
    tips: [
      'PHP enables web-based management interfaces',
      'Extensions provide database connectivity and JSON handling'
    ]
  },
  {
    id: 'mqtt-step-5',
    title: 'Install Security Updates and phpMyAdmin',
    description: 'Enable automatic security updates and install phpMyAdmin for database management.',
    code: `sudo apt install unattended-upgrades -y
sudo apt install phpmyadmin -y
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin`,
    language: 'bash',
    tips: [
      'Unattended upgrades keep your system secure automatically',
      'phpMyAdmin provides web interface for database management'
    ]
  },
  {
    id: 'mqtt-step-6',
    title: 'Secure MariaDB Installation',
    description: 'Run the security script to strengthen MariaDB configuration.',
    code: `sudo mysql_secure_installation`,
    language: 'bash',
    tips: [
      'Set a strong root password',
      'Remove anonymous users and test databases',
      'Disable remote root login for security'
    ]
  },
  {
    id: 'mqtt-step-7',
    title: 'Install Mosquitto MQTT Broker',
    description: 'Install the Mosquitto MQTT broker and client tools.',
    code: `sudo apt-get install mosquitto mosquitto-clients -y
sudo systemctl status mosquitto`,
    language: 'bash',
    tips: [
      'Mosquitto is a lightweight, open-source MQTT broker',
      'Client tools allow testing MQTT connections'
    ]
  },
  {
    id: 'mqtt-step-8',
    title: 'Configure phpMyAdmin in Nginx',
    description: 'Create Nginx configuration for phpMyAdmin and set proper permissions.',
    code: `sudo nano /etc/nginx/conf.d/phpmyadmin.conf
sudo nginx -t
sudo systemctl reload nginx`,
    language: 'bash',
    additionalCode: {
      title: 'Set proper permissions for phpMyAdmin:',
      code: `sudo chown -R www-data:www-data /usr/share/phpmyadmin
sudo chmod -R 755 /usr/share/phpmyadmin`,
      language: 'bash'
    },
    tips: [
      'Test Nginx configuration before reloading',
      'Proper permissions ensure phpMyAdmin works correctly'
    ]
  },
  {
    id: 'mqtt-step-9',
    title: 'Configure UFW Firewall for Basic Services',
    description: 'Enable firewall and allow necessary ports for web services and basic MQTT.',
    code: `sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 3306 && sudo ufw reload
sudo ufw allow 1883
sudo ufw status verbose`,
    language: 'bash',
    tips: [
      'Port 1883 is for standard MQTT connections',
      'Port 3306 is for MariaDB access',
      'Always allow SSH before enabling UFW to avoid lockout'
    ]
  },
  {
    id: 'mqtt-step-10',
    title: 'Test Basic MQTT Functionality',
    description: 'Test basic MQTT pub/sub functionality before SSL configuration.',
    code: `sudo systemctl restart mosquitto
sudo systemctl status mosquitto`,
    language: 'bash',
    additionalCode: {
      title: 'Test MQTT subscription with different hosts:',
      code: `# Test with external IP
mosquitto_sub -h 18.61.72.146 -t test/topic

# Test with authentication
mosquitto_sub -h 18.61.72.146 -t test/topic -u "satya" -P "satya123"

# Test locally
mosquitto_sub -h localhost -t test/topic -u satya -P satya123`,
      language: 'bash'
    },
    tips: [
      'Test basic MQTT before adding SSL complexity',
      'Keep subscription terminal open while testing publishing',
      'Try different host configurations to verify connectivity'
    ]
  },
  {
    id: 'mqtt-step-11',
    title: 'Create SSL Certificate Directory',
    description: 'Set up directory structure for SSL certificates.',
    code: `sudo mkdir -p /etc/mosquitto/certs
sudo chown mosquitto:mosquitto /etc/mosquitto/certs
sudo chmod 750 /etc/mosquitto/certs`,
    language: 'bash',
    tips: [
      'Proper permissions are crucial for security',
      'Mosquitto user needs access to certificate files'
    ]
  },
  {
    id: 'mqtt-step-12',
    title: 'Configure SSL Certificates',
    description: 'Place your SSL certificates in the correct directory.',
    code: `# Copy your certificates to the mosquitto directory
sudo cp ca.pem /etc/mosquitto/certs/
sudo cp mqtt.pem /etc/mosquitto/certs/
sudo cp mqtt.key /etc/mosquitto/certs/

# Set proper ownership and permissions
sudo chown mosquitto:mosquitto /etc/mosquitto/certs/*
sudo chmod 640 /etc/mosquitto/certs/*.pem
sudo chmod 600 /etc/mosquitto/certs/*.key`,
    language: 'bash',
    tips: [
      'Ensure you have valid SSL certificates from your CA',
      'Private keys should have restricted permissions (600)',
      'Certificate files can be readable by the mosquitto group (640)'
    ]
  },
  {
    id: 'mqtt-step-13',
    title: 'Create MQTT Password File',
    description: 'Set up authentication with username and password.',
    code: `# Create password file
sudo mosquitto_passwd -c /etc/mosquitto/passwd satya

# Set proper permissions
sudo chown mosquitto:mosquitto /etc/mosquitto/passwd
sudo chmod 640 /etc/mosquitto/passwd`,
    language: 'bash',
    additionalCode: {
      title: 'View the password file to verify:',
      code: `sudo cat /etc/mosquitto/passwd`,
      language: 'bash'
    },
    tips: [
      'You will be prompted to enter password twice',
      'Use strong passwords for production environments',
      'The -c flag creates a new password file'
    ]
  },
  {
    id: 'mqtt-step-14',
    title: 'Configure Mosquitto for Secure MQTT',
    description: 'Create the main Mosquitto configuration file.',
    code: `vi /etc/mosquitto/mosquitto.conf`,
    language: 'bash',
    additionalCode: {
      title: 'Add the following configuration:',
      code: `# Enable persistence
persistence true
persistence_location /var/lib/mosquitto/

# Password file
password_file /etc/mosquitto/passwd

# Listener for secure MQTT (TLS) on port 8883
listener 8883
protocol mqtt

# TLS configuration
cafile /etc/mosquitto/certs/ca.pem
certfile /etc/mosquitto/certs/mqtt.pem
keyfile /etc/mosquitto/certs/mqtt.key

# Allow only encrypted connections
require_certificate true

# Logging
log_type all
log_dest file /var/log/mosquitto/mosquitto.log

# Include additional configurations
include_dir /etc/mosquitto/conf.d`,
      language: 'config'
    },
    tips: [
      'Port 8883 is the standard for secure MQTT',
      'require_certificate enforces client certificate authentication',
      'Persistence saves messages to disk for reliability'
    ]
  },
  {
    id: 'mqtt-step-15',
    title: 'Create Log Directory and Set Permissions',
    description: 'Ensure proper logging directory exists with correct permissions.',
    code: `sudo mkdir -p /var/log/mosquitto
sudo chown mosquitto:mosquitto /var/log/mosquitto
sudo chmod 755 /var/log/mosquitto`,
    language: 'bash',
    tips: [
      'Log directory must be writable by mosquitto user',
      'Logs help with debugging connection issues'
    ]
  },
  {
    id: 'mqtt-step-16',
    title: 'Configure Nginx Reverse Proxy',
    description: 'Set up Nginx to proxy MQTT connections with SSL termination.',
    code: `sudo nano /etc/nginx/sites-available/mqtt.thynxai.tech`,
    language: 'bash',
    additionalCode: {
      title: 'Add the following Nginx configuration:',
      code: `server {
    listen 443 ssl;
    server_name mqtt.thynxai.tech;

    ssl_certificate /etc/mosquitto/certs/mqtt.pem;
    ssl_certificate_key /etc/mosquitto/certs/mqtt.key;
    ssl_trusted_certificate /etc/mosquitto/certs/ca.pem;

    location / {
        proxy_pass https://127.0.0.1:8883;
        proxy_ssl_verify off;  # Optional: Disable SSL verification for backend
        proxy_ssl_protocols TLSv1.2 TLSv1.3;
        proxy_ssl_ciphers HIGH:!aNULL:!MD5;
    }

    # WebSocket Support (if needed for MQTT over WebSocket)
    location /mqtt {
        proxy_pass https://127.0.0.1:8883;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`,
      language: 'nginx'
    },
    tips: [
      'This configuration supports both MQTT and WebSocket connections',
      'SSL termination happens at Nginx level',
      'Backend connection uses localhost for security'
    ]
  },
  {
    id: 'mqtt-step-17',
    title: 'Enable Nginx Site and Test Configuration',
    description: 'Activate the Nginx configuration and verify it is correct.',
    code: `# Enable the site
sudo ln -s /etc/nginx/sites-available/mqtt.thynxai.tech /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx if test passes
sudo systemctl reload nginx`,
    language: 'bash',
    tips: [
      'Always test Nginx configuration before reloading',
      'Symbolic link enables the site configuration',
      'Check Nginx error logs if configuration fails'
    ]
  },
  {
    id: 'mqtt-step-18',
    title: 'Configure Cloudflare DNS Settings',
    description: 'Set up Cloudflare DNS without proxy for MQTT traffic.',
    code: `# In Cloudflare Dashboard:
# 1. Go to DNS settings for your domain
# 2. Find the record for mqtt.thynxai.tech
# 3. Turn off the orange cloud (proxy status)
# 4. Ensure it shows as "DNS only" (gray cloud)`,
    language: 'config',
    tips: [
      'MQTT requires direct connection, not HTTP proxy',
      'Orange cloud (proxied) will break MQTT connections',
      'Gray cloud (DNS only) allows direct TCP connections',
      'This setting is crucial for MQTT to work properly'
    ]
  },
  {
    id: 'mqtt-step-19',
    title: 'Start and Enable Mosquitto Service',
    description: 'Start the Mosquitto broker and enable it to start on boot.',
    code: `sudo systemctl start mosquitto
sudo systemctl enable mosquitto
sudo systemctl status mosquitto`,
    language: 'bash',
    tips: [
      'Check status output for any error messages',
      'Service should show as "active (running)"',
      'Review logs if service fails to start'
    ]
  },
  {
    id: 'mqtt-step-20',
    title: 'Configure Secure Firewall Rules',
    description: 'Open necessary ports in the firewall for secure MQTT connections.',
    code: `sudo ufw allow 8883/tcp
sudo ufw allow 443/tcp
sudo ufw reload
sudo ufw status`,
    language: 'bash',
    tips: [
      'Port 8883 is for secure MQTT',
      'Port 443 is for HTTPS/WSS connections',
      'Always reload firewall after adding rules'
    ]
  },
  {
    id: 'mqtt-step-21',
    title: 'Test Secure MQTT Subscription',
    description: 'Test the secure MQTT broker by subscribing to a test topic.',
    code: `mosquitto_sub -h mqtt.thynxai.tech -p 8883 -t "test/topic" --cafile /etc/mosquitto/certs/ca.pem --cert /etc/mosquitto/certs/mqtt.pem --key /etc/mosquitto/certs/mqtt.key -u satya -P satya123`,
    language: 'bash',
    tips: [
      'This command will wait for messages on the test/topic',
      'Keep this terminal open while testing publishing',
      'Use Ctrl+C to stop the subscription',
      'Ensure all certificate paths are correct'
    ]
  },
  {
    id: 'mqtt-step-22',
    title: 'Test Secure MQTT Publishing',
    description: 'Publish a test message to verify the complete secure setup.',
    code: `mosquitto_pub -h mqtt.thynxai.tech -p 8883 -t "test/topic" -m "Hello, MQTT!" --cafile /etc/mosquitto/certs/ca.pem --cert /etc/mosquitto/certs/mqtt.pem --key /etc/mosquitto/certs/mqtt.key -u satya -P satya123`,
    language: 'bash',
    tips: [
      'Run this in a separate terminal while subscription is active',
      'You should see the message appear in the subscriber terminal',
      'If successful, your secure MQTT broker is working correctly',
      'Try different topics and messages to verify functionality'
    ]
  },
  {
    id: 'mqtt-step-23',
    title: 'Monitor and Troubleshoot',
    description: 'Check logs and monitor the MQTT broker performance.',
    code: `# Check Mosquitto logs
sudo tail -f /var/log/mosquitto/mosquitto.log

# Check service status
sudo systemctl status mosquitto

# Check Nginx logs for proxy issues
sudo tail -f /var/log/nginx/error.log`,
    language: 'bash',
    additionalCode: {
      title: 'Additional troubleshooting commands:',
      code: `# Check network configuration
ifconfig

# List directory contents
ls

# View command history
history`,
      language: 'bash'
    },
    tips: [
      'Logs are essential for troubleshooting connection issues',
      'Monitor logs while testing connections',
      'Common issues include certificate problems and firewall blocking',
      'Network tools help verify connectivity and configuration'
    ]
  }
];