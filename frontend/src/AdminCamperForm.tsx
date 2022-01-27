// Page for admin to edit camper's information form

import React from 'react';
import {Button, Container} from "react-bootstrap";
import './HouseholdForm.css';

import axios from 'axios';
import AuthService from './services/auth-service';
import CamperService from './services/camper-service';
import ParentService from "./services/parent-service";



interface Props {
    firstName: string,
    lastName: string,
    genderEnum: string,
    dobDate: string,
    schoolName: string,
    gradeNum: number,
    shirtEnum: string,
    doctorName: string,
    doctorPhone: string,
    insurance: string,
    policy_holder: string,
    illnesses: string,
    allergies: string,
    medication: string,
    medication_names: string,
    activities: string,
    activity_names: string,
    medical_treatments: string,
    medical_treatment_names: string,
    immunizations: string,
    tetanus_date: string,
    comment: string,
    parent: number,
    camperName: string
}


export const AdminCamperForm: React.FC<Props> = () => {
    const [showDelForm, setDelForm] = React.useState(false);
    const [user_id, setUser_id] = React.useState(0);

    const DelForm = () => <div className="form-popup" id="myForm">
        <form className="form-container center" >
            <p> Are you sure you want to delete this camper? </p>
            <Button variant="danger" className="formBtn"   onClick={handleDeleteCamper} >Delete</Button>
            <br />
            <Button variant="secondary" className="formBtn" onClick={handleCancelDeleteCamperForm}>Cancel</Button>
        </form>
    </div>;

    const handleCancelDeleteCamperForm = () => {
        setDelForm(false);
    }


    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        genderEnum: '-- Select --', // Default to other. If they do not select anything, I don't want it to crash the db due to a val not equaling male,female,other
        dobDate: '',
        schoolName: '',
        gradeNum: -2,
        shirtEnum: '-- Select --',
        doctorName: '',
        doctorPhone: '',
        insurance: '',
        policy_holder: '',
        illnesses: '-- Select --',
        illnesses_names: '',
        allergies: '-- Select --',
        allergy_names: '',
        medication: '-- Select --',
        medication_names: '',
        activities: '-- Select --',
        activity_names: '',
        medical_treatments: '-- Select --',
        medical_treatment_names: '',
        immunizations: '-- Select --',
        tetanus_date: '',
        comment: '',

        userID: null,

    });


    React.useEffect(() => {

        let name:string | null;
        let named:string | null;
        name = localStorage.getItem("currentChild");
        let camper = localStorage.getItem("currentChildID")
        if (typeof name =="string" && name !==""){
            named = name;
            // console.log("hello");
            CamperService.getCamperInfo(camper).then(response => {
                if (response.status===200){
                    setValues(response.data);
                    setUser_id(response.data.userID);
                    console.log(response.data.userID);
                }
                else if (response.status===400){
                    return false;
                }

            })
        }


    }, [])



    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        // const currentUser = AuthService.currentUser();
        // let user_id = currentUser.id;
        e.preventDefault();
        const {firstName, lastName, genderEnum, dobDate, schoolName, gradeNum, shirtEnum, doctorName, doctorPhone, insurance, policy_holder, illnesses, illnesses_names, allergy_names,
            allergies, medication, medication_names, activities, activity_names, medical_treatments, medical_treatment_names,
            immunizations, tetanus_date, comment} = values;
        await CamperService.addCamper(firstName, lastName, genderEnum, dobDate, schoolName, gradeNum, shirtEnum, doctorName, doctorPhone, insurance,
            policy_holder, illnesses, illnesses_names, allergies, allergy_names, medication, medication_names, activities, activity_names, medical_treatments,
            medical_treatment_names, immunizations, tetanus_date, comment, user_id);
        window.location.href = "#/admin/managecampers"
        window.location.reload();
    };
    const handleChange = (name: string) => (e: { target: { value: any; }; }) => {
        setValues({...values, [name]: e.target.value});
    };

    const handleDeleteCamper = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let camperID = localStorage.getItem("currentChildID");

        if (camperID != null) {
            await CamperService.delCamper(parseInt(camperID));
        }
        //window.location.href = "#/admin/managecampers"
        //window.location.reload();
    };

    const handleDeleteCamperForm = () => {
        setDelForm(true);
    }



    return (
        <div className="CamperForm">

            <body>
            <br/>
            <Container className="Text-Form">


                <form onSubmit={handleSubmit}>
                    <Button variant="primary" className="backButton" href="/#/admin/managecampers"> Back </Button>
                    <br/><br/>
                    <h3> Camper Form </h3>
                    <br/>
                    <p><b>*</b> Indicates a mandatory field.</p>
                    <h5> Camper Info </h5>
                    <p><b>* </b>First Name</p>
                    <input type="text" required
                           onChange={handleChange('firstName')} defaultValue={values.firstName}/>

                    <p><b>* </b>Last Name</p>
                    <input type="text" required
                           onChange={handleChange('lastName')} defaultValue={values.lastName}/>
                    <p><b>* </b>School Name</p>
                    <input type="text" required
                           onChange={handleChange('schoolName')} defaultValue={values.schoolName}/>

                    <p><b>* </b>Grade Level</p>
                    <select onChange={handleChange('gradeNum')} required value={values.gradeNum} >
                        <option value=""> -- Select --</option>
                        <option value="-1">Pre-Kindergarten</option>
                        <option value="0">Kindergarten</option>
                        <option value="1">1st Grade</option>
                        <option value="2">2nd Grade</option>
                        <option value="3">3rd Grade</option>
                        <option value="4">4th Grade</option>
                        <option value="5">5th Grade</option>
                        <option value="6">6th Grade</option>
                        <option value="7">7th Grade</option>
                        <option value="8">8th Grade</option>
                        <option value="9">9th Grade</option>
                        <option value="10">10th Grade</option>
                        <option value="11">11th Grade</option>
                        <option value="12">12th Grade</option>
                    </select>


                    <p><b>* </b>Gender</p>
                    <select onChange={handleChange('genderEnum')} required value={values.genderEnum}>
                        <option value=""> -- Select --</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>

                    <p><b>* </b>Shirt Size</p>
                    <select onChange={handleChange('shirtEnum')} required value={values.shirtEnum}>
                        <option value=""> -- Select --</option>
                        <option value="XSMALL">Extra Small</option>
                        <option value="SMALL">Small</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LARGE">Large</option>
                        <option value="XLARGE">Extra Large</option>
                    </select>

                    <p><b>* </b>Date of Birth</p>
                    <input type="date" required onChange={handleChange('dobDate')} defaultValue={values.dobDate}/>


                    <h5> Health Info </h5>


                    <p><b>* </b>Primary Physician's Name</p>
                    <input type="text" required onChange={handleChange('doctorName')} defaultValue={values.doctorName}/>
                    <p><b>* </b>Primary Physician's Phone Number</p>
                    <input type="text" required onChange={handleChange('doctorPhone')} defaultValue={values.doctorPhone}
                           placeholder={"000-000-0000"}/>
                    <p><b>* </b>Insurance Carrier</p>
                    <input type="text" required onChange={handleChange('insurance')} defaultValue={values.insurance}/>
                    <p><b>* </b>Policy Holder's Name</p>
                    <input type="text" required onChange={handleChange('policy_holder')} defaultValue={values.policy_holder}/>
                    <br/>


                    <h5> Health Questionnaire </h5>


                    <p><b>* </b>Does your child have any chronic conditions or illnesses? If <u>yes</u>, please list conditions.</p>
                    <select className="sameRow" required onChange={handleChange('illnesses')} value={values.illnesses}>
                        <option value=""> -- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <input className="sameRow" type="text"  onChange={handleChange('illnesses_names')} defaultValue={values.illnesses_names}/>
                    
                    <p><b>* </b>Does your child have any allergies and/or dietary restrictions? If <u>yes</u>, please list restrictions.</p>
                    <select className="sameRow" required onChange={handleChange('allergies')} value={values.allergies}>
                        <option value=""> -- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <input className="sameRow" type="text" onChange={handleChange('allergy_names')} defaultValue={values.allergy_names}/>

                    <p><b>* </b>Will your child be taking any medication at camp? If <u>yes</u>, please list medications.
                    </p>
                    <select className="sameRow" required onChange={handleChange('medication')} value={values.medication}>
                        <option value=""> -- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <input className="sameRow" type="text" onChange={handleChange('medication_names')} defaultValue={values.medication_names}/>

                    <p><b>* </b>Are there any camp activities that your child cannot participate in? If  <u>yes</u>, please list
                        activities.</p>
                    <select className="sameRow" required onChange={handleChange('activities')} value={values.activities}>
                        <option value=""> -- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <input className="sameRow" type="text" onChange={handleChange('activity_names')} defaultValue={values.activity_names}/>

                    <p><b>* </b>Has your child undergone any medical treatments? If <u>yes</u>, please list treatments.</p>
                    <select className="sameRow" required onChange={handleChange('medical_treatments')} value={values.medical_treatments}>
                        <option value=""> -- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <input className="sameRow" type="text" onChange={handleChange('medical_treatment_names')} defaultValue={values.medical_treatment_names}/>

                    <p><b>* </b>Has your child received all current immunizations?</p>
                    <select required onChange={handleChange('immunizations')} value={values.immunizations}>
                        <option value=""> -- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    
                    <p><b>* </b>What is the date (approximate if necessary) of your child's last tetanus shot?</p>
                    <input type="date" required onChange={handleChange('tetanus_date')} defaultValue={values.tetanus_date}/>

                    <h5> Extra Comments </h5>

                    <p> Do you have any additional comments about this camper? </p>
                    <textarea name="paragraph_text" onChange={handleChange('comment')} defaultValue={values.comment}/>


                    <br/><br/>

                    <div className="center"><Button variant="success" className="buttonTxt"
                                                    type="submit"> Save </Button></div>
                    <br/><hr /><br />
                    <div className="center"><Button variant="danger" onClick={handleDeleteCamperForm}> Delete Camper </Button></div>

                    {showDelForm ? <DelForm />: null}

                </form>
            </Container>
            </body>
        </div>
    )


}
export default AdminCamperForm;