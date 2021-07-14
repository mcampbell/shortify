import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css';

Footer.propTypes = {};

function Footer(props) {
    return (
        <div>
            <div id={styles['brand-bar']}> {/* webstorm doesn't like using id's in css modules? */}
                <FontAwesomeIcon className={styles.brandIcons} icon={['fab', 'linkedin']}/>
                <FontAwesomeIcon className={styles.brandIcons} icon={['fab', 'facebook-square']}/>
                <FontAwesomeIcon className={styles.brandIcons} icon={['fab', 'twitter-square']}/>
            </div>
        </div>
    );
}

export default Footer;