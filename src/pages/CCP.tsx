import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CCP = () => {
  return (
    <>
      <Helmet>
        <title>Community Connect Program (CCP) | Azentra Global</title>
        <meta name="description" content="Join Azentra Global's Community Connect Program - Building stronger communities through technology and collaboration." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Community Connect Program</h1>
            <p className="text-xl text-gray-600 mb-8">
              Building stronger communities through technology and collaboration
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About CCP</CardTitle>
                <CardDescription>
                  Our Community Connect Program focuses on leveraging technology to solve local community challenges
                  and foster collaboration between businesses, educational institutions, and local communities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Through CCP, we organize workshops, hackathons, and collaborative projects that bring together
                  diverse stakeholders to create meaningful impact in their communities.
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

export default CCP;