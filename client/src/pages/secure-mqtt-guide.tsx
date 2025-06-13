import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { CodeBlock } from "@/components/code-block";

export default function SecureMqttGuide() {
  const steps = [
    {
      id: "mqtt-commands",
      title: "MQTT Commands for Secure Communication",
      description: "Learn how to subscribe and publish to MQTT topics using TLS encryption",
      code: `# Subscribe to a topic with TLS encryption
mosquitto_sub -h mqtt.thynxai.tech -p 8883 -t "test/topic" \\
  --cafile /etc/mosquitto/certs/ca.pem \\
  --cert /etc/mosquitto/certs/mqtt.pem \\
  --key /etc/mosquitto/certs/mqtt.key \\
  -u satya -P satya123`,
      language: "bash",
      additionalCode: {
        title: "Publishing to a topic with TLS",
        code: `# Publish a message to a topic with TLS encryption
mosquitto_pub -h mqtt.thynxai.tech -p 8883 -t "test/topic" \\
  -m "Hello, MQTT!" \\
  --cafile /etc/mosquitto/certs/ca.pem \\
  --cert /etc/mosquitto/certs/mqtt.pem \\
  --key /etc/mosquitto/certs/mqtt.key \\
  -u satya -P satya123`,
        language: "bash"
      },
      tips: [
        "-h mqtt.thynxai.tech: Specifies the MQTT broker's hostname",
        "-p 8883: Connects to the MQTT broker over TLS on port 8883",
        "--cafile: Specifies the CA certificate for verifying the broker",
        "--cert: Specifies the client certificate",
        "--key: Specifies the client private key",
        "-u and -P: MQTT username and password for authentication"
      ]
    },
    {
      id: "nginx-config",
      title: "Nginx Configuration for MQTT Proxy",
      description: "Configure Nginx to serve MQTT broker over HTTPS with WebSocket support",
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
      language: "nginx",
      tips: [
        "listen 443 ssl: Enables SSL on port 443",
        "server_name: Specifies the domain name",
        "ssl_certificate paths: Point to your SSL certificate files",
        "proxy_pass: Proxies requests to the local MQTT broker on port 8883",
        "WebSocket support configured under /mqtt location block"
      ]
    },
    {
      id: "mqtt-broker-config",
      title: "MQTT Broker Configuration",
      description: "Configure Mosquitto broker for secure TLS connections",
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
      language: "bash",
      tips: [
        "persistence true: Enables message persistence for reliability",
        "password_file: Path to the password file for client authentication",
        "listener 8883: Configures the broker to listen on port 8883 with TLS",
        "require_certificate true: Requires client certificates for authentication",
        "log_type all: Logs all types of events for debugging",
        "Ensure all certificate paths are correct and accessible"
      ]
    },
    {
      id: "cloudflare-setup",
      title: "Cloudflare Configuration",
      description: "Configure Cloudflare settings for MQTT domain",
      code: `# Important Cloudflare Settings:
# 1. Turn OFF proxy (gray cloud) for mqtt.thynxai.tech
# 2. This prevents Cloudflare from interfering with MQTT protocol
# 3. DNS should be set to "DNS only" mode

# To verify your settings:
dig mqtt.thynxai.tech
nslookup mqtt.thynxai.tech`,
      language: "bash",
      tips: [
        "Proxy setting (orange cloud) MUST be turned off in Cloudflare",
        "MQTT protocol requires direct connection to your server",
        "Use 'DNS only' mode to avoid Cloudflare proxy interference",
        "Verify DNS resolution points directly to your server IP"
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
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Secure MQTT Setup
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Complete secure MQTT broker setup with TLS encryption and Nginx configuration
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              35 minutes
            </Badge>
            <Badge variant="outline">Advanced</Badge>
            <Badge variant="outline">MQTT</Badge>
            <Badge variant="outline">TLS</Badge>
            <Badge variant="outline">Nginx</Badge>
            <Badge variant="outline">Certificates</Badge>
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
              This guide provides comprehensive documentation for setting up a secure MQTT broker with TLS encryption, 
              Nginx reverse proxy configuration, and proper client authentication. Perfect for production IoT deployments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Secure MQTT commands with TLS
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Nginx proxy configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    MQTT broker security settings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cloudflare DNS configuration
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Prerequisites:</h4>
                <ul className="text-sm space-y-1">
                  <li>• SSL/TLS certificates</li>
                  <li>• Mosquitto MQTT broker installed</li>
                  <li>• Nginx web server</li>
                  <li>• Domain name configured</li>
                  <li>• Cloudflare account (optional)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Card className="mb-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-5 h-5" />
              Security Notice
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              This configuration requires valid SSL certificates and proper authentication. 
              Ensure all certificate paths are correct and files have appropriate permissions before proceeding.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={step.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
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
                    title="Configuration"
                  />
                  
                  {step.additionalCode && (
                    <CodeBlock
                      code={step.additionalCode.code}
                      language={step.additionalCode.language}
                      title={step.additionalCode.title}
                    />
                  )}
                  
                  {step.tips && step.tips.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        💡 Key Points
                      </h4>
                      <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
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

        {/* Testing Section */}
        <Card className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
              <CheckCircle className="w-5 h-5" />
              Testing Your Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-700 dark:text-indigo-300 mb-4">
              To verify your secure MQTT setup is working correctly:
            </p>
            <ol className="text-sm text-indigo-700 dark:text-indigo-300 space-y-2">
              <li>1. Open two terminal windows</li>
              <li>2. In the first, run the subscribe command to listen for messages</li>
              <li>3. In the second, run the publish command to send a test message</li>
              <li>4. Verify the message appears in the subscriber terminal</li>
              <li>5. Check your logs at /var/log/mosquitto/mosquitto.log for any errors</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}