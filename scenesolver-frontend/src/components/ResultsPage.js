// scenesolver-frontend/src/components/ResultsPage.js

import React from 'react';
import styles from './ResultsPage.module.css'; // We will update this file next
import { FaRegLightbulb, FaTag, FaSearch, FaFileAlt } from 'react-icons/fa';

const ResultsPage = ({ analysisData }) => {
    if (!analysisData) {
        return <p>Loading analysis data...</p>;
    }

    // --- UPDATED: Destructure new properties ---
    const { mediaUrl, mediaType, quickCaption, fullStory, sceneKeywords, foundObjects } = analysisData;

    return (
        <div className={styles.resultsContainer}>
            {/* Column 1: The Media (Image or Video) */}
            <div className={`${styles.resultCard} ${styles.mediaCard}`}>
                <h2>Submitted Evidence</h2>
                <div className={styles.mediaViewer}>
                    {/* --- UPDATED: Conditional Rendering --- */}
                    {mediaType === 'video' ? (
                        <video src={mediaUrl} controls className={styles.mediaContent}></video>
                    ) : (
                        <img src={mediaUrl} alt="Analyzed scene" className={styles.mediaContent} />
                    )}
                </div>
            </div>

            {/* Column 2: The Breakdown */}
            <div className={styles.breakdownColumn}>
                <div className={styles.resultCard}>
                    <h2><FaSearch className={styles.icon} /> Objects Identified</h2>
                    <ul className={styles.objectList}>
                        {foundObjects.map((item, index) => (
                            <li key={index}>
                                <span className={styles.label}>{item.object}</span>
                                <span className={styles.match}>Match: {item.match}%</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.resultCard}>
                    <h2><FaTag className={styles.icon} /> Scene Classification</h2>
                     <ul className={styles.keywordList}>
                        {sceneKeywords.map((item, index) => (
                           <li key={index}>
                                <span className={styles.label}>{item.keyword}</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.progress} style={{ width: `${item.match}%` }}>
                                        {item.match}%
                                    </div>
                                </div>
                           </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Column 3: The Full Story */}
            <div className={`${styles.resultCard} ${styles.storyCard}`}>
                 <h2><FaFileAlt className={styles.icon} /> The Full Story</h2>
                 <div className={styles.storySection}>
                    <h3><FaRegLightbulb className={styles.icon} /> Quick Summary</h3>
                    <p className={styles.caption}>{quickCaption}</p>
                 </div>
                 <div className={styles.storySection}>
                    <h3>Detailed Description</h3>
                    <p>{fullStory}</p>
                 </div>
            </div>
        </div>
    );
};

export default ResultsPage;