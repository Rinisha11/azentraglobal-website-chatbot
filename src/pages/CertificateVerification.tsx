import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Share2, Award, Calendar, User, Building } from "lucide-react";

// Updated interface to match your API response
interface CertificateData {
  certificate_id: string;
  student_name: string;
  program_name: string;
  organization: string;
  start_date: string;
  end_date: string;
  issue_date: string;
  registration_number: string;
  certificate_status: string;
  student_photo?: string;
  verified_on?: string;
}

const CertificateVerification = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!certificateId) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://employee.azentraglobal.com/tracker/CertificateVerify/verify?certificate_id=${certificateId}`
        );

        if (!response.ok) {
          throw new Error('Failed to verify certificate');
        }

        const data = await response.json();
        setApiResponse(data);
        
        if (data.success && data.data) {
          setCertificateData(data.data);
          setError(null);
        } else {
          setError(data.message || 'Certificate not found');
          setCertificateData(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCertificateData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [certificateId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Certificate Verification',
        text: `Verify my SAIP certificate: ${certificateId}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !certificateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Certificate Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Alert className="mb-4">
              <AlertDescription>
                The certificate ID "{certificateId}" could not be verified. {error || 'Please check the ID and try again.'}
              </AlertDescription>
            </Alert>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if certificate is valid (status not 'Pending')
  const isValid = certificateData.certificate_status !== 'Pending';

  return (
    <>
      <Helmet>
        <title>Certificate Verification - {certificateId} | Azentra Global</title>
        <meta name="description" content={`Verify SAIP certificate ${certificateId} issued by Azentra Global`} />
      </Helmet>

      <div className={`min-h-screen ${isValid ? 'bg-gradient-to-br from-green-50 via-white to-blue-50' : 'bg-gradient-to-br from-red-50 via-white to-red-50'} flex items-center justify-center p-4`}>
        <Card className="w-full max-w-4xl mx-auto shadow-2xl">
          <CardHeader className="text-center relative overflow-hidden">
            <div className={`absolute inset-0 ${isValid ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-red-500 to-red-600'} opacity-10`}></div>
            <div className="relative z-10">
              {isValid ? (
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              )}
              <CardTitle className="text-3xl font-bold mb-2">
                {isValid ? 'Certificate Verified' : 'Certificate Invalid'}
              </CardTitle>
              <p className="text-gray-600">
                Certificate ID: <span className="font-mono font-bold">{certificateData.certificate_id}</span>
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {isValid ? (
              <div className="space-y-8">
                {/* Certificate Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Student Name</p>
                        <p className="font-semibold text-lg">{certificateData.student_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Program</p>
                        <p className="font-semibold">{certificateData.program_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="font-semibold">{certificateData.organization}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Program Period</p>
                        <p className="font-semibold">
                          {new Date(certificateData.start_date).toLocaleDateString()} - {new Date(certificateData.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Issue Date</p>
                        <p className="font-semibold">{new Date(certificateData.issue_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Registration Number</p>
                      <Badge variant="secondary" className="text-md px-3 py-1">
                        {certificateData.registration_number}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Certificate Preview Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Certificate Verification</h3>
                  <p className="text-gray-600 mb-4">
                    A beautifully designed certificate recognizing your achievement in the SAIP program.
                  </p>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Verification Details */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-semibold text-green-700">Verification Successful</span>
                  </div>
                  <p className="text-sm text-green-600">
                    This certificate was issued on {new Date(certificateData.issue_date).toLocaleDateString()} and is valid.
                  </p>
                  {certificateData.verified_on && (
                    <p className="text-xs text-gray-500 mt-2">
                      Verified on: {new Date(certificateData.verified_on).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Alert className="mb-6">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    This certificate appears to be {certificateData.certificate_status}. Please contact Azentra Global support for assistance.
                  </AlertDescription>
                </Alert>
                <Button onClick={() => window.location.href = '/skill-advancement-internship-program'}>
                  Back to SAIP
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CertificateVerification;