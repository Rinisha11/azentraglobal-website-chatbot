import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DevOps = () => {
  return (
    <>
      <Helmet>
        <title>DevOps Training and Certification | Azentra Global</title>
        <meta name="description" content="Master DevOps practices with Azentra Global's comprehensive training programs and industry-recognized certifications." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">DevOps Training and Certification</h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline development and operations with modern DevOps practices
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About DevOps</CardTitle>
                <CardDescription>
                  Our DevOps programs cover CI/CD pipelines, containerization, infrastructure as code,
                  monitoring, and automation tools to bridge the gap between development and operations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Learn industry-standard tools like Docker, Kubernetes, Jenkins, Terraform, and AWS
                  to build efficient, scalable, and reliable systems.
                </p>
                <Button>Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevOps;