import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GlobalMindsClub = () => {
  return (
    <>
      <Helmet>
        <title>Global Minds Club | Azentra Global</title>
        <meta name="description" content="Join the Global Minds Club - A community of innovative thinkers and global leaders fostered by Azentra Global." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Global Minds Club</h1>
            <p className="text-xl text-gray-600 mb-8">
              A community of innovative thinkers shaping the future of technology and business
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Global Minds Club</CardTitle>
                <CardDescription>
                  Global Minds Club brings together aspiring entrepreneurs, innovators, and thought leaders
                  to collaborate on global challenges and create impactful solutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Members participate in global challenges, networking events, innovation workshops,
                  and collaborative projects that address real-world problems on a global scale.
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

export default GlobalMindsClub;