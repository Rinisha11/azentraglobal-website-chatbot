import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CEIP = () => {
  return (
    <>
      <Helmet>
        <title>Career Enhancement Internship Program (CEIP) | Azentra Global</title>
        <meta name="description" content="Join Azentra Global's Career Enhancement Internship Program - Accelerate your career growth with industry-relevant skills." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Career Enhancement Internship Program</h1>
            <p className="text-xl text-gray-600 mb-8">
              Accelerate your career growth with industry-relevant skills and mentorship
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About CEIP</CardTitle>
                <CardDescription>
                  CEIP is designed to provide students and early-career professionals with comprehensive career development
                  opportunities through structured internship programs and mentorship.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Participants gain hands-on experience, industry knowledge, and professional networking opportunities
                  that prepare them for successful careers in their chosen fields.
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

export default CEIP;