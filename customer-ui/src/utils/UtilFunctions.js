const toCapitalize = (s) => s.length > 0 ? s[0].toUpperCase() + s.slice(1) : '';

const indianNumberFormat = (price) => {
    if (price === undefined)
        return '';
    let priceStr = price.toString();
    let result = '';
    let count = 0;
    let isThousandCounted = false;

    for (let i = priceStr.length - 1; i >= 0; i--) {
        count++;
        if (count === 4 && !isThousandCounted) {
            result = ',' + result;
            count = 1;
            isThousandCounted = true;
        }
        else if (count === 3 && isThousandCounted) {
            result = ',' + result;
            count = 1;
        }

        result = priceStr[i] + result;
    }

    return result;
}

const removeEmptyFields = (fields) => {
    for (const key of Object.keys(fields)) {
        let value = fields[key];
        if (typeof value === 'object' && value !== null) {
            let retObj = removeEmptyFields(value);
            if (Object.keys(retObj).length === 0)
                delete fields[key]
        }
        else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                if (typeof value[i] === 'object' && value[i] !== null) {
                    value[i] = removeEmptyFields(value[i]);
                    if (Object.keys(value[i]).length === 0)
                        value.splice(i, 1);
                }
                else {
                    if (!value[i])
                        value.splice(i, 1);
                }
            }

        }
        else {
            if (!value)
                delete fields[key];
        }
    }
    return fields;
}

const removeEmptyItems = (obj) => {
    for (const key of Object.keys(obj)) {
        let value = obj[key];
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                if (typeof value[i] === 'object' && value[i] !== null) {
                    value[i] = removeEmptyItems(value[i]);
                }
            }
            obj[key] = value.filter((e) => e);
        }
        else if (typeof value === 'object' && value !== null) {
            let retObj = removeEmptyItems(value);
        }
    }
    return obj;
}

const removeEmptyParams = (obj) => {
    return removeEmptyItems(removeEmptyFields(obj));
}

export { toCapitalize, indianNumberFormat, removeEmptyParams };