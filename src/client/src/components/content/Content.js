import React, { useState } from 'react';
import styles from './Content.module.css';
import navplatform from '../../images/nav-platform.svg';
import { shortenURL } from '../../api/api.service';
import copy from 'copy-to-clipboard';

function Content() {
    // region State
    const [url, setUrl] = useState('');

    // Toggle mode based on what they are doing.
    const [shortenMode, setShortenMode] = useState(true);

    // Info for the user on various events
    const [shortenMessages, setShortenMessages] = useState(' ');
    // endregion

    // region API and other "processy" code
    /**
     * Copy the shortened url to the clipboard.
     * @param event
     */
    function copyToClipboard(event) {
        copy(url, {
            debug: true,
            format: 'text/plain',
        });
        setShortenMode(true);
        setUrl('');
        setShortenMessages('Copied.');
        setTimeout(() => {
            setShortenMessages(' ');
        }, 2000);
    }

    async function apiShorten() {
        setShortenMessages('Shortening...');
        const response = await shortenURL(url);
        if (response?.data) {
            setUrl(`http://localhost:5001/${response.data.value}`);
            setShortenMode(false);
            setShortenMessages(
                'Success!  You may now click the button to copy the shortened URL to the clipboard, or use your Operating System\'s normal copy/cut keys.'
            );
        } else if (response?.errors) {
            const error = response.errors[0];
            let errorMessage;
            switch (error.status) {
                case '401': // unauth-n.
                    errorMessage = 'Unauthenticated.';
                    break;
                case '500':
                    errorMessage = 'Unknown server error.';
                    break;
                default:
                    errorMessage = 'Unknown error retrieving url.';
                    break;
            }
            // setUrl('');  // don't reset url on an error; that's just irritating.
            setShortenMessages(errorMessage);
        } else {
            // I don't know how this might happen, but <shrug>
            setShortenMessages(`Unknown error trying to shorten URL. =(`);
            setShortenMode(true);
        }
    }

    const handleInputChange = (event) => {
        // If we are in "copy" mode, and they are changing the URL manually via paste or typing, toggle to
        // "shorten" mode so the button is in the right state
        if (!shortenMode) {
            setShortenMode(true);
            setShortenMessages('');
        }
        setUrl(event.target.value);
    };

    // Add the button press behavior on the input for convenience since this isn't a <form>
    const handleKeyUp = (event) => {
        // For some reason this doesn't work in FF, so only allow the enter trick during
        // "shorten" mode.  Could never figure this out.

        if (shortenMode && event.key === 'Enter') {
            event.preventDefault();
            const button = document.getElementById('button');
            if (button && !button.disabled) {
                button.click();
            }
        }
    };

    // endregion

    function isUrlValid() {
        try {
            new URL(url);
            return true;
        } catch (e) {
            // bad url (, bad!)
            return false;
        }
    }

    const buttonEnabled = url?.length > 0 && isUrlValid();

    // region Visual content
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
                    <img src={navplatform} alt={'Stord Platform'}/>
                </div>
            </div>
            <div id={styles['shorten']}>
                <input
                    type={'text'}
                    placeholder={'Paste or type your URL'}
                    value={url}
                    width={'80%'}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                    data-test={'url-shorten-input'}
                    id={'shortenInput'}
                />

                {shortenMode ? (
                    <button
                        data-test={'url-shorten-button'}
                        disabled={!buttonEnabled}
                        id={'button'}
                        className={
                            buttonEnabled
                                ? styles.buttonEnabled
                                : styles.buttonDisabled
                        }
                        onClick={apiShorten}>
                        Shorten
                    </button>
                ) : (
                    <button
                        data-test={'url-copy-button'}
                        id={'button'}
                        className={styles.buttonEnabled}
                        onClick={copyToClipboard}>
                        Copy to clipboard
                    </button>
                )}
            </div>
            <div id={'infoMessage'} className={styles.info}>
                {shortenMessages}
            </div>
        </main>
    );
    // endregion
}

export default Content;
