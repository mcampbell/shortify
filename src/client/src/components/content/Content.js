import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Content.module.css';
import navplatform from '../../images/nav-platform.svg';

Content.propTypes = {};

function Content(props) {
    const [url, setUrl] = useState('');

    const updateUrl = (event) => {
        setUrl(event.target.value);
    };

    return (
        <main>
            <div id={styles['pitch']}>
                <div>
                    Say goodbye to piecing together 3PLs, integrations, and
                    clunky software. Only Stord delivers end-to-end logistics
                    for brands of all sizes through one integration, one
                    software platform, and with on-demand scalability. Welcome
                    to the Cloud Supply Chain.
                </div>
                <div>
                    <img src={navplatform} />
                </div>
            </div>
            <div id={styles['shorten']}>
                <input
                    type={'text'}
                    placeholder={'Paste or type your URL'}
                    value={url}
                    width={'80%'}
                    onChange={updateUrl}
                    data-test={'url-shorten-input'}
                />
                <button data-test={'url-shorten-button'}>Shorten</button>
            </div>
        </main>
    );
}

export default Content;
