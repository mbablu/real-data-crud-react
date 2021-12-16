import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom";
import "./AddEdit.css";
import fireDb from '../firebase';
import "./AddEdit.css";


const initialState = {
    name: "",
    email: "",
    contact: ""
}
const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({})

    const { name, email, contact } = state;
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fireDb.child("contacts").on("value", (snapshot) => {
            if(snapshot.val() !== null){
                setData({ ...snapshot.val() });
            }else {
                setData({});
            }
        })
        return () => {
            setData({});
        }
    },[id]);

    useEffect(() => {
        if(id){
            setState({ ...data[id] })
        }else {
            setState({ ...initialState })
        }
        return () => {
            setState({ ...initialState })
        }
    }, [id, data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("please provide value in each input field");
        } else {
            if(!id){
                fireDb.child("contacts").push(state, (err) => {
                    if(err){
                        toast.error(err);
                    }else {
                        toast.success("contact added successfully");
                    }
                });
            }else {
                fireDb.child(`contacts/${id}`).set(state, (err) => {
                    if(err){
                        toast.error(err);
                    }else {
                        toast.success("contact Updated successfully");
                    }
                });
            }
            
            setTimeout(() => navigate('/'), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div style={{marginTop: "100px"}}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    placeHolder='Your Name'
                    value={name || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeHolder='Your Email'
                    value={email || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="contact">Contact</label>
                <input 
                    type="number"
                    id="contact"
                    name="contact"
                    placeHolder='Your Contact Number'
                    value={contact || ""}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? "Update" : "Save"} />
            </form>
        </div>
    )
}

export default AddEdit
