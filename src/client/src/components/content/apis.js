async function apiShorten() {
    setUrlApiState('loading');
    setUrlApiError(null);
    const response = await shortenURL(url);
    switch (response?.status) {
        case 'success':
            setUrl(`http://localhost:3000/${response.data}`);
            setUrlApiState('success');
            setButtonTitle('Copy To Clipboard');
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
            // setUrl('');  // don't reset it.
            setUrlApiState('error');
            setUrlApiError(error);
            break;
    }
}
