import React, { useState } from 'react';
import styles from './Content.module.css';
import navplatform from '../../images/nav-platform.svg';
import { shortenURL } from '../../api/api.service';
import copy from 'copy-to-clipboard';

Content.propTypes = {};

function Content(props) {
    // region State
    const [url, setUrl] = useState('');
    const [urlApiState, setUrlApiState] = useState('none');
    const [urlApiError, setUrlApiError] = useState();

    // Toggle mode based on what they are doing.
    const [shortenMode, setShortenMode] = useState(true);

    // Info for the user on various events
    const [shortenMessages, setShortenMessages] = useState(' ')
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
        setShortenMessages('Copied.');
        setUrl('')
        setTimeout(() => {
            setShortenMessages(' ');
        }, 2000);
    }

    async function apiShorten() {
        setUrlApiState('loading');
        setUrlApiError(null);
        const response = await shortenURL(url);
        console.log('response', response)
        switch (response?.status) {
            case 'success':
                setUrl(`http://localhost:5001/${response.data}`);
                setUrlApiState('success');
                setShortenMode(false);
                setShortenMessages("Success!  You may now click the button to copy the shortened URL to the clipboard, or use your Operating System's normal copy/cut keys.")
                break;

            default:
                // error case and every other non-success case is the same.
                let error = '';
                switch (response?.error?.response?.status) {
                    case 401: // unauth-n.
                        error = 'Unauthenticated user.';
                        break;
                    case 403: // unauth-z
                        error = 'Unauthorized to perform this action.';
                        break;
                    default:
                        error = `Unknown error retrieving url.`;
                        break;
                }
                // setUrl('');  // don't reset url on an error; that's just irritating.
                setUrlApiState('error');
                setUrlApiError(error);
                break;
        }
    }

    // endregion

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
        console.log('event', event, 'key', event.key);
        if (event.key === 'Enter') {
            event.preventDefault();
            const button = document.getElementById('button');
            if (button && !button.disabled) {
                button.click();
            }
        }
    };


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
                    <img src={navplatform} />
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
            <div className={styles.info}>{shortenMessages}</div>
        </main>
    );
    // endregion
}

export default Content;
