import React from 'react';
import './Footer.css';

const Footer = (props) => {
    return (
    <div className="fixed-bottom">
        <div className="bottom-container">
            <div className="row">
            {/* column1 */}
                <div className="col-4">
                    <a class="esri-header-brand-link" id="esri-header-brand" href="https://www.esri.com/en-us/home" aria-label="Esri Global">
                        <span class="brand-image">
                            <span class="">
                                <img src="./Icons/esriLogo.svg" />
                            </span>
                        </span>
                    </a>
                </div>
            {/* column2 */}
                <div className="col-6">
                    <a href="https://github.com/saraewilcox/react-arcgis-traffic">View code on github</a>
                </div>
            {/* column3 */}
                <div className="col">
                    <a href="https://www.linkedin.com/in/sara-wilcox-91405b9/">Sara Wilcox LinkedIn</a>
                </div>
            </div>
        </div>
    </div>)
}

 export default Footer;