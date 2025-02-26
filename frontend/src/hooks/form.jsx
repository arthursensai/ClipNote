import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Form = ({ onSubmit }) => {
    const [text, setText] = useState("");
    const [summaryType, setSummaryType] = useState("standard");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            onSubmit(text, summaryType);
        }, 2000); // Simulated loading time
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.h2 
                    className="text-2xl font-bold text-gray-800 mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Write below the text you want to summarize
                </motion.h2>

                <motion.textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-64 text-gray-700"
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                />

                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-700">Summary Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["standard", "concise", "detailed"].map((type) => (
                            <motion.div
                                key={type}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                    summaryType === type
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}
                                onClick={() => setSummaryType(type)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`w-4 h-4 rounded-full border ${
                                            summaryType === type
                                                ? "border-blue-500 bg-blue-500"
                                                : "border-gray-400"
                                        }`}
                                    >
                                        {summaryType === type && (
                                            <div className="w-2 h-2 mx-auto mt-1 bg-white rounded-full" />
                                        )}
                                    </div>
                                    <span className="font-medium capitalize">{type}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    {type === "standard"
                                        ? "A balanced summary with key points and main ideas."
                                        : type === "concise"
                                        ? "Brief summary with only the most essential information."
                                        : "Comprehensive summary with supporting details and context."}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <motion.button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Summarizing..." : "Summarize"}
                    </motion.button>
                </div>
            </form>

            {/* Loading Animation */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="mt-4 flex justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Form;
