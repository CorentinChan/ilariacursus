import { useState } from 'react'


export default function  QuestionForm() {
    const [inputValue, setInputValue] = useState('Posez votre question ici')
    return (
        <div>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                
            />
            
            <p>{inputValue}</p>
        </div>
    )
}