import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AchieverWay = () => {
  return (
    <>
      <Helmet>
        <title>Achiever Way Program | Azentra Global</title>
        <meta name="description" content="Join the Achiever Way Program - A comprehensive personal and professional development initiative by Azentra Global." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Achiever Way Program</h1>
            <p className="text-xl text-gray-600 mb-8">
              Unlock your potential and achieve excellence in all aspects of life
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Achiever Way</CardTitle>
                <CardDescription>
                  The Achiever Way Program is a holistic development initiative that focuses on personal growth,
                  leadership skills, goal setting, and achieving excellence in professional and personal life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Through mentorship, workshops, and practical exercises, participants learn to overcome challenges,
                  build resilience, and create sustainable success in their chosen paths.
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

export default AchieverWay;