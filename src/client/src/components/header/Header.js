import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo-blue.png'
import styles from './Header.module.css';

Header.propTypes = {};

function Header(props) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Stord Shortifier</title>
                <link rel="canonical" href="http://shortify.stord.com/"/>
            </Helmet>
            <nav>
                <ul className={styles.navList}>
                    <li>New Blog: Announcing Stord's $65M Series C! <a href={"https://www.stord.com/blog/series-c-65m-cloud-supply-chain"}>Read More</a></li>
                    <li><FontAwesomeIcon icon={['fas', 'phone-alt']}/>&nbsp;<a href={"tel:18665029278"}>1-866-502-9278</a></li>
                    <li><FontAwesomeIcon icon={'envelope'}/>&nbsp;<a href={"mailto:sales@stord.com"}>sales@stord.com</a></li>
                </ul>
            </nav>
            <div className={styles.banner}>
                <ul className={styles.bannerList}>
                    <li><img src={logo} /></li>
                    <li><a href={"https://www.stord.com/cloud-software-platform"}>Software</a></li>
                    <li><a href={"https://www.stord.com/warehousing"}>Logistics</a></li>
                    <li><a href={"https://www.stord.com/network-design"}>Solutions</a></li>
                    <li><a href={"https://www.stord.com/business-benefits-enterprise"}>Why Stord?</a></li>
                    <li><a href={"https://www.stord.com/about-us"}>About Us</a></li>
                    <li><a href={"https://www.stord.com/get-started"}><button className={styles.expertButton}>Talk to an expert</button></a></li>
                    <li><a href={"https://admin.stord.com"} data-test={"login-button"}>Login</a></li>
                </ul>

            </div>
        </>
    );
}

export default Header;