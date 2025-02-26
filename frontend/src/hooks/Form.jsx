import React, { useState } from 'react';

const Form = () => {
    const [text, setText] = useState('');
    const [summaryType, setSummaryType] = useState('standard');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your summarization logic here
        console.log('Text to summarize:', text);
        console.log('Summary type:', summaryType);
    };
    
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Write below the text you want to summarize
                </h2>
                
                <textarea 
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-64 text-gray-700"
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-700">Summary Type</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                summaryType === 'standard' 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                            onClick={() => setSummaryType('standard')}
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full border ${
                                    summaryType === 'standard' 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-gray-400'
                                }`}>
                                    {summaryType === 'standard' && (
                                        <div className="w-2 h-2 mx-auto mt-1 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className="font-medium">Standard</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                A balanced summary with key points and main ideas.
                            </p>
                        </div>
                        
                        <div 
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                summaryType === 'concise' 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                            onClick={() => setSummaryType('concise')}
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full border ${
                                    summaryType === 'concise' 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-gray-400'
                                }`}>
                                    {summaryType === 'concise' && (
                                        <div className="w-2 h-2 mx-auto mt-1 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className="font-medium">Concise</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                Brief summary with only the most essential information.
                            </p>
                        </div>
                        
                        <div 
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                summaryType === 'detailed' 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                            onClick={() => setSummaryType('detailed')}
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full border ${
                                    summaryType === 'detailed' 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-gray-400'
                                }`}>
                                    {summaryType === 'detailed' && (
                                        <div className="w-2 h-2 mx-auto mt-1 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className="font-medium">Detailed</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                Comprehensive summary with supporting details and context.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button 
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Summarize
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;