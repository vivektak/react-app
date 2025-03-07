import React, { useEffect } from "react";
import ReactExport from "react-export-excel";
import { Button } from '@material-ui/core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Export = (props) => {

    useEffect(() => {
        if (props.data[0] && props.data[0].mandatorySkills) {
            props.data.map(row => {
                if (row.mandatorySkills.length > 0) {
                    row.mandatorySkills = row.mandatorySkills.toString();
                }
                if (row.goodToHaveSkills.length > 0) {
                    row.goodToHaveSkills = row.goodToHaveSkills.toString();
                } else {
                    row.goodToHaveSkills = '';
                }
                if (row.location.length) {
                    row.location = row.location.toString();
                }
            })
        }
    }, [props])

    return (<ExcelFile filename="Report" element={(<Button> Export Excel </Button>)}>

        {props.data[0] && props.data[0].mandatorySkills ?
            <ExcelSheet data={props.data} name='Openings'>
                <ExcelColumn label="ID" value="_id" />
                <ExcelColumn label="Title" value="title" />
                <ExcelColumn label="Type" value="type" />
                <ExcelColumn label="Job Type" value="jobType" />
                <ExcelColumn label="Experience(in years)" value="experience" />
                <ExcelColumn label="No of Positions" value="noOfPositions" />
                <ExcelColumn label="Location" value="location" />
                <ExcelColumn label="Mandatory Skill" value="mandatorySkills" />
                <ExcelColumn label="Good To Have Skill" value="goodToHaveSkills" />
            </ExcelSheet>
            :
            <ExcelSheet data={props.data} name='Openings'>
                <ExcelColumn label="Name" value="name" />
            </ExcelSheet>
        }
    </ExcelFile >);
}

export default Export;
