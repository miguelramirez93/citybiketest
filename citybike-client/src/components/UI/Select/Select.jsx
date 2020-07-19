import React, { Fragment } from 'react'

const Select = (props) => {
    const { options } = props
    const optionTag = options.map((option, i) => (
        <option value={option.value} key={i}>{option.key}</option>
    ));
    return (
        <Fragment>
            <select value={props.value} onChange={props.onChange}>
                {optionTag}
            </select>
        </Fragment>
    )
}

export default Select;