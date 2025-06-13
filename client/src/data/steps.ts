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

export const steps: Step[] = [
  {
    id: 'step-1',
    title: 'Update and Upgrade System Packages',
    description: 'Ensure your system has the latest packages and security updates.',
    code: 'sudo apt update -y && sudo apt upgrade -y',
    language: 'bash',
    tips: [
      'This command updates package lists and upgrades installed packages',
      'The -y flag automatically confirms all prompts'
    ]
  },
  {
    id: 'step-2',
    title: 'Install Nginx and Utilities',
    description: 'Install the Nginx web server along with essential network utilities.',
    code: 'sudo apt install -y nginx net-tools curl unzip gnupg lsb-release ca-certificates',
    language: 'bash',
    tips: [
      'Nginx will serve as your web server',
      'These utilities are essential for web server management'
    ]
  },
  {
    id: 'step-3',
    title: 'Start and Enable Nginx',
    description: 'Configure Nginx to start automatically and check its status.',
    code: `sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx`,
    language: 'bash',
    tips: [
      'enable ensures Nginx starts on boot',
      'status command shows current service state'
    ]
  },
  {
    id: 'step-4',
    title: 'Install MySQL Server',
    description: 'Install the latest official MySQL database server.',
    code: 'sudo apt install -y mysql-server',
    language: 'bash',
    tips: [
      'MySQL will handle your database needs',
      'This installs the latest stable version from Ubuntu repositories'
    ]
  },
  {
    id: 'step-5',
    title: 'Start and Enable MySQL',
    description: 'Configure MySQL to run automatically and verify it\'s working.',
    code: `sudo systemctl enable mysql
sudo systemctl start mysql
sudo systemctl status mysql`,
    language: 'bash',
    tips: [
      'MySQL should show as active and running',
      'The service will now start automatically on boot'
    ]
  },
  {
    id: 'step-6',
    title: 'Secure MySQL Installation',
    description: 'Run the security script to strengthen your MySQL installation.',
    code: 'sudo mysql_secure_installation',
    language: 'bash',
    tips: [
      'Choose a strong root password',
      'Remove anonymous users and test databases for security'
    ]
  },
  {
    id: 'step-7',
    title: 'Install PHP 8.3 and Extensions',
    description: 'Install PHP and essential extensions for web development.',
    code: 'sudo apt install -y php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-zip php8.3-gd php8.3-curl php8.3-xml php8.3-common',
    language: 'bash',
    tips: [
      'php8.3-fpm handles PHP processing for Nginx',
      'These extensions cover most web application needs'
    ]
  },
  {
    id: 'step-8',
    title: 'Install phpMyAdmin',
    description: 'Install the web-based MySQL administration tool.',
    code: 'sudo apt install -y phpmyadmin',
    language: 'bash',
    tips: [
      'phpMyAdmin provides a web interface for MySQL management',
      'Choose "apache2" when prompted (we\'ll configure Nginx separately)'
    ]
  },
  {
    id: 'step-9',
    title: 'Create Symbolic Link for phpMyAdmin',
    description: 'Make phpMyAdmin accessible through your web server.',
    code: 'sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin',
    language: 'bash',
    tips: [
      'This creates a link in your web root directory',
      'Allows access via http://your-domain/phpmyadmin'
    ]
  },
  {
    id: 'step-10',
    title: 'Create MySQL User for phpMyAdmin',
    description: 'Create a dedicated user account for phpMyAdmin access.',
    code: 'sudo mysql -u root -p',
    language: 'bash',
    additionalCode: {
      title: 'Inside MySQL shell, run:',
      code: `CREATE USER 'satya'@'localhost' IDENTIFIED BY 'satya123';
GRANT ALL PRIVILEGES ON *.* TO 'satya'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;`,
      language: 'sql'
    },
    tips: [
      'Replace "satya" and "satya123" with your preferred username and password',
      'This user will have full MySQL privileges'
    ]
  },
  {
    id: 'step-11',
    title: 'Configure Nginx for phpMyAdmin',
    description: 'Create an Nginx configuration file for phpMyAdmin.',
    code: 'sudo nano /etc/nginx/conf.d/phpmyadmin.conf',
    language: 'bash',
    additionalCode: {
      title: 'Paste the following configuration:',
      code: `server {
    listen 80;
    server_name your-server-ip;
    root /usr/share/phpmyadmin;
    index index.php index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }

    location ~ /\\.ht {
        deny all;
    }
}`,
      language: 'nginx'
    },
    tips: [
      'Replace "your-server-ip" with your actual server IP address',
      'This configuration handles PHP processing through PHP-FPM'
    ]
  },
  {
    id: 'step-12',
    title: 'Test and Reload Nginx',
    description: 'Verify the configuration and apply changes.',
    code: `sudo nginx -t
sudo systemctl reload nginx`,
    language: 'bash',
    tips: [
      'nginx -t checks for configuration errors',
      'Only reload if the test passes successfully'
    ]
  },
  {
    id: 'step-13',
    title: 'Set Proper Permissions',
    description: 'Configure file permissions for phpMyAdmin security.',
    code: `sudo chown -R www-data:www-data /usr/share/phpmyadmin
sudo chmod -R 755 /usr/share/phpmyadmin`,
    language: 'bash',
    tips: [
      'www-data is the default web server user in Ubuntu',
      'chmod 755 provides appropriate read/execute permissions'
    ]
  },
  {
    id: 'step-14',
    title: 'Configure UFW Firewall',
    description: 'Setup firewall rules to secure your server.',
    code: `sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 3306
sudo ufw enable
sudo ufw reload
sudo ufw status verbose`,
    language: 'bash',
    tips: [
      'Port 3306 is for MySQL connections',
      'Always allow SSH before enabling UFW to avoid lockout'
    ]
  },
  {
    id: 'step-15',
    title: 'Final Service Restart',
    description: 'Restart all services to ensure everything is working properly.',
    code: `sudo systemctl reload nginx
sudo systemctl restart mysql
sudo systemctl restart php8.3-fpm`,
    language: 'bash',
    tips: [
      'This ensures all configuration changes take effect',
      'Your LEMP stack should now be fully operational'
    ]
  },
  {
    id: 'step-16',
    title: 'Access Your LEMP Stack',
    description: 'Test your installation and access phpMyAdmin through your web browser.',
    code: 'http://your-server-ip/phpmyadmin',
    language: 'url',
    additionalCode: {
      title: 'Login credentials:',
      code: `Username: satya
Password: satya123`,
      language: 'credentials'
    },
    tips: [
      'Replace "your-server-ip" with your actual server IP address',
      'You can find your IP with: ip addr show or curl ifconfig.me',
      'Make sure all services are running before accessing phpMyAdmin'
    ]
  }
];
