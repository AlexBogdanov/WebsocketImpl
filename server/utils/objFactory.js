const objFactory = {
    createObj: (data, objFields) => {
        return objFields.reduce((acc, f) => {
            acc[f] = data[f];
            return acc;
        }, {});
    },
    checkIfAllFieldsArePresent: (obj, requiredFields) => {
        return requiredFields.every(f => {
            return obj.hasOwnProperty(f);
        });
    },
    checkIfAnyFieldIsPresent: (obj, requiredFields) => {
        return requiredFields.some(f => {
            return obj.hasOwnProperty(f);
        });
    },
    getPresentFields: (obj, requiredFields) => {
        const presentFields = [];

        requiredFields.forEach(f => {
            if (obj.hasOwnProperty(f)) {
                presentFields.push(f);
            }
        });

        return presentFields;
    },
    cloneAndUpdateAnObj: (obj, data, allFields, fieldsToUpdate) => {
        const newObj = {};

        allFields.forEach(f => {
            if (fieldsToUpdate.includes(f)) {
                newObj[f] = data[f];
            } else {
                newObj[f] = obj[f];
            }
        });

        return newObj;
    }
};

module.exports = objFactory;