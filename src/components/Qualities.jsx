import React from 'react';

const Qualities = (props) => {

    const { qualities } = props;

    return (
        <>
            {qualities.map(q =>
                <span key={q._id}
                    className={`badge bg-${q.color} m-1`}>
                    {q.name}
                </span >)}
        </>
    );
};

export default Qualities;