import { useState } from "react";
import { useTRPC } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "~/components/ui/Button";
import { useAuthStore } from "~/stores/authStore";
import { CheckCircle, XCircle, AlertCircle, Play } from "lucide-react";
import toast from "react-hot-toast";

export function MediumScrapingTest() {
  const [testResults, setTestResults] = useState<any>(null);
  const trpc = useTRPC();
  const { token } = useAuthStore();
  
  const testMutation = useMutation(trpc.testMediumScraping.mutationOptions({
    onSuccess: (data) => {
      setTestResults(data);
      if (data.success) {
        toast.success('All Medium scraping tests passed!');
      } else {
        toast.error('Some Medium scraping tests failed. Check results below.');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to run Medium scraping test');
      console.error('Test error:', error);
    },
  }));
  
  const runTest = () => {
    if (!token) {
      toast.error('Authentication token is missing');
      return;
    }
    
    setTestResults(null);
    testMutation.mutate({ authToken: token });
  };

  const renderTestResult = (label: string, passed: boolean, error?: string | null) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center space-x-2">
        {passed ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <span className={`text-sm ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {passed ? 'Pass' : 'Fail'}
        </span>
      </div>
      {error && (
        <div className="mt-1 text-xs text-red-600 max-w-md">
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Medium Scraping Diagnostics</h3>
          <p className="text-sm text-gray-600 mt-1">
            Test the Medium import functionality to diagnose any issues
          </p>
        </div>
        <Button
          onClick={runTest}
          disabled={testMutation.isPending || !token}
          size="sm"
        >
          <Play className="w-4 h-4 mr-2" />
          {testMutation.isPending ? 'Running Test...' : 'Run Test'}
        </Button>
      </div>
      
      {testMutation.isPending && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Running diagnostics...</span>
        </div>
      )}
      
      {testResults && (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-lg border-2 ${
            testResults.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center">
              {testResults.success ? (
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              )}
              <div>
                <h4 className={`font-semibold ${
                  testResults.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResults.success ? 'All Tests Passed' : 'Tests Failed'}
                </h4>
                <p className={`text-sm ${
                  testResults.success ? 'text-green-600' : 'text-red-600'
                }`}>
                  {testResults.success 
                    ? 'Medium scraping should work correctly'
                    : 'Issues detected with Medium scraping setup'
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* Environment Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Environment</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Node Version:</span>
                <span className="ml-2 text-gray-900">{testResults.results.environment.nodeVersion}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Platform:</span>
                <span className="ml-2 text-gray-900">{testResults.results.environment.platform}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Architecture:</span>
                <span className="ml-2 text-gray-900">{testResults.results.environment.arch}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Memory Used:</span>
                <span className="ml-2 text-gray-900">{testResults.results.environment.memory.used}MB</span>
              </div>
            </div>
          </div>
          
          {/* Test Results */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Test Results</h4>
            <div className="space-y-2">
              {renderTestResult(
                'Playwright Installation', 
                testResults.results.playwright.installed,
                testResults.results.playwright.error
              )}
              {renderTestResult(
                'Browser Launch', 
                testResults.results.playwright.browserLaunch
              )}
              {renderTestResult(
                'Page Navigation', 
                testResults.results.playwright.navigation,
                testResults.results.network.error
              )}
              {renderTestResult(
                'Content Extraction', 
                testResults.results.playwright.contentExtraction
              )}
              {renderTestResult(
                'Medium.com Accessible', 
                testResults.results.network.mediumAccessible
              )}
            </div>
          </div>
          
          {/* Network Info */}
          {testResults.results.network.responseTime > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Network Performance</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="font-medium text-gray-600">Response Time:</span>
                  <span className="ml-2 text-gray-900">{testResults.results.network.responseTime}ms</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Status Code:</span>
                  <span className="ml-2 text-gray-900">{testResults.results.network.statusCode}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Recommendations */}
          {testResults.recommendations && testResults.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-1">
                {testResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
