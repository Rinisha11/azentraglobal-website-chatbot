import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WebHosting = () => {
  return (
    <>
      <Helmet>
        <title>Web Hosting Solutions | Azentra Global</title>
        <meta name="description" content="Professional web hosting solutions for businesses and individuals with reliable performance and support." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Web Hosting Solutions</h1>
            <p className="text-xl text-gray-600 mb-8">
              Reliable and scalable web hosting solutions for your online presence
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Web Hosting</CardTitle>
                <CardDescription>
                  Our web hosting services provide reliable, secure, and high-performance hosting solutions
                  for websites, applications, and online businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  From shared hosting to dedicated servers, we offer solutions that scale with your business
                  needs, backed by 24/7 support and enterprise-grade security.
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

export default WebHosting;