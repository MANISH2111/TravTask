import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {
    const { name, value, label, onChange } = props;

    const convertTODefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant='inline'
                inputVariant='outlined'
                label={label}
                name={name}
                value={value}
                format='dd/MMM/yyyy'
                onChange={(date) => onChange(convertTODefEventPara(name, date))}
            />
        </MuiPickersUtilsProvider>
    );
}
