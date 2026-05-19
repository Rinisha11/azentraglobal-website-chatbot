import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DigitalMarketing = () => {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Initiative | Azentra Global</title>
        <meta name="description" content="Master digital marketing with Azentra Global's comprehensive training programs and real-world projects." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Digital Marketing Initiative</h1>
            <p className="text-xl text-gray-600 mb-8">
              Master the art of digital marketing with comprehensive training and hands-on experience
            </p>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Digital Marketing</CardTitle>
                <CardDescription>
                  Our Digital Marketing Initiative covers SEO, SEM, social media marketing, content marketing,
                  email marketing, and analytics to prepare you for the digital economy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Learn from industry experts and work on real campaigns to build a strong portfolio
                  and gain practical skills that employers are looking for.
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

export default DigitalMarketing;