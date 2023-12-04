import React, { useState } from 'react';
import './LearningForm.css'

export interface LearningFormData {
    language: string;
    hours: number;
}

export interface EventFormData {
    keyword: string;
}

interface LearningFormProps {
    onLearningDataSubmit: (data: LearningFormData) => void;
}

interface EventFormProps {
    onEventDataSubmit: (data: EventFormData) => void;
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
                <h2>学習記録を入力</h2>
                <label>言語:</label>
                <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Node.js">Node.js</option>
                    
                </select>
            </div>
            <div>
                <label>勉強時間 (時間):</label>
                <input
                    type="number"
                    min={0}
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                />
            </div>
            <div className="button-container">
                <button type="submit">登録</button>
            </div>
        </form>

    );
};


export const EventForm: React.FC<EventFormProps> = ({ onEventDataSubmit }) => {
    const [eventFormData, setEventFormData] = useState<EventFormData>({ keyword: ''});

    const handleEventSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onEventDataSubmit(eventFormData);
        setEventFormData({ keyword: ''});
    };


    return (
        <form onSubmit={handleEventSubmit} className='learning-form'>
            <div>
                <h2>イベント参加記録を入力</h2>
                <label>イベント参加コード:</label>
                <input
                    value={eventFormData.keyword}
                    onChange={(e) => setEventFormData({ ...eventFormData, keyword: e.target.value })}
                />
            </div>
            <div className="button-container">
                <button type="submit">登録</button>
            </div>
        </form>
    );
};

// export default LearningForm;
