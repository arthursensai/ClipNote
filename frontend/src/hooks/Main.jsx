import React, { useState } from 'react';
import Form from './Form';

const Main = () => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [textSubmitted, setTextSubmitted] = useState(false);

    const handleSummarize = async (text, summaryType) => {
        // Reset states
        setIsLoading(true);
        setError(null);
        setTextSubmitted(true);
        setSummary('');

        // Map the UI summary type to API parameter
        const apiSummaryType = {
            'concise': 'short',
            'standard': 'medium',
            'detailed': 'detailed'
        }[summaryType] || 'short';

        try {
            const response = await fetch('/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    type: apiSummaryType
                }),
            });

            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with status ${response.status}`);
            }

            const data = await response.json();
            setSummary(data.message);
        } catch (err) {
            setError(err.message || 'An error occurred while summarizing the text.');
            console.error('Summarization error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="max-w-4xl mx-auto p-4">
            <div className="mb-8">
                <Form onSubmit={handleSummarize} />
            </div>

            {textSubmitted && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Summary Result</h2>
                    
                    {isLoading && (
                        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                            <div className="animate-pulse flex space-x-4 items-center">
                                <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                                <div className="h-4 w-4 bg-blue-600 rounded-full animation-delay-200"></div>
                                <div className="h-4 w-4 bg-blue-600 rounded-full animation-delay-400"></div>
                                <span className="text-gray-700 ml-2">Generating summary...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="font-medium">Summarization failed: {error}</p>
                            </div>
                            <p className="mt-1 text-sm">Please try again or contact support if the issue persists.</p>
                        </div>
                    )}

                    {!isLoading && !error && summary && (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <p className="text-gray-800 leading-relaxed">{summary}</p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                <button 
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                    onClick={() => {
                                        navigator.clipboard.writeText(summary);
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy to clipboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default Main;