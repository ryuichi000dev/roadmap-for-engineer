import React from 'react';
import './LearningStatus.css'

interface UserLearningData {
    level: number;
    nextLevelExperience: number;
    totalExperience: number;
    languageHours: { [language: string]: number };
}

interface LearningStatusProps {
    userLearningData: UserLearningData;
}

const LearningStatus: React.FC<LearningStatusProps> = ({ userLearningData }) => {

    const progress = userLearningData.totalExperience / userLearningData.nextLevelExperience;

    return (
        <div>
            <h2>学習状況</h2>
            <p>現在のレベル: {userLearningData.level}</p>
            <p>次のレベルまで: {userLearningData.nextLevelExperience - userLearningData.totalExperience} 時間</p>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }}></div>
            </div>
            <div>
                {Object.entries(userLearningData.languageHours).map(([language, hours]) => (
                    <p key={language}>{language}：{hours}時間</p>
                ))}
            </div>
        </div>
    );
};

export default LearningStatus;
