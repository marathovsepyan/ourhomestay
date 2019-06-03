import React from 'react';

import Header from '../shared/Header.jsx';

export const ErrorLayout = ({content}) => (
    <div className="container-fluid container-fixed-lg m-t-60">
        <div className="error-page full-height m-t-100">
            <div className="container-xs-height full-height">
                <div className="row-xs-height">
                    <div className="col-xs-height col-middle">
                        <div className="error-message text-center">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);




