import React, { useState } from 'react';
import './LearningForm.css'

export interface LearningFormData {
    language: string;
    hours: number;
}

interface LearningFormProps {
    onLearningDataSubmit: (data: LearningFormData) => void;
}

export const LearningForm: React.FC<LearningFormProps> = ({ onLearningDataSubmit }) => {
    const [formData, setFormData] = useState<LearningFormData>({ language: 'HTML', hours: 0 });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onLearningDataSubmit(formData);
        setFormData({ language: 'HTML', hours: 0 });
    };

    return (
        <form onSubmit={handleSubmit} className='learning-form'>
            <div>
                <label>言語:</label>
                <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                </select>
            </div>
            <div>
                <label>勉強時間 (時間):</label>
                <input
                    type="number"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                />
            </div>
            <button type="submit">登録</button>
        </form>
    );
};

// export default LearningForm;