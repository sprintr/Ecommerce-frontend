import React from "react";
import { useState } from 'react';

import Layout from '../core/Layout'
import { isAuthenticated } from "../auth";
import {createCategory} from './apiAdmin'
const AddCategory=()=>{
    const [name,setName]=useState('')
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
    //destructure user and token from local storage
    const {user,token}=isAuthenticated();

    const handleChange=(e)=>{
        setError('')
        setName(e.target.value)
    }
    const clickSubmit=(e)=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryForm=()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type='text' className="form-control" onChange={handleChange} value={name} autoFocus required/>
                
            </div>
            <button className="btn btn-out-line-primary">Create Category</button>
        </form>
    )

    const showSuccess=()=>{
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }
    const showError=()=>{
        if(error){
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }  
    return(
        <Layout title="Add a new Category" description={`G'day ${user.name}!,ready to add new category`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    </div>
            </div>
        </Layout>
    )
}
export default AddCategory