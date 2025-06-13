import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Clock, Users, CheckCircle, FileText } from "lucide-react";
import { Link } from "wouter";
import { CodeBlock } from "@/components/code-block";

export default function PhpMyAdmin504Guide() {
  const steps = [
    {
      id: "nginx-timeout",
      title: "Increase Timeout Settings in Nginx",
      description: "Configure Nginx to handle long-running requests and large file uploads",
      code: `# Edit Nginx configuration file
sudo vi /etc/nginx/nginx.conf`,
      language: "bash",
      additionalCode: {
        title: "Add these settings inside the http block",
        code: `http {
    ...
    # Increase client body size to accommodate larger SQL files
    client_max_body_size 600M;

    # Increase buffer and timeout settings for long-running requests
    fastcgi_buffers 16 16k;
    fastcgi_buffer_size 32k;
    fastcgi_read_timeout 600s;
    proxy_read_timeout 600s;
    proxy_connect_timeout 600s;
    proxy_send_timeout 600s;
    send_timeout 600s;
}`,
        language: "nginx"
      },
      tips: [
        "Test Nginx configuration with: sudo nginx -t",
        "Restart Nginx with: sudo systemctl restart nginx",
        "client_max_body_size should match your largest SQL file size",
        "600s timeout allows for 10-minute operations"
      ]
    },
    {
      id: "php-fpm-timeout",
      title: "Increase Timeout Settings in PHP-FPM",
      description: "Configure PHP-FPM to handle long-running database operations",
      code: `# Edit PHP-FPM configuration file
sudo vi /etc/php/8.2/fpm/php-fpm.conf`,
      language: "bash",
      additionalCode: {
        title: "Add under the [global] section",
        code: `request_terminate_timeout = 600`,
        language: "ini"
      },
      tips: [
        "Replace 8.2 with your PHP version (8.1, 8.3, etc.)",
        "This setting prevents PHP-FPM from killing long-running processes",
        "Restart PHP-FPM after changes: sudo systemctl restart php8.2-fpm"
      ]
    },
    {
      id: "php-ini-config",
      title: "Update PHP Configuration",
      description: "Modify PHP settings to support large file uploads and long execution times",
      code: `# Edit PHP configuration for FPM
sudo vi /etc/php/8.2/fpm/php.ini`,
      language: "bash",
      additionalCode: {
        title: "Update these settings in php.ini",
        code: `max_execution_time = 600
max_input_time = 600
memory_limit = 512M
post_max_size = 600M
upload_max_filesize = 600M`,
        language: "ini"
      },
      tips: [
        "max_execution_time allows scripts to run for 10 minutes",
        "memory_limit should be sufficient for processing large files",
        "Ensure post_max_size >= upload_max_filesize",
        "Restart PHP-FPM after making changes"
      ]
    },
    {
      id: "phpmyadmin-config",
      title: "Configure phpMyAdmin Timeout Settings",
      description: "Set execution time limits specifically for phpMyAdmin operations",
      code: `# Edit phpMyAdmin configuration file
sudo vi /etc/phpmyadmin/config.inc.php`,
      language: "bash",
      additionalCode: {
        title: "Add this line to the configuration",
        code: `$cfg['ExecTimeLimit'] = 600;`,
        language: "php"
      },
      tips: [
        "This setting overrides PHP's max_execution_time for phpMyAdmin",
        "Place this line anywhere in the config file outside of comments",
        "No need to restart services after this change"
      ]
    },
    {
      id: "mysql-cli-alternative",
      title: "Alternative: Use MySQL Command Line",
      description: "For very large imports, bypass phpMyAdmin entirely using MySQL CLI",
      code: `# Upload SQL file to server (example using scp)
scp /path/to/your/sqlfile.sql user@server:/tmp/

# Import SQL file directly into MySQL
mysql -u username -p database_name < /tmp/sqlfile.sql`,
      language: "bash",
      tips: [
        "CLI imports are generally faster and more reliable for large files",
        "No timeout limitations when importing via command line",
        "Use this method for files larger than 100MB",
        "Always backup your database before importing"
      ]
    },
    {
      id: "debugging-logs",
      title: "Monitor and Debug with Logs",
      description: "Check logs to identify specific timeout issues and monitor progress",
      code: `# Monitor Nginx logs in real-time
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Monitor PHP-FPM logs
sudo tail -f /var/log/php8.2-fpm.log`,
      language: "bash",
      tips: [
        "Watch logs during import to see real-time errors",
        "Look for 'upstream timed out' messages in Nginx logs",
        "PHP-FPM logs show memory and execution time issues",
        "Use Ctrl+C to stop monitoring logs"
      ]
    },
    {
      id: "additional-considerations",
      title: "Additional Considerations",
      description: "Extra steps for specific environments and optimization",
      code: `# If using Cloudflare, consider these settings:
# 1. Enable Development Mode in Cloudflare dashboard
# 2. Or temporarily switch to DNS-only mode

# Verify current PHP limits
php -i | grep -E "(max_execution_time|upload_max_filesize|post_max_size)"

# Check current Nginx timeout settings
nginx -T | grep timeout`,
      language: "bash",
      tips: [
        "Cloudflare can interfere with long uploads - disable proxy if needed",
        "Development Mode bypasses Cloudflare caching",
        "Always verify settings are applied correctly",
        "Consider splitting very large SQL files into smaller chunks"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
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
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Resolving 504 Gateway Timeout (phpMyAdmin)
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Fix 504 Gateway Timeout and upstream timeout errors when importing large SQL files
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              15 minutes
            </Badge>
            <Badge variant="outline">Intermediate</Badge>
            <Badge variant="outline">phpMyAdmin</Badge>
            <Badge variant="outline">Nginx</Badge>
            <Badge variant="outline">PHP-FPM</Badge>
            <Badge variant="outline">MySQL</Badge>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Problem Overview
            </CardTitle>
            <CardDescription>
              504 Gateway Timeout errors occur when importing large SQL files through phpMyAdmin because default timeout settings 
              are insufficient for long-running database operations. This guide shows how to adjust Nginx, PHP-FPM, and phpMyAdmin 
              configurations to handle large imports successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Common Symptoms:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    504 Gateway Timeout error
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Upstream timed out errors
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Import process stops mid-way
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Connection reset during upload
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What you'll fix:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Nginx timeout configurations</li>
                  <li>• PHP-FPM execution limits</li>
                  <li>• PHP upload and memory settings</li>
                  <li>• phpMyAdmin timeout settings</li>
                  <li>• Alternative import methods</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={step.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
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
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                        💡 Important Notes
                      </h4>
                      <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
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

        {/* Final Steps */}
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              Final Steps & Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-700 dark:text-green-300">
              <p className="mb-4">After applying all configurations:</p>
              <ol className="space-y-2 text-sm">
                <li>1. Restart all services: sudo systemctl restart nginx php8.2-fpm</li>
                <li>2. Test with a smaller SQL file first to verify the fix</li>
                <li>3. Monitor logs during import to ensure no timeout errors</li>
                <li>4. For very large files (over 500MB), consider using MySQL CLI instead</li>
                <li>5. Always backup your database before importing large files</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <FileText className="w-5 h-5" />
              Still Having Issues?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-700 dark:text-blue-300 text-sm">
              <p className="mb-2">If 504 errors persist:</p>
              <ul className="space-y-1">
                <li>• Check that all configuration files were saved properly</li>
                <li>• Verify services restarted without errors</li>
                <li>• Try importing a smaller portion of your SQL file</li>
                <li>• Consider splitting large SQL files into smaller chunks</li>
                <li>• Use MySQL command line for files larger than 100MB</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}