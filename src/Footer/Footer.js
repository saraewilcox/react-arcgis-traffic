import React from 'react';
import './Footer.css';

const Footer = (props) => {
    return (
    <div className="main-footer">
        <div className="bottom-container">
            <div className="row">
            {/* column1 */}
                <div className="col">
                    <a href="https://www.esri.com/home">ESRI - THE SCIENCE OF WHERE</a>
                </div>
            {/* column2 */}
                <div className="col">
                    <a href="https://github.com/saraewilcox">Sara Wilcox github</a>
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