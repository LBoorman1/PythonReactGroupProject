import React from 'react';



const BulletPoints = props => {
    const numbers = props.array;
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (
        <div>
            {listItems}
        </div>
    )
}

export default BulletPoints;
