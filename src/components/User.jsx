import React from 'react';
import Qualities from './Qualities';
import Bookmark from './Bookmark';

const User = ({ user, onDelete }) => {
    return (
        <tr className="align-middle">
            <td>{user.name}</td>
            <td>{user.qualities.map(qual => <Qualities key={qual._id} qual={qual} />)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td><Bookmark /></td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >Delete</button></td>
        </tr>)
}

export default User;



