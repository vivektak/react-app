import * as Constants from '../Constants/Constants';

export const checkEmailValidation = (email) => {
    const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
    if (email.trim() === "") {
        //setEmailError(Constants.EMAIL_REQUIRE);
        return Constants.EMAIL_REQUIRE;
    } else if (email.match(emailRegex) === null) {
        //setEmailError(Constants.INVALID_EMAIL);
        //return false;
        return Constants.INVALID_EMAIL
    }
    else {
        //setEmailError(null);
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

export const checkDescriptionValidation = (description) => {
    if (description === '') {
        console.log(description)
        return Constants.DESCRIPTION_REQUIRE;

    } else {
        return null;
    }
}

export const checkMandatorySkillsValidation = (mandatorySkills) => {
    if (mandatorySkills.length === 0) {
        return Constants.SKILLS_REQUIRE;

    } else {
        return null;
    }
}

export const checkNoOfPositionsValidation = (noOfPositions) => {

    if (noOfPositions === "1" || noOfPositions === "") {
        return Constants.NO_OF_POSITIONS_REQUIRE;

    } else {
        return null;
    }
}

export const checkLocationValidation = (location) => {
    console.log(location)
    if (location === '') {
        console.log('jai')
        return Constants.LOCATION_REQUIRE;
    } else {
        console.log('veeru')
        return null;
    }
}

export const checkSkillValidation = (skill) => {
    console.log(skill)
    if (skill === '') {
        return Constants.SKILL_REQUIRE;

    } else {
        return null;
    }
}

export const checkMobileValidation = mobile => {
    const mobileRegex = /^[0]?[789]\d{9}$/;
    console.log(mobile);
    if (mobile === '') {
        return Constants.MOBILE_REQUIRE;
    } else if (!mobileRegex.test(parseInt(mobile))) {
        return Constants.INVALID_MOBILE;
    } else {
        return null;
    }
}

export const checkNameValidation = name => {
    console.log(name);
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
