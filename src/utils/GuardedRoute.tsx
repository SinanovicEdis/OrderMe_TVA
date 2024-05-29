import { getAuth } from 'firebase/auth';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }: any) => {
    return (
        <Route {...rest} render={(props) =>
            auth ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
};

export default GuardedRoute;