import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import toast from 'react-hot-toast'
import axios from 'axios'
import { userContext } from '../../context/userContext'

function Users() {

    const [users, setUsers] = useState([])
    const { token } = useContext(userContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:7000/users')
            setUsers(res.data)
        } catch (error) {
            toast.error(error.message)
        }
    }


    const deleteUser = async (id) => {
        try {

            await axios.delete(`http://localhost:7000/users/${id}`, {
                headers: {
                    Authorization: token
                }
            })
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
                        <div onClick={() => setShowDeleteModal(false)}>No</div>
                        <button onClick={() => { deleteUser(userId) }}>Yes</button>
                    </div>
                </div>
                {users.length !== 1
                    ? (
                        <>
                            <div className={`deleteModal ${showDeleteModal ? 'openDeleteModal' : ''}`}>
                                <h3>Are you sure? </h3>
                                <div>
                                    <button onClick={() => setShowDeleteModal(false)}>No</button>
                                    <button onClick={() => { deleteUser(userId) }}>Yes</button>
                                </div>
                            </div>
                            <table border={1}>
                                <thead>
                                    <tr style={{ borderTop: "1px solid blue" }}>
                                        <th style={{ borderTop: "1px solid blue" }}>ID</th>
                                        <th style={{ borderTop: "1px solid blue", borderLeft: "1px solid blue", borderRight: "1px solid blue" }}>Image</th>
                                        <th style={{ borderTop: "1px solid blue" }}>Email</th>
                                        <th style={{ borderTop: "1px solid blue", borderLeft: "1px solid blue" }}>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users
                                        .filter(user => user.role !== 'admin')
                                        .map(user => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td style={{ borderLeft: "1px solid blue", borderRight: "1px solid blue" }}><img
                                                    style={{ width: '40px', borderRadius: '100%' }}
                                                    src={`${user.profileImg
                                                        ?
                                                        user.profileImg
                                                        :
                                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                    alt="" />
                                                </td>
                                                <td style={{ color: 'blue', cursor: 'pointer' }}>{user.email}</td>
                                                <td style={{ borderLeft: "1px solid blue" }}><i className='fa-solid fa-trash' onClick={() => setShowDeleteModal(true)}></i></td>
                                            </tr>
                                        ))}
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