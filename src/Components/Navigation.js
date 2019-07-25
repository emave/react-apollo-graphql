import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../routes';
import OrganizationSearch from './Organization/OrganizationSearch';

const Navigation = ({location: {pathname}, organizationName, setOrganizationName}) => (
    <header className="Navigation">
        <div className="Navigation-link">
            <Link to={routes.PROFILE}>Profile</Link>
        </div>
        <div className="Navigation-link">
            <Link to={routes.ORGANIZATION}>Organization</Link>
        </div>

        {pathname === routes.ORGANIZATION && (
            <OrganizationSearch organizationName={organizationName} setOrganizationName={setOrganizationName}/>
        )}
    </header>
);

export default withRouter(Navigation);