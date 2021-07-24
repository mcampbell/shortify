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
                        <li><a href="https://www.stord.com/cloud-software-platform">Cloud Platform</a></li>
                        <li><a href="https://www.stord.com/visibility">Visibility</a></li>
                        <li><a href="https://www.stord.com/integrations">Integrations</a></li>
                        <li><a href="https://www.stord.com/software-data">Data & Insights</a></li>
                    </ul>
                    <ul>
                        <li>Logistics</li>
                        <li><a href="https://www.stord.com/warehousing">Warehousing</a></li>
                        <li><a href="https://www.stord.com/freight">Freight</a></li>
                        <li><a href="https://www.stord.com/services-fulfillment">Fulfillment</a></li>
                        <li><a href="https://www.stord.com/services-parcel-and-last-mile">Last Mile</a></li>
                        <li><a href="https://www.stord.com/services-data-science-and-design">Data Science & Design</a>
                        </li>
                    </ul>
                    <ul>
                        <li>Solutions</li>
                        <li><a href="https://www.stord.com/omnichannel-distribution">Omnichannel Fulfillment</a></li>
                        <li><a href="https://www.stord.com/b2b-distribution-and-fulfillment">B2B Distribution</a></li>
                        <li><a href="https://www.stord.com/forward-stocking-locations">Forward Stocking</a></li>
                        <li><a href="https://www.stord.com/retail-fulfillment-and-consolidation">Retail Distribution</a>
                        </li>
                        <li><a href="https://www.stord.com/network-design">Optimization</a></li>
                        <li><a href="https://www.stord.com/industries-we-serve">By Industry</a></li>
                        <li><a href="https://www.stord.com/roles-we-support">By Role</a></li>
                    </ul>
                    <ul>
                        <li>Why Stord</li>
                        <li><a href="https://www.stord.com/stord-supply-chain-cloud">Cloud Supply Chain</a></li>
                        <li><a href="https://www.stord.com/network-and-trust">Network and Trust</a></li>
                        <li><a href="https://www.stord.com/business-benefits-enterprise">For Enterprise</a></li>
                        <li><a href="https://www.stord.com/business-benefits-mid-market-and-small-business">For
                            MidMarket &amp; SMB</a></li>
                    </ul>
                    <ul>
                        <li>About</li>
                        <li><a href="https://www.stord.com/about-us#leadership">Team</a></li>
                        <li><a href="https://www.stord.com/about-us#resume">Careers</a></li>
                        <li><a href="https://www.stord.com/blog">Blog</a></li>
                        <li><a href="https://www.stord.com/locations">Select US Locations</a></li>
                        <li><a href="https://getstord.formtitan.com/join-the-network">Join the Network</a></li>
                        <li><a href="https://status.stord.com/">System Status</a></li>
                    </ul>
                    <ul>
                        <li>Get In Touch</li>
                        <li><a href="tel:866.502.9278"><FontAwesomeIcon className={styles.contactIcons}
                                                                        icon={['fa', 'mobile']}/>Main:
                            866.502.9278</a></li>
                        <li><a href="tel:678.735.4772"><FontAwesomeIcon className={styles.contactIcons}
                                                                        icon={['fa', 'mobile']}/>Freight:
                            678.735.4772</a></li>
                        <li><a href="mailto:sales@stord.com"><FontAwesomeIcon className={styles.contactIcons}
                                                                              icon={'envelope'}/>sales@stord.com</a>
                        </li>
                        <li>
                            <div id={styles['addressContainer']}>
                                <div>
                                    <FontAwesomeIcon
                                        className={styles.contactIcons} icon={['fa', 'map-marker']}/>
                                </div>
                                <div>
                                    <a href="https://www.google.com/maps/place/817+W.+Peachtree+St.+NW+Suite+200+Atlanta%2C+GA+30308">
                                        817 W. Peachtree St. NW<br/>
                                        Suite 200<br/>
                                        Atlanta, GA 30308
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>
            <div id={styles['brandBar']}> {/* webstorm doesn't like using id's in css modules? */}
                <div className={styles.iconContainer}>
                    <a href={'https://www.linkedin.com/company/stord'}>
                        <FontAwesomeIcon className={styles.icons} icon={['fab', 'linkedin']}/>
                    </a>
                </div>
                <div className={styles.iconContainer}>
                    <a href="https://www.facebook.com/stordco">
                        <FontAwesomeIcon className={styles.icons}
                                         icon={['fab', 'facebook']}/>
                    </a>
                </div>
                <div className={styles.iconContainer}>
                    <a href={'https://twitter.com/GetStord'}>
                        <FontAwesomeIcon className={styles.icons}
                                         icon={['fab', 'twitter']}/>
                    </a>
                </div>
            </div>
            ;
            <div id={styles['copy']}>
                <div>
                    <span>Copyright &copy; 2021 STORD, Inc. All rights reserved.</span>
                    <span><a href={'https://www.stord.com/privacy-policy'}>Privacy Policy</a></span>
                    <span><a href={'https://www.stord.com/terms-and-conditions'}
                             data-test={'footer-tcs'}>Terms and Conditions</a></span><br/>
                </div>
                Freight services are offered by STORD Freight LLC, a wholly owned subsidiary of STORD inc, a freight
                broker licensed under MC-747274-B
            </div>;
        </div>)
}

export default Footer;
