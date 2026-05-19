import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GrowGreenInitiative = () => {
  return (
    <>
      <Helmet>
        <title>Grow Green Initiative | Azentra Global</title>
        <meta name="description" content="Join Azentra Global's Grow Green Initiative - Promoting environmental sustainability through technology and community action." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Grow Green Initiative</h1>
            <p className="text-xl text-gray-600 mb-8">
              Promoting environmental sustainability through technology and community action
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Grow Green Initiative</CardTitle>
                <CardDescription>
                  The Grow Green Initiative leverages technology and community engagement to address
                  environmental challenges and promote sustainable practices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Through innovative solutions, awareness campaigns, and collaborative projects,
                  we work towards creating a sustainable future for our planet and communities.
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

export default GrowGreenInitiative;