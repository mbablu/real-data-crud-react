import React, {useState,useEffect} from 'react';
import fireDb from "../firebase";
import { useParams, Link } from 'react-router-dom';
import "./View.css"

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        fireDb.child(`contacts/${id}`).get().then((snapshot) => {
            if(snapshot.exists()){
                setUser({ ...snapshot.val() });
            }else {
                setUser({});
            }
        })
    }, [id]);

    return (
        <div style={{marginTop:"100px"}}>
            <div className='card'>
                <div className='card-header'>
                    <p>User Contact Details</p>
                </div>
                <div className='container'>
                    <p>
                        <strong>Id: </strong>
                        <span>{id}</span>
                    </p>

                    <p>
                        <strong>Name: </strong>
                        <span>{user.name}</span>
                    </p>

                    <p>
                        <strong>Email: </strong>
                        <span>{user.email}</span>
                    </p>

                    <p>
                        <strong>Contact: </strong>
                        <span>{user.contact}</span>
                    </p>
                    <Link to="/">
                        <button className='btn btn-edit'>Go Back</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default View
