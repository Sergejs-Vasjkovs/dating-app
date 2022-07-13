import React from 'react';
import Qualities from './Qualities';
import Bookmark from './Bookmark';

const User = (props) => {

    const { users, onDelete } = props;

    return users.map(user => {
        return (
            <tr key={user._id} className="align-middle">
                <td>{user.name}</td>
                <td><Qualities qualities={user.qualities} /></td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td><Bookmark /></td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(user._id)}
                    >delete</button></td>
            </tr>)
    });
}

export default User;



