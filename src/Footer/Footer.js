import React from 'react';
import './Footer.css';

const Footer = (props) => {
    return (
    <div className="fixed-bottom">
        <div className="bottom-container">
            <div className="row">
            {/* column1 */}
                <div className="col">
                    <a href="https://www.esri.com/home">Esri Homepage</a>
                </div>
            {/* column2 */}
                <div className="col">
                    <a href="https://github.com/saraewilcox/react-arcgis-traffic">This web map's code on github</a>
                </div>
            {/* column3 */}
                {/* <div className="col">
                    <a href="https://www.linkedin.com/in/sara-wilcox-91405b9/">Sara Wilcox LinkedIn</a>
                </div> */}
            </div>
        </div>
    </div>)
}

 export default Footer;