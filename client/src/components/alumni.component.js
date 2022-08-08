import React, { Component } from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { bootstrap } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StaffContainer.css";
import { Link, useNavigate } from 'react-router-dom'

// export default class StaffContainer extends Component {
const AlumniComponent = ({name,lastName,email, contactNo,address,jobTitle,company,img,nic,graduatedYear }) => {

    const navigate = useNavigate();
    const toComponentB=(name, lastName, email,nic,contactNo,address,jobTitle,company,graduatedYear, new_img)=>{
        navigate('/profile-list',{state:{  
            name:name,
            lastName, lastName,
            email: email,
            nic: nic,
            contactNo: contactNo,
            address: address,
            jobTitle: jobTitle,
            company: company,
            graduatedYear: graduatedYear,
            img: new_img
        }});
    }


    let new_img = "profile_img.jpg";

    if(img !== ''){
        new_img = img
    }
    
    return (
        <Wrapper>

            <div class="card col-md-8">
                    <div class="row">
                        <div class="col-md-2">
                            <img class="profile-img" src={`uploads/${new_img}`} alt="Sunflower" />
                        </div>
                        <div class="col-md-7">
                            
                            <div className="row">
                            <h5><b>{name} {lastName}</b></h5>
                            <p>{email}</p>
                        </div>
                        </div>
                        <div class="col-md-2">
                        <button
                          className='btn btn-primary'
                          onClick={(e) => {
                            toComponentB(name, lastName, email,nic,contactNo,address,jobTitle,company,graduatedYear, new_img)
                          }}
                        >
                          View
                        </button>
                        </div>
                    </div>
            </div>
            {/* <div class="card col-md-6">
            <div>
                <div>
                    <img class="profile-img" src={`uploads/${new_img}`} alt="Sunflower" />
                    <h5>{name} {lastName}</h5>
                </div>
                    <div className="row">
                        <p>Email: {email}</p>
                        <p>NIC: {nic}</p>
                        <p>Contact NO: {contactNo}</p>
                        <p>Address: {address}</p>
                        <p>Job Title: {jobTitle}</p>
                        <p>Company: {company}</p>
                        <p>Graduated Year: {graduatedYear}</p>
                        <a href="#" class="btn btn-primary">
                        View
                        </a>
                    </div>
                </div>
                </div>
            <div>
            </div> */}
        </Wrapper>
    );
}
 
export default AlumniComponent
