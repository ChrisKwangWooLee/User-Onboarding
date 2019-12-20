import React from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';

function DisplayUsers({user}) {
    const {firstName, lastName, email, pw, pwc, tos, role, id, createdAt, address, address2, city, state, zip} = user;
    console.log(user);
    return(
        <Card style={{margin: "20px"}}>
            <CardBody>
                <CardTitle style={{color: "#1a73e8"}}>{`${firstName} ${lastName}`}</CardTitle>
                <CardText>{`Email: ${email}`}</CardText>
                <CardText>{`Password: ${pw}`}</CardText>
                <CardText>{`Password-confirmed: ${pw === pwc}`}</CardText>
                <CardText>{`Confirmed Terms of Service: ${tos}`}</CardText>
                <CardText>{`Role: ${role}`}</CardText>
                <CardText>{`ID: ${id}`}</CardText>
                <CardText>{`Created at: ${createdAt}`}</CardText>
                <CardText>{`Address: ${address}, ${address2}, ${city}, ${state}, ${zip} `}</CardText>
            </CardBody>
        </Card>
    )
}

export default DisplayUsers;