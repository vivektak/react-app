import * as Constants from '../Constants/Constants';

export const checkEmailValidation = (email) => {
    const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
    if (email.trim() === "") {
        return Constants.EMAIL_REQUIRE;
    } else if (email.match(emailRegex) === null) {
        return Constants.INVALID_EMAIL
    }
    else {
        return null;
    }
}

export const checkPasswordValidation = (password) => {
    if (password.trim() === "") {
        return Constants.PASSWORD_REQUIRE;
    } else if (password.trim().length < 8) {
        return Constants.INVALID_PASSWORD;
    }
    else {
        return null;
    }
}

export const checkTitleValidation = (title) => {
    if (title === '') {
        return Constants.TITLE_REQUIRE;

    } else {
        return null;
    }
}

export const checkJobTypeValidation = (jobType) => {
    if (jobType === '') {
        return Constants.JOB_TYPE_REQUIRE;
    } else {
        return null;
    }
}

export const checkExpValidation = (exp) => {
    if (exp === '') {
        return Constants.EXP_REQUIRE;
    } else {
        return null;
    }
}

export const checkDescriptionValidation = (description) => {
    if (description === '') {
        console.log(description)
        return Constants.DESCRIPTION_REQUIRE;

    } else {
        return null;
    }
}

export const checkNoOfPositionsValidation = (noOfPositions) => {

    if (noOfPositions === "0" || noOfPositions === "") {
        return Constants.NO_OF_POSITIONS_REQUIRE;

    } else if (noOfPositions % 1 !== 0) {
        return 'Should Be Numeric Only';
    } else {
        return null;
    }
}

export const checkLocationValidation = (location) => {
    if (location === '') {
        return Constants.LOCATION_REQUIRE;
    } else {
        return null;
    }
}

export const checkStatusValidation = (status) => {
    if (status === '') {
        return 'Status is Required';
    } else {
        return null;
    }
}

export const checkSkillValidation = (skill) => {
    if (skill === '') {
        return Constants.SKILL_REQUIRE;
    } else {
        return null;
    }
}

export const checkMobileValidation = mobile => {
    const mobileRegex = /^[0]?[789]\d{9}$/;
    if (mobile === '') {
        return Constants.MOBILE_REQUIRE;
    } else if (!mobileRegex.test(parseInt(mobile))) {
        return Constants.INVALID_MOBILE;
    } else if (mobile.length > 10) {
        return Constants.INVALID_MOBILE;
    } else {
        return null;
    }
}

export const checkNameValidation = name => {
    if (name === '') {
        return Constants.NAME_REQUIRE;
    } else {
        return null;
    }
}
export const checkTypeValidation = type => {
    if (type === '') {
        return Constants.TYPE_REQUIRE;
    } else {
        return null;
    }
}



export const checkHRNameValidation = (skill) => {
    if (skill === '') {
        return Constants.SKILL_REQUIRE;
    } else {
        return null;
    }
}