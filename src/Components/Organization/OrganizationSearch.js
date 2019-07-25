import React, {useState} from 'react';
import Button from "../UI/Button";
import Input from "../UI/Input";

const OrganizationSearch = ({organizationName, setOrganizationName}) => {
    const [inputOrganizationName, setInputOrganizationName] = useState(organizationName);

    const onChange = e => {
        setInputOrganizationName(e.target.value)
    };

    const onSubmit = e => {
        e.preventDefault();
        setOrganizationName(inputOrganizationName);
    };

    return <form onSubmit={onSubmit}>
        <label htmlFor="organizationNameInput">Enter an organization name: </label>
        <Input color={'white'} id="organizationNameInput" value={inputOrganizationName} onChange={onChange}/>
        <Button color={'white'} type={'submit'}>Submit</Button>
    </form>;
};

export default OrganizationSearch;