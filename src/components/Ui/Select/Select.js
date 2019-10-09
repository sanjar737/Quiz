import React from 'react';
import cssClasses from './Select.module.css';
export default function Select(props) {
    const htmlFor = `${props.label}-${Math.random()}`

    const renderOption = props.options.map((option, index)=>{
            return (
                <option
                    value={option.value}
                    key={option.value + index}
                >
                    {option.text}
                </option>
            )
        })
    return (
        <div className={cssClasses.select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {renderOption}
            </select>
        </div>
    )
}