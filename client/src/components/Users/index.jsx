import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CategoryContext } from '../../context/categoryContext'
import { userContext } from '../../context/userContext'
import "./index.scss"
import Spinner from '../SecondLoader'

function Users() {

    const [users, setUsers] = useState([])
    const [userId, setuserId] = useState('')
    const { token } = useContext(userContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { spinner, setSpinner } = useContext(CategoryContext)


    const fetchUsers = async () => {
        try {
            setSpinner(true)
            const res = await axios.get('http://localhost:7000/users')
            setSpinner(false)
            setUsers(res.data)
        } catch (error) {
            toast.error(error.message)
        }
    }


    const deleteUser = async (id) => {
        try {
            setSpinner(true)
            await axios.delete(`http://localhost:7000/users/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            setSpinner(false)
            toast.success('User Deleted')
            await fetchUsers()
        } catch (error) {
            toast.error(error.message)

        }
    }


    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            {showDeleteModal && <div className='overLay' onClick={() => setShowDeleteModal(false)}></div>}
            <div className='users'>
                <h1>EXISTED USERS</h1>
                <div className={`deleteModal ${showDeleteModal ? 'openDeleteModal' : ''}`}>
                    <h3>Are you sure? </h3>
                    <div>
                        <button onClick={() => setShowDeleteModal(false)}>No</button>
                        <button onClick={() => {deleteUser(userId),setShowDeleteModal(false)}}>Yes</button>
                    </div>
                </div>
                {users.length !== 1
                    ? (
                        <>
                            <table border={1}>
                                <thead>
                                    <tr >
                                        <th >ID</th>
                                        <th >Image</th>
                                        <th >Email</th>
                                        <th >Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        spinner ? <Spinner /> :
                                            users && users
                                                .filter(user => user.role !== 'admin')
                                                .map(user => (
                                                    <tr key={user._id}>
                                                        <td>{user._id}</td>
                                                        <td ><img
                                                            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
                                                            src={`${user.profileImg
                                                                ?
                                                                user.profileImg
                                                                :
                                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                            alt="" />
                                                        </td>
                                                        <td >{user.email}</td>
                                                        <td ><i className='fa-solid fa-trash' onClick={() => { setShowDeleteModal(true), setuserId(user._id) }}></i></td>
                                                    </tr>
                                                ))

                                    }
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <h1>No Users Yet!</h1>
                    )
                }
            </div>
        </>
    )
}

export default Users