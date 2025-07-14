// scenesolver-frontend/src/components/HistoryPage.js

import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import styles from './HistoryPage.module.css';
import ResultsPage from './ResultsPage';
import { FaArchive, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import api from '../api';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // The API call is now incredibly simple.
                // The baseURL and the auth token are handled automatically by our `api` instance.
                const res = await api.get('/analysis/history');
                console.log("📦 Received history:", res.data); // ✅ ADD THIS
                setHistory(res.data);

            } catch (err) {
                console.error("Failed to fetch history:", err);
                setError('Could not fetch your analysis history.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []); // The empty array ensures this effect runs only once on mount

    // The logic for loading, error, and selected item remains the same
    // ...

    // --- The only change is in the final return block ---
    if (selectedAnalysis) {
        return (
            <div className={styles.pageContainer}>
                <button 
                    className={styles.backButton} 
                    onClick={() => setSelectedAnalysis(null)}
                >
                    <FaArrowLeft /> Back to History
                </button>
                <ResultsPage analysisData={selectedAnalysis} />
            </div>
        );
    }
    
    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Analysis Archives</h1>
            
            {isLoading ? (
                <div className={styles.statusBox}><FaSpinner className={styles.spinner} /> Loading Archives...</div>
            ) : error ? (
                <div className={`${styles.statusBox} ${styles.errorBox}`}>{error}</div>
            ) : history.length === 0 ? (
                <div className={styles.emptyHistory}>
                    <FaArchive className={styles.emptyIcon} />
                    <h2>No History Found</h2>
                    <p>You haven't analyzed any scenes yet. Go to the Upload page to get started!</p>
                </div>
            ) : (
                <div className={styles.historyGrid}>
                    {history.map((analysis) => (
                        <div 
                            key={analysis._id} 
                            className={styles.historyCard}
                            onClick={() => setSelectedAnalysis(analysis)}
                        >
                            {/* --- THIS IS THE UPDATED SECTION --- */}
                            {analysis.mediaType === 'video' ? (
                                <video
                                    src={analysis.mediaUrl}
                                    className={styles.cardMedia}
                                    muted      // IMPORTANT: Mute videos to allow autoplay and not annoy users
                                    loop       // Loop the video preview
                                    autoPlay   // Autoplay the muted preview
                                    playsInline // Important for mobile browsers
                                    preload="metadata" // Optimizes loading
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={analysis.mediaUrl}
                                    alt="Analyzed scene"
                                    className={styles.cardMedia}
                                />
                            )}
                            
                            {/* The text overlay remains the same */}
                            <div className={styles.cardOverlay}>
                                <h3>{new Date(analysis.createdAt).toLocaleDateString()}</h3>
                                <p>Click to view report</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;