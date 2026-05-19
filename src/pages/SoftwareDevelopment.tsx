import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SoftwareDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Software Development Programs | Azentra Global</title>
        <meta name="description" content="Master software development with Azentra Global's comprehensive training in modern technologies and frameworks." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Software Development Programs</h1>
            <p className="text-xl text-gray-600 mb-8">
              Build robust software solutions with modern technologies and best practices
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Software Development</CardTitle>
                <CardDescription>
                  Our comprehensive software development programs cover full-stack development,
                  mobile app development, cloud technologies, and software architecture.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  From concept to deployment, learn to build scalable, secure, and maintainable
                  software applications that meet industry standards.
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

export default SoftwareDevelopment;