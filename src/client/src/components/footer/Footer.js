import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css';
import logo from '../../images/logo-blue.png';


function Footer() {
    return (
        <div id={styles['footer']}>
            <div id={styles['footerContent']}>

                <div id={styles['footerLogo']}>
                    <img src={logo} alt={'Stord logo'}/>
                </div>
                <div id={styles['footerInfos']}>

                    <ul>
                        <li>Software</li>
                        <li>Cloud Platform</li>
                        <li>Visibility</li>
                        <li>Integrations</li>
                        <li>Data & Insights</li>
                    </ul>
                    <ul>
                        <li>Logistics</li>
                        <li>Warehousing</li>
                        <li>Freight</li>
                        <li>Fulfillment</li>
                        <li>Last Mile</li>
                        <li>Data Science & Design</li>
                    </ul>
                    <ul>
                        <li>Solutions</li>
                        <li>Omnichannel Fulfillment</li>
                        <li>B2B Distribution</li>
                        <li>Forward Stocking</li>
                        <li>Retail Distribution</li>
                        <li>Optimization</li>
                        <li>By Industry</li>
                        <li>By Role</li>
                    </ul>
                    <ul>
                        <li>Why Stord</li>
                        <li>Cloud Supply Chain</li>
                        <li>Network and Trust</li>
                        <li>For Enterprise</li>
                        <li>For MidMarket & SMB</li>
                    </ul>
                    <ul>
                        <li>About</li>
                        <li>Team</li>
                        <li>Careers</li>
                        <li>Blog</li>
                        <li>Select US Locations</li>
                        <li>Join the Network</li>
                        <li>System Status</li>
                    </ul>
                    <ul>
                        <li>Get In Touch</li>
                        <li>Main: 866.502.9278</li>
                        <li>Freight: 678.735.4772</li>
                        <li>sales@stord.com</li>
                        <li>817 W. Peachtree St. NW<br/>
                            Suite 200<br/>
                            Atlanta, GA 30308
                        </li>
                    </ul>

                </div>

            </div>
            <div id={styles['brandBar']}> {/* webstorm doesn't like using id's in css modules? */}
                <FontAwesomeIcon className={styles.brandIcons} icon={['fab', 'linkedin']}/>
                <FontAwesomeIcon className={styles.brandIcons} icon={['fab', 'facebook-square']}/>
                <FontAwesomeIcon className={styles.brandIcons} icon={['fab', 'twitter-square']}/>
            </div>
            <div id={styles['copy']}>
                <div>
                    <span>Copyright &copy; 2021 STORD, Inc. All rights reserved.</span>
                    <span><a href={'https://www.stord.com/privacy-policy'}>Privacy Policy</a></span>
                    <span><a href={'https://www.stord.com/terms-and-conditions'} data-test={"footer-tcs"}>Terms and Conditions</a></span><br/>
                </div>
                Freight services are offered by STORD Freight LLC, a wholly owned subsidiary of STORD inc, a freight
                broker licensed under MC-747274-B
            </div>
        </div>)
}

export default Footer;