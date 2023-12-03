import React, { useState } from 'react';
import ModelViewer from '../ModelViewer/ModelViewer';
// import LearningForm from '../LearningForm/LearningForm';
import LearningStatus from '../LearningStatus/LearningStatus';

import { LearningForm, LearningFormData } from '../LearningForm/LearningForm';

import './MainContent.css'

interface UserLearningData {
    level: number;
    nextLevelExperience: number;
    totalExperience: number;
    languageHours: { [language: string]: number };
}

const MainContent: React.FC = () => {
    const [userLearningData, setUserLearningData] = useState<UserLearningData>({
        level: 1,
        nextLevelExperience: 10,
        totalExperience: 0,
        languageHours: { 
            "HTML": 0,
            "CSS": 0,
            "JavaScript": 0,
            "React":0,
            "TypeScript":0,
            "Node.js":0
        }
    });

    const handleLearningDataSubmit = (data: LearningFormData) => {
        // 現在の経験値とレベルを取得
        let { level, nextLevelExperience, totalExperience, languageHours } = userLearningData;

        // 学習時間を経験値に追加
        totalExperience += data.hours;

        // 学習言語の時間を更新
        if (data.language in languageHours) {
            languageHours[data.language] += data.hours;
        }

        // レベルアップの計算
        while (totalExperience >= nextLevelExperience) {
            totalExperience -= nextLevelExperience;
            level++;
            // 次のレベルに必要な経験値を更新（最大20時間まで増加）
            nextLevelExperience = Math.min(nextLevelExperience + 5, 20);
        }

        // 状態を更新
        setUserLearningData({ level, nextLevelExperience, totalExperience, languageHours });
    };

    return (
        <main>
            <div className="main-content">
                <div className="model-viewer-container">
                    <ModelViewer level={userLearningData.level} />
                </div>
                <div className="form-status-container">
                    <LearningForm onLearningDataSubmit={handleLearningDataSubmit} />
                    <LearningStatus userLearningData={userLearningData} />
                </div>
            </div>
    </main>
    );
};

export default MainContent;