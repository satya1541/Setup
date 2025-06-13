import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Clock, Users, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { CodeBlock } from "@/components/code-block";

export default function PhpMyAdminImportGuide() {
  const steps = [
    {
      id: "php-config",
      title: "Edit PHP Configuration",
      description: "Modify PHP settings to allow larger file uploads",
      code: `# Find the correct php.ini file
php --ini

# Edit the php.ini file (replace <version> with your PHP version, e.g., 8.2)
sudo nano /etc/php/<version>/fpm/php.ini`,
      language: "bash",
      additionalCode: {
        title: "Update these values in php.ini",
        code: `upload_max_filesize = 600M
post_max_size = 600M
memory_limit = 1024M
max_execution_time = 300
max_input_time = 300

# Line numbers for reference:
# Line 865: upload_max_filesize
# Line 713: post_max_size  
# Line 445: memory_limit
# Line 419: max_execution_time
# Line 117: max_input_time
# Line 429: Additional settings`,
        language: "ini"
      },
      tips: [
        "Use 'php --ini' to find the exact location of your php.ini file",
        "Make sure to edit the FPM version of php.ini, not CLI",
        "Keep memory_limit higher than post_max_size for better performance"
      ]
    },
    {
      id: "nginx-config",
      title: "Edit Nginx Configuration",
      description: "Configure Nginx to accept larger file uploads",
      code: `# Open the Nginx configuration file
sudo nano /etc/nginx/nginx.conf`,
      language: "bash",
      additionalCode: {
        title: "Add to the http or server block",
        code: `http {
    ...
    client_max_body_size 600M;
    ...
}`,
        language: "nginx"
      },
      tips: [
        "Place client_max_body_size in the http block for global effect",
        "You can also place it in a specific server block for site-specific limits",
        "The value should match or exceed your PHP upload limits"
      ]
    },
    {
      id: "restart-services",
      title: "Restart Services",
      description: "Restart PHP-FPM and Nginx to apply the changes",
      code: `# Restart PHP-FPM (replace <version> with your PHP version)
sudo systemctl restart php<version>-fpm

# Restart Nginx
sudo systemctl restart nginx

# Verify services are running
sudo systemctl status php<version>-fpm
sudo systemctl status nginx`,
      language: "bash",
      tips: [
        "Always restart both services for changes to take effect",
        "Check service status to ensure they restarted successfully",
        "Common PHP versions are 8.1, 8.2, or 8.3"
      ]
    },
    {
      id: "verify-settings",
      title: "Verify Settings in phpMyAdmin",
      description: "Check that the new upload limits are active",
      code: `# You can also create a PHP info file to verify settings
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php

# Access http://your-server/info.php to verify settings
# Look for:
# - upload_max_filesize
# - post_max_size  
# - memory_limit
# - max_execution_time

# Remove the info file after checking (security)
sudo rm /var/www/html/info.php`,
      language: "bash",
      tips: [
        "Log in to phpMyAdmin and check the Import tab for new limits",
        "The phpinfo() page shows all current PHP settings",
        "Always remove the info.php file after verification for security"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Import Size Increase in phpMyAdmin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                How to Increase phpMyAdmin Import Size to 600MB on Ubuntu 24.04 with Nginx
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              10 minutes
            </Badge>
            <Badge variant="outline">Intermediate</Badge>
            <Badge variant="outline">phpMyAdmin</Badge>
            <Badge variant="outline">PHP</Badge>
            <Badge variant="outline">Nginx</Badge>
            <Badge variant="outline">Ubuntu</Badge>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Overview
            </CardTitle>
            <CardDescription>
              This guide will help you increase the maximum import file size in phpMyAdmin from the default 2MB to 600MB. 
              You'll need to modify both PHP and Nginx configurations to handle larger database imports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Modify PHP upload limits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Configure Nginx for large uploads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Restart services properly
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Verify configuration changes
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Prerequisites:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Ubuntu 24.04 server</li>
                  <li>• Nginx web server</li>
                  <li>• PHP-FPM installed</li>
                  <li>• phpMyAdmin installed</li>
                  <li>• Sudo access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={step.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  {step.title}
                </CardTitle>
                <CardDescription className="ml-11">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <CodeBlock
                    code={step.code}
                    language={step.language}
                    title="Commands"
                  />
                  
                  {step.additionalCode && (
                    <CodeBlock
                      code={step.additionalCode.code}
                      language={step.additionalCode.language}
                      title={step.additionalCode.title}
                    />
                  )}
                  
                  {step.tips && step.tips.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        💡 Tips
                      </h4>
                      <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion */}
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              Configuration Complete!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your phpMyAdmin should now accept uploads up to 600MB. Log in to phpMyAdmin and check the Import tab to verify the new limits are active.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}