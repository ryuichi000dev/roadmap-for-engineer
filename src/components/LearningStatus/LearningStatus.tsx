import React from 'react';

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
    return (
        <div>
            <h2>学習状況</h2>
            <p>現在のレベル: {userLearningData.level}</p>
            <p>次のレベルまで: {userLearningData.nextLevelExperience} 時間</p>
            {/* 進捗バーは適切なコンポーネントやスタイルを使って実装 */}
            <div>
                {Object.entries(userLearningData.languageHours).map(([language, hours]) => (
                    <p key={language}>{language}：{hours}時間</p>
                ))}
            </div>
        </div>
    );
};

export default LearningStatus;
